/* global window, document */

const timeago = require('timeago.js');

const visualisation = require('./modules/visualisation');

function init() {
	const els = document.querySelectorAll('[datetime]');
	timeago().render(els);

	visualisation.init();
}

window.onload = init;
