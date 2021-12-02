const Joi = require('joi')

// les différents schéma à valider
const firstname = Joi.string().min(4).max(30).required()
const lastname = Joi.string().min(2).max(30).required()
const company = Joi.string().min(3).max(50).required()
const address = Joi.string().max(150).required()
const isAdmin = Joi.boolean()
// validation du numéro de téléphone, téléphone colonne String,
// min et max length à 10 regex pour le numéro de téléphone en francais
const phone = Joi.string()
	.min(10)
	.max(10)
	.regex(/^((\+)33|0)[6-7](\d{2}){4}$/)
	.required()

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ['com', 'net', 'fr', 'org', 'io'] },
})

const password = Joi.string().min(8).max(30).required()
const resetCode = Joi.string().min(15).max(15).required()
const newPassword = Joi.string().min(8).max(30).required()

// fonction de validation
const createUserCheck = (req, res, next) => {
	const schema = Joi.object({
		firstname,
		lastname,
		company,
		address,
		email,
		phone,
		password,
		isAdmin,
	})

	const value = schema.validate(req.body)

	if (value.error) {
		return res.json({ status: 'error', message: value.error.message })
	}
	next()
}

const loginCheck = (req, res, next) => {
	const schema = Joi.object({ email, password })

	const value = schema.validate(req.body)

	if (value.error) {
		return res.json({ status: 'error', message: value.error.message })
	}
	next()
}

const resetMailCheck = (req, res, next) => {
	const schema = Joi.object({ email })

	const value = schema.validate(req.body)

	if (value.error) {
		return res.json({ status: 'error', message: value.error.message })
	}
	next()
}

const updatePwdMailCheck = (req, res, next) => {
	const schema = Joi.object({ email, resetCode, newPassword })

	const value = schema.validate(req.body)

	if (value.error) {
		return res.json({ status: 'error', message: value.error.message })
	}
	next()
}

const createTicketCheck = (req, res, next) => {
	const schema = Joi.object().keys({
		subject: Joi.string().min(10).max(100).required(),
		sender: Joi.string().min(5).max(30).required(),
		message: Joi.string().min(10).max(500).required(),
	})

	const values = schema.validate(req.body)
	if (values.error) {
		return res.json({ status: 'error', message: res.error.message })
	}
	next()
}

const replyTicketCheck = (req, res, next) => {
	const schema = Joi.object().keys({
		sender: Joi.string().min(5).max(30).required(),
		message: Joi.string().min(10).max(500).required(),
	})

	const value = schema.validate(req.body)

	if (value.error) {
		return res.json({ status: 'error', message: value.error.message })
	}
	next()
}

const statutCheck = (req, res, next) => {
	const schema = Joi.object().keys({
		status: Joi.string().valid('En Attente', 'En Cours', 'Fermé'),
	})

	const value = schema.validate(req.body)

	if (value.error) {
		return res.json({ status: 'error', message: value.error.message })
	}
	next()
}

module.exports = {
	createUserCheck,
	replyTicketCheck,
	loginCheck,
	resetMailCheck,
	updatePwdMailCheck,
	createTicketCheck,
	statutCheck,
}
