// Webpack Generator
import webpackGenerator from '../../tools/webpack/webpackGenerator';
import { ROOT_DIR } from '../../tools/environment';

import { BUILD_DIR, SERVER_PORT, PROJECT_NAME } from './constants';

// Generate Client Config
const clientConfig = webpackGenerator({
  project: PROJECT_NAME,
  name: 'client',
  optimize: true,
  // revision: true, XXX: Properly add functionality back in for revisions
  // NOTE: We point the public path to the client folder here as webpack's hot module reloading functionality makes use of the publicPath value when it determines where to fetch the hot module patch files from, so we need to set the publicPath to include /client/ since we bundle to that folder respectively. If we didn't include /client/ in the publicPath here we'd get a 404 Error where webpack wouldn't be able to find the patch files, and the hot module replacement would fail.
  // publicPath: `http://localhost:${SERVER_PORT}/client/`,
  entry: {
    client: ['./src/client/index'],
  },
  output: BUILD_DIR,
});

// Generate Server Config
const serverConfig = webpackGenerator({
  project: PROJECT_NAME,
  name: 'server',
  node: true,
  optimize: true,
  entry: {
    server: ['./src/server/index'],
  },
  output: BUILD_DIR,
});

// Generate Tools Config
const toolsConfig = webpackGenerator({
  project: PROJECT_NAME,
  name: 'tools',
  node: true,
  optimize: true,
  entry: {
    // Commands
    serve: [`${ROOT_DIR}/tools/commands/serve`],
    hot: [`${ROOT_DIR}/tools/commands/hot`],

    // Environment
    environment: [`${ROOT_DIR}/tools/environment`],

    // Webpack
    'webpack.config.babel': ['./src/config/webpack.config.babel'],
    'webpack.config.dev': ['./src/config/webpack.config.dev'],
    'webpack.config.prod': ['./src/config/webpack.config.prod'],
    webpackGenerator: [`${ROOT_DIR}/tools/webpack/webpackGenerator`],
  },
  output: BUILD_DIR,
});

const config = [clientConfig, serverConfig, toolsConfig];

export default config;
