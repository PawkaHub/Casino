// NPM
import uuid from 'uuid';
import scrypt from 'scrypt';
import jwt from 'jsonwebtoken';

// Project
import {
  FAKE_SERVER_SECRET_KEY,
  SERVER_URL,
  SERVER_PORT,
} from 'project/config/constants';
import Base from 'project/server/models/base';
import Blackjack from 'project/server/models/games/blackjack';

// Encryption Settings
const salt = new Buffer('NaCL');
const settings = { N: 1024, r: 8, p: 16 };

export default class Player extends Base {

  constructor({
    token,
    playerName,
    playerEmail,
    playerPassword,
  }) {
    // Connect to DB adapter for players collection
    super({ collection: 'players' });

    // Determine search method for finding player based on params passed into the Player constructor, this allows for simple player creation by simply instantiating the model with the right params passed into the constructor
    if (token) {
      const player = this.reauth({ token });
      console.log('Reauth by Token', player);
    } else if (playerName && playerEmail && playerPassword) {
      // Authenticate the user normally if an email and password were provided
      const player = this.auth({ playerName, playerEmail, playerPassword });
    } else {
      console.warn('Invalid properties passed to player constructor');
    }
  }

  findById({ playerId }) {
    const player = this.findOne({ playerId });
    console.log('findById', playerId, player);
    if (player) return player;
    return null;
  }

  findByEmail({ playerEmail }) {
    const player = this.findOne({ playerEmail });
    console.log('findByEmail', playerEmail, player);
    if (player) return player;
    return null;
  }

  create({ playerName, playerEmail, playerPassword }) {
    // Generate a uuid for the player for insertion into the DB
    const playerId = uuid.v4();

    const encrypted = this.encryptPassword({ playerPassword });
    // Encrypt the user's password for storage in the DB
    console.log('create', playerId, playerName, playerEmail, playerPassword, encrypted);

    // Insert the data into the DB
    const player = this.insertData({
      playerId,
      playerName,
      playerEmail,
      playerPassword: encrypted,
    });

    // Create a session for this player
    return this.createSession(player);
  }

  auth({ playerName, playerEmail, playerPassword }) {
    const player = this.findByEmail({ playerEmail });

    // If a player for this email exists, attempt to log the player in
    if (player) {
      const { playerPassword: storedPassword } = player;
      const matches = this.verifyPassword({ playerPassword, storedPassword });

      // If password matches, go ahead and create a session for this user
      if (matches) {
        console.log('matches, createSession', matches);
        return this.createSession(player);
      }
      console.warn('Incorrect Password');
      return null;
    }

    // If no player exists, insert a new one into the players collection
    return this.create({ playerName, playerEmail, playerPassword });
  }

  reauth({ token }) {
    try {
      const decoded = this.verifyToken(token);
      console.log('decoded', decoded);

      // Get the email from the decoded JWT token and fetch player by that (in a real world situation we would search by email instead of name to avoid same name collisions, but for the sake of a code sample searching by name will suffice just fine for a basic user account system)
      const { playerId } = decoded;
      const player = this.findById({ playerId });
      return this.createSession(player);
    } catch (err) {
      throw err;
    }
  }

  encryptPassword({ playerPassword }) {
    const hashedPassword = scrypt.hashSync(playerPassword, settings, 64, salt);
    const encrypted = hashedPassword.toString('hex');
    return encrypted;
  }

  verifyPassword({ playerPassword, storedPassword }) {
    const hashedPassword = scrypt.hashSync(playerPassword, settings, 64, salt);
    const encrypted = hashedPassword.toString('hex');

    console.log('compare', encrypted, storedPassword);

    // If the encrypted password matches the stored password, then we know that the password is valid and we can successfully login the user.
    if (encrypted === storedPassword) return true;
    return false;
  }

  createSession(player) {
    console.log('createSession', player);
    const { playerId, playerEmail, playerName } = player;

    // Create a jwt signed token for persisting the session on the client
    const token = this.createToken(player);
    console.log('token', token);

    // Only return whitelisted player data back to the client
    const payload = {
      token,
      user: { playerId, playerEmail, playerName },
    };

    // Retrieve the latest game of blackjack that's being played by the player and return it as part of the user payload, if there is any game at all.
    const { blackjack } = new Blackjack({ playerId });
    if (blackjack) { payload.blackjack = blackjack }

    console.log('payload', payload);
    // Here is where we finally set the player's instance data for the class, as fetched from the database.
    this.player = payload;
    return this.player;
  }

  createToken(player) {
    // Pick some values from the player for adding to the token payload
    const { playerId } = player;
    const token = jwt.sign(
      { playerId },
      FAKE_SERVER_SECRET_KEY,
      {
        expiresIn: '24h', // Have the key expire in 24 hours
        audience: `${SERVER_URL}:${SERVER_PORT}/api`,
        issuer: `${SERVER_URL}:${SERVER_PORT}`,
      },
    );
    return token;
  }

  verifyToken(token) {
    try {
      // Decode the JWT token and verify that it's valid
      const decoded = jwt.verify(
        token,
        FAKE_SERVER_SECRET_KEY,
        {
          audience: `${SERVER_URL}:${SERVER_PORT}/api`,
          issuer: `${SERVER_URL}:${SERVER_PORT}`,
        },
      );

      console.log('decoded', decoded);
      return decoded;
    } catch (err) {
      throw err;
    }
  }
}
