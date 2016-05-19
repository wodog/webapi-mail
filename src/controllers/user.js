'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const ret = require('../util/ret');
const common = require('../util/common');
const validate = require('../util/validate');

/**
 * 创建用户
 */
exports.createUser = function*() {
    try {
        const user = this.request.body.user;
        const pass = this.request.body.pass;
        const host = this.request.body.host;
        const port = this.request.body.port;
        const name = this.request.body.name || '';
        const secure = this.request.body.secure || true;
        const pool = this.request.body.pool || false;

        validate.validate_param(user, pass, host, port);

        const u = yield new User({ user, pass, host, port, name, secure, pool }).save();
        this.body = new ret({ api_key: u.api_key });
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};

/**
 * 更新用户
 */
exports.updateUser = function*() {
    try {

        const api_key = this.request.body.api_key;
        const user = this.request.body.user;
        const pass = this.request.body.pass;
        const host = this.request.body.host;
        const port = this.request.body.port;
        const name = this.request.body.name;
        const secure = this.request.body.secure;
        const pool = this.request.body.pool;

        validate.validate_param(api_key);

        const u = yield User.findByAPIKEY(api_key);

        if (!u) {
            throw new Error('api_key不正确');
        }

        if (user) {
            u.user = user;
        }
        if (pass) {
            u.pass = pass;
        }
        if (host) {
            u.host = host;
        }
        if (port) {
            u.port = port;
        }
        if (name) {
            u.name = name;
        }
        if (secure) {
            u.secure = secure;
        }
        if (pool) {
            u.pool = pool;
        }

        const u_new = yield u.save();

        this.body = new ret({
            user: u_new.user,
            host: u_new.host,
            port: u_new.port,
            name: u_new.name,
            secure: u_new.secure,
            pool: u_new.pool
        });
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};


/**
 * 查看用户
 */
exports.viewUser = function*() {
    try {
        const api_key = this.request.body.api_key;

        validate.validate_param(api_key);

        const u = yield User.findByAPIKEY(api_key);

        validate.validate_user_exist(u);

        this.body = new ret({
            user: u.user,
            host: u.host,
            port: u.port,
            name: u.name,
            secure: u.secure,
            pool: u.pool,
            create_at: u.create_at,
            update_at: u.update_at
        });
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};


/**
 * 删除用户
 */
exports.removeUser = function*() {
    try {
        const api_key = this.request.body.api_key;
        validate.validate_param(api_key);
        const re = yield User.removeByAPIKEY(api_key);

        validate.validate_user_remove(re);

        this.body = new ret('删除成功');
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};
