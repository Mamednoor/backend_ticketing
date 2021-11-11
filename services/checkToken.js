const { verifyAccessToken } = require('./setToken')
const { getToken, deleteToken } = require('./redis')

const checkToken = async (req, res, next) => {
	// on vérifie la présence du token dans les headers
	const token = req.headers.authorization

	// récuperer les informations de l'utilisateur à partir du token
	const decoded = await verifyAccessToken(token)
	if (decoded.email) {
		const userId = await getToken(token)

		if (!userId) {
			return res.json({
				message: 'Une erreur est survenue, veuillez réessayer ultérieurement',
			})
		}

		req.userId = userId

		return next()
	}
	//pour la suppression de l'ancien token en BDD
	deleteToken(token)

	return res.json({ message: 'Authorisation refusée' })
}

module.exports = {
	checkToken,
}
