'use strict';

/**
 * UserNotExistError
 */
exports.UserNotExistError = class UserNotExistError extends Error {
	constructor(message) {
		super();
		this.name = this.constructor.name;
		this.message = message;
	}
};

/**
 * ParamsError
 */
exports.ParamsError = class ParamsError extends Error {
	constructor(message) {
		super();
		this.name = this.constructor.name;
		this.message = message;
	}
};