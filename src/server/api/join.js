// NPM
import express from 'express';

// Libraries
import { log } from 'libraries/utils';

// Models
import Player from 'project/server/models/player';

const router = express.Router();

// Allow for a new player instance to be created, and for a lobby to be joined
export default router.post('/api/join', (req, res) => {
  const { body } = req;
  const { playerName } = body;

  console.log('join', playerName);

  const player = new Player({ playerName });

  if (player) { return res.status(200).json(player); }
  return res.status(400).json({ message: 'Error Joining Lobby.' });
});
