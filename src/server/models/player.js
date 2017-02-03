// NPM
import uuid from 'uuid';
import jwt from 'jsonwebtoken';

// Project
import {
  FAKE_SERVER_SECRET_KEY,
  SERVER_URL,
  SERVER_PORT,
} from 'project/config/constants';
import { players } from 'project/server/db';

export default class Player {
  constructor({ playerName }) {
    this.player = this.join({ playerName });
  }
  find({ playerName }) {
    const player = players.findOne({ name: playerName });
    console.log('Find', players.data);

    // NOTE: We could easily extend the this.find logic to account for a player's password to get a *true* account system by storing the user's password sent from the client as an scrypted value in the collection (after having the password sent properly over HTTPS to prevent MITM attacks), and comparing the input password from the client with the encryped password stored in the database.

    // That said, for the sake of brevity for the code sample and to emulate the "walk up and sit down" feel of a casino, we'll just create a JWT token for the player's name instead of their email, etc. and return that token to the client to be used as an authorization header for subsequent API requests.

    // A very obvious exploit that comes about as a result of not using a password based account system for this code sample is that you'll be able to easily log in as another player by simply entering their name. That said, this is a code sample after all, so we have to draw a line somewhere in terms of functionality.
    if (player) return this.createSession(player);
    return null;
  }
  create({ playerName }) {
    // Generate a uuid for the player for insertion into the DB
    const id = uuid.v4();

    players.insert({ id, name: playerName });
    return this.find({ playerName });
  }
  join({ playerName }) {
    // Find a player, if it exists. Otherwise create a new one
    const player = this.find({ playerName });
    if (player) return player;

    // If no player exists, insert a new one into the players collection
    return this.create({ playerName });
  }
  createSession(player) {
    console.log('createSession', player);
    const { id, name } = player;

    // Create a jwt signed token for persisting the session on the client
    const token = jwt.sign(
      { id },
      FAKE_SERVER_SECRET_KEY,
      {
        expiresIn: '24h', // Have the key expire in 24 hours
        audience: `${SERVER_URL}:${SERVER_PORT}/api`,
        issuer: `${SERVER_URL}:${SERVER_PORT}`,
      },
    );

    console.log('token', token);

    // Only return whitelisted player data back to the requester of the server if one exists, otherwise we return nothing.
    return { id, name, token };
  }
}
