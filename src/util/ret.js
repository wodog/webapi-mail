'use strict';

module.exports = class {

    constructor(code, msg, data) {

        // if (arguments.length === 1 && typeof arguments[0] === ) {
        //     return { code, msg: 'success', data: null }
        // }

        if (arguments.length < 2) {
            return { code: 0, msg: 'success', data: arguments[0] || null };
        }

        return { code, msg, data };
    }

};
