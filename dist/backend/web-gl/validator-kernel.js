'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebGLKernel = require('./kernel');
var utils = require('../../core/utils');

/**
 * @class WebGLValidatorKernel
 *
 * @desc Helper class for WebGLKernel to validate texture size and dimensions.
 *
 */
module.exports = function (_WebGLKernel) {
	_inherits(WebGLValidatorKernel, _WebGLKernel);

	function WebGLValidatorKernel() {
		_classCallCheck(this, WebGLValidatorKernel);

		return _possibleConstructorReturn(this, (WebGLValidatorKernel.__proto__ || Object.getPrototypeOf(WebGLValidatorKernel)).apply(this, arguments));
	}

	_createClass(WebGLValidatorKernel, [{
		key: 'validateOptions',


		/** 
   * @memberOf WebGLValidatorKernel#
   * @function
   * @name validateOptions
   *
   */
		value: function validateOptions() {
			this.texSize = utils.dimToTexSize({
				floatTextures: this.floatTextures,
				floatOutput: this.floatOutput
			}, this.output, true);
		}
	}]);

	return WebGLValidatorKernel;
}(WebGLKernel);