'use strict';

const crypto = require('crypto');
const ret = require('./ret');


/**
 * 加密msg
 */
exports.cipher = function(msg) {
    const cipher = crypto.createCipher('aes192', 'webapi-mail');
    cipher.update(msg, 'utf8');
    return cipher.final('hex');
};

/**
 * 解密msg
 */
exports.decipher = function(msg) {
    const decipher = crypto.createDecipher('aes192', 'webapi-mail');
    decipher.update(msg, 'hex');
    return decipher.final('utf8');
};


