const Joi = require('joi')

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ['com', 'net', 'fr', 'org', 'io'] },
})

const resetCode = Joi.string().min(15).max(15).required()

const newPassword = Joi.string().alphanum().min(8).max(30).required()

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

const updateMailCheck = (req, res, next) => {
	const schema = Joi.object({ email, resetCode, newPassword })

	const value = schema.validate(req.body)

	if (value.error) {
		return res
			.status(400)
			.json({ status: 'error', message: value.error.message })
	}
	next()
}

module.exports = { resetMailCheck, updateMailCheck }
