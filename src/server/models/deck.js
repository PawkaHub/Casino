// Models
import Base from 'project/server/models/base';
import Card from 'project/server/models/card';

// Standard 52 Card Deck
export default class Deck extends Base {

  constructor(cards) {
    super();
    // If an array of cards is passed into the constructor, initialize the deck with these cards instead of the usual default deck of 52 cards
    this.cards = this.populateDeck(cards);
    // console.log('Deck Initialized', this.cards);
  }

  // Allows for default population of a standard deck of 52 cards
  populateDeck(cards) {
    // Hydrate cards if it's been passed in
    if (cards) return this.hydrateDeck(cards);

    // Generate a new card for this rank and suit and push it to the deck
    const { suits, ranks } = Card;
    return suits.reduce((memo, suit) => {
      ranks.forEach((rank) => memo.push(new Card(rank, suit)));
      return memo;
    }, []);
  }

  // Hydrates a deck with prepopulated set of cards (in a non destructive way) so that we can have our data get automatically synced back to the database since we didn't destroy the original reference by creating a new array, thanks javascript!
  hydrateDeck(cards) {
    cards.forEach((card, index) => {
      const { rank, suit } = card;
      cards[index] = new Card(rank, suit);
    });
    return cards;
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
}
