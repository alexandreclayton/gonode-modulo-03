const Raven = require('raven');
const sentryConfig = require('../../config/sentry');

Raven.disableConsoleAlerts();

const ravenClient = Raven.config(sentryConfig.DSN).install();

module.exports = ravenClient;
