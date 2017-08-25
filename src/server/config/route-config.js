(function (routeConfig) {
	routeConfig.init = function (app) {
		const indexRoute = require('../routes/index');

		app.use('/', indexRoute);
	};
})(module.exports);
