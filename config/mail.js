const path = require('path');

module.exports = {
  /**
   * Auth
   */
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,

  /**
   * Templates
   */
  templatesPath: path.resolve('./resources/mail'),
};
