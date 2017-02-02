// NPM
// import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import nodeExternals from 'webpack-node-externals';
import StatsPlugin from 'stats-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

// Directory Paths
const ROOT_DIR = path.resolve('.');

const getResolveSettings = ({ project }) => {
  return {
    extensions: ['.js', '.jsx'],
    alias: {
      // Tools Directory
      tools: 'tools',

      // Libraries Directory
      libraries: 'libraries',

      // Dynamic Project Directories for Static Imports
      [project]: 'src',

      // Helper alias that allows for referencing the current project directory when within files that are specified in the libraries directory. This allows for us to be empowered in writing more generic helpers that can be used across different project directories.
      project: 'src',
    },
    modules: [
      ROOT_DIR,
      'node_modules',
    ],
  };
}

// Loader Settings
const getRules = ({ optimize = false }) => {
  const rules = [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: [
        ['es2015', { modules: false }],
        'react',
        'stage-1',
        'stage-0',
      ],
      plugins: [
        'transform-runtime',
        'transform-decorators-legacy'
      ],
    },
  }];

  // Strip out all `console` statements if optimize flag is set
  if (optimize) {
    rules.push({
      test: /\.js$/,
      loader: 'strip-loader?strip[]=console.*'
    });
  }

  return rules;
}

// Plugin Settings
const getPlugins = ({
  project = 'starter',
  optimize = false,
  stats = false,
  debug = false,
  hot = false,
}) => {
  const plugins = [];

  // Show Notification when Webpack build is completed
  plugins.push(new WebpackNotifierPlugin());

  // Show Module Names When Hot Module Reloading
  plugins.push(new webpack.NamedModulesPlugin());

  // Add Commons Chunk Plugin for splitting out common code
  /* plugins.push(new CommonsChunkPlugin({
    name: 'Commons',
    children: true,
  }));*/


  // Set global and project specific environment variables
  const vars = {
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      project: JSON.stringify(project),
    },
  };

  if (optimize) {
    // Minify output. (also indirectly triggers CSS minification)
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }));
  }

  // Setting `NODE_ENV` makes sure we get the production friendly version of React by removing unreachable code when we uglify.
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'production') {
    vars['process.env'].NODE_ENV = JSON.stringify('production');
  }

  // Set the evironment vars
  plugins.push(new webpack.DefinePlugin(vars));

  // Generate Stats
  if (stats) {
    plugins.push(new StatsPlugin('stats.json', {
      chunkModules: true,
    }));
  }

  // Handle Hot Module Reloading
  if (hot) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  return plugins;
}

const webpackGenerator = ({
  project = 'starter',         // Name of the project
  name = 'webpack',            // Name of the bundle
  node = false,                // Output bundle ready to run in node
  debug = false,               // Debug mode
  sourceMaps = 'source-map',   // Output source maps
  stats = false,               // Output build stats
  hot = false,                 // Use Hot Module Reloading
  publicPath = '/',            // Public Path for Resources
  entry = [],                  // Entry Point Path Parameters
  optimize = false,            // Optimizes Webpack bundle
  revision = false,            // Revision assets for long term caching
  output = '',                 // Output File Path
} = {}) => {
  const config = {
    name,
    entry,
    bail: true, // XXX: This will be default behaviour in Webpack 2.0
    target: node ? 'node' : 'web',
    output: {
      path: `${output}/${name}`,
      filename: revision ? `[name].[chunkhash].js` : `[name].js`,
      publicPath,
    },
    plugins: getPlugins({ project, optimize, stats, debug, hot }),
    resolve: getResolveSettings({ project }),
    module: {
      rules: getRules({ optimize }),
      // Disable handling of unknown requires
      unknownContextRegExp: /$^/,
      unknownContextCritical: false,

      // Disable handling of requires with a single expression
      exprContextRegExp: /$^/,
      exprContextCritical: false,

      // Warn for every expression in require
      wrappedContextCritical: true,
    },
  };

  // Handle Target Node Configuration
  if (node) {
    // Assign a public path if it's applied
    if (publicPath) { config.output.publicPath = publicPath; }

    // Disable node from overwriting the values when written with webpack
    config.node = {
      __dirname: false,
      __filename: false,
    };

    config.externals = [ nodeExternals({ whitelist: 'webpack/hot/signal' }) ];
  }

  // Handle Source Map Settings
  if (sourceMaps) { config.devtool = sourceMaps; }

  // Handle Hot Module Reloading Settings
  if (hot) {
    // Handle HMR Reloading both client side and server side
    if (node) {
      config.entry[name].unshift('webpack/hot/signal');
    } else {
      config.entry[name].unshift('webpack-hot-middleware/client');
      config.entry[name].unshift('react-hot-loader/patch');
    }
  }

  return config;
};

export { ROOT_DIR, webpackGenerator };
