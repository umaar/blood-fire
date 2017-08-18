'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _timeagoReact = require('timeago-react');

var _timeagoReact2 = _interopRequireDefault(_timeagoReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/umarhansa/development/blood-fire/server/next-prototype/components/last-reading.js';

exports.default = function (_ref) {
	var reading = _ref.reading;
	return _react2.default.createElement('div', { className: 'root', 'data-jsx': 3774296651,
		__source: {
			fileName: _jsxFileName,
			lineNumber: 6
		}
	}, _react2.default.createElement(_style2.default, {
		styleId: 3774296651,
		css: '.root[data-jsx="3774296651"]{text-align:center;font-family:\'Luckiest Guy\',cursive;margin-bottom:90px}p[data-jsx="3774296651"]{margin:10px}.time[data-jsx="3774296651"]{font-size:calc(30px + 4vw)}.level[data-jsx="3774296651"]{font-size:calc(40px + 13vw)}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGFzdC1yZWFkaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1jLEFBR3VCLEFBTU4sQUFJZSxBQUlDLFlBUDdCLE1BTnFDLFNBVXJDLENBSUEseUJBYm9CLG1CQUNwQiIsImZpbGUiOiJjb21wb25lbnRzL2xhc3QtcmVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdW1hcmhhbnNhL2RldmVsb3BtZW50L2Jsb29kLWZpcmUvc2VydmVyL25leHQtcHJvdG90eXBlIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgSWNvbiBmcm9tICcuLi9jb21wb25lbnRzL2ljb24nXG5pbXBvcnQgVGltZUFnbyBmcm9tICd0aW1lYWdvLXJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgKHtyZWFkaW5nfSkgPT4gKFxuXHQ8ZGl2IGNsYXNzTmFtZT1cInJvb3RcIj5cblx0XHQ8c3R5bGUganN4PntgXG5cdFx0XHQucm9vdCB7XG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRcdFx0Zm9udC1mYW1pbHk6ICdMdWNraWVzdCBHdXknLCBjdXJzaXZlO1xuXHRcdFx0XHRtYXJnaW4tYm90dG9tOiA5MHB4O1xuXHRcdFx0fVxuXG5cdFx0XHRwIHtcblx0XHRcdFx0bWFyZ2luOiAxMHB4O1xuXHRcdFx0fVxuXG5cdFx0XHQudGltZSB7XG5cdFx0XHRcdGZvbnQtc2l6ZTogY2FsYygzMHB4ICsgNHZ3KTtcblx0XHRcdH1cblxuXHRcdFx0LmxldmVsIHtcblx0XHRcdFx0Zm9udC1zaXplOiBjYWxjKDQwcHggKyAxM3Z3KTtcblx0XHRcdH1cblx0XHRgfTwvc3R5bGU+XG5cblx0XHQ8cCBjbGFzc05hbWU9XCJsZXZlbFwiPlxuXHRcdFx0e3JlYWRpbmcubGV2ZWx9XG5cdFx0XHQ8SWNvbiBsZXZlbD17cmVhZGluZy5sZXZlbH0gLz5cblx0XHQ8L3A+XG5cblx0XHQ8c3BhbiBjbGFzc05hbWU9XCJ0aW1lXCI+XG5cdFx0XHQ8VGltZUFnbyBkYXRldGltZT17cmVhZGluZy50aW1lc3RhbXB9IGxvY2FsZT0nZW4nIC8+XG5cdFx0PC9zcGFuPlxuXHQ8L2Rpdj5cbik7XG5cbiJdfQ== */\n/*@ sourceURL=components/last-reading.js */'
	}), _react2.default.createElement('p', { className: 'level', 'data-jsx': 3774296651,
		__source: {
			fileName: _jsxFileName,
			lineNumber: 27
		}
	}, reading.level, _react2.default.createElement(_icon2.default, { level: reading.level, __source: {
			fileName: _jsxFileName,
			lineNumber: 29
		}
	})), _react2.default.createElement('span', { className: 'time', 'data-jsx': 3774296651,
		__source: {
			fileName: _jsxFileName,
			lineNumber: 32
		}
	}, _react2.default.createElement(_timeagoReact2.default, { datetime: reading.timestamp, locale: 'en', __source: {
			fileName: _jsxFileName,
			lineNumber: 33
		}
	})));
};