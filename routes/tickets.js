const express = require('express')
const router = express.Router()
const {
	insertTicket,
	getTickets,
	getOneTicket,
	updateMessageTicket,
	updateStatusTicket,
	ticketClosing,
	deleteTicket,
} = require('../model/tickets/Ticket.model')
const { checkToken } = require('../services/checkToken')

router.all('/', (req, res, next) => {
	// res.json({ message: " get tickets route" });
	next()
})

// recuperer tout les tickets d'un utilisateur
router.get('/', checkToken, async (req, res) => {
	try {
		const userId = req.userId
		// récupére tout les tickets d'un utilisateur en fonction de son ID
		const result = await getTickets(userId)

		return res.status(200).json({
			status: 'success',
			result,
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// recuperer un ticket en fonction de son id
router.get('/:_id', checkToken, async (req, res) => {
	// console.log(req.params)
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const userId = req.userId
		const result = await getOneTicket(_id, userId)

		return res.status(200).json({
			status: 'success',
			result,
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// création d'un ticket
router.post('/', checkToken, async (req, res) => {
	try {
		const { subject, sender, message } = req.body

		const userId = req.userId

		const ticketObjt = {
			clientId: userId,
			subject,
			conversations: [
				{
					sender,
					message,
				},
			],
		}

		const result = await insertTicket(ticketObjt)

		if (result._id) {
			return res.status(200).json({
				status: 'success',
				message: 'Un nouveau ticket a été crée',
				result,
			})
		}

		res.status(400).json({
			status: 'error',
			message: 'erreur lors de la création du ticket',
		})
		res.json({ status: 'error', message: error.message })
	} catch (error) {
		res.status(400).json({ status: 'error', message: error.message })
	}
})

// mise à jour du ticket
router.put('/:_id', checkToken, async (req, res) => {
	// console.log(req.params)
	try {
		const { sender, message } = req.body
		// query selector de l'id du ticket
		const { _id } = req.params
		const userId = req.userId
		const result = await updateMessageTicket({ _id, userId, sender, message })

		if (result._id) {
			return res.status(200).json({
				status: 'success',
				message: 'votre réponse a bien été envoyée',
				result,
			})
		}

		res.status(400).json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// mise à jour du status
router.patch('/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { status } = req.body
		const { _id } = req.params
		const userId = req.userId
		const result = await updateStatusTicket({ _id, userId, status })

		if (result._id) {
			return res.status(200).json({
				status: 'success',
				message: 'Statut du ticket mis à jour',
				result,
			})
		}

		res.status(400).json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// fermeture d'un ticket
router.patch('/close-ticket/:_id', checkToken, async (req, res) => {
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const userId = req.userId
		const result = await ticketClosing({ _id, userId })

		if (result._id) {
			return res.status(200).json({
				status: 'success',
				message: 'Le ticket a été fermé',
				result,
			})
		}

		res.status(400).json({
			message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.delete('/:_id', checkToken, async (req, res) => {
	// console.log(req.params)
	try {
		// query selector de l'id du ticket
		const { _id } = req.params
		const userId = req.userId
		const result = await deleteTicket({ _id, userId })

		if (result._id == null) {
			res.json({
				message: "l'opération a échouée, le ticket n'existe pas",
			})
		}
		return res.status(200).json({
			message: 'Votre ticket a bien été supprimée',
		})
	} catch (error) {
		res
			.status(400)
			.json({ message: " l'opération a échouée : " + error.message })
	}
})

module.exports = router
