// NPM
import express from 'express';

// Project
import template from 'project/server/template';
import { SERVER_URL, SERVER_PORT } from 'project/config/constants';

let instance;
const startServer = () => {
  try {
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
      const errorhandler = require('errorhandler');
      errorhandler.title = '¯\\_(ツ)_/¯';
      server.use(errorhandler());

      // Hot reload client side express middleware functionality
      const hot = require('tools/commands/hot').default;
      server.use(hot);

      console.log('SERVER: HMR Enabled');
    }

    console.log('SERVER: Routes Loaded');

    // Prevent favicon server fetching?
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

    // Any other requests get passed to the client app's server rendering
    server.get('*', (req, res, next) => {
      const ssr = require('libraries/server/ssr').default;
      ssr(req, res, next);
    });

    console.log('SERVER: SSR Initialized');

    // Initialize Server
    instance = server.listen(SERVER_PORT, () => {
      console.log(`SERVER: Listening at ${SERVER_URL}:${SERVER_PORT}`);
    });

    return instance;
  } catch (e) {
    throw e;
  }
}

export default startServer;

// Handle Server Hot Reloading
if (module.hot) {
  // Handle Hot Module Reloading within the ssr function so that any changes that are made to the client-side views are reflected on the server as well, because otherwise the server and the client will try to serve up different versions of the same file, causing a react checksum mismatch; which undoes the benefits of server-side rendering to begin with.
  module.hot.accept([
    'libraries/server/ssr',
    'project/server',
  ], (updated) => {
    console.log('Hot Reloading Server...', updated);
    // startServer();
  });
}
