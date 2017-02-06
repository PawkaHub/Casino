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

  // Get Current Game State
  const state = game.getState();

  // If a current game already exists, return it accordingly. Otherwise error
  if (state) return res.status(200).json(state);
  return res.status(400).json({
    message: 'You cannot start a new game of Blackjack when one is already in progress.',
  });
});
