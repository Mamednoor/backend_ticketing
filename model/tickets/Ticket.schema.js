const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
	clientId: {
		type: Schema.Types.ObjectId,
	},
	subject: {
		type: String,
		minlength: 10,
		maxlength: 100,
		trim: true,
		required: true,
		default: '',
		trim: true,
	},
	createdOn: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	status: {
		type: String,
		maxlength: 10,
		required: true,
		default: 'En Attente',
	},
	priority: {
		type: String,
		maxlength: 6,
		required: true,
		default: 'Normal',
	},
	conversations: [
		{
			sender: {
				type: String,
				minlength: 5,
				maxlength: 30,
				trim: true,
				required: true,
				default: '',
			},
			message: {
				type: String,
				minlength: 10,
				maxlength: 500,
				trim: true,
				required: true,
				default: '',
				trim: true,
			},
			msgAt: {
				type: Date,
				required: true,
				default: Date.now(),
			},
		},
	],
})

module.exports = {
	TicketSchema: mongoose.model('Ticket', TicketSchema),
}
