"use strict";

const router = require("koa-router")();
const userController = require('../src/controllers/user');
const mailController = require('../src/controllers/mail');
const templateController = require('../src/controllers/template');

module.exports = function(app) {
    router.use(function*(next) {
        this.type = "json";
        yield next;
    });

    // 用户模块
    router.get('/users/:api_key', userController.findUser);
    router.post('/users', userController.operation);

    // 模版模块
    router.get('/templates', templateController.findTemplates);
    router.get('/templates/:name', templateController.findTemplate);
    router.post('/templates', templateController.operation);

    /**
     * 发送邮件
     */
    router.post('/mail', mailController.operation);

    app.use(router.routes());
    app.use(function*() {
        throw new Error('无效的url, 请仔细检查');
    });
};
