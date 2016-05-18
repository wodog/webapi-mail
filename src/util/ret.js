'use strict';

module.exports = class {

    constructor(code, msg, data) {

        if (arguments.length === 1) {
            return { code: 0, msg: 'success', data: arguments[0] || null };
        }

        return { code, msg, data };
    }

};
