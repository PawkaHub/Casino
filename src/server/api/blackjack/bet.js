// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';
import Hand from 'project/server/models/hand';

const router = express.Router();

export default router.post('/api/blackjack/bet', (req, res) => {
  const { body, auth } = req;
  const { playerBetAmount } = body;
  const { playerId } = auth;

  const game = new Blackjack({ playerId, playerBetAmount });
  const { output } = game;
  console.log('Api Bet Post Body', output);

  // If a current game already exists, return it accordingly. Otherwise error
  if (output) return res.status(200).json(output);
  return res.status(400).json({
    message: 'You cannot start a new game of Blackjack when one is already in progress.',
  });
});
