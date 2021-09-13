const { ResetPasswordSchema } = require('./reset-password.schema')

const setResetCode = (email) => {
	//création d'un nouveau mot de passe pour la ré-initialisation
	function randCode() {
		let text = ''
		let possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		for (let i = 0; i < 15; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		return text
	}

	const resetObjt = {
		email,
		resetCode: randCode(),
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
