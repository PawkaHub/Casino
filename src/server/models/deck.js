// NPM
import { observable, action, computed, asMap } from 'mobx';

// Card
import Card from 'project/server/models/card';

// Standard 52 Card Deck
export default class Deck {
  constructor() {
    const { suits, ranks } = Card;
    this.cards = suits.reduce((memo, suit) => {
      const result = memo;
      ranks.forEach((rank) => {
        // Generate a new card for this rank and suit and push it to the deck
        const card = new Card(rank, suit);
        result.push(card);
      });
      return result;
    }, []);
    console.log('Deck', this.cards);
  }

  // Draw a card off the top of the deck
  draw() {
    console.log('draw');
    return this.cards.pop();
  }

  // Knuth-Fisher-Yates as described by https://blog.codinghorror.com/the-danger-of-naivete/
  shuffle() {
    const { cards } = this;
    let currentIndex = cards.length;
    let currentCard;
    let randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining card
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current card.
      currentCard = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = currentCard;
    }

    console.log('shuffle', this.cards);
    return this.cards;
  }
}
