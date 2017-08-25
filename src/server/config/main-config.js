(function (appConfig) {
	'use strict';

	const rev = require('express-rev');
	const path = require('path');
	const bodyParser = require('body-parser');
	const nunjucks = require('nunjucks');
	const config = require('config');

	const viewFolders = [
		path.join(__dirname, '..', 'views')
	];

	appConfig.init = function (app, express) {
		app.disable('x-powered-by');

		nunjucks.configure(viewFolders, {
			express: app,
			autoescape: true
		});

		app.locals.config = {
			analyticsTrackingCode: config.get('analyticsTrackingCode')
		};

		app.set('view engine', 'html');

		app.use(rev({
			manifest: 'dist/rev-manifest.json',
			prepend: ''
		}));

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: false
		}));

		app.use(express.static('dist', {
			maxAge: '1y'
		}));

		app.use((req, res, next) => {
			res.locals.user = req.user;
			next();
		});
	};
})(module.exports);
