'use strict';

const UserNotExistError = require('./errors').UserNotExistError;
const ParamsError = require('./errors').ParamsError;
const TemplateNotExistError = require('./errors').TemplateNotExistError;

/*
 * validate_params_exist
 */
exports.validate_params_exist = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (!arguments[i]) {
            throw new ParamsError('参数不正确');
        }
    }
};

/**
 * validate_user_exist
 */
exports.validate_user_exist = function(user) {
    if (!user) {
        throw new UserNotExistError('api_key 不正确');
    }
};

/**
 * validate_user_exist
 */
exports.validate_template_exist = function(template) {
    if (!template) {
        throw new TemplateNotExistError('模版不存在');
    }
};


exports.validate_user_remove = function(ret) {
    if (!ret.result.n) {
    	throw new Error('api_key 不正确');
    }
};
