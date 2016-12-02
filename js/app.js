/* TO DO:
    - Add gems;
    - Add scoring;
    - Add math functions for all moving objects;
    - Add levels that increase difficulty by:
        - letting enenmies come from the left and the right,
        - allowing for more enemies at a time,
        - randomly generating them more often;
*/

// Game object so to allow for scoring and levels. At a later point the game's state could be saved (TO DO).
var Game = function() {
    this.level = 1; // Level number is also the difficulty parameter.
    this.score = 0;
}

Game.prototype.nextLevel = function() {
    this.score += this.level;
    this.level++;
}



// Super class for all NPC's that move over the road.
var Roadster = function() {};

// Roadsters start randomly at either one of three lanes on the y-axis.
Roadster.prototype.startLane = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return 83 * randNum - 20; // 83 is the height of a row.
};



// Enemies our player must avoid. A sub class of Roadster.
var Enemy = function() {
    this.x = -101;
    this.y = this.startLane(1, 3);
    this.speed = Math.random() * 500;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Roadster.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.update = function(dt) {};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function() {};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = allEnemies.push(new Enemy());

var player = new Player(300, 400);
// player.render();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
