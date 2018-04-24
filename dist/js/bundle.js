/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(/*! ./game.js */ "./js/game.js");

var myGame = new Game();
myGame.showFurry();
myGame.showCoin();
myGame.startGame();

document.addEventListener('keydown', function (e) {
    myGame.turnFurry(e);
});


/***/ }),

/***/ "./js/coin.js":
/*!********************!*\
  !*** ./js/coin.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;

/***/ }),

/***/ "./js/furry.js":
/*!*********************!*\
  !*** ./js/furry.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'r';
}

module.exports = Furry;

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(/*! ./furry.js */ "./js/furry.js");
var Coin = __webpack_require__(/*! ./coin.js */ "./js/coin.js");

function Game() {
    this.board = document.querySelectorAll('#board > div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x,y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)]
            .classList
            .add('furry');
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)]
            .classList
            .add('coin');
    };
    this.startGame = function () {
        var that = this;
        this.idSetInterval = setInterval(function () {
            that.moveFurry();
        }, 250);
    };
    this.moveFurry = function () {
        if (this.furry.direction === 'r') {
            this.furry.x++;
        } else if ( this.furry.direction === 'l' ) {
            this.furry.x--;
        } else if ( this.furry.direction === 'd' ) {
            this.furry.y++;
        } else {
            this.furry.y--;
        }

        if(this.gameOver()) {
            this.showFurry();
        }
        this.checkCoinCollision();
    };
    this.hideVisibleFurry = function () {
        var oldFurry = document.querySelector('.furry');
        if(oldFurry) {
            oldFurry.classList.remove('furry');
        }
    };
    this.turnFurry = function (e) {
        switch (e.which) {
            case 37:
                this.furry.direction = 'l';
                break;
            case 38:
                this.furry.direction = 'u';
                break;
            case 39:
                this.furry.direction = 'r';
                break;
            case 40:
                this.furry.direction = 'd';
                break;
        }
    };
    this.checkCoinCollision = function () {
        if ( this.index(this.coin.x, this.coin.y) ===
            this.index(this.furry.x, this.furry.y)) {
            var oldCoin = document.querySelector('.coin');
            if(oldCoin) {
                oldCoin.classList.remove('coin');
            }
            document.querySelector('#score strong').innerText = ++this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function () {
        var x = this.furry.x;
        var y = this.furry.y;
        if( x < 0 || x > 9 ||
            y < 0 || y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert('Zdobyłeś ' + this.score + ' punktów');
            return false;
        }
        return true;
    };
}

module.exports = Game;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map