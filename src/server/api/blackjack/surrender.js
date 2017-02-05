// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';

const router = express.Router();

export default router.post('/api/blackjack/surrender', (req, res) => {
  const { body, auth } = req;
  const { playerId } = auth;

  // Initialize/Resume a game of blackjack for this player
  const game = new Blackjack({ playerId });

  // Surrender
  game.surrender();

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
    hello: 'Api Surrender Result!',
  });
});
