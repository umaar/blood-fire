'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lastReading = require('../components/last-reading');

var _lastReading2 = _interopRequireDefault(_lastReading);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _download = require('download');

var _download2 = _interopRequireDefault(_download);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _fastCsv = require('fast-csv');

var _fastCsv2 = _interopRequireDefault(_fastCsv);

var _bloodLine = require('../modules/blood-line');

var _bloodLine2 = _interopRequireDefault(_bloodLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/umarhansa/development/blood-fire/server/next-prototype/pages/index.js?entry';

//////////////

// const url = 'https://www.dropbox.com/sh/pprrtnz0v6zt978/AABtu7bXJ4Vk5pxhGnQtIjMXa/GlicemiaMisurazioni.csv.gz?dl=1';
var url = 'http://127.0.0.1:8080/GlicemiaMisurazioni.csv.gz';
var allData = [];

var MyPage = function (_React$Component) {
	(0, _inherits3.default)(MyPage, _React$Component);

	function MyPage() {
		(0, _classCallCheck3.default)(this, MyPage);

		return (0, _possibleConstructorReturn3.default)(this, (MyPage.__proto__ || (0, _getPrototypeOf2.default)(MyPage)).apply(this, arguments));
	}

	(0, _createClass3.default)(MyPage, [{
		key: 'render',
		value: function render() {
			var data = this.props.data;

			return _react2.default.createElement('div', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 48
				}
			}, _react2.default.createElement(_head2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 49
				}
			}, _react2.default.createElement('link', { href: 'static/main.css', rel: 'stylesheet', __source: {
					fileName: _jsxFileName,
					lineNumber: 50
				}
			}), _react2.default.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Luckiest+Guy|Roboto', rel: 'stylesheet', __source: {
					fileName: _jsxFileName,
					lineNumber: 51
				}
			})), _react2.default.createElement('div', { className: 'container', __source: {
					fileName: _jsxFileName,
					lineNumber: 53
				}
			}, _react2.default.createElement(_lastReading2.default, { reading: data[0], __source: {
					fileName: _jsxFileName,
					lineNumber: 54
				}
			})));
		}
	}], [{
		key: 'getInitialProps',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				var gunzip, csvStream;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (allData.length) {
									_context.next = 7;
									break;
								}

								gunzip = _zlib2.default.createGunzip();
								csvStream = (0, _fastCsv2.default)().on('data', function (data) {
									var transformedData = (0, _bloodLine2.default)(data);

									if (transformedData && transformedData.level) {
										allData.push(transformedData);
									}
								}).on('end', function () {
									return console.log('\n\nDONE');
								});
								_context.next = 5;
								return (0, _download2.default)(url).pipe(gunzip).pipe(csvStream);

							case 5:
								_context.next = 9;
								break;

							case 7:
								console.log('We already have the data!');
								console.log(allData[0]);

							case 9:
								return _context.abrupt('return', {
									data: allData
								});

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getInitialProps() {
				return _ref.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return MyPage;
}(_react2.default.Component);

exports.default = MyPage;