const Joi = require('joi')

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ['com', 'net', 'fr', 'org', 'io'] },
})

const resetCode = Joi.string().min(15).max(15).required()
const newPassword = Joi.string().alphanum().min(8).max(30).required()
const password = Joi.string().alphanum().min(8).max(30).required()

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

module.exports = { loginCheck, resetMailCheck, updatePwdMailCheck }
