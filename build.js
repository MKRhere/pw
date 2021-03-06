const fs = require('fs')
const browserify = require('browserify')
const babelify = require('babelify')
const sass = require('node-sass')
const watch = require('node-watch')

let jsPath = {
	get: './js/main.js',
	put: './docs/js/bundle.js'
}

let cssPath = {
	get: './sass/style.sass',
	put: './docs/css/style.css'
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
			if (e) throw new Error('[ERR] : ' + e)
		})
	})
}

function start() {
	console.log('Running build...')
	try {
		jsfy()
		cssfy()
	} catch (e) {
		throw new Error('[ERR] : ' + e)
	}
}

start()

watch(['js', 'sass'],
	{
		recursive: true
	},
	start
)

console.log('Exiting.')
