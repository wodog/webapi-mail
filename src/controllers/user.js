'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('User');

const ret = require('../util/ret');

/**
 * 
 */
exports.createUser = function*() {
    const user = new User({ name: this.params.name });
    const u = yield user.save();
    this.body = new ret({api_key: u.api_key});
};
