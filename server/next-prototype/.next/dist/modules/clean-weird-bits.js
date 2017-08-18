'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function cleanWeirdBits(str) {
	return decodeURIComponent(encodeURIComponent(str)).replace(/[\x00-\x1F\x7F-\x9F]/g, '');
}

exports.default = cleanWeirdBits;