const { ResetPasswordSchema } = require('./reset-password.schema')
const { codeGenerator } = require('../../utils/codeGenerator')

const setResetCode = async (email) => {
	const hashLenght = 15
	const randCode = await codeGenerator(hashLenght)

	const resetObjt = {
		email,
		resetCode: randCode,
	}
	return new Promise((resolve, reject) => {
		ResetPasswordSchema(resetObjt)
			.save()
			.then((data) => resolve(data))
			.catch((error) => reject(error))
	})
}

module.exports = {
	setResetCode,
}
