'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _cleanWeirdBits = require('./clean-weird-bits');

var _cleanWeirdBits2 = _interopRequireDefault(_cleanWeirdBits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function thing(_rawLine) {
	var rawLine = _rawLine.map(_cleanWeirdBits2.default).filter(function (entry) {
		return !!entry;
	});
	if (!rawLine.length) return;

	var line = (0, _cleanWeirdBits2.default)(rawLine);
	var parts = line.split(';');
	var timestamp = parts[1].replace(/\./g, ':');

	var _timestamp$split = timestamp.split('/'),
	    _timestamp$split2 = (0, _slicedToArray3.default)(_timestamp$split, 3),
	    date = _timestamp$split2[0],
	    month = _timestamp$split2[1],
	    remaining = _timestamp$split2[2];

	var parsedTimestamp = new Date([month, date, remaining].join('/'));

	var entry = {
		timestamp: parsedTimestamp,
		level: parseInt(parts[5])
	};

	if (entry.level) {
		return entry;
	}
}

exports.default = thing;