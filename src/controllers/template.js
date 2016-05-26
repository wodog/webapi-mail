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
        let api_key, name, content, result, format;
        const action = this.request.body.action;
        switch (action) {
            case 'create':
                api_key = this.request.body.api_key;
                name = this.request.body.name;
                content = this.request.body.content;
                format = this.request.body.format || 'html';
                result = yield new Template({ api_key, name, content, format}).save();
                this.body = new ret(result);
                break;
            case 'update':
                api_key = this.request.body.api_key;
                name = this.request.body.name;
                content = this.request.body.content;
                format = this.request.body.format;
                let template = yield Template.findTemplate(api_key, name);
                if(template.content) template.content = content;
                if(template.format) template.format = format;
                result = yield template.save();
                this.body = new ret(result);
                break;
            case 'remove':
                api_key = this.request.body.api_key;
                name = this.request.body.name;
                result = yield Template.removeTemplate(api_key, name);
                this.body = new ret(result);
                break;
            default: 
            	throw new Error('无此操作');
        }
    } catch (e) {
        this.body = new ret(-1, 'failure', e.message);
    }
};
