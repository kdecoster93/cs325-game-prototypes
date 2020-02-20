"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
	// All loading functions will typically all be found inside "preload()".
	
var config = {
		type: Phaser.AUTO,
		// Width and Height determine the size of the Phaser canvas
		// Test
		width: 800,
		height: 600,
		parent: 'game',

		// Including the physics system for our game.
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 0 },
				debug: false
			}
		},

		// specifying our scenes in the configuration
		scene: [menu_Scene, load_Scene, play_Scene, Win_Scene],
		pixelArt: true
	};

	var gameSettings = {
		playerSpeed: 200
	}

	var game = new Phaser.Game(config);