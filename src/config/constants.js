// NPM
import path from 'path';

// Server URLS
export const SERVER_URL = 'http://localhost';
export const SERVER_PORT = 1234;

// Project Directory
export const PROJECT_DIR = path.resolve('.');

// Project Name
export const PROJECT_NAME = 'blackjack';

// SRC Directory
export const SRC_DIR = `${PROJECT_DIR}/src`;

// Client Directory
export const CLIENT_DIR = `${SRC_DIR}/client`;

// Config Directory
export const CONFIG_DIR = `${SRC_DIR}/config`;

// Server Directory
export const SERVER_DIR = `${SRC_DIR}/server`;

// Shared Directory
export const SHARED_DIR = `${SRC_DIR}/shared`;

// Build Directory
export const BUILD_DIR = `${PROJECT_DIR}/build`;

// Fake Secret Key that would normally be an environment variable
export const FAKE_SERVER_SECRET_KEY = 'Fake-1234';
