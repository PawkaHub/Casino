// NPM
import { observable, action, computed, asMap } from 'mobx';

// Models
import Card from 'project/server/models/card';

// Standard 52 Card Deck
export default class Deck {
  // Populate a deck with 52 cards when an instance of this class is created
  constructor() {
    const { suits, ranks } = Card;

    // Generate a new card for this rank and suit and push it to the deck
    this.cards = suits.reduce((memo, suit) => {
      ranks.forEach((rank) => memo.push(new Card(rank, suit)));
      return memo;
    }, []);

    console.log('Deck', this.cards);
  }

  // Draw a card off the top of the deck
  draw() {
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

  /* //produces a clone of the Deck as unfortunately when we pull a Deck object from the
  // session, the data is all there but the methods don't work.
  Deck.clone = function (obj) {
    var deck = new Deck();
    deck.cards = [obj.cards.length];
    for (var i = 0; i < obj.cards.length; i++) {
      deck.cards[i] = Card.clone(obj.cards[i]);
    }
    return deck;
  };*/
}
