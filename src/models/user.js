'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uuid = require('node-uuid');
const crypto = require('crypto');

var UserSchema = new Schema({
    name: { type: String, required: true, trim: true},
    pass: {type: String, required: true, trim: true},
    api_key: { type: String, required: true, unique: true, default:  uuid.v4},
    create_at: { type: Date, required: true, default: Date.now },
    update_at: {type: Date, required: true, default: Date.now}
});

UserSchema.pre('save', function(next) {

	this.pass = crypto.createHash('sha256').update(this.pass).digest('hex');

	this.update_at = Date.now();
	
	next();
});

mongoose.model('User', UserSchema);
