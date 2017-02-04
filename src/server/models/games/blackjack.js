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

  formatGameForClient(game) {
    // console.log('formatGameForClient', game);
    // We only return a whitelist of information that we want the client to actually see, instead of all the data available on the database. Things like dealerHand are not returned to the client.
    const {
      blackjackId,
      playerHand,
      playerBetAmount,
      finished,
    } = game;

    // Save game to currentGame instance variable (so that we can easily update values that will be synced to the database)
    this.currentGame = game;

    this.data = {
      blackjack: {
        blackjackId,
        playerHand,
        playerBetAmount,
        finished,
      },
    };

    return this.data;
  }

  restoreGame({ playerId }) {
    // console.log('restoreGame', playerId);
    const game = this.findCurrentGame({ playerId });
    // console.log('game restored', game);

    // If a game does exist, rehydrate the game's state
    if (game) {
      const { deck, playerHand, dealerHand } = game;

      // Rehydrate the deck
      this.deck = new Deck(deck);

      // Rehydrate the dealer's hand
      this.dealerHand = new Hand(dealerHand);

      // Rehydrate the player's hand
      this.playerHand = new Hand(playerHand);

      return this.formatGameForClient(game);
    }
    return null;
  }

  startGame({ playerId, playerBetAmount }) {
    console.log('newGame', playerId, playerBetAmount);

    // Create a deck to draw cards from
    this.deck = new Deck();

    // Shuffle the deck
    this.deck.shuffle();

    // Create hands for the player and the dealer
    this.dealerHand = new Hand();
    this.playerHand = new Hand();

    // Deal one card to the dealer
    this.hit(this.dealerHand);

    // Output dealerHand
    console.log('dealerHand', this.getHandScore(this.dealerHand));

    // Deal two cards to the player
    this.hit(this.playerHand);
    this.hit(this.playerHand);

    // Output playerHand
    console.log('playerHand', this.getHandScore(this.playerHand));

    // Insert the game into the DB
    const blackjackId = uuid.v4();
    const game = this.insertData({
      blackjackId,
      playerId,
      playerBetAmount,
      finished: false,
      deck: this.deck.cards,
      playerHand: this.playerHand.cards,
      dealerHand: this.dealerHand.cards,
    });

    return this.formatGameForClient(game);
  }

  // Adds up the values of cards in the hand. Accounts for A being 1 or 11.
  getHandScore(hand) {
    console.log('getHandScore', hand);
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
    const card = this.deck.draw();
    console.log('hit', card.toString());
    const newHand = hand.add(card);
    console.log('newHand', newHand);
  }

  stand() {
    // Run out the dealer's hand until they hit their stand threshold
    console.log('stand');
    do {
      this.hit(this.dealerHand);
    } while (this.getHandScore(this.dealerHand) < Blackjack.DEALER_STAND);
  }

  doubleDown() {
    console.log('doubleDown');
  }

  split() {
    console.log('split');
  }

  surrender() {
    console.log('surrender');
  }
}

/*
// Returns the current state of the game:
//  the player's hand
//  the dealer's hand
//  the available actions
Game.getGamestate = function() {
  var gamestate = "Player shows " + this.playerHand.toString() + " (" + this.playerHand.score() + "). " +
          "Dealer shows " + this.dealerHand.toString() + " (" + this.dealerHand.score() + "). ";

  var availableActions = [];

  if (!this.playerHand.isBusto() && this.dealerHand.cards.length === 1) {
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
};*/


/* if (session.game) {
    res.status(400).json({
      message: 'You cannot start a new game of Blackjack when one is already in progress.',
    });
  } else {
    const { bed } = body;
    const game = new Game({ bed });
  }*/

  /* var session = req.session;

  //check to see if deal has already been called
  if (req.session.game) {
    res.status(400).json("{ message: DEAL action is not available at this time }");
  } else {

    //create a new game
    var game = new Game(req.body.bet);

    //deal two Cards to the player
    game.playerHand.hit(game.deck.draw());
    game.playerHand.hit(game.deck.draw());

    //deal one Card to the dealer
    game.dealerHand.hit(game.deck.draw());

    //if the player has a blackjack, run the dealer hand out
    if (game.playerHand.isBlackjack()) {
      do {
        game.dealerHand.hit(game.deck.draw());
      } while (game.dealerHand.score() < Hand.DEALER_STAND);
    }

    //put the game into the session for the next interaction
    session.game = game;

    var message = game.getGamestate();
    if (game.playerHand.isBlackjack()) {
      message += "Blackjack! You win $" + (game.bet * 3)/2;
    }

    res.status(200).json("{ message: " + message + " }");
  }*/
