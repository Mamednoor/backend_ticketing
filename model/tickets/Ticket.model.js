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

// enregistrement d'un ticket avec image
// const insertPictureTicket = (pictureData) => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			TicketSchema(pictureData)
// 				.save()
// 				.then((data) => resolve(data))
// 				.catch((error) => reject(error))
// 		} catch (error) {
// 			reject(error)
// 		}
// 	})
// }

// récupération des tickets d'un utilisateur en fonction de son ID
const getTickets = (clientId) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.find({ clientId })
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// récupération des tickets d'un utilisateur en fonction de son ID
const getOneTicket = (_id, clientId) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.find({ _id, clientId })
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

// mise à jour d'un ticket en fonction de son ID
const updateMessageTicket = ({ _id, clientId, sender, message }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndUpdate(
				{ _id, clientId },
				{
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
const updateStatusTicket = ({ _id, clientId, status }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndUpdate(
				{ _id, clientId },
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
const ticketClosing = ({ _id, clientId }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndUpdate(
				{ _id, clientId },
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
const deleteTicket = ({ _id, clientId }) => {
	return new Promise((resolve, reject) => {
		try {
			TicketSchema.findOneAndDelete({ _id, clientId })
				.then((data) => resolve(data))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	insertTicket,
	// insertPictureTicket,
	getTickets,
	getOneTicket,
	updateMessageTicket,
	updateStatusTicket,
	ticketClosing,
	deleteTicket,
}
