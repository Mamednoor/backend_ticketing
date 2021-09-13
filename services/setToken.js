const jwt = require('jsonwebtoken')

const { setToken, getToken } = require('./redis')
const { storeUserRefreshToken } = require('../model/users/User.model')

const createAccessToken = async (email, _id) => {
	try {
		const accessToken = await jwt.sign({ email }, process.env.ACCESS_TOKEN, {
			expiresIn: '2h',
		})
		await setToken(accessToken, `${_id}`)
		return Promise.resolve(accessToken)
	} catch (error) {
		return Promise.reject(error)
	}
}

const createRefreshToken = async (email, _id) => {
	try {
		const refreshToken = await jwt.sign({ email }, process.env.REFRESH_TOKEN, {
			expiresIn: '2d',
		})
		await storeUserRefreshToken(_id, refreshToken)
		return Promise.resolve(refreshToken)
	} catch (error) {
		return Promise.reject(error)
	}
}

const verifyAccessToken = (userToken) => {
	try {
		return Promise.resolve(jwt.verify(userToken, process.env.ACCESS_TOKEN))
	} catch (error) {
		return Promise.resolve(error)
	}
}

const verifyRefreshToken = (userToken) => {
	try {
		return Promise.resolve(jwt.verify(userToken, process.env.REFRESH_TOKEN))
	} catch (error) {
		return Promise.resolve(error)
	}
}

module.exports = {
	createAccessToken,
	createRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
}
