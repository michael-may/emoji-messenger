const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const enforce = require('express-sslify');

// Handle environment file
const fs = require('fs');
if (fs.existsSync('.env')) {
	require('dotenv').config();
}

const isLocal = process.env.LOCALHOST || false;

const init = function() {
	const app = express();

	app.use(compression());
	if (!isLocal) {
		app.use(enforce.HTTPS({ trustProtoHeader: true }));
	}

	// Security header middleware.
	app.use(helmet())

	app.use((req, res, next) => {
		// Only allow specific CORS requests.
		if (
			typeof req.headers !== 'undefined' &&
			typeof req.headers.origin !== 'undefined'
		) {
			if (
				req.headers.origin.indexOf('localhost') !== -1 &&
				req.headers.host.indexOf('localhost') !== -1
			) {
				res.header('Access-Control-Allow-Origin', req.headers.origin);
			}
		}
		next();
	});

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		next();
	});

	// Handle static files
	app.use((req, res, next) => {
		next();
	}, express.static(__dirname + '/www', { fallthrough: true }));

	// Everything else to index
	app.get('*', (req, res) => {
		res.sendFile(__dirname + '/www/index.html');
	});

	console.log('Starting server...');
	let server = app.listen(process.env.PORT || 8080, function() {
		let port = server.address().port;
		console.log('Server listening on ' + port);
	});
};

init();
