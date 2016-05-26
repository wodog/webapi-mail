'use strict';


const mongoose = require('mongoose');
const User = mongoose.model('User');
const ret = require('../util/ret');
const common = require('../util/common');
const validate = require('../util/validate');


exports.findUser = function*() {
    try {
        const api_key = this.request.params.api_key;
        validate.validate_param_exist(api_key);
        const user = yield User.findByAPIKEY(api_key);
        this.body = new ret(user);
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};


exports.operation = function*() {
    try {
        const action = this.request.body.action;

        // 创建用户
        if (action === 'create') {
            const user = this.request.body.user;
            const pass = this.request.body.pass;
            const host = this.request.body.host;
            const port = this.request.body.port;
            const name = this.request.body.name || '';
            const secure = this.request.body.secure || true;
            const pool = this.request.body.pool || false;
            validate.validate_param_exist(user, pass, host, port);
            const u = yield new User({ user, pass, host, port, name, secure, pool }).save();
            this.body = new ret({ api_key: u.api_key });
            return;
        }

        // 更新用户
        else if (action === 'update') {
            const api_key = this.request.body.api_key;
            const user = this.request.body.user;
            const pass = this.request.body.pass;
            const host = this.request.body.host;
            const port = this.request.body.port;
            const name = this.request.body.name;
            const secure = this.request.body.secure;
            const pool = this.request.body.pool;
            validate.validate_param_exist(api_key);
            const u = yield User.findByAPIKEY(api_key);
            // if (!u) {
            //     throw new Error('api_key不正确');
            // }
            if (user) u.user = user;
            if (pass) u.pass = pass;
            if (host) u.host = host;
            if (port) u.port = port;
            if (name) u.name = name;
            if (secure) u.secure = secure;
            if (pool) u.pool = pool;
            const new_u = yield u.save();
            this.body = new ret(new_u);
            return;
        }

        // 删除用户
        else if (action === 'remove') {
            const api_key = this.request.body.api_key;
            validate.validate_param_exist(api_key);
            const result = yield User.removeByAPIKEY(api_key);
            validate.validate_user_remove(result);
            this.body = new ret('删除成功');
            return;
        }

        throw new Error('无此操作');
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};
