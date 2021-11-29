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

const ResetPwdByMail = (email, resetCode) => {
	return new Promise((resolve, reject) => {
		try {
			// recherche si les valeurs email et resetCode existe en BDD
			ResetPasswordSchema.findOne({ email, resetCode }, (error, data) => {
				if (error) {
					resolve(false)
				}
				resolve(data)
			})
		} catch (error) {
			reject(error)
		}
	})
}

const deleteOldCode = (email, resetCode) => {
	try {
		// suppression du code de réinitialisation utilisé
		ResetPasswordSchema.findOneAndDelete({ email, resetCode }, (error) => {
			if (error) {
				console.log(error)
			}
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	setResetCode,
	ResetPwdByMail,
	deleteOldCode,
}
