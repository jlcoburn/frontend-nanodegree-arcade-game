

// ************Enemy Classes****************************
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 5) + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = Math.floor(this.x + 101 * dt * this.speed);
    this.y = this.y;

    if (this.x > 505) {
        this.reset();
    }
    //console.log(this.x,this.y);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

//Reset enemy if at end of screen
Enemy.prototype.reset = function() {
    this.speed = Math.floor((Math.random() * 5) + 1);
    this.x = -200;
    //choose valid y coordinate
    var validY = [50,130,210];
    this.y = validY[Math.floor((Math.random() *3))];
    player.checkCollisions();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//***************Player Classes******************************

var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};


Player.prototype.handleInput = function(direction) {
    //Change position of player based upon 'direction' received from
    //handleInput method

    if (direction === 'up') {
        this.y = this.y - 80;
    } else if (direction === 'down') {
        this.y = this.y + 80;
    } else if (direction === 'left') {
        this.x = this.x - 100;
    } else if (direction === 'right') {
        this.x = this.x + 100;
    }

    //Check to see if new player postion is out of bounds
    //if so, reset postion to last good position
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 380) {
        this.y = 380;
    } else if (this.y < 60) {
        this.y = 60;
    }

    this.checkCollisions();
    //log current position to console
    //gives us the x,y position of each block
    console.log("player x: " + this.x);
    console.log("player y: " + this.y);
    console.log("enemy x: " + Math.floor(enemy.x));
    console.log("enemy y: " + Math.floor(enemy.y));
    //console.log('Gem X: ' + gem.x);
    //console.log('Gem Y: ' + gem.y);
    //console.log('score: ' + player.score);
};

Player.prototype.checkCollisions = function() {

    //Check for collision with Gem
    if ((this.x + 25) === gem.x && (this.y + 55) === gem.y) {
        player.score += gem.points;
    }

    if ((this.y - 10) === enemy.y && ((this.x - 20) < Math.floor(enemy.x)) && this.x + 20 > Math.floor(enemy.x)) {
        this.x = 200;
        this.y = 380;
        console.log("Player is dumb");
    }
};


//************Gems Classes******************

var Gem = function() {
    //Set up array for valid x,y positions for gems.
    //This keeps the gems neatly in the squares.
    var validX = [25,125,225,325,425];
    var validY = [115,195,275];

    //Set variable for gem points. Use all caps to denote CONST
    var GREEN_GEM_SCORE = 10;
    var BLUE_GEM_SCORE = 50;
    var ORANGE_GEM_SCORE = 100;


    //Choose random position for gem from valid position arrays
    this.x = validX[Math.floor(Math.random()*validX.length)];
    this.y = validY[Math.floor(Math.random()*validY.length)];

    /* Pick random gem color. Since gems are worth different points
       depending on color, higher point gems should appear less
       often.
       Green ~ 60% chance
       Blue ~ 30% chance
       Orange ~ 10% chance
    */
    var gemColor = Math.floor((Math.random() * 99) + 1);
    if (gemColor >= 1 && gemColor <= 59) {
            this.sprite = 'images/rsz_gem-green.png';
            this.points = GREEN_GEM_SCORE;

        } else if (gemColor >= 60 && gemColor <= 89) {
            this.sprite = 'images/rsz_gem-blue.png';
            this.points = BLUE_GEM_SCORE;
        } else if (gemColor >= 90 && gemColor <= 100) {
            this.sprite = 'images/rsz_gem-orange.png';
            this.points = ORANGE_GEM_SCORE;
        }
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200, 380);
var gem = new Gem();

var validY = [50,130,210];
for (var i = 0; i < 5; i++) {
    var y= 0;
    var x = -20;
    y = validY[Math.floor(Math.random()*validY.length)];
    //console.log(x,y);
    var enemy = new Enemy(x,y);
    allEnemies.push(enemy);
}

console.log(allEnemies);


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
