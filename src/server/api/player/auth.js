// NPM
import express from 'express';

// Libraries
import { log } from 'libraries/utils';

// Models
import Player from 'project/server/models/player';

const router = express.Router();

// Allow for a new player instance to be created, and for a lobby to be joined
export default router.post('/api/player/auth', (req, res) => {
  const { body } = req;

  // Initialize a new player model
  const player = new Player(body);
  const { data } = player;
  // console.log('auth player', data);

  if (data) return res.status(200).json(data);
  return res.status(400).json({ message: 'Error Authorizing Player.' });
});
