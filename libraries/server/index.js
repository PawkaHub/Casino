// NPM
import express from 'express';
import bodyParser from 'body-parser';

// Tools
import hot from 'tools/commands/hot';

// Libraries
import { log } from 'libraries/utils';
import ssr from 'libraries/server/ssr';
import template from 'libraries/server/template';

// Project
import api from 'project/server/api';
import { SERVER_URL, SERVER_PORT } from 'project/config/constants';

console.log('SERVER: Initializing');

// Initialize Express
const server = express();

console.log('SERVER: Initialized');

// If we're in development, serve up routes with webpack hot reloading, otherwise just serve the server up statically
if (process.env.NODE_ENV === 'development') {
  // Hot reload client side express middleware functionality
  server.use(hot);
  console.log('SERVER: HMR Enabled');
}

console.log('SERVER: Routes Loaded');

// Prevent favicon server fetching
server.get('/favicon.ico', (req, res) => {
  res.statusCode = 404;
  res.end();
});

console.log('SERVER: Favicon Loaded');

// Basic Health Check for handling GCE health check requests
server.get('/_health', (req, res) => {
  res.status(200).send('ok');
});

console.log('SERVER: Health Check Initialized');

// Accept UTF-8 Encoding/GZIP
server.use(bodyParser.urlencoded({ extended: true }));

// Automatically parse JSON bodies
server.use(bodyParser.json());

// Include Server Routes as a middleware that is reloaded on module changes
server.use((req, res, next) => {
  // const api = await import('project/server/api').catch(log.error);
  // const api = require('project/server/api').default;
  api(req, res, next);
});

console.log('SERVER: Routes Loaded');

// Any other requests get passed to the client app's server rendering
server.get('*', (req, res, next) => {
  // const ssr = await import('libraries/server/ssr').catch(log.error);
  // const ssr = require('libraries/server/ssr').default;
  ssr(req, res, next);
});

console.log('SERVER: SSR Initialized');

// Initialize Server
const instance = server.listen(SERVER_PORT, () => {
  console.log(`SERVER: Listening at ${SERVER_URL}:${SERVER_PORT}`);
});

// Reload the server every time a file is changed with HMR
if (module.hot) {
  module.hot.accept((updated) => {
    console.log('Updated', updated);
  });

  module.hot.status((status) => {
    console.log('status', status);
    if (status === 'apply') {
      console.log('Hot Reloading Server...');
      // const nextApi = await import('project/server/api').catch(log.error);
      // const nextSSR = await import('libraries/server/ssr').catch(log.error);
    }
  });

  module.hot.dispose((data) => {
    console.log('SERVER: Closing');
    // delete require.cache[require.resolve('project/server/api')];
    // delete require.cache[require.resolve('libraries/server/ssr')];
    instance.close();
  });
}
