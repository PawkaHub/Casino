// Webpack Configs
import devConfig from './webpack.config.dev';
import prodConfig from './webpack.config.prod';

// We only use the production config if we're actually deployed in production. Otherwise, we use the development webpack config by default
let config = devConfig;
// console.log('USING DEV CONFIG');

if (process.env.NODE_ENV === 'production') {
  // console.log('USING PRODUCTION CONFIG');
  config = prodConfig;
}

export default config;
