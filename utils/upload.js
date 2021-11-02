const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './assets')
	},
	filename: function (req, file, callback) {
		const d = new Date()
		const date =
			d.getFullYear() +
			'-' +
			(d.getMonth() + 1) +
			'-' +
			d.getDate() +
			'-' +
			d.getHours() +
			'-' +
			d.getMinutes() +
			'-' +
			d.getSeconds()
		const filename = file.originalname.replace(/ /g, '-')
		const dateFilename = date + '-' + filename
		//console.log('dateFilemane : ', dateFilename)
		callback(null, dateFilename)
	},
})

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		const ext = path.extname(file.originalname)
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
			return callback(
				new Error(
					'Seul les images avec les extensions suivantes sont acceptées: jpg, svg, png, jpeg',
				),
			)
		}
		callback(null, true)
	},
})

module.exports = { upload }
