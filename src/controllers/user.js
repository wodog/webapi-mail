'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('User');

const ret = require('../util/ret');

/**
 * 创建用户
 */
exports.createUser = function*() {
    const user = new User({ name: this.request.body.name, pass: this.request.body.pass });
    const u = yield user.save();
    this.body = new ret({api_key: u.api_key});
};

/**
 * 更新用户
 */
 exports.updateUser = function*() {
 	const api_key = this.request.body.api_key;
 	const name = this.request.body.name;
 	const pass = this.request.body.pass;

 	if(!api_key || !name || !pass) {
 		return this.body = new ret(-2, 'failure', '参数不正确');
 	}
 	const user = yield User.findOne({api_key: api_key});
 	user.name = name;
 	user.pass = pass;
 	yield user.save();

 	return this.body = new ret();
 };