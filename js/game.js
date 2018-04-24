var Furry = require('./furry.js');
var Coin = require('./coin.js');

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