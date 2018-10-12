/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Collapse = __webpack_require__(1);
	
	var _Collapse2 = _interopRequireDefault(_Collapse);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var ContainerNavCollapse = document.querySelector('#collapse-container-nav');
	  if (ContainerNavCollapse) {
	    new _Collapse2.default(ContainerNavCollapse);
	  }
	}); // Components

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*----------------------------------------*\
	  COLLAPSE
	  Show/hide an element by collapsing it
	  vertically
	\*----------------------------------------*/
	
	var DEFAULT_OPTIONS = {
	  onShow: function onShow() {},
	  onHide: function onHide() {},
	  onHidden: function onHidden() {}
	};
	
	var Collapse = function () {
	  function Collapse(el, options) {
	    _classCallCheck(this, Collapse);
	
	    if (typeof el === 'string') {
	      this._el = el;
	      this._collapse = document.querySelector(this._el);
	    } else if (el instanceof Element) {
	      this._collapse = el;
	      this._el = '#' + this._collapse.id;
	    } else {
	      return;
	    }
	
	    this._options = Object.assign({}, DEFAULT_OPTIONS, options);
	    this._triggers = [].concat(_toConsumableArray(document.querySelectorAll('[data-toggle="collapse"][data-target="' + this._el + '"]')));
	    this._active = this._collapse.classList.contains('active');
	    this._actions = [].concat(_toConsumableArray(document.querySelectorAll('[data-toggle="collapse"][data-target="' + this._el + '"] .collapse-action')));
	
	    this.toggle = this.toggle.bind(this);
	    this.show = this.show.bind(this);
	    this.hide = this.hide.bind(this);
	    this._activate = this._activate.bind(this);
	    this._deactivate = this._deactivate.bind(this);
	
	    this._addEventListeners();
	  }
	
	  _createClass(Collapse, [{
	    key: '_addEventListeners',
	    value: function _addEventListeners() {
	      var _this = this;
	
	      this._triggers.forEach(function (trigger) {
	        trigger.addEventListener('click', _this.toggle);
	      });
	    }
	  }, {
	    key: '_removeEventListeners',
	    value: function _removeEventListeners() {
	      var _this2 = this;
	
	      this._triggers.forEach(function (trigger) {
	        trigger.removeEventListener('click', _this2.toggle);
	      });
	    }
	  }, {
	    key: '_setHeight',
	    value: function _setHeight() {
	      var _this3 = this;
	
	      this._collapse.classList.add('calculating');
	
	      var width = this._collapse.parentElement.getBoundingClientRect().width;
	      this._collapse.style.width = width + 'px';
	      var height = this._collapse.getBoundingClientRect().height;
	      this._collapse.style.width = null;
	      var duration = Math.min(1000, Math.max(height * 3, 300));
	
	      this._collapse.classList.remove('calculating');
	
	      setTimeout(function () {
	        _this3._collapse.classList.add('transitioning');
	        _this3._collapse.style.transitionDuration = duration + 'ms';
	        _this3._collapse.style.height = height + 'px';
	      }, 20);
	    }
	
	    /**
	     * Switch from fixed height to auto once the transition is done
	     * So the collapse can grow later on if necessary.
	     * Especially useful for nested collapses.
	     */
	
	  }, {
	    key: '_activate',
	    value: function _activate() {
	      if (!this._active) {
	        return;
	      }
	
	      this._collapse.style.height = 'auto';
	      this._collapse.classList.remove('transitioning');
	      this._collapse.classList.add('active');
	      this._collapse.removeEventListener('transitionend', this._activate);
	    }
	  }, {
	    key: '_deactivate',
	    value: function _deactivate() {
	      this._collapse.classList.remove('transitioning');
	      this._collapse.removeEventListener('transitionend', this._deactivate);
	      this._options.onHidden.call(this, this._collapse);
	    }
	
	    /*----------------------------------------*\
	      PUBLIC
	    \*----------------------------------------*/
	
	    /**
	     * Toggle the collapse
	     * @param  {Event} e
	     */
	
	  }, {
	    key: 'toggle',
	    value: function toggle(e) {
	      if (e) {
	        e.preventDefault();
	      }
	      this._active ? this.hide() : this.show();
	    }
	
	    /**
	     * Show the collapse
	     */
	
	  }, {
	    key: 'show',
	    value: function show() {
	      this._setHeight();
	
	      this._collapse.addEventListener('transitionend', this._activate);
	
	      this._triggers.forEach(function (trigger) {
	        trigger.classList.add('active');
	      });
	
	      this._active = true;
	      this._options.onShow.call(this, this._collapse);
	      this.collapseActions();
	    }
	
	    /**
	     * Hide the collapse
	     */
	
	  }, {
	    key: 'hide',
	    value: function hide() {
	      var _this4 = this;
	
	      this._collapse.style.height = this._collapse.getBoundingClientRect().height + 'px';
	      setTimeout(function () {
	        _this4._collapse.style.height = null;
	      }, 20);
	      this._collapse.classList.remove('active');
	      this._collapse.classList.add('transitioning');
	
	      this._collapse.addEventListener('transitionend', this._deactivate);
	
	      this._triggers.forEach(function (trigger) {
	        trigger.classList.remove('active');
	      });
	
	      this._active = false;
	      this._options.onHide.call(this, this._collapse);
	      this.collapseActions();
	    }
	
	    /**
	     * Toggle collapse action
	     */
	
	  }, {
	    key: 'collapseActions',
	    value: function collapseActions() {
	      this._actions.forEach(function (action) {
	        action.classList.toggle('hidden');
	      });
	    }
	
	    /**
	     * Destroy this instance and stop listening to events
	     */
	
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._removeEventListeners();
	    }
	  }]);
	
	  return Collapse;
	}();
	
	exports.default = Collapse;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map