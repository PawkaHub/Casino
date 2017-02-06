// Libraries
import { log } from 'libraries/utils';

// Models
import Base from 'project/server/models/base';

// Standard Card Model
export default class Card extends Base {
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
    super();
    const { ranks, suits } = Card;

    // Ensure the rank is a valid one as defined above
    if (ranks.indexOf(rank) >= 0) {
      this.rank = rank;
    } else {
      this.rank = 'hidden';
    }

    // Ensure the suit is a valid one as defined above
    if (suits.indexOf(suit) >= 0) {
      this.suit = suit;
    } else {
      this.suit = 'hidden';
    }
  }

  toString() {
    return `${this.rank}${this.suit}`;
  }

  // Card Face Helpers
  isAce() {
    return this.rank === 'a';
  }

  isJack() {
    return this.rank === 'j';
  }

  isQueen() {
    return this.rank === 'q';
  }

  isKing() {
    return this.rank === 'k';
  }

  // Card Suit Helpers
  isClubs() {
    return this.suit === 'c';
  }

  isDiamonds() {
    return this.suit === 'd';
  }

  isHearts() {
    return this.suit === 'h';
  }

  isSpades() {
    return this.suit === 's';
  }
}
