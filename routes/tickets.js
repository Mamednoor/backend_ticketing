const express = require('express')
const router = express.Router()
const { insertTicket } = require('../model/tickets/Ticket.model')

router.all('/', (req, res, next) => {
	// res.json({ message: " get tickets route" });
	next()
})

router.post('/', async (req, res) => {
	try {
		const result = await insertTicket(req.body)
		console.log('création du ticket réussis', result)
		res.status(200).json({ message: 'Un nouveau ticket a été crée', result })
	} catch (error) {
		console.log('erreur lors de la création du ticket', error)
		res.status(400).json({ message: error.message })
	}
})

module.exports = router
