// NPM
import { observable, action, computed, asMap } from 'mobx';

// Models
import Card from 'project/server/models/card';

export default class Hand {
  constructor() {
    console.log('Hand');
  }
}

/*
 Hand
 *
 * A hand of blackjack consisting of multiple cards
 *
 * With regards to scoring, K, Q, J all count as 10. A can be 1 or 10 depending of what will
 * the score closest to 21 without busting. Card suits don't matter.
var Hand = function() {
  this.cards = [];
};
Hand.prototype.constructor = Hand;

Hand.BLACKJACK = 21;

// Any score 22 or over is a bust
Hand.BUSTO = Hand.BLACKJACK + 1;

// Dealer stands on 17
Hand.DEALER_STAND = 17;

// A hit adds a card to the hand
Hand.prototype.hit = function(card) {
  if (card instanceof Card) {
    this.cards.push(card);
  } else {
    throw new Error("Can only hit with a card");
  }
};

// Adds up the values of the cards in the hand. Takes into account that A can be 1 or 11
Hand.prototype.score = function() {
  var score = 0;
  var aceCount = 0;

  this.cards.forEach (function (card) {
    if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
      score = score + 10;
    } else if (card.rank === 'A') {
      score = score + 11;
      aceCount++;
    } else {
      score = score + parseInt(card.rank);
    }
  });

  while (score >= Hand.BUSTO && aceCount > 0) {
    score = score - 10;
    aceCount--;
  }

  return score;
};

// Determines if the hand has gone over 21
// @returns {Boolean}
Hand.prototype.isBusto = function() {
  return this.score() >= Hand.BUSTO;
};

// Blackjack beats any hand that is not a blackjack, even 21
Hand.prototype.isBlackjack = function() {
  return this.score() === Hand.BLACKJACK && this.cards.length === 2;
};

// Outputs readable cards for the hand
Hand.prototype.toString = function() {
  var string = "";
  this.cards.forEach(function (card) {
    string = string + " " + card.toString();
  });
  return string;
};

// Clone
Hand.clone = function(obj) {
  var hand = new Hand();
  hand.cards = [obj.cards.length];
  for (var i = 0; i < obj.cards.length; i++) {
    hand.cards[i] = Card.clone(obj.cards[i]);
  }
  return hand;
};*/
