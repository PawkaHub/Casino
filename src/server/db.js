// NPM
import loki from 'lokijs';

const DB = new loki('./db.json');

// Initialize Database with basic seed data
const players = DB.addCollection('players');

// Default Game Modes
const games = DB.addCollection('games');
games.insert({ name: 'Blackjack' });

export {
  DB,
  players,
  games,
};
