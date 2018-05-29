const path = require('path');

module.exports = {
  /**
   * Auth
   */
  url: process.env.DATABASE_URL,

  /**
   * Models
   */
  modelsPath: path.resolve('app', 'models'),
};
