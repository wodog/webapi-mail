'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('node-uuid');
const common = require('../util/common');

const UserSchema = new Schema({
    user: { type: String, required: true, trim: true },
    pass: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    api_key: { type: String, required: true, unique: true, default: uuid.v4 },
    host: { type: String },
    port: { type: Number },
    pool: { type: Boolean },
    secure: { type: Boolean },
    create_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
});

UserSchema.pre('save', function(next) {
    this.update_at = Date.now();

    this.pass = common.cipher(this.pass);

    next();
});

UserSchema.statics = {
    findByAPIKEY: function(api_key) {
    	return this.findOne({api_key});
    },
    removeByAPIKEY: function(api_key) {
    	return this.remove({api_key});
    }
};

mongoose.model('User', UserSchema);
