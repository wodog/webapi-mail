"use strict";

const logger = require("koa-logger");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");

module.exports = function(app, config) {

  if (config.app.env !== "test") {
    app.use(logger());
  }

  app.use(bodyParser());
  app.use(compress());
};
