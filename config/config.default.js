"use strict";
var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env,
  },
};

var specific = {
  development: {
    app: {
      port: 3000,
      name: "Koa React Gulp Mongoose Mocha - Dev",
      keys: [ "super-secret-hurr-durr" ],
    },
    mongo: {
      url: "${your_mongo_url}",
    },
    mail_option: {
      user: '${your_mail_user}',
      pass: '${your_mail_pass}'
    }
  },
  test: {
    app: {
      port: 3001,
      name: "Koa React Gulp Mongoose Mocha - Test realm",
      keys: [ "super-secret-hurr-durr" ],
    },
    mongo: {
      url: "${your_mongo_url}",
    },
  },
  production: {
    app: {
      port: process.env.PORT || 3000,
      name: "Koa React Gulp Mongoose Mocha",
    },
    mongo: {
      url: "${your_mongo_url}ple",
    },
  },
};


module.exports = _.merge(base, specific[env]);
