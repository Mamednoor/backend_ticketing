const nodemailer = require('nodemailer')

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		type: 'Login',
		user: process.env.User_MAILER,
		pass: process.env.Password_MAILER,
	},
})

const send = (mailler) => {
	return new Promise(async (resolve, reject) => {
		try {
			// send mail with defined transport object
			let result = await transporter.sendMail(mailler)

			resolve(result)
		} catch (error) {
			console.log(error)
			reject(error)
		}
	})
}

const mailProcessor = ({
	email,
	code,
	type,
	activationLink = '',
	resetPasswordLink = '',
}) => {
	let mailer = ''
	switch (type) {
		case 'Reset-Password':
			mailler = {
				from: '"MNG Company" <compteservicecda@gmail.com>', // sender address
				to: email, // list of receivers
				subject: 'Code de réinitialisation de votre mot de passe', // Subject line
				text:
					'Voici votre code de ré-initialisation' +
					code +
					' ce code est valable pendant 24H', // plain text body
				html: `<p>Bonjour,</p>
					Voici votre code de ré-initialisation 
					<b>${code}</b>
					ce code est valable pendant 24H
					<p>Merci de suivre le lien afin de modifier de votre mot de passe</p>
					<p>${resetPasswordLink}</p>
					<p>Merci de ne pas répondre à ce mail</p>
					<p>Cordialement.</p>`, // html body
			}
			send(mailler)
			break
		case 'Password-update':
			mailler = {
				from: '"MNG Company" <compteservicecda@gmail.com>', // sender address
				to: email, // list of receivers
				subject: 'Réinitialisation du mot de passe effectuée', // Subject line
				text: 'Votre mot de passe a été mise à jour', // plain text body
				html: `<p>Bonjour,</p>
						Votre mot de passe a été mise à jour 
					<p>Vous pouvez de nouveau vous connecter</p>
					<p>Cordialement.</p>`, // html body
			}
			send(mailler)
			break
		case 'User-Confirmation':
			mailler = {
				from: '"MNG Company" <compteservicecda@gmail.com>', // sender address
				to: email, // list of receivers
				subject: 'Validation de la création de votre compte utilisateur', // Subject line
				text: 'Merci de suivre le lien suivant pour la validation de votre compte ', // plain text body
				html: `<p>Bonjour,</p>
							Merci de suivre le lien suivant pour la validation de votre compte 
						<p>${activationLink}</p>
						<p>Cordialement.</p>`, // html body
			}
			send(mailler)
			break
		default:
			break
	}
}

module.exports = { mailProcessor }
