// NPM
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Project
import config from 'project/config/webpack.config.babel';

// Initialize webpack config
const router = express.Router();
const compiler = webpack(config);

// Set up webpack dev middleware
router.use(webpackDevMiddleware(compiler, {
  quiet: true,
}));

// Set up webpack hot middleware
router.use(webpackHotMiddleware(compiler.compilers.find((compiler) => {
  return compiler.name === 'client';
}), {
  log: console.log,
}));

export default router;
