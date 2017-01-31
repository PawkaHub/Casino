// NPM
import express from 'express';

// Libraries
import template from 'libraries/server/template';

// Project
import { SERVER_URL, SERVER_PORT } from 'project/config/constants';

// Handle Reloading Server between hot module reloads
let instance;
if (module.hot.data) { instance = module.hot.data.instance; }

console.log('SERVER: Called');

if (instance) {
  console.log('SERVER: Closing');
  instance.close();
}

console.log('SERVER: Initializing');

// Initialize Express
const server = express();

console.log('SERVER: Initialized');

// If we're in development, serve up routes with webpack hot reloading, otherwise just serve the server up statically
if (process.env.NODE_ENV === 'development') {
  // Hot reload client side express middleware functionality
  const hot = require('tools/commands/hot').default;
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

// Include Server Routes as a middleware that is reloaded on module changes
server.use(async (req, res, next) => {
  const routes = await System.import('project/server/routes');
  routes.default(req, res, next);
});

console.log('SERVER: Routes Loaded');

// Any other requests get passed to the client app's server rendering
server.get('*', async (req, res, next) => {
  const ssr = await System.import('libraries/server/ssr');
  ssr.default(req, res, next);
});

console.log('SERVER: SSR Initialized');

// Initialize Server
instance = server.listen(SERVER_PORT, () => {
  console.log(`SERVER: Listening at ${SERVER_URL}:${SERVER_PORT}`);
});

if (module.hot) {
  module.hot.accept((updated) => {
    console.log('Hot Reloading Server...', updated);
  });

  module.hot.dispose((data) => {
    data.instance = instance;
  });
}
