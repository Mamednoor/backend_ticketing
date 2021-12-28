const express = require('express')
const router = express.Router()

const {
	insertTicket,
	insertPictureTicket,
	getAllTickets,
	getDetailTicket,
	ReplyMessageTicket,
	getTickets,
	getOneTicket,
	updateMessageTicket,
	ticketClosing,
	ticketInProgress,
	deleteTicket,
} = require('../model/tickets/Ticket.model')
const { checkToken } = require('../services/checkToken')
const {
	createTicketCheck,
	statutCheck,
	replyTicketCheck,
} = require('../utils/formValidation')

router.all('/', (req, res, next) => {
	// res.json({ message: " get tickets route" });
	next()
})

router.get('/', checkToken, async (req, res) => {
	try {
		const clientId = req.userId
		// récupére tout les tickets d'un utilisateur en fonction de son ID
		const result = await getTickets(clientId)

		return res.json({
			status: 'success',
			result,
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.get('/all', checkToken, async (req, res) => {
	try {
		//const clientId = req.userId
		// récupére tout les tickets d'un utilisateur en fonction de son ID
		const result = await getAllTickets()

		return res.json({
			status: 'success',
			result,
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.get('/all/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const result = await getDetailTicket(_id)

		return res.json({
			status: 'success',
			result,
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.put('/all/:_id', checkToken, replyTicketCheck, async (req, res) => {
	try {
		const { sender, message } = req.body
		// query selector de l'id du ticket
		const { _id } = req.params

		const result = await ReplyMessageTicket({
			_id,
			sender,
			message,
		})

		if (result?._id) {
			return res.json({
				status: 'success',
				message: 'votre réponse a bien été envoyée',
				result,
			})
		}

		res.json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.get('/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const clientId = req.userId
		const result = await getOneTicket(_id, clientId)

		return res.json({
			status: 'success',
			result,
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.post('/add-ticket', checkToken, createTicketCheck, async (req, res) => {
	try {
		const clientId = req.userId
		const { subject, sender, message, priority } = req.body

		const ticketObjt = {
			clientId: clientId,
			subject,
			priority,
			conversations: [
				{
					sender,
					message,
				},
			],
		}

		const result = await insertTicket(ticketObjt)

		if (result?._id) {
			return res.json({
				status: 'success',
				message: 'Un nouveau ticket a été crée',
				result,
			})
		}

		res.json({
			status: 'error',
			message: 'erreur lors de la création du ticket',
		})
		res.json({ status: 'error', message: error.message })
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

router.put('/:_id', checkToken, replyTicketCheck, async (req, res) => {
	try {
		const { sender, message } = req.body
		// query selector de l'id du ticket
		const { _id } = req.params
		const clientId = req.userId

		const result = await updateMessageTicket({
			_id,
			clientId,
			sender,
			message,
		})

		if (result?._id) {
			return res.json({
				status: 'success',
				message: 'votre réponse a bien été envoyée',
				result,
			})
		}

		res.json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.patch('/close-ticket/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const clientId = req.userId
		const isAdmin = req.isAdmin
		const result = await ticketClosing({ _id, clientId, isAdmin })

		if (result?._id && result?.isAdmin === true) {
			return res.json({
				status: 'success',
				message: 'Le ticket a été fermé',
				result,
			})
		}

		res.json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.patch('/inprogress-ticket/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const isAdmin = req.isAdmin
		const result = await ticketInProgress({ _id, isAdmin })

		if (result?._id && result?.isAdmin === true) {
			return res.json({
				status: 'success',
				message: 'Le ticket est pris en compte',
				result,
			})
		}

		res.json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.json({ message: error.message })
	}
})

router.delete('/delete/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const isAdmin = req?.isAdmin
		const result = await deleteTicket({ _id, isAdmin })

		if (result?._id == null) {
			res.json({
				message: "l'opération a échouée, le ticket n'existe pas",
			})
		}
		if (result?._id && result?.isAdmin === true) {
			return res.json({
				status: 'success',
				message: 'Le ticket à été supprimé, cette action est irréversible ',
				result,
			})
		}
	} catch (error) {
		res.json({ message: " l'opération a échouée : " + error.message })
	}
})

// router.put('/:_id', checkToken, upload.single('picture'), async (req, res) => {
// 	try {
// 		const { _id } = req.params
// 		const clientId = req.userId
// 		const pictureData = {
// 			picture: req.file.filename,
// 		}
// 		const result = await insertPictureTicket({ picture })
// 	} catch (error) {}
// })

module.exports = router
