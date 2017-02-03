// Libraries
import { log } from 'libraries/utils';

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

    // Ensure the rank is a valid one as defined above
    if (ranks.indexOf(rank) >= 0) {
      this.rank = rank;
    } else {
      log.error('This card has an invalid rank');
    }

    // Ensure the suit is a valid one as defined above
    if (suits.indexOf(suit) >= 0) {
      this.suit = suit;
    } else {
      log.error('This card has an invalid suit');
    }
  }

  toString() {
    return `${this.rank}${this.suit}`;
  }
}
