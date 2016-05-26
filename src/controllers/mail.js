'use strict';

const ret = require('../util/ret');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const common = require('../util/common');
const validate = require('../util/validate');


exports.sendMail = function*() {
    try {
        const api_key = this.request.body.api_key;
        var to;
        if (typeof to === 'string') {
            to = this.request.body.to;
        } else {
            to = this.request.body.to.join();
        }
        const subject = this.request.body.subject;
        const html = this.request.body.html;
        validate.validate_param_exist(api_key, to, subject, html);

        var u = yield User.findByAPIKEY(api_key);
        validate.validate_user_exist(u);

        const transporter = nodemailer.createTransport({
            host: u.host,
            port: u.port,
            secure: u.secure,
            auth: {
                user: u.user,
                pass: u.pass
            }
        });

        var mailOptions = {
            from: `"${u.name}" <${u.user}>`, 
            to: this.request.body.to, 
            subject: this.request.body.subject, 
            html: this.request.body.html 
        };

        yield transporter.sendMail(mailOptions);
        this.body = new ret('邮件发送成功');

    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};
