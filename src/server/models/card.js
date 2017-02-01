// NPM
import { observable, action, computed, asMap } from 'mobx';

// Standard Card Model
export default class Card {
  static suits = [
    'c', // Clubs
    'd', // Diamonds
    'h', // Hearts
    's', // Spades
  ]

  static ranks = [
    'a',  // Ace
    '2',  // 2
    '3',  // 3
    '4',  // 4
    '5',  // 5
    '6',  // 6
    '7',  // 7
    '8',  // 8
    '9',  // 9
    '10', // 10
    'j',  // Jack
    'q',  // Queen
    'k',  // King
  ]

  constructor(rank, suit) {
    const { ranks, suits } = Card;
    if (ranks.indexOf(rank) === -1) {
      console.error('This card has an invalid rank');
    }

    if (suits.indexOf(suit) === -1) {
      console.error('This card has an invalid suit');
    }
    console.log('Card', Card.suits, Card.ranks, rank, suit);
  }
}
