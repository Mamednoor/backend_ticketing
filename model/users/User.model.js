const { UserSchema } = require('./User.schema')

const insertUser = (userObjt) => {
	return new Promise((resolve, reject) => {
		UserSchema(userObjt)
			.save()
			.then((data) => resolve(data))
			.catch((error) => reject(error))
	})
}

const getUserById = (_id) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false

		try {
			UserSchema.findOne({ _id }, (error, data) => {
				if (error) {
					reject(error)
				}
				resolve(data)
			})
		} catch (error) {
			reject(error)
		}
	})
}

const getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		if (!email) return false

		try {
			UserSchema.findOne({ email }, (error, data) => {
				if (error) {
					reject(error)
				}
				resolve(data)
			})
		} catch (error) {
			reject(error)
		}
	})
}

const storeUserRefreshToken = (_id, token) => {
	return new Promise((resolve, reject) => {
		try {
			UserSchema.findOneAndUpdate(
				// filtre sur l'id
				{ _id },
				// la donnée à mettre à jour
				{
					'refreshToken.token': token,
					'refreshToken.addedOn': Date.now(),
				},
				// retour du dernier update de donnée
				{ new: true },
			)
				.then((data) => resolve(data))
				.catch((error) => {
					reject(error)
				})
		} catch (error) {
			reject(error)
		}
	})
}

const updatePassword = (email, newPassword) => {
	return new Promise((resolve, reject) => {
		try {
			UserSchema.findOneAndUpdate(
				// filtre sur l'id
				{ email },
				// la donnée à mettre à jour
				{
					password: newPassword,
				},
				// retour du dernier update de donnée
				{ new: true },
			)
				.then((data) => resolve(data))
				.catch((error) => {
					reject(error)
				})
		} catch (error) {
			reject(error)
		}
	})
}

const verifyAccount = (_id, email) => {
	return new Promise((resolve, reject) => {
		try {
			UserSchema.findOneAndUpdate(
				// filtre sur l'id
				{ _id, email, isVerified: false },
				// la donnée à mettre à jour
				{
					isVerified: true,
				},
				// retour du dernier update de donnée
				{ new: true },
			)
				.then((data) => resolve(data))
				.catch((error) => {
					console.log(error.message)

					reject(error)
				})
		} catch (error) {
			console.log(error.message)
			reject(error)
		}
	})
}
module.exports = {
	insertUser,
	getUserById,
	getUserByEmail,
	storeUserRefreshToken,
	updatePassword,
	verifyAccount,
}
