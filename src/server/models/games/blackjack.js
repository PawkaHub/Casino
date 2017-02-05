// NPM
import uuid from 'uuid';

// Models
import Base from 'project/server/models/base';
import Deck from 'project/server/models/deck';
import Hand from 'project/server/models/hand';

// For scoring, K, Q, J all count as 10. A can be 1 or 10 depending of what will the score closest to 21 will be without busting. Card suits don't matter.
export default class Blackjack extends Base {

  constructor({ playerId, playerBetAmount }) {
    // Connect to DB Adapter for games collection
    super({ collection: 'games' });

    // If a blackjackId is passed in for this game of blackjack, populate the class instance data with data that is fetched from the database.
    if (playerId && !playerBetAmount) {
      console.log('Resume current game of blackjack');
      this.restoreGame({ playerId });
    } else if (playerId && playerBetAmount) {
      console.log('Start a new game of blackjack');
      this.startGame({ playerId, playerBetAmount });
    }
  }

  // Win if card is blackjack
  static WIN_CONDITION = 21;

  // Lose if greater then 22 (bust)
  static LOSE_CONDITION = 22;

  // Deal will stand on 17
  static STAND_CONDITION = 17;

  findCurrentGame({ playerId }) {
    const game = this.findOne({ playerId, finished: false });
    // console.log('findCurrentGame', game);
    if (game) return game;
    return null;
  }

  getState() {
    // Don't return any state if a game hasn't been started yet
    if (!this.currentGame) return;
    // console.log('getState', game);

    // We only return a whitelist of information that we want the client to actually see for the stored gameState, instead of all the data available on the database. Sensitive information like what cards are in the deck are not returned to the client.
    const {
      blackjackId,
      playerId,
      playerBetAmount,
      finished,
      payout,
      deck,
      dealerHand,
      playerHand,
    } = this.currentGame;

    console.log('getState', playerHand.cards, dealerHand.cards);

    this.state = {
      blackjack: {
        blackjackId,
        playerId,
        playerBetAmount,
        finished,
        payout,
        // deck: deck.cards,
        dealerHand: dealerHand.cards,
        playerHand: playerHand.cards,
      },
    };

    return this.state;
  }

  restoreGame({ playerId }) {
    const game = this.findCurrentGame({ playerId });

    // If a game does exist, rehydrate the game's state
    if (game) {

      // Set currentGame to be restored from the database
      this.currentGame = game;
      const { currentGame } = this;

      // Restore models from database
      const { deck, dealerHand, playerHand } = game;

      // Rehydrate class models for the appropriate properties
      currentGame.deck = new Deck(deck.cards);
      currentGame.dealerHand = new Hand(dealerHand.cards);
      currentGame.playerHand = new Hand(playerHand.cards);

      return this.getState();
    }
    return null;
  }

  startGame({ playerId, playerBetAmount }) {
    console.log('newGame', playerId, playerBetAmount);

    // Create a new game
    const blackjackId = uuid.v4();
    this.currentGame = {
      blackjackId,
      playerId,
      playerBetAmount,
      finished: false,
      payout: 0,
      deck: new Deck(),
      dealerHand: new Hand(),
      playerHand: new Hand(),
    };

    // Current Game
    const { currentGame } = this;

    // Shuffle the deck
    currentGame.deck.shuffle();

    // Deal one card to the dealer
    this.hit(currentGame.dealerHand);

    // Deal two cards to the player
    this.hit(currentGame.playerHand);
    this.hit(currentGame.playerHand);

    // Insert the game into the DB
    this.insertData(this.currentGame);

    return this.getState();
  }

  finishGame() {
    const { currentGame } = this;
    currentGame.finished = true;
  }

  // Adds up the values of cards in the hand. Accounts for A being 1 or 11.
  getHandScore(hand) {
    let score = 0;
    let aceCount = 0;

    hand.cards.forEach((card) => {
      const { rank } = card;
      if (
        rank === 'K' ||
        rank === 'Q' ||
        rank === 'J'
      ) {
        score = score + 10;
      } else if (rank === 'A') {
        score = score + 11;
        aceCount++;
      } else {
        score = score + parseInt(card.rank);
      }
    });

    while (score >= Blackjack.LOSE_CONDITION && aceCount > 0) {
      score = score - 10;
      aceCount--;
    }

    console.log('getHandScore', score);

    return score;
  }

  // Blackjack beats any hand that is not a blackjack, including 21
  isBlackjack(hand) {
    const score = this.getHandScore(hand);
    console.log('isBlackjack', score, hand);
    return score === Blackjack.WIN_CONDITION && hand.cards.length === 2;
  }

  // Determine if the hand has gone over 21
  isBust(hand) {
    const score = this.getHandScore(hand);
    console.log('isBust', score, hand);
    return score >= Blackjack.LOSE_CONDITION;
  }

  hit(hand) {
    const { currentGame } = this;
    const card = currentGame.deck.draw();
    hand.add(card);
    return card;
  }

  stand() {
    // Run out the dealer's hand until they hit their stand threshold
    return this.runOut();
  }

  runOut() {
    const { currentGame } = this;

    do {
      this.hit(currentGame.dealerHand);
      return currentGame.dealerHand.cards;
    } while (
      this.getHandScore(currentGame.dealerHand) < Blackjack.DEALER_STAND
    );
  }

  doubleDown() {
    const { currentGame } = this;

    // Double the player's bet and hit their hand one final time
    currentGame.playerBetAmount = currentGame.playerBetAmount * 2;
    this.hit(currentGame.playerHand);

    // Run out the rest of the dealer's hand
    this.runOut();

    // XXX: Determine the outcome of the game
    currentGame.payout = 'BLUR BUCKS';


    // Finish the game
    return this.finishGame();
  }

  surrender() {
    // Get currentGame for this instance
    const { currentGame } = this;

    // Player reclaims half their bet when surrendering
    currentGame.payout = currentGame.playerBetAmount / 2;

    // Finish the game
    return this.finishGame();
  }
}
