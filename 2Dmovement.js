import {Vector3} from './three/src/Three.js';

var prevTime = performance.now();
var time;
var velocity = new Vector3();
var direction = new Vector3();

var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

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

export function move(player)
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

	player.translateX( - velocity.x * delta );
	player.translateZ(  velocity.z * delta );

	prevTime = time;
}















