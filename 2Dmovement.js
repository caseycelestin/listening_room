import {Vector3} from './three/src/Three.js';
import {collisionCheck} from './collision.js';

var prevTime = performance.now();
var time;
var velocity = new Vector3();
var direction = new Vector3();

var deltaX, deltaZ = 0;

var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

var location;
var nextLocation;

var collision;

var onKeyDown = function(event)
{
	switch(event.keyCode)
	{
		case 38: //Up
			moveUp = true;
			break;
		case 37: //Left
			moveLeft = true;
			break;
		case 40: //Down
			moveDown = true;
			break;
		case 39: //Right
			moveRight = true;
			break;
	}
}

var onKeyUp = function(event)
{
	switch(event.keyCode)
	{
		case 38: //Up
			moveUp = false;
			break;
		case 37: //Left
			moveLeft = false;
			break;
		case 40: //Down
			moveDown = false;
			break;
		case 39: //Right
			moveRight = false;
			break;
	}
}
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

export function move(player, map)
{
	time = performance.now();
	var delta = (time - prevTime) / 1000;

	velocity.x -= velocity.x * 10.0 * delta;
	velocity.z -= velocity.z * 10.0 * delta;

	direction.z = Number( moveUp ) - Number( moveDown );
	direction.x = Number( moveRight ) - Number( moveLeft );
	direction.normalize(); // this ensures consistent movements in all directions

	if ( moveUp || moveDown ) velocity.z -= direction.z * 400.0 * delta;
	if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

	deltaX = (- velocity.x * delta);
	deltaZ = velocity.z * delta;

	console.log("DeltaX: " + deltaX);

	collision = collisionCheck(player, map);

	if(deltaX > collision[0])
	{
		deltaX = collision[0] - 0.01;
		velocity.x = 0;
	}
	if(-deltaX > collision[1])
	{
		deltaX = 0.01 - collision[1];
		velocity.x = 0;
	}
	if(-deltaZ > collision[2])
	{
		deltaZ = 0.01 - collision[2];
		velocity.z = 0;
	}
	if(deltaZ > collision[3])
	{
		deltaZ = collision[3] - 0.01;
		velocity.z = 0;
	}

	player.translateX(deltaX);
	player.translateZ(deltaZ);

	prevTime = time;
}















