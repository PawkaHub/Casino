// NPM
import uuid from 'uuid';

// Project
import { players, games } from 'project/server/db';

// Models
import Deck from 'project/server/models/deck';
import Hand from 'project/server/models/hand';

// For scoring, K, Q, J all count as 10. A can be 1 or 10 depending of what will the score closest to 21 will be without busting. Card suits don't matter.
export default class Blackjack {

  // Win if card is blackjack
  static WIN_CONDITION = 21

  // Lose if greater then 22 (bust)
  static LOSE_CONDITION = 22;

  // Deal will stand on 17
  static STAND_CONDITION = 17

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

  // Adds up the values of cards in the current hand. Accounts for A being 1 or 11.
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

  // Find any games a player may currently be involved in
  findCurrentGame({ playerId }) {
    const game = games.findOne({ playerId, finished: false });
    console.log('findCurrentGame', games.data);
    if (game) return this.formatGameForClient(game);
    return null;
  }

  // Find any games that may exist for this ID, regardless of whether they're finished or not
  findGameById({ id }) {
    const game = games.findOne({ id });
    console.log('findGameById', game);
    if (game) return this.formatGameForClient(game);
    return null;
  }

  formatGameForClient(game) {
    // We only return a whitelist of information that we want the client to actually see, instead of all the data available on the database. Things like dealerHand are not returned to the client.
    const {
      id,
      playerHand,
      playerBetAmount,
      finished,
    } = game;

    return {
      blackjack: {
        id,
        playerHand,
        playerBetAmount,
        finished,
      },
    }
  }

  // Create a new game for this player
  newGame({ playerId, playerBetAmount }) {
    console.log('Starting a new game...');

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

    // Persist the new game to the database
    const id = uuid.v4();
    games.insert({
      id,
      playerId,
      playerBetAmount,
      finished: false,
      playerHand: this.playerHand.cards,
      dealerHand: this.dealerHand.cards,
    });

    return this.findGameById({ id });
  }

  hit(hand) {
    const card = this.deck.draw();
    console.log('hit', card.toString());
    return hand.add(card);
  }

  deal() {
    console.log('deal');
    // Don't allow a new deal to be placed if the current game already has hands dealt out
    // const currentGame = this.findCurrentGame({ playerId });
    // if (currentGame)
  }

  split() {
    console.log('split');
  }

  // Either start a new game for the player, or resume a currently in progress game that the player hasn't seen to completion yet
  start({ playerId, playerBetAmount }) {
    console.log('start', playerId, playerBetAmount);
    // Check if there's currently a game of blackjack started for this player
    const currentGame = this.findCurrentGame({ playerId });
    if (currentGame) return currentGame;

    // If there's no game for this player, start a new one
    return this.newGame({ playerId, playerBetAmount });
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
