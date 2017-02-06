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

  // Get Current Game State
  const state = game.getState();

  // Return updated state to the client (an obvious optimization that could be done here would be to only return the actually updated state values to the client, and have the client handle those values appropriately; but for now we'll just return the entire white-listed state values as is.)
  return res.status(200).json(state);
});
