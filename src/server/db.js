// NPM
import loki from 'lokijs';

// In a real world scenario this DB would have schema and validation enforced on it, but for the sake of a code sample we'll just allow for the entry of almost any value and worry about locking down the database at a later time
const DB = new loki('./db.json');

// Initialize Database with basic seed data
const players = DB.addCollection('players');

// Default Game Modes
const games = DB.addCollection('games');

export {
  DB,
  players,
  games,
};
