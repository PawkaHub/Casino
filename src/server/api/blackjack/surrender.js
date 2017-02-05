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

  const { output, currentGame } = game;
  console.log('DECK');
  console.log(currentGame.deck.cards);
  console.log('PLAYER HAND');
  console.log(currentGame.playerHand.cards);
  console.log('DEALER HAND');
  console.log(currentGame.dealerHand.cards);
  // console.log('CURRENT GAME');
  // console.log(currentGame);
  // console.log('OUTPUT');
  // console.log(output);

  res.status(200).json({
    hello: 'Api Surrender Result!',
  });
});
