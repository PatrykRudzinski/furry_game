var Game = require('./game.js');

var myGame = new Game();
myGame.showFurry();
myGame.showCoin();
myGame.startGame();

document.addEventListener('keydown', function (e) {
    myGame.turnFurry(e);
});
