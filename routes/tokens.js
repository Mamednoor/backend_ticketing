const express = require('express')
const { getUserByEmail } = require('../model/users/User.model')
const router = express.Router()

const {
	verifyRefreshToken,
	createAccessToken,
} = require('../services/setToken')

router.get('/', async (req, res, next) => {
	const token = req.headers.authorization
	const decoded = await verifyRefreshToken(token)
	// vérification de l'email et de l'id de l'utilisateur
	// + vérification de la date de création du token stocké en bdd
	if (decoded.email) {
		// recherche de l'utilisateur par l'email
		const userProfil = await getUserByEmail(decoded.email)
		// récupération de l'id de l'utilisateur
		if (userProfil._id) {
			// vérification du refresh token et de sa date d'expiration
			let tokenExp = userProfil.refreshToken.addedOn
			const dbRefreshToken = userProfil.refreshToken.token
			// remplacement de cette valeur en rajoutant une valeur d'expiration
			tokenExp = tokenExp.setDate(
				tokenExp.getDate() + Number(process.env.REFRESH_TOKEN_EXPIRE),
			)

			const today = new Date()
			// comparaison entre le token en bdd "redis" et "le token des headers et la date d'expication du token" inférieur à aujourd'hui
			if (dbRefreshToken !== token && tokenExp < today) {
				// si oui retourn le message si dessous
				return res.status(403).json({
					message:
						'Votre connexion a expirée, veuillez vous identifier à nouveau',
				})
			}

			// sinon création d'un nouveau token
			const accessToken = await createAccessToken(decoded.email, userProfil._id)

			return res.json({
				status: 'success',
				message: 'Opération réussie',
				accessToken,
			})
			// retour ensuite dans le middlewares ckeckToken pour supprimer les anciens token de la bdd
		}
	}

	res.status(403).json({
		message: 'Une erreur est survenue',
	})
})

module.exports = router
