require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const Raven = require('./app/services/sentry');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const dbConfig = require('./config/database');

// Database
mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

// Request error handler
app.use(Raven.requestHandler());

app.use(bodyParser.json());

app.use('/api', require('./app/routes'));

// Fatal error handler
app.use(Raven.errorHandler());

app.listen(3000);
