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

    // Ensure score totals for the player and dealer hands are kept up to date
    this.updateScoreTotals();

    // console.log('getState', game);

    // We only return a whitelist of information that we want the client to actually see for the stored gameState, instead of all the data available on the database. Sensitive information like what cards are in the deck are not returned to the client.
    const {
      blackjackId,
      playerId,
      playerBetAmount,
      playerScore,
      dealerScore,
      finished,
      outcome,
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
        playerScore,
        dealerScore,
        finished,
        outcome,
        payout,
        // deck: deck.cards,
        dealerHand: dealerHand.cards,
        playerHand: playerHand.cards,
      },
    };

    return this.state;
  }

  checkGameRules() {
    const { currentGame } = this;

    // Fetch player score
    const playerScore = this.getHandScore(currentGame.playerHand);
    console.log('playerScore', playerScore);

    // Fetch dealer score
    const dealerScore = this.getHandScore(currentGame.dealerHand);
    console.log('dealerScore', dealerScore);

    // Check if player has blackjack
    const playerBlackjack = this.isBlackjack(currentGame.playerHand);
    console.log('playerBlackjack', playerBlackjack);

    // Check if player is bust
    const playerBust = this.isBust(currentGame.playerHand);
    console.log('playerBust', playerBust);

    // Check if dealer has blackjack
    const dealerBlackjack = this.isBlackjack(currentGame.dealerHand);
    console.log('dealerBlackjack', dealerBlackjack);

    // Check if dealer is bust
    const dealerBust = this.isBust(currentGame.dealerHand);
    console.log('dealerBust', dealerBust);

    // For convenient access in output messages
    const { WIN_CONDITION } = Blackjack;
    const { playerBetAmount } = currentGame;

    let payout;
    let outcome;

    // If player score is greater than dealer score, player wins
    if (playerScore > dealerScore) {
      payout = playerBetAmount * 2;
      outcome = `You were closer to ${WIN_CONDITION}! You win $${payout}`;
      console.log(outcome);
    }

    // If player score is less than dealer score, house wins
    if (playerScore < dealerScore) {
      payout = 0;
      outcome = `Dealer was closer to ${WIN_CONDITION}! House wins $${playerBetAmount}`;
      console.log(outcome);
    }

    // If player and dealer scores are a tie, house wins due to house advantage
    if (playerScore === dealerScore) {
      payout = 0;
      outcome = `You and dealer tied! House wins $${playerBetAmount}`;
      console.log(outcome);
    }

    // If dealer and player both have blackjack, it's a push and the player gets their original bet returned to them
    if (playerBlackjack && dealerBlackjack) {
      payout = playerBetAmount;
      outcome = `Push, $${playerBetAmount} returned to you.`;
      console.log(outcome);
    }

    // If player has blackjack and dealer doesn't, player wins
    if (playerBlackjack && !dealerBlackjack) {
      payout = (playerBetAmount * 3) / 2;
      outcome = `You got Blackjack! You win $${payout}!`;
      console.log(outcome);
    }

    // If dealer has blackjack and player doesn't, house wins
    if (!playerBlackjack && dealerBlackjack) {
      payout = 0;
      outcome = `Dealer got Blackjack! House wins $${playerBetAmount}!`;
      console.log(outcome);
    }

    // If player and dealer both bust, then it's a draw but the house has advantage on double busts so the house wins and takes the bet amount
    if (playerBust && dealerBust) {
      payout = 0;
      outcome = `You and dealer both bust. House wins $${playerBetAmount}!`;
      console.log(outcome);
    }

    // If player busts house wins and player loses their original bet amount
    if (playerBust && !dealerBust) {
      payout = 0;
      outcome = `Player Busts. House wins $${playerBetAmount}!`;
      console.log(outcome);
    }

    // If dealer busts player wins and house loses
    if (!playerBust && dealerBust) {
      payout = playerBetAmount * 2;
      outcome = `Dealer Busts. You win $${payout}!`;
      console.log(outcome);
    }

    // Handle finalization of game and finish it out
    return this.finishGame(payout, outcome);
  }

  getAvailableActions() {
    const { currentGame } = this;
    console.log('getAvailableActions', currentGame);
    // XXX: Coordinates with gameState and rules logic to determine available actions for the player

    const actions = [];

    /* var gamestate = "Player shows " + this.playerHand.toString() + " (" + this.playerHand.score() + "). " +
            "Dealer shows " + this.dealerHand.toString() + " (" + this.dealerHand.score() + "). ";

    var availableActions = [];

    if (!this.playerHand.isBust() && this.dealerHand.cards.length === 1) {
      if (this.playerHand.score() < 21) {
        availableActions.push('hit');
      }
      if (this.playerHand.cards.length === 2 && this.dealerHand.cards.length === 1) {
        availableActions.push('doubledown');
      }
      availableActions.push('stand');

      gamestate += " Available actions: " + availableActions;
    }

    return gamestate;
    */
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
      playerScore: 0,
      dealerScore: 0,
      finished: false,
      outcome: null,
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

    // If the player hit a natural blackjack, stand automatically and let the player know the outcome of the game accordingly.
    const playerBlackjack = this.isBlackjack(currentGame.playerHand);
    if (playerBlackjack) { this.stand(); }

    return this.getState();
  }

  finishGame(
    payout = 0,
    outcome = `If you're seeing this, something went wrong!`
  ) {
    const { currentGame } = this;

    // Set a payout/outcome, and finish the game
    currentGame.payout = payout;
    currentGame.outcome = outcome;
    currentGame.finished = true;
  }

  // Adds up the values of cards in the hand. Accounts for A being 1 or 11.
  getHandScore(hand) {
    let score = 0;
    let aceCount = 0;

    hand.cards.forEach((card) => {
      const { rank } = card;
      if (
        card.isKing() ||
        card.isQueen() ||
        card.isJack()
      ) {
        score = score + 10;
      } else if (card.isAce()) {
        score = score + 11;
        aceCount++;
      } else {
        score = score + parseInt(rank);
      }
    });

    while (score >= Blackjack.LOSE_CONDITION && aceCount > 0) {
      score = score - 10;
      aceCount--;
    }

    console.log('getHandScore', hand.cards, score);

    return score;
  }

  updateScoreTotals() {
    const { currentGame } = this;
    // Fetch player score
    const playerScore = this.getHandScore(currentGame.playerHand);
    currentGame.playerScore = playerScore;

    // Fetch dealer score
    const dealerScore = this.getHandScore(currentGame.dealerHand);
    currentGame.dealerScore = dealerScore;
  }

  // Blackjack beats any hand that is not a blackjack, including 21
  isBlackjack(hand) {
    const score = this.getHandScore(hand);
    // console.log('isBlackjack', score, hand);
    return score === Blackjack.WIN_CONDITION && hand.cards.length === 2;
  }

  // Determine if the hand has gone over 21
  isBust(hand) {
    const score = this.getHandScore(hand);
    // console.log('isBust', score, hand);
    return score >= Blackjack.LOSE_CONDITION;
  }

  hit(hand) {
    const { currentGame } = this;
    const card = currentGame.deck.draw();
    hand.add(card);

    // If the player busts, stand automatically and let the player know the outcome of the game accordingly.
    const playerBust = this.isBust(hand);
    if (playerBust) { this.stand(); }
  }

  stand() {
    // Play out the dealer's hand until they hit their stand threshold
    this.playOut();

    // Let the player know the outcome of the game and if they've won or lost
    const outcome = this.checkGameRules();
    console.log('outcome', outcome);
    return outcome;
  }

  playOut() {
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

    // Stand and determine the outcome of the game
    this.stand();
  }

  surrender() {
    // Get currentGame for this instance
    const { currentGame } = this;

    // Player reclaims half their bet when surrendering
    const payout = currentGame.playerBetAmount / 2;
    const outcome = `You surrendered and got $${payout} of your original bet back.`;

    // Finish the game
    return this.finishGame(payout, outcome);
  }
}
