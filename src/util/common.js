'use strict';

const crypto = require('crypto');


/**
 * cipher
 */
exports.cipher = function(msg) {
    const cipher = crypto.createCipher('aes192', 'webapi-mail');
    cipher.update(msg, 'utf8');
    return cipher.final('hex');
};

/**
 * decipher
 */
exports.decipher = function(msg) {
    const decipher = crypto.createDecipher('aes192', 'webapi-mail');
    decipher.update(msg, 'hex');
    return decipher.final('utf8');
};


