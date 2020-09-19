import * as THREE from './three/src/Three.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

import {move} from './2Dmovement.js';

var scene, renderer, camera, player;

var map;

init();
animate();

//////////////////////////

function init()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xbfe3dd );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
	camera.position.set( 0, 60, 0 );
	camera.lookAt(0, 0, 0);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	hemiLight.position.set( 0, 300, 0 );
	scene.add( hemiLight );

	var dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( 75, 50, -75 );
	scene.add( dirLight );

	var loader = new GLTFLoader();

	loader.load( 'basic_map.glb', function ( gltf ) {
		map = gltf.scene;
		scene.add(map);
	}, undefined, function ( error ) {
		console.error( error );
	} );


	var geometry = new THREE.BoxGeometry(); 
	geometry.computeBoundingBox();
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
	player = new THREE.Mesh( geometry, material ); 
	scene.add( player );
	player.position.set(0,1,0);


}

function animate()
{
	requestAnimationFrame(animate);
	move(player, map);
	renderer.render( scene, camera );
}


window.onresize = function () 
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
};




