// NPM
import path from 'path';

// Server URLS
const SERVER_URL = 'http://localhost';
const SERVER_PORT = 1234;

// Project Directory
const PROJECT_DIR = path.resolve('.');

// Project Name
const PROJECT_NAME = 'blackjack';

// SRC Directory
const SRC_DIR = `${PROJECT_DIR}/src`;

// Client Directory
const CLIENT_DIR = `${SRC_DIR}/client`;

// Config Directory
const CONFIG_DIR = `${SRC_DIR}/config`;

// Server Directory
const SERVER_DIR = `${SRC_DIR}/server`;

// Shared Directory
const SHARED_DIR = `${SRC_DIR}/shared`;

// Build Directory
const BUILD_DIR = `${PROJECT_DIR}/build`;

// Fake Secret Key that would normally be an environment variable
const FAKE_SERVER_SECRET_KEY = 'Fake-1234';

export {
  SERVER_PORT,
  SERVER_URL,
  PROJECT_DIR,
  PROJECT_NAME,
  SRC_DIR,
  CLIENT_DIR,
  CONFIG_DIR,
  SERVER_DIR,
  SHARED_DIR,
  BUILD_DIR,
  FAKE_SERVER_SECRET_KEY,
};
