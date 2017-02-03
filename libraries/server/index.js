// NPM
import express from 'express';
import bodyParser from 'body-parser';

// Tools
import hot from 'tools/commands/hot';

// Libraries
import template from 'libraries/server/template';

// Project
import { SERVER_URL, SERVER_PORT } from 'project/config/constants';

console.log('SERVER: Initializing', module.id);

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
  const api = require('project/server').default;
  api(req, res, next);
});

console.log('SERVER: Routes Loaded');

// Any other requests get passed to the client app's server rendering
server.get('*', (req, res, next) => {
  const ssr = require('libraries/server/ssr').default;
  ssr(req, res, next);
});

console.log('SERVER: SSR Initialized');

// Initialize Server
const instance = server.listen(SERVER_PORT, () => {
  console.log(`SERVER!: Listening at ${SERVER_URL}:${SERVER_PORT}`);
});

// Reload the server every time a file is changed with HMR
if (module.hot) {
  // Handle Hot Module Reloading within the ssr function so that any changes that are made to the client-side views are reflected on the server as well, because otherwise the server and the client will try to serve up different versions of the same file, causing a react checksum mismatch; which undoes the benefits of server-side rendering to begin with.
  module.hot.accept([
    'libraries/server/ssr',
    'project/server',
  ], (updated) => {
    console.log('Hot Reloading Server...', updated);
  });

  module.hot.status((status) => {
    console.log('Hot Reload Status', status);
  });

  module.hot.dispose((data) => {
    console.log('SERVER: Closing');
    instance.close();
  });
}
