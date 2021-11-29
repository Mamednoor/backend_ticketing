const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	firstname: {
		type: String,
		minlength: 5,
		maxlength: 30,
		trim: true,
		required: true,
	},
	lastname: {
		type: String,
		minlength: 2,
		maxlength: 30,
		trim: true,
		required: true,
	},
	company: {
		type: String,
		minlength: 3,
		maxlength: 50,
		trim: true,
		required: true,
	},
	address: {
		type: String,
		trim: true,
		maxlength: 150,
	},
	phone: {
		type: String,
		minlength: 10,
		maxlength: 10,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		maxlength: 100,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 150,
		required: true,
		trim: true,
	},
	refreshToken: {
		token: {
			type: String,
			maxlength: 500,
			default: '',
		},
		addedOn: {
			type: Date,
			required: true,
			default: Date.now(),
		},
	},
	isVerified: {
		type: Boolean,
		required: true,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	createdOn: {
		type: Date,
		required: true,
		default: Date.now(),
	},
})

module.exports = {
	UserSchema: mongoose.model('User', UserSchema),
}
