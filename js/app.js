'use strict';

// ************Enemy Classes****************************
var Enemy = function(x,y,enemySprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //Choose random speed modifier.
    this.speed = Math.floor((Math.random() * 5) + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = enemySprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = Math.floor(this.x + 101 * dt * this.speed);
    this.y = this.y;

    if (this.x > 909) {
        this.reset();
    }

    //Check for player/enemy collision, reset position
    //subtract held gems and soul, move gem to new position
    if (this.x + 50 >= player.x && this.x < player.x + 50 &&
        this.y === player.y) {
        player.x = 400;
        player.y = 540;
        player.score = 0;
        player.soul -= 20;
        gem = new Gem();
    }

    //If player loses their soul, display the lose screen
    if (player.soul <= 0) {
        document.getElementById('gamelost').style.display='block';
        setTimeout(function(){ location.reload();},5000);
    }
};

//Reset enemy if at end of screen
Enemy.prototype.reset = function() {
    //Choose random speed modifier.
    this.speed = Math.floor((Math.random() * 5) + 1);
    this.x = -20;
    //choose valid y coordinate
    var validY = [60,140,220,300,380,460];
    this.y = validY[Math.floor((Math.random() * validY.length))];

    //Randomize which enemy sprite appears on screen
    var z = Math.floor(Math.random()*4);
    this.sprite = enemyArray[z];
};
// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//***************Player Classes******************************

var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.soul = 100;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
    this.momGems = 0;
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
    } else if (this.x > 800) {
        this.x = 800;
    } else if (this.y > 540) {
        this.y = 540;
    } else if (this.y < 60) {
        this.y = 60;
    }
    this.checkCollisions();

};

Player.prototype.checkCollisions = function() {

    //Check for collision with Gem
    if ((this.x + 25) === gem.x && (this.y + 55) === gem.y) {
        this.score += gem.points;
        gem = new Gem();
    }

    //check to see if player is on "home" block
    if ((this.x === 800) && this.y === 540) {
        this.momGems = this.momGems + this.score;
        this.score = 0;
    }


    //If player gets 1000 gems, display win screen.
    if (this.momGems >= 1000) {
        document.getElementById('gamewon').style.display = 'block';
        setTimeout(function(){ location.reload();}, 5000);

    }
};


//************Gems Classes******************

var Gem = function() {
    //Set up array for valid x,y positions for gems.
    //This keeps the gems neatly in the squares.
    var validX = [25,125,225,325,425,525,625,725,825];
    var validY = [115,195,275,355,435,515];

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
var player = new Player(400, 540);
var gem = new Gem();
var enemySprite;
var enemyArray = ['images/char-horn-girl.png',
                  'images/char-cat-girl.png',
                  'images/char-princess-girl.png',
                  'images/char-pink-girl.png'];

var validY = [60,140,220,300,380,460];
//Assign enemies to array.
for (var i = 0; i < 6; i++) {
    var y= 0;
    var x = -20;
    //Randomly choose enemy sprite
    var z = Math.floor(Math.random()*4);
    enemySprite = enemyArray[z];

    y = validY[Math.floor(Math.random()*validY.length)];
    var enemy = new Enemy(x,y, enemySprite);
    allEnemies.push(enemy);
}





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'up',
        65: 'left',
        83: 'down',
        68: 'right'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Show instructions window when button is clicked.
function showInstructions() {
    document.getElementById('info').style.display = 'block';
}

//Hide instructions window when button is clicked.
function hideInstructions() {
    document.getElementById('info').style.display = 'none';
}

//Removed below code to allow play on smaller displays.

//Keep window from moving down when keys are pressed.
/*window.addEventListener('keydown', function(e){
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);*/