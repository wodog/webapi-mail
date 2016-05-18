'use strict';

const ret = require('../util/ret');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const common = require('../util/common');

exports.sendMail = function*() {

    var u = yield User.findOne({ api_key: this.request.body.api_key });
    if (!u) {
        return new ret(0, 'failure', '此用户不存在');
    }


    const transporter = nodemailer.createTransport({
        host: u.host,
        port: u.port,
        secure: u.secure,
        auth: {
            user: u.user,
            pass: common.decipher(u.pass)
        }
    });

    var mailOptions = {
        from: `"${u.name}" <${u.user}>`, // sender address
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
