"use strict";
const Router = require("koa-router");

// const indexController = require("../src/controllers/index");
const userController = require('../src/controllers/user');
const mailController = require('../src/controllers/mail');

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function(app, passport) {
  // register functions
  var router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  // router.get("/", indexController.index);

  /**
   * 新建用户，
   */
  router.put('/user/:name', userController.createUser);

  /**
   * 发送邮件
   */
  router.post('/mail/send', mailController.sendMail);


  app.use(router.routes());
};
