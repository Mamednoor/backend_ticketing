//création d'un nouveau mot de passe pour la ré-initialisation
const codeGenerator = (length) => {
	let code = ''
	let possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&éèçàù'
	for (let i = 0; i < length; i++)
		code += possible.charAt(Math.floor(Math.random() * possible.length))
	return code
}

module.exports = { codeGenerator }
