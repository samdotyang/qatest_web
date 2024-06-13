const path = require('path');

module.exports = function override(config) {
 config.resolve = {
  ...config.resolve, //remove if not needed
  alias: {
   ...config.alias, //remove if not needed
   '@': path.resolve(__dirname, 'src'),
   '@components': path.resolve(__dirname, 'src', 'components'),
   '@contexts': path.resolve(__dirname, 'src', 'contexts'),
  }
 }
 return config;
}
