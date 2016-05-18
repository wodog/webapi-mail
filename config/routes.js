"use strict";

const Router = require("koa-router");
const userController = require('../src/controllers/user');
const mailController = require('../src/controllers/mail');

module.exports = function(app) {
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
  router.post('/add', userController.createUser);

  /**
   * 更新用户
   */
  router.post('/update', userController.updateUser);

  /**
   * 查看用户
   */
  router.post('/view', userController.viewUser);

  /**
   * 删除用户
   */
  router.post('/remove', userController.removeUser);


  /**
   * 发送邮件
   */
  router.post('/send', mailController.sendMail);



  app.use(router.routes());
};
