const Joi = require('joi')

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ['com', 'net', 'fr', 'org', 'io'] },
})

// les diffférents schéma à valider
const firstname = Joi.string().alphanum().min(2).max(30).required()
const lastname = Joi.string().alphanum().min(2).max(30).required()
const company = Joi.string().alphanum().min(3).max(50).required()
const address = Joi.string().max(150).required()

// faire la validation aussi coté front pour ne pas avoir de problème pour le numéro de téléphone
const phone = Joi.string()
	.min(10)
	.max(10)
	.regex(/^((\+)33|0)[6-7](\d{2}){4}$/)
	.required()

const password = Joi.string().alphanum().min(8).max(30).required()
const resetCode = Joi.string().min(15).max(15).required()
const newPassword = Joi.string().alphanum().min(8).max(30).required()

const createUserChecker = (req, res, next) => {
	const schema = Joi.object({
		firstname,
		lastname,
		company,
		address,
		email,
		phone,
		password,
	})

	const value = schema.validate(req.body)

	if (value.error) {
		return res
			.status(400)
			.json({ status: 'error', message: value.error.message })
	}
	next()
}

const loginCheck = (req, res, next) => {
	const schema = Joi.object({ email, password })

	const value = schema.validate(req.body)

	if (value.error) {
		return res
			.status(400)
			.json({ status: 'error', message: value.error.message })
	}
	next()
}

const resetMailCheck = (req, res, next) => {
	const schema = Joi.object({ email })

	const value = schema.validate(req.body)

	if (value.error) {
		return res
			.status(400)
			.json({ status: 'error', message: value.error.message })
	}
	next()
}

const updatePwdMailCheck = (req, res, next) => {
	const schema = Joi.object({ email, resetCode, newPassword })

	const value = schema.validate(req.body)

	if (value.error) {
		return res
			.status(400)
			.json({ status: 'error', message: value.error.message })
	}
	next()
}

module.exports = {
	createUserChecker,
	loginCheck,
	resetMailCheck,
	updatePwdMailCheck,
}
