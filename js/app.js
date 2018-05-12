// Globals for easy reuse

const ENEMY_SPRITE = 'images/enemy-bug.png';
const PLAYER_ORIGIN = {x: 202, y: 375}
const PLAYER_SPEED = 250;
const PLAYER_SPRITE = 'images/char-boy.png';
const BOUNDARY = {minX: 0, maxX: 405, minY: -30, maxY: 385}


class Movable {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.sprite = "";
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update() {
		throw new Error('Update method not implemented on this object');
	}

}

class Enemy extends Movable {
    constructor(x, y, speed) {
		super();
		this.sprite = ENEMY_SPRITE;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.collider = [10,10]
	
	}

	update(dt) {
	    this.x += speed * dt;
	}
}

class Player extends Movable {
	constructor(x, y, speed) {
		super();
		this.sprite = PLAYER_SPRITE;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.collider = [10,10];
		this.input = {
			'vertical': 0,
			'horizontal': 0
		};
	}
	
	update(dt) {
		this.x += this.input['horizontal'] * this.speed * dt;
		this.y += this.input['vertical'] * this.speed * dt;
		if (this.x < BOUNDARY.minX) {
			this.x = BOUNDARY.minX
		}
		if (this.x > BOUNDARY.maxX) {
			this.x = BOUNDARY.maxX
		}
		if (this.y < BOUNDARY.minY) {
			this.y = BOUNDARY.minY
		}
		if (this.y > BOUNDARY.maxY) {
			this.y = BOUNDARY.maxY
		}
	}

	move(key){
		if (key == "left") {
			this.input['horizontal'] = -1
		}
		if (key == "right") {
			this.input['horizontal'] = 1
		}
		if (key == "up") {
			this.input['vertical'] = -1
		}
		if (key == "down") {
			this.input['vertical'] = 1
		}
		
	}

	stop(key){
		if (key == "left") {
			this.input['horizontal'] = 0
		}
		if (key == "right") {
			this.input['horizontal'] = 0
		}
		if (key == "up") {
			this.input['vertical'] = 0
		}
		if (key == "down") {
			this.input['vertical'] = 0
		}

	}
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(PLAYER_ORIGIN.x, PLAYER_ORIGIN.y, PLAYER_SPEED)

entities = [player];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

function movePlayer(e) {
	let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	player.move(allowedKeys[e.keyCode]);
}
function stopPlayer(e) {
	let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	player.stop(allowedKeys[e.keyCode]);
}

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);


