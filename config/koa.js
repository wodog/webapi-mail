"use strict";

const logger = require("koa-logger");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const errorHandler = require('../src/middlewares/errorHandler');
const cors = require('koa-cors');


module.exports = function(app, config) {
  if (config.app.env !== "test") {
    app.use(logger());
  }
  app.use(cors());
  app.use(bodyParser());
  app.use(compress());
  app.use(errorHandler());
};
