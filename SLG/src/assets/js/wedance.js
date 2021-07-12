/*!-----------------------------------------------------------------
    Name: WeDance - Modern HTML Template Bootstrap
    Version: 1.0.0
    Author: dexad
    Website: https://dkcoder.info/
    Purchase: https://themeforest.net/user/unvab/portfolio
    Support: https://dkcoder.info/
    License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
    Copyright 2018.
-------------------------------------------------------------------*/
    /******/ (function(modules) { // webpackBootstrap
            "use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.TweenMax;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isFireFox = typeof InstallTrigger !== 'undefined';
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;
function getWndSize() {
    exports.wndW = wndW = $wnd.width();
    exports.wndH = wndH = $wnd.height();
    exports.docH = docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout = void 0;
function debounceResized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        if (resizeArr.length) {
            for (var k = 0; k < resizeArr.length; k++) {
                resizeArr[k]();
            }
        }
    }, 50);
}
$wnd.on('ready load resize orientationchange', debounceResized);
debounceResized();

function debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
var hideOnScrollList = [];
var didScroll = void 0;
var lastST = 0;

$wnd.on('scroll load resize orientationchange', function () {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    var ST = $wnd.scrollTop();

    var type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    hideOnScrollList.forEach(function (item) {
        if (typeof item === 'function') {
            item(type, ST, lastST, $wnd);
        }
    });

    lastST = ST;
}

setInterval(function () {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function throttleScroll(callback) {
    hideOnScrollList.push(callback);
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
var bodyOverflowEnabled = void 0;
var isBodyOverflowing = void 0;
var scrollbarWidth = void 0;
var originalBodyPadding = void 0;
var $headerContent = $('.dk-header > *');
function isBodyOverflowed() {
    return bodyOverflowEnabled;
}
function bodyGetScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'dk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body.css('padding-right') || '';
    }

    if (isBodyOverflowing) {
        $body.add($headerContent).css('paddingRight', scrollbarWidth + 'px');
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $headerContent.css('paddingRight', '');
}
function bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport($item, returnRect) {
    var rect = $item[0].getBoundingClientRect();
    var result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        var beforeTopEnd = Math.max(0, rect.height + rect.top);
        var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        var afterTop = Math.max(0, -rect.top);
        var beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else if (beforeTopEnd <= wndH) {
            result = beforeTopEnd / wndH;
        } else if (beforeBottomEnd <= wndH) {
            result = beforeBottomEnd / wndH;
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}

/**
 * Scroll To
 */
function scrollTo($to, callback) {
    var scrollPos = false;
    var speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, speed, {
            scrollTo: {
                y: scrollPos,

                // disable autokill on iOs (buggy scrolling)
                autoKill: !isIOs
            },
            ease: Power2.easeOut,
            overwrite: 5
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}

exports.$ = $;
exports.tween = tween;
exports.isIOs = isIOs;
exports.isMobile = isMobile;
exports.isFireFox = isFireFox;
exports.isTouch = isTouch;
exports.$wnd = $wnd;
exports.$doc = $doc;
exports.$body = $body;
exports.wndW = wndW;
exports.wndH = wndH;
exports.docH = docH;
exports.debounceResize = debounceResize;
exports.throttleScroll = throttleScroll;
exports.bodyOverflow = bodyOverflow;
exports.isBodyOverflowed = isBodyOverflowed;
exports.isInViewport = isInViewport;
exports.scrollTo = scrollTo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    parallaxSpeed: 0.8,
    scrollToAnchorSpeed: 700
};

exports.options = options;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Plugins */


var _options = __webpack_require__(1);

var _utility = __webpack_require__(0);

var _setOptions2 = __webpack_require__(6);

var _initNavbar2 = __webpack_require__(7);

var _initCount2 = __webpack_require__(8);

var _initBtnLoad2 = __webpack_require__(9);

var _initAnchor2 = __webpack_require__(10);

var _initAos2 = __webpack_require__(11);

var _initPluginStickyNavbar2 = __webpack_require__(12);

var _initPluginImagesLoaded2 = __webpack_require__(13);

var _initPluginIsotope2 = __webpack_require__(14);

var _initPluginJarallax2 = __webpack_require__(15);

var _initPluginSwiper2 = __webpack_require__(16);

var _initPluginOFI2 = __webpack_require__(17);

var _initPluginLightGallery2 = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------------------------------------

  We Dance Class

-------------------------------------------------------------------*/
var WEDANCE = function () {
    function WEDANCE() {
        _classCallCheck(this, WEDANCE);

        this.options = _options.options;
    }

    _createClass(WEDANCE, [{
        key: 'init',
        value: function init() {
            // prt:sc:dm
            this.initNavbar();
            this.initCount();
            this.initBtnLoad();
            this.initAnchor();
            this.initAos();
            this.initPluginJarallax();
            this.initPluginLightGallery();
            this.initPluginStickyNavbar();
            this.initPluginImagesLoaded();
            this.initPluginIsotope();
            this.initPluginSwiper();
            this.initPluginOFI();

            return this;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(newOpts) {
            return _setOptions2.setOptions.call(this, newOpts);
        }
    }, {
        key: 'debounceResize',
        value: function debounceResize(func) {
            return _utility.debounceResize.call(this, func);
        }
    }, {
        key: 'throttleScroll',
        value: function throttleScroll(callback) {
            return _utility.throttleScroll.call(this, callback);
        }
    }, {
        key: 'bodyOverflow',
        value: function bodyOverflow(type) {
            return _utility.bodyOverflow.call(this, type);
        }
    }, {
        key: 'isInViewport',
        value: function isInViewport($item, returnRect) {
            return _utility.isInViewport.call(this, $item, returnRect);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo($to, callback) {
            return _utility.scrollTo.call(this, $to, callback);
        }
    }, {
        key: 'initNavbar',
        value: function initNavbar() {
            return _initNavbar2.initNavbar.call(this);
        }
    }, {
        key: 'initCount',
        value: function initCount() {
            return _initCount2.initCount.call(this);
        }
    }, {
        key: 'initBtnLoad',
        value: function initBtnLoad() {
            return _initBtnLoad2.initBtnLoad.call(this);
        }
    }, {
        key: 'initAnchor',
        value: function initAnchor() {
            return _initAnchor2.initAnchor.call(this);
        }
    }, {
        key: 'initAos',
        value: function initAos() {
            return _initAos2.initAos.call(this);
        }
    }, {
        key: 'initPluginStickyNavbar',
        value: function initPluginStickyNavbar() {
            return _initPluginStickyNavbar2.initPluginStickyNavbar.call(this);
        }
    }, {
        key: 'initPluginImagesLoaded',
        value: function initPluginImagesLoaded() {
            return _initPluginImagesLoaded2.initPluginImagesLoaded.call(this);
        }
    }, {
        key: 'initPluginIsotope',
        value: function initPluginIsotope() {
            return _initPluginIsotope2.initPluginIsotope.call(this);
        }
    }, {
        key: 'initPluginJarallax',
        value: function initPluginJarallax($context) {
            return _initPluginJarallax2.initPluginJarallax.call(this, $context);
        }
    }, {
        key: 'initPluginSwiper',
        value: function initPluginSwiper() {
            return _initPluginSwiper2.initPluginSwiper.call(this);
        }
    }, {
        key: 'initPluginOFI',
        value: function initPluginOFI() {
            return _initPluginOFI2.initPluginOFI.call(this);
        }
    }, {
        key: 'initPluginLightGallery',
        value: function initPluginLightGallery() {
            return _initPluginLightGallery2.initPluginLightGallery.call(this);
        }
    }]);

    return WEDANCE;
}();

/*------------------------------------------------------------------

  Init We Dance

-------------------------------------------------------------------*/


window.WeDance = new WEDANCE();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOptions = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function setOptions(newOpts) {
    var self = this;

    var optsTemplates = _utility.$.extend({}, this.options.templates, newOpts && newOpts.templates || {});

    self.options = _utility.$.extend({}, self.options, newOpts);
    self.options.templates = optsTemplates;
}

exports.setOptions = setOptions;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    var $navbar = (0, _utility.$)('nav.dx-navbar:first');
    var $navbarSide = $navbar.next('.dx-navbar-side');

    if (!$navbar.length && !$navbarSide.length) {
        return;
    }
    $navbar.each(function () {
        var $this = (0, _utility.$)(this);
        var $body = (0, _utility.$)('body');

        if ($navbarSide.find('.dx-nav-content')) {
            $this.find('.dx-nav').clone().appendTo($navbarSide.find('.dx-nav-content'));
        } else {
            $this.find('.dx-nav').clone().appendTo($navbarSide);
        }

        // Scroll
        if ($navbar.hasClass('dx-navbar-fixed') || $navbar.hasClass('dx-navbar-sticky')) {
            (0, _utility.$)(window).on('load', function () {
                if ($this.offset().top > 100) {
                    $this.addClass('dx-navbar-scroll');
                }
            });
            (0, _utility.throttleScroll)(function () {
                var toTop = (0, _utility.$)(document).scrollTop();

                if (toTop > 100) {
                    $this.addClass('dx-navbar-scroll');
                } else {
                    $this.removeClass('dx-navbar-scroll');
                }
            });
        }

        // Transparent
        if ($navbar.hasClass('dx-navbar-transparent')) {
            (0, _utility.$)(window).on('load', function () {
                if ($this.offset().top > 100) {
                    $this.removeClass('dx-navbar-transparent');
                }
            });
            (0, _utility.throttleScroll)(function () {
                var toTop = (0, _utility.$)(document).scrollTop();

                if (toTop > 100) {
                    $this.removeClass('dx-navbar-transparent');
                } else {
                    $this.addClass('dx-navbar-transparent');
                }
            });
        }

        // Burger
        (0, _utility.$)('<div class="dx-navbar-burger"><span></span><span></span><span></span></div>').appendTo($this.find('[class*="container"]').add($navbarSide.find('[class*="container"]')));

        var $burger = $navbar.add($navbarSide).find('.dx-navbar-burger');
        $burger.on('click', function () {
            $body.add($burger).add($navbarSide).toggleClass('dx-open-side');
        });

        // Close Block
        $navbarSide.after('<div class="dx-navbar-close"></div>');
        $navbarSide.next().on('click', function () {
            $body.add($burger).add($navbarSide).removeClass('dx-open-side');
        });

        // Remove Classe on Scroll
        (0, _utility.throttleScroll)(function () {
            $body.add($burger).add($navbarSide).removeClass('dx-open-side');
        });
    });
}

exports.initNavbar = initNavbar;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initCount = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Count

-------------------------------------------------------------------*/
function initCount() {
    (0, _utility.throttleScroll)(function () {
        (0, _utility.$)('.dx-count:not(.dx-count-stop)').each(function () {
            var $this = (0, _utility.$)(this);
            var $count = $this.find('.dx-count-number');
            var $speed = $this.attr('data-count-speed');

            if ((0, _utility.isInViewport)($this) > 0) {
                $count.prop('Counter', 0).animate({
                    Counter: $count.text()
                }, {
                    duration: Number($speed),
                    easing: 'swing',
                    step: function step(now) {
                        $count.text(Math.ceil(now));
                    }
                });

                $this.addClass('dx-count-stop');
            }
        });
    });
}

exports.initCount = initCount;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBtnLoad = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Btn Load

-------------------------------------------------------------------*/
function initBtnLoad() {
    (0, _utility.$)('.dk-btn-load').each(function () {
        var $this = (0, _utility.$)(this);

        $this.on('click', function (e) {
            e.preventDefault();
            $this.addClass('dk-btn-loading');

            setTimeout(function () {
                $this.removeClass('dk-btn-loading');

                if ($this.hasClass('dk-btn-post')) {
                    $this.text('all posts shown');
                }
                if ($this.hasClass('dk-btn-work')) {
                    $this.text('all works shown');
                }

                $this.addClass('dk-btn-loaded');
            }, 2000);
        });
    });
}

exports.initBtnLoad = initBtnLoad;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAnchor = undefined;

var _utility = __webpack_require__(0);

/* Portfolio */
function initAnchor() {
    (0, _utility.$)('.dx-anchor').each(function () {
        var _this = this;

        var $this = (0, _utility.$)(this);

        $this.on('click', function (e) {
            e.preventDefault();

            if (_this.hash !== '') {
                if ((0, _utility.$)('.dx-navbar').length) {
                    (0, _utility.$)('html, body').animate({
                        scrollTop: (0, _utility.$)(_utility.$.attr(_this, 'href')).offset().top - (0, _utility.$)('.dx-navbar').innerHeight()
                    }, 800);
                } else {
                    (0, _utility.$)('html, body').animate({
                        scrollTop: (0, _utility.$)(_utility.$.attr(_this, 'href')).offset().top
                    }, 800);
                }
            }
        });
    });
}

exports.initAnchor = initAnchor;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* Aos */
function initAos() {
    if ($('[data-aos]').length) {
        // eslint-disable-next-line
        AOS.init();
    }
}

exports.initAos = initAos;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPluginStickyNavbar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Sticky Navbar

-------------------------------------------------------------------*/
function initPluginStickyNavbar() {
  (0, _utility.$)('.dx-navbar-sticky').stick_in_parent();
}

exports.initPluginStickyNavbar = initPluginStickyNavbar;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginImagesLoaded = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin ImagesLoaded

-------------------------------------------------------------------*/
function initPluginImagesLoaded() {
    var $grid = (0, _utility.$)('.dk-isotope-grid').isotope({
        itemSelector: '.dk-isotope-grid-item',
        layoutMode: 'masonry'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
}

exports.initPluginImagesLoaded = initPluginImagesLoaded;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginIsotope = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Isotope

-------------------------------------------------------------------*/
function initPluginIsotope() {
    var $grid = (0, _utility.$)('.dx-isotope-grid').isotope({
        itemSelector: '.dx-isotope-grid-item',
        layoutMode: 'masonry'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
}

exports.initPluginIsotope = initPluginIsotope;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginJarallax = undefined;

var _utility = __webpack_require__(0);

/* Jarallax */
function initPluginJarallax() {
    if (typeof _utility.$.fn.jarallax === 'undefined') {
        return;
    }

    // primary parallax
    (0, _utility.$)('.bg-image-parallax').jarallax({
        speed: this.options.parallaxSpeed
    });
}

exports.initPluginJarallax = initPluginJarallax;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginSwiper = undefined;

var _utility = __webpack_require__(0);

/* Swiper */
function initPluginSwiper() {
    // Main
    var swiperSearch = (0, _utility.$)('.swiper-container');
    swiperSearch.each(function () {
        var $this = (0, _utility.$)(this);
        var swiperSlides = Number($this.attr('data-swiper-slides'));
        var swiperSpeed = Number($this.attr('data-swiper-speed'));
        var swiperSpace = Number($this.attr('data-swiper-space'));
        var swiperInitial = Number($this.attr('data-swiper-initial'));
        var swiperSlidesAuto = $this.attr('data-swiper-slidesAuto');
        var swiperArrows = $this.attr('data-swiper-arrows');
        var swiperArrowsClone = $this.attr('data-swiper-arrows-clone');
        var swiperThumbs = $this.attr('data-swiper-thumbs');
        var swiperGrabCursor = $this.attr('data-swiper-grabCursor');
        var swiperBreakpoints = $this.attr('data-swiper-breakpoints');
        var swiperPagination = $this.attr('data-swiper-pagination');
        var swiperPaginationDynamic = $this.attr('data-swiper-pagination-dynamic');
        var swiperHeight = $this.attr('data-swiper-autoHeight');
        var swiperLoop = $this.attr('data-swiper-loop');
        var conf = {};

        if (swiperSpeed) {
            conf.speed = swiperSpeed;
        }
        if (swiperSpace) {
            conf.spaceBetween = swiperSpace;
        }
        if (swiperInitial) {
            conf.initialSlide = swiperInitial;
        }
        if (swiperSlides > 1) {
            conf.slidesPerView = swiperSlides;
        }
        if (swiperSlidesAuto === 'true') {
            conf.slidesPerView = 'auto';
            conf.centeredSlides = true;
        }
        if (swiperArrows === 'true') {
            conf.navigation = { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' };

            if (swiperArrowsClone === 'true') {
                var $arrows = $this.prev();
                $arrows.css({
                    position: 'absolute', top: $this.position().top + 20, height: $this.height(), width: $this.width()
                });
                $this.find('.swiper-button-next, .swiper-button-prev').appendTo($arrows.find('.container'));
            }
        }
        if (swiperPagination === 'true') {
            conf.pagination = { el: '.swiper-pagination', type: 'bullets', clickable: true };
        }
        if (swiperPaginationDynamic === 'true') {
            conf.pagination = { el: '.swiper-pagination', dynamicBullets: true, clickable: true };
        }
        if (swiperHeight === 'true') {
            conf.autoHeight = swiperHeight;
        }
        if (swiperLoop === 'true') {
            conf.loop = swiperLoop;
        }
        if (swiperGrabCursor === 'true') {
            conf.grabCursor = true;
        }
        if (swiperThumbs === 'true') {
            conf.thumbs = {
                // eslint-disable-next-line
                swiper: new Swiper($this.next(), {
                    spaceBetween: Number($this.next().attr('data-swiper-space')),
                    slidesPerView: Number($this.next().attr('data-swiper-slides')),
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    breakpoints: {
                        992: {
                            slidesPerView: 3
                        },
                        768: {
                            slidesPerView: 2
                        },
                        576: {
                            slidesPerView: 1
                        }
                    }
                })
            };
        }
        if (swiperBreakpoints === 'true' && swiperSlides) {
            var numberOfPoints = 3;
            var points = [576, 768, 992];
            var breaks = {};

            while (swiperSlides > 0 && numberOfPoints > 0) {
                breaks[points[numberOfPoints - 1]] = { slidesPerView: swiperSlides };

                swiperSlides--;
                numberOfPoints--;
            }
            conf.breakpoints = breaks;
        }

        // eslint-disable-next-line
        new window.Swiper(this, conf);
    });
}

exports.initPluginSwiper = initPluginSwiper;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/* Object-Fit-Image */
function initPluginOFI() {
    if (typeof window.objectFitImages !== 'undefined') {
        window.objectFitImages();
    }
}

exports.initPluginOFI = initPluginOFI;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* LightGallery */
function initPluginLightGallery() {
    if ($('.dx-gallery').length) {
        $(document).ready(function () {
            $('.dx-gallery').lightGallery({
                selector: '.dx-gallery-item'
            });
        });
    }
    if ($('.dx-gallery-video').length) {
        $(document).ready(function () {
            $('.dx-gallery-video').lightGallery({
                selector: '.dx-gallery-video-item'
            });
        });
    }
}

exports.initPluginLightGallery = initPluginLightGallery;

/***/ })
/******/ ]);
