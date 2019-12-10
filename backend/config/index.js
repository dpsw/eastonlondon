const compression = require('compression');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const expressValidator = require('express-validator');
const path = require('path');
const express = require('express');
// const db = require('../controllers/db');

exports.initConfig = (app) => {
  /**
     * Express configuration.
     */
  app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
  app.use(compression());
  // app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  app.use(flash());

  app.disable('x-powered-by');

  // ## CORS middleware
  const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  };

  app.use(express.static(path.resolve('./public')));

  if (process.env.NODE_ENV === 'development') {
    app.use(allowCrossDomain);
  }
};
