'use strict';

exports.validate_param_exist = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (!arguments[i]) {
            throw new Error('参数不正确');
        }
    }
};

exports.validate_user_exist = function(user) {
    if (!user) {
        throw new Error('api_key 不正确');
    }
};

exports.validate_user_remove = function(ret) {
    if (!ret.result.n) {
    	throw new Error('api_key 不正确');
    }
};
