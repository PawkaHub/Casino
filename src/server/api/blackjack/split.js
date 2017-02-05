// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';

const router = express.Router();

export default router.post('/api/blackjack/split', (req, res) => {
  const { body, auth } = req;
  const { playerId } = auth;

  // Initialize/Resume a game of blackjack for this player
  const game = new Blackjack({ playerId });

  // Split
  game.split();

  const { data } = game;
  console.log('DECK');
  console.log(game.deck.cards);
  console.log('PLAYER HAND');
  console.log(game.playerHand.cards);
  console.log('DEALER HAND');
  console.log(game.dealerHand.cards);
  console.log('CURRENT GAME');
  console.log(game.currentGame);
  console.log('DATA');
  console.log(data);

  res.status(200).json({
    hello: 'Api Split Result!',
  });
});
