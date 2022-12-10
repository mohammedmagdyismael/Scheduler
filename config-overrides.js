const path = require('path');

module.exports = function override(config) {
  const configCopy = config;
  configCopy.resolve = Object.assign({}, config.resolve, {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    alias: {
      app: path.resolve(__dirname, 'src', 'app'),
      views: path.resolve(__dirname, 'src', 'views'),
    },
  });

  return config;
};
