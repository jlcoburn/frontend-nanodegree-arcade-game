

// ************Enemies Classes****************************
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x;
    this.y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//***************Player Classes******************************

var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

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

    if (this.x === gem.x && this.y === gem.y) {
        player.score += gem.score;
    }
    //log current position to console
    //gives us the x,y position of each block
    console.log("x: " + this.x);
    console.log("y: " + this.y);
    console.log('Gem X: ' + gem.x);
    console.log('Gem Y: ' + gem.y);
    console.log('score: ' + gem.points);
}


//************Gems Classes******************




var Gem = function() {
    //Set up array for valid x,y positions for gems.
    //This keeps the gems neatly in the squares.
    var validX = [25,125,225,325,425];
    var validY = [105,195,275];

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
            this.points = 10;

        } else if (gemColor >= 60 && gemColor <= 89) {
            this.sprite = 'images/rsz_gem-blue.png';
            this.points = 20;
        } else if (gemColor >= 90 && gemColor <= 100) {
            this.sprite = 'images/rsz_gem-orange.png';
            this.points = 50;
        }
        console.log("blah " + this.points);
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200, 380);
var gem = new Gem();

//Set up variables for gem scores. Use all caps to denote constant.
var GREEN_GEM_SCORE = 10;
var BLUE_GEM_SCORE = 50;
var ORANGE_GEM_SCORE = 100;

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
