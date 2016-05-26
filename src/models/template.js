'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    api_key: { type: String, required: true, trim: true, ref: 'User' },
    name: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    format: { type: String, required: true, trim: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

TemplateSchema.pre('save', function(done) {
    this.update_at = Date.now();
    done();
});

TemplateSchema.statics = {
    findTemplate: function(api_key, name) {
        return this.findOne({ api_key, name });
    },
    findTemplates: function(api_key) {
        return this.find({ api_key });
    },
    removeTemplate: function(api_key, name) {
        return this.remove({ api_key, name });
    }
};

mongoose.model('Template', TemplateSchema);
