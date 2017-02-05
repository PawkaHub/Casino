// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';

const router = express.Router();

export default router.post('/api/blackjack/hit', (req, res) => {
  const { body, auth } = req;
  const { playerId } = auth;

  // Initialize/Resume a game of blackjack for this player
  const game = new Blackjack({ playerId });

  // Hit
  const card = game.hit(game.currentGame.playerHand);
  if (!card) {
    return res.status(400).json({ message: 'Deck is empty, no card drawn!' });
  }

  const { output, currentGame } = game;
  console.log('DECK');
  console.log(currentGame.deck.cards);
  console.log('HIT CARD');
  console.log(card);
  console.log('PLAYER HAND');
  console.log(currentGame.playerHand.cards);
  console.log('DEALER HAND');
  console.log(currentGame.dealerHand.cards);
  // console.log('CURRENT GAME');
  // console.log(currentGame);
  // console.log('OUTPUT');
  // console.log(output);

  res.status(200).json({ card });
});
