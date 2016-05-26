'use strict';


const mongoose = require('mongoose');
const Template = mongoose.model('Template');
const ret = require('../util/ret');
const validate = require('../util/validate');


exports.findTemplates = function*() {
    try {
        const api_key = this.query.api_key;
        validate.validate_param_exist(api_key);
        const templates = yield Template.findTemplates(api_key);
        this.body = new ret(templates);
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};


exports.findTemplate = function*() {
    try {
        const api_key = this.query.api_key;
        const name = this.params.name;
        validate.validate_param_exist(api_key, name);
        const template = yield Template.findTemplate(api_key, name);
        this.body = new ret(template);
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};


exports.operation = function*() {
    try {
        const action = this.request.body.action;

        // 创建模版
        if (action === 'create') {
            const api_key = this.request.body.api_key;
            const name = this.request.body.name;
            const content = this.request.body.content;
            const format = this.request.body.format || 'html';
            validate.validate_param_exist(api_key, name, content, format);
            const result = yield new Template({ api_key, name, content, format }).save();
            this.body = new ret(result);
            return;
        }

        //  更新模版
        else if (action === 'update') {
            const api_key = this.request.body.api_key;
            const name = this.request.body.name;
            const content = this.request.body.content;
            const format = this.request.body.format;
            validate.validate_param_exist(api_key, name);
            let template = yield Template.findTemplate(api_key, name);
            if (content) template.content = content;
            if (format) template.format = format;
            const result = yield template.save();
            this.body = new ret(result);
            return;
        }

        // 删除模版
        else if (action === 'remove') {
            const api_key = this.request.body.api_key;
            const name = this.request.body.name;
            validate.validate_param_exist(api_key, name);
            const result = yield Template.removeTemplate(api_key, name);
            this.body = new ret(result);
            return;
        }

        throw new Error('无此操作');
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};
