'use strict';

const ret = require('../util/ret');

module.exports = function() {
    return function*(next) {
        try {
            yield next;
        } catch (e) {
            this.body = new ret(-1, 'failure', e.message);
        }
    };
};
