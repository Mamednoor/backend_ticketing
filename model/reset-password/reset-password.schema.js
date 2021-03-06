const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResetPasswordSchema = new Schema({
	email: {
		type: String,
		maxlength: 100,
		required: true,
	},
	resetCode: {
		type: String,
		minlength: 15,
		maxlength: 15,
	},
	addedOn: {
		type: Date,
		required: true,
		default: Date.now(),
	},
})

module.exports = {
	ResetPasswordSchema: mongoose.model('ResetPassword', ResetPasswordSchema),
}
