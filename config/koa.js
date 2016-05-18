"use strict";
const path = require("path");
const _ = require('lodash');
const serve = require("koa-static-cache");
const session = require("koa-generic-session");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const hbs = require('koa-hbs');

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

module.exports = function(app, config) {
  if (!config.app.keys) { throw new Error("Please add session secret key in the config file!"); }
  app.keys = config.app.keys;

  if (config.app.env !== "test") {
    app.use(logger());
  }

  app.use(errorHandler());

  if (config.app.env === "production") {
    app.use(serve(path.join(config.app.root, "build", "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
  } else {
    app.use(require("koa-proxy")({
      host: "http://localhost:2992",
      match: /^\/_assets\//,
    }));
  }


  app.use(bodyParser());

  function hbsOptions(){
    var ret = {
      viewPath: config.app.root + '/src/views',
      extname: '.html',
      layoutsPath: config.app.root + '/src/views/layout',
      defaultLayout: 'default',
    }
    if(config.app.env !== 'production'){
      ret.disableCache = true;
    }
    return ret;
  }

  app.use(hbs.middleware(hbsOptions()));

  app.use(compress());
  app.use(responseTime());
};
