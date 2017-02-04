// Models
import Base from 'project/server/models/base';
import Card from 'project/server/models/card';

// A hand of filled with multiple cards.
export default class Hand extends Base {
  constructor() {
    super();
    this.cards = [];
  }

  add(card) {
    // Add cards to a hand
    if (card instanceof Card) return this.cards.push(card);
    return console.error('Can only add a card to a hand');
  }

  toString() {
    // Outputs what the readable cards for a hand are
    return this.cards.reduce((memo, card) => {
      let string = memo;
      string = `${string} ${card.toString()}`;
      return string;
    }, '');
  }
}
