// NPM
import express from 'express';
import jwt from 'jsonwebtoken';

// Libraries
import { log } from 'libraries/utils';

// Models
import Player from 'project/server/models/player';

const router = express.Router();

// Allow for a new player instance to be created, and for a lobby to be joined
export default router.post('/api/player/reauth', (req, res) => {
  const auth = req.get('authorization');
  if (auth && auth.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    // If no token has been provided to the reauth endpoint, we just shrug if off and carry on as it doesn't really matter to the server in this instance as it doesn't need to keep track of anything, and it's clear that there's no user token on the client, so we can just proceed as normal without having to rely on the client properly implementing checks for whether the token actually exists on it's end or not, and can just call the rejoin endpoint directly on startup.
    if (token === 'null') {
      return res.status(200).json({ message: 'No Token Provided' });
    };
    // console.log('reauth token', token);
    const player = new Player({ token });
    const { data } = player;
    // console.log('reauth player', data);
    if (data) return res.status(200).json(data);
    return res.status(400).json({ message: 'Reauthorization Error' });
  }
  return res.status(401).json({ message: 'Invalid Session Token' });
});
