(function (errorConfig) {
	'use strict';

	errorConfig.init = function (app) {
		// catch 404 and forward to error handler
		app.use((req, res) => {
			const err = new Error('Not Found');
			err.status = 404;
			res.status(err.status).render('error', {
				message: 'Not found'
			});
		});

		app.use((err, req, res) => {
			res.status(err.status || 500).render('error', {
				message: 'Something went wrong'
			});
		});
	};
})(module.exports);
