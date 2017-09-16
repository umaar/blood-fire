/* global window, document */

import timeago from 'timeago.js';
import visualisation from './modules/visualisation';

function init() {
	if (location.pathname === '/') {
		const els = document.querySelectorAll('[datetime]');
		timeago().render(els);
		visualisation.init();
	}
}

window.onload = init;
