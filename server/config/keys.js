//hide key when we're on production mode
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
