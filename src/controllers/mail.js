'use strict';

const ret = require('../util/ret');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Template = mongoose.model('Template');
const common = require('../util/common');
const validate = require('../util/validate');
const replaceTemplate = require('../util/replaceTemplate');
const Mail = mongoose.model('Mail');


exports.operation = function*(next) {
    const action = this.query.action;

    // 发送html格式邮件
    if (action === 'send_with_html') {
        const api_key = this.request.body.api_key;
        let to = this.request.body.to;
        if (isArray(to)) to = to.join();
        const subject = this.request.body.subject;
        const html = this.request.body.html;
        validate.validate_params_exist(api_key, to, subject, html);

        const user = yield User.findByAPIKEY(api_key);
        validate.validate_user_exist(user);
        const transporter = getTransporter(user);
        const from = `"${user.name}" <${user.user}>`;
        let result = yield transporter.sendMail({ from, to, subject, html });
        this.body = new ret(result);
        
        // 记录发送邮件日志
        yield createMailLog(subject, to, html, user._id, result.response);
        return;
    }

    // 发送text格式邮件
    else if (action === 'send_with_text') {
        const api_key = this.request.body.api_key;
        let to = this.request.body.to;
        if (isArray(to)) to = to.join();
        const subject = this.request.body.subject;
        const text = this.request.body.text;
        validate.validate_params_exist(api_key, to, subject, text);

        const user = yield User.findByAPIKEY(api_key);
        validate.validate_user_exist(user);
        const transporter = getTransporter(user);
        const from = `"${user.name}" <${user.user}>`;
        let result = yield transporter.sendMail({ from, to, subject, text });
        this.body = new ret(result);

        // 记录发送邮件日志
        yield createMailLog(subject, to, text, user._id, result.response);
        return;
    }

    // 使用模版发送邮件
    else if (action === 'send_with_template') {
        const api_key = this.request.body.api_key;
        let to = this.request.body.to;
        if (isArray(to)) to = to.join();
        const subject = this.request.body.subject;
        const name = this.request.body.name;
        const data = this.request.body.data;
        validate.validate_params_exist(api_key, to, subject, name);

        const user = yield User.findByAPIKEY(api_key);
        validate.validate_user_exist(user);
        let template = yield Template.findTemplate(api_key, name);
        validate.validate_template_exist(template);
        template = replaceTemplate(template.content, data);

        const transporter = getTransporter(user);
        const from = `"${user.name}" <${user.user}>`;
        let result;
        if (template.format === 'html') {
            result = yield transporter.sendMail({ from, to, subject, html: template });
        } else {
            result = yield transporter.sendMail({ from, to, subject, text: template });
        }
        this.body = new ret(result);

        // 记录发送邮件日志
        yield createMailLog(subject, to, template, user._id, result.response);
        return;
    }

    yield next;
};

exports.findMails = function*(next) {
    const api_key = this.query.api_key;

    const user = yield User.findOne({api_key});
    const mails = yield Mail.find({user: user._id});
    this.body = new ret(mails);
};


function* createMailLog(subject, to, content, userId, result) {
    to = to.split(',');
    let a = new Mail({ subject, to, content, userId, result });
    yield a.save();
}



function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function getTransporter(u) {
    const host = u.host;
    const port = u.port;
    const secure = u.secure;
    const user = u.user;
    const pass = u.pass;
    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass }
    });
}
