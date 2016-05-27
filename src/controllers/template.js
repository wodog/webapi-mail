'use strict';


const mongoose = require('mongoose');
const Template = mongoose.model('Template');
const ret = require('../util/ret');
const validate = require('../util/validate');
const filtrate = require('../util/filtrate');


exports.findTemplates = function*() {
    const api_key = this.query.api_key;
    validate.validate_params_exist(api_key);
    var templates = yield Template.findTemplates(api_key);
    templates = filtrate(templates);
    this.body = new ret(templates);
};


exports.findTemplate = function*() {
    const api_key = this.query.api_key;
    const name = this.params.name;
    validate.validate_params_exist(api_key, name);
    var template = yield Template.findTemplate(api_key, name);
    template = filtrate(template);
    this.body = new ret(template);
};


exports.operation = function*(next) {
    const action = this.request.body.action;

    // 创建模版
    if (action === 'create') {
        const api_key = this.request.body.api_key;
        const name = this.request.body.name;
        const content = this.request.body.content;
        const format = this.request.body.format || 'html';
        validate.validate_params_exist(api_key, name, content, format);
        let result = yield new Template({ api_key, name, content, format }).save();
        result = filtrate(result);
        this.body = new ret(result);
        return;
    }

    //  更新模版
    else if (action === 'update') {
        const api_key = this.request.body.api_key;
        const name = this.request.body.name;
        const content = this.request.body.content;
        const format = this.request.body.format;
        validate.validate_params_exist(api_key, name);
        let template = yield Template.findTemplate(api_key, name);
        if (content) template.content = content;
        if (format) template.format = format;
        let result = yield template.save();
        result = filtrate(result);
        this.body = new ret(result);
        return;
    }

    // 删除模版
    else if (action === 'remove') {
        const api_key = this.request.body.api_key;
        const name = this.request.body.name;
        validate.validate_params_exist(api_key, name);
        let result = yield Template.removeTemplate(api_key, name);
        result = filtrate(result);
        this.body = new ret(result);
        return;
    }

    yield next;
};
