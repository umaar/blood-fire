'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/umarhansa/development/blood-fire/server/next-prototype/components/icon.js';

function getIconForLevel(level) {
	if (level > 300) {
		return '🚨 ☠';
	} else if (level > 200) {
		return '⚠️';
	} else if (level > 100) {
		return '😴';
	}

	return '🙂';
}

exports.default = function (_ref) {
	var level = _ref.level;
	return _react2.default.createElement('span', {
		__source: {
			fileName: _jsxFileName,
			lineNumber: 14
		}
	}, getIconForLevel(level));
};