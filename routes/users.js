const express = require('express')
const router = express.Router()

const {
	insertUser,
	getUserById,
	getUserByEmail,
	updatePassword,
	storeUserRefreshToken,
} = require('../model/users/User.model')

const { hashPassword, comparePassword } = require('../services/bcrypt')
const {
	createAccessToken,
	createRefreshToken,
} = require('../services/setToken')

const { checkToken } = require('../services/checkToken')
const {
	setResetCode,
	ResetPwdByMail,
	deleteOldCode,
} = require('../model/reset-password/reset-password.model')
const { mailProcessor } = require('../services/emailSender')
const {
	createUserCheck,
	loginCheck,
	resetMailCheck,
	updatePwdMailCheck,
} = require('../utils/formValidation')
const { deleteToken } = require('../services/redis')

router.all('/', (req, res, next) => {
	next()
})

// création d'un utilisateur
router.post('/', createUserCheck, async (req, res) => {
	const { firstname, lastname, company, address, phone, email, password } =
		req.body
	try {
		// hash password with bcrypt
		const hashedPwd = await hashPassword(password)

		const newUser = {
			firstname,
			lastname,
			company,
			address,
			phone,
			email,
			password: hashedPwd,
		}

		console.log('req body : ', req.body)
		const result = await insertUser(newUser)

		console.log("création de l'utilisateur réussis", result)
		res.status(201).json({
			message: 'Un nouvelle utilisateur a été crée',
			result,
		})
	} catch (error) {
		console.log("erreur lors de la création de l'utilisateur", error)
		res.status(400).json({
			message: error.message,
		})
	}
})

// profil utilisateur
router.get('/profil', checkToken, async (req, res) => {
	const _id = req.userId
	const userProfil = await getUserById(_id)
	res.json({
		user: userProfil,
	})
})

// connexion d'un utilisateur
router.post('/login', loginCheck, async (req, res) => {
	console.log(' info login : ', req.body)
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(401).json({
			status: 'error',
			message: 'Les informations saisies sont incorrectes',
		})
	}

	const user = await getUserByEmail(email)

	const pwdCompare = user && user._id ? user.password : null

	if (!pwdCompare)
		return res.status(401).json({
			status: 'error',
			message: 'vos identifiants sont incorrectes',
		})

	const result = await comparePassword(password, pwdCompare)
	if (!result) {
		return res.status(401).json({
			status: 'error',
			message: 'vos identifiants sont incorrectes',
		})
	}

	const accessToken = await createAccessToken(user.email, `${user._id}`)
	const refreshToken = await createRefreshToken(user.email, `${user._id}`)

	res.status(200).json({
		status: 'success',
		message: 'Connexion réussie',
		accessToken,
		refreshToken,
	})
})

// déconnexion de l'utilisateur
router.delete('/logout', checkToken, async (req, res) => {
	const token = req.headers.authorization

	const _id = req.userId
	// const userProfil = await getUserById(_id)

	deleteToken(token)
	const result = await storeUserRefreshToken(_id, '')

	res.status(200).json({ messeage: 'Déconnexion réussie' })
})

// réinitialisation du mot de passe
router.post('/reset-password', checkToken, resetMailCheck, async (req, res) => {
	const _id = req.userId
	const user = await getUserById(_id)

	if (user._id && user.email) {
		const setCode = await setResetCode(user.email)
		await mailProcessor({
			email: user.email,
			code: setCode.resetCode,
			type: 'Reset-Password',
		})

		console.log(setCode)

		return res.status(200).json({
			message: 'Un mail de ré-initialisation vous sera envoyé',
		})
	}

	return res.status(403).json({
		message: "Une erreur est survenue merci de renouveller l'opération",
	})
})

// mise à jour du mot de passe après réinitialisation
router.patch('/reset-password', updatePwdMailCheck, async (req, res) => {
	const { email, resetCode, newPassword } = req.body

	const getResetCode = await ResetPwdByMail(email, resetCode)

	if (getResetCode._id) {
		const createdDate = getResetCode.addedOn
		const expiresIn = 1

		let expirationDate = createdDate.setDate(createdDate.getDate() + expiresIn)
		const today = new Date()

		if (today > expirationDate) {
			return res
				.status(403)
				.json({ message: 'Le code utilisé est expiré ou invalide' })
		}

		const hashedNewPwd = await hashPassword(newPassword)
		const user = await updatePassword(email, hashedNewPwd)

		if (user._id) {
			await mailProcessor({ email: user.email, type: 'Password-update' })

			deleteOldCode(email, resetCode)

			return res
				.status(200)
				.json({ message: 'Votre mot de passe a été mis à jour' })
		}
	}

	return res.status(400).json({
		message: "L'opération a échoué, veuillez réessayer ultérieurement",
	})
})

module.exports = router
