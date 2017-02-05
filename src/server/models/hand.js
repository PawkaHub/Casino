// Models
import Base from 'project/server/models/base';
import Card from 'project/server/models/card';

// A hand of filled with multiple cards.
export default class Hand extends Base {
  constructor(cards = []) {
    super();
    // If an array of cards is passed into the constructor, create the hand with these cards instead of the usual default of an empty deck of cards
    this.cards = this.populateHand(cards);
  }

  // Allows for default population of a empty hand
  populateHand(cards) {
    // Hydrate cards if it's been passed in
    if (cards) return this.hydrateHand(cards);
    return [];
  }

  // Hydrates a hand with prepopulated set of cards (in a non destructive way) so that we can have our data get automatically synced back to the database since we didn't destroy the original reference by creating a new array, thanks javascript!
  hydrateHand(cards) {
    cards.forEach((card, index) => {
      const { rank, suit } = card;
      cards[index] = new Card(rank, suit);
    });
    return cards;
  }

  add(card) {
    // Add cards to a hand
    if (card instanceof Card) {
      this.cards.push(card);
      return this.cards;
    }
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
