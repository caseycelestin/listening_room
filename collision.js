import {Raycaster} from './three/src/core/Raycaster.js';
import {Vector3} from './three/src/math/Vector3.js';

// Initializing rays
var rayRight = new Raycaster();
var rayLeft = new Raycaster();
var rayUp = new Raycaster();
var rayDown = new Raycaster();

// Initializing vector directions
var dirRight = new Vector3(1,0,0);
var dirLeft = new Vector3(-1,0,0);
var dirUp = new Vector3(0,0,-1);
var dirDown = new Vector3(0,0,1);

// Initializing distances
var distRight = 0;
var distLeft = 0;
var distUp = 0;
var distDown = 0;

var hasCollided = [0, 0, 0, 0];

export function collisionCheck(origin, map)
{
	updateDist(origin, map);
	hasCollided[0] = distRight;
	hasCollided[1] = distLeft;
	hasCollided[2] = distUp;
	hasCollided[3] = distDown;

	return hasCollided;
}

/**
 * Updates distances in all directions
 *
 * @param origin Origin of raycast
 * @param map Collision object
 */
function updateDist(origin, map)
{
	// Will not start checking until map is loaded
	if(map !== undefined)
	{
		// temp variable to avoid accessing empty array
		var temp;
		var pos = origin.position;

		// Getting and setting closest wall distance to the right
		rayRight.set(new Vector3(pos.x+0.5, pos.y, pos.z+0.5), dirRight);
		temp = rayRight.intersectObject(map, true);
		if(temp.length > 0)
			distRight = temp[0].distance;
		rayRight.set(new Vector3(pos.x+0.5, pos.y, pos.z-0.5), dirRight);
		temp = rayRight.intersectObject(map, true);
		if(temp.length > 0 && temp[0].distance < distRight)
			distRight = temp[0].distance;

		// Getting and setting closest wall distance to the left
		rayLeft.set(new Vector3(pos.x-0.5, pos.y, pos.z+0.5), dirLeft);
		temp = rayLeft.intersectObject(map, true);
		if(temp.length > 0)
			distLeft = temp[0].distance;
		rayLeft.set(new Vector3(pos.x-0.5, pos.y, pos.z-0.5), dirLeft);
		temp = rayLeft.intersectObject(map, true);
		if(temp.length > 0 && temp[1].distance < distLeft)
			distLeft = temp[0].distance;

		// Getting and setting closest wall distance to the up
		rayUp.set(new Vector3(pos.x, pos.y, pos.z-0.5), dirUp);
		temp = rayUp.intersectObject(map, true);
		if(temp.length > 0)
			distUp = temp[0].distance;

		// Getting and setting closest wall distance to the down
		rayDown.set(new Vector3(pos.x, pos.y, pos.z+0.5), dirDown);
		temp = rayDown.intersectObject(map, true);
		if(temp.length > 0)
			distDown = temp[0].distance;
	}
}

