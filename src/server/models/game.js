// NPM
import { observable, action, computed, asMap } from 'mobx';

// Models
import Deck from 'project/server/models/deck';
import Hand from 'project/server/models/hand';

export default class Game {
  constructor() {
    console.log('Game');
  }

  @action draw = ({ card }) => {
    console.log('Draw!', card);
  }
}

/* //import the objects needed
var Deck = require('./deck');
var Hand = require('./hand.js');

// A game of blackjack consisting of the amount bet, the deck and two hands (player and dealer)

var Game = function(bet) {

  this.bet = bet; // the amount of the bet
  this.deck = new Deck(); // the Deck we draw cards from
  this.deck.shuffle(); // shuffle the Deck

  this.dealerHand = new Hand(); // the dealer's hand
  this.playerHand = new Hand(); // the player's hand
};

// clone a game so we can reconstitute it from Game object we pull from the session
Game.clone = function (obj) {
  var game = new Game(obj.bet);
  game.deck = Deck.clone(obj.deck);
  game.playerHand = Hand.clone(obj.playerHand);
  game.dealerHand = Hand.clone(obj.dealerHand);
  return game;
};

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
