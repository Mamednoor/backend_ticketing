const { TicketSchema } = require('./Ticket.schema')

// enregistrement d'un ticket en BDD
const insertTicket = (ticketObjt) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema(ticketObjt)
				.save()
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// récupération des tickets d'un utilisateur en fonction de son ID
const getTickets = (userId) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.find({ userId })
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// récupération des tickets d'un utilisateur en fonction de son ID
const getOneTicket = (_id, userId) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.find({ _id, userId })
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// récupération des tickets d'un utilisateur en fonction de son ID
const updateMessageTicket = ({ _id, userId, sender, message }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndUpdate(
				{ _id, userId },
				{
					status: 'En Attente',
					$push: {
						conversations: { sender, message },
					},
				},
				{ new: true },
			)
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// récupération des tickets d'un utilisateur en fonction de son ID
const updateStatusTicket = ({ _id, userId, status }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndUpdate(
				{ _id, userId },
				{
					status,
				},
				{ new: true },
			)
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// récupération des tickets d'un utilisateur en fonction de son ID
const ticketClosing = ({ _id, userId }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndUpdate(
				{ _id, userId },
				{
					status: 'Fermé',
				},
				{ new: true },
			)
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// suppression d'un ticket
const deleteTicket = ({ _id, userId }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndDelete({ _id, userId })
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	insertTicket,
	getTickets,
	getOneTicket,
	updateMessageTicket,
	updateStatusTicket,
	ticketClosing,
	deleteTicket,
}
