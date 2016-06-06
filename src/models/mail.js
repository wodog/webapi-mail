'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MailSchema = new Schema({
	subject: {type: String, required: true, trim: true},
	to: [{type: String, required: true}],
	content: {type: String, required: true},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	result: {type: String},
	create_at: {type: Date, default: Date.now},
});


mongoose.model('Mail', MailSchema);

