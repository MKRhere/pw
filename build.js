const fs = require('fs')
const browserify = require('browserify')
const babelify = require('babelify')
const sass = require('node-sass')
const watch = require('node-watch')

let jsPath = {
	get: './js/main.js',
	put: './public/js/bundle.js'
}

let cssPath = {
	get: './sass/style.sass',
	put: './public/css/style.css'
}

const jsfy = () => {
	browserify({ debug: true })
		.transform(babelify)
		.require(jsPath.get, { entry: true })
		.bundle()
		.on('error', function (err) { console.log('Error: ' + err.message) })
		.pipe(fs.createWriteStream(jsPath.put))
}

const cssfy = () => {
	sass.render({
		file: cssPath.get
	}, function (err, result) {
		fs.writeFile(cssPath.put, result.css, (e) => {
			if (e) console.log(console.log('[ERR] : ' + e))
		})
	})
}

function start() {
	try {
		jsfy()
		cssfy()
	} catch (e) {
		console.log('[ERR] : ' + e)
	}
}

start()

watch(['js', 'sass'],
	{
		recursive: true
	},
	start
)