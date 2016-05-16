'use strict';

const ret = require('../util/ret');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.sendMail = function*() {

    var u = yield User.findOne({ api_key: this.request.body.api_key });
    if (!u) {
        return new ret(0, 'failure', '此用户不存在');
    }


    const transporter = nodemailer.createTransport(`smtps://${encodeURI(config.mail_option.user)}:${config.mail_option.pass}@smtp.163.com`);

    var mailOptions = {
        from: `${config.mail_option.user}`, // sender address
        to: this.request.body.to, // list of receivers
        subject: this.request.body.subject, // Subject line
        text: this.request.body.text, // plaintext body
        html: this.request.body.html // html body
    };

    try {
        var info = yield transporter.sendMail(mailOptions);
    } catch (e) {
        return this.body = new ret(0, 'failure', e);
    }
    this.body = new ret(info);

};
