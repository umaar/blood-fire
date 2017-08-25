/* global window, document */

const timeago = require('timeago.js');

function init() {
	const els = document.querySelectorAll('[datetime]');
	timeago().render(els);
}

window.onload = init;
