const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)

client.on('error', function (error) {
	console.error(error)
})

const setToken = (key, value) => {
	return new Promise((resolve, reject) => {
		try {
			client.set(key, value, (err, resp) => {
				if (err) reject(err)
				resolve(resp)
			})
		} catch (error) {
			reject(error)
		}
	})
}

const getToken = (key) => {
	return new Promise((resolve, reject) => {
		try {
			client.get(key, (err, resp) => {
				if (err) reject(err)
				resolve(resp)
			})
		} catch (error) {
			reject(error)
		}
	})
}

// fonction permettant de supprimer l'ancien token
const deleteToken = (key) => {
	try {
		client.del(key)
	} catch (error) {
		console.log(error)
	}
}

module.exports = { setToken, getToken, deleteToken }
