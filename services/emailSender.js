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
			reject(error)
		}
	})
}

const mailProcessor = ({
	email,
	code,
	type,
	firstname = '',
	lastname = '',
	password = '',
	activationLink = '',
	resetPasswordLink = '',
}) => {
	let mailer = ''
	switch (type) {
		case 'Reset-Password':
			mailler = {
				from: '"MNG Company" <compteservicecda@gmail.com>', // sender address
				to: email, // list of receivers
				subject: '***NO-REPLY*** Réinitialisation du mot de passe', // Subject line
				text:
					'Voici votre code de ré-initialisation' +
					code +
					' ce code est valable pendant 24H', // plain text body
				html: `
					<p>Bonjour ${firstname} ${lastname},</p>

					<p>Vous avez demandé à réinitialiser votre mot de passe pour votre compte. Utilisez le lien ci-dessous pour le réinitialiser.</p>
					<p>Merci d'utiliser le code suivant : <b>${code}</b></p>
					<a href=${resetPasswordLink}>Lien de réinitialisation</a>
					<p>Le lien ainsi que le code sont valable pour une durée de 24H</p>
					<p>Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail.</p>

					<p>Merci de ne pas répondre à ce mail</p>

					<p>Cordialement.</p>`, // html body
			}
			send(mailler)
			break
		case 'Password-update':
			mailler = {
				from: '"MNG Company" <compteservicecda@gmail.com>', // sender address
				to: email, // list of receivers
				subject: '***NO-REPLY*** Réinitialisation du mot de passe effectuée', // Subject line
				text: 'Votre mot de passe a été mise à jour', // plain text body
				html: `<p>Bonjour ${firstname} ${lastname},</p>
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
				subject:
					'***NO-REPLY*** Validation de la création de votre compte utilisateur', // Subject line
				text: 'Merci de suivre le lien suivant pour la validation de votre compte ', // plain text body
				html: `<p>Bonjour,</p>
							Merci de suivre le lien suivant pour la validation de votre compte 
						<p>${activationLink}</p>
						<p>Cordialement.</p>`, // html body
			}
			send(mailler)
			break
		case 'User-Created':
			mailler = {
				from: '"MNG Company" <compteservicecda@gmail.com>', // sender address
				to: email, // list of receivers
				subject: '***NO-REPLY*** Nous avons crée votre compte', // Subject line
				text: 'Merci de suivre le lien suivant pour la validation de votre compte, Afin de pouvoir vous connecter, merci de réinitialiser votre mot de passe', // plain text body
				html: `<p>Bonjour ${firstname} ${lastname},</p>
								Merci de suivre le lien suivant pour la validation de votre compte 
							<p>${activationLink}</p>
							<p>Voici votre mot de passe provisoire <strong>${password}</strong></p>
							<p>Nous vous prions de modifier votre mot de passe avec la procédure de ré-initialisation</p>
							<p>Cordialement.</p>`, // html body
			}
			send(mailler)
			break
		default:
			break
	}
}

module.exports = { mailProcessor }
