// NPM
import path from 'path';
import childProcess from 'child_process';
import webpack from 'webpack';

// Transpiled Webpack
import webpackConfiguration from 'project/config/webpack.config.babel';

// Webpack Compiler and Chunk Name
const compiler = webpack(webpackConfiguration);

// Find Stats from Webpack Config by Name
const findStats = (multiStats, name) => {
  return multiStats.stats.find((stats) => {
    return stats.compilation.name === name;
  });
}

// Get Filename from ServerStats file
const getFilename = (serverStats, chunkName) => {
  const outputPath = serverStats.compilation.compiler.outputPath;
  const assetsByChunkName = serverStats.toJson().assetsByChunkName;
  let filename = assetsByChunkName[chunkName] || '';

  // If source maps are generated `assetsByChunkName.main` will be an array of filenames.
  return path.join(
    outputPath,
    Array.isArray(filename) ?
    filename.find(asset => /\.js$/.test(asset)) : filename
  );
}

const updateChildProcess = (multiStats, name) => {
  const stats = findStats(multiStats, name);
  if (stats.hasErrors()) {
    return console.log(stats.compilation.errors.join('\n'));
  }

  // If the process isn't already running for this chunk, fork a new child process and run the associated script with it
  if (!subProcess[name]) {
    const path = getFilename(stats, name);
    if (!path) { throw `${name} Chunk has no assets`; }
    subProcess[name] = childProcess.fork(path);
  } else {
    // TODO: Validate that webpack is in idle mode before sending - signal does not actually kill the process - `hot/signal` reloads on receiving SIGUSR2 signals
    console.log('SIGUSR2');
    subProcess[name].kill('SIGUSR2');
  }
}

const subProcess = {};
compiler.plugin('done', (multiStats) => {
  // Handle Server Hot Module Reloading
  updateChildProcess(multiStats, 'server');
});

// Watch all changes to Webpack
compiler.watch({}, (error, stats) => {
  if (error) { throw error; }
});
