var config = {
		type: Phaser.AUTO,
		// Width and Height determine the size of the Phaser canvas
		// Test
		width: 800,
		height: 600,

		// Including the physics system for our game.
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 1000 },
				debug: false
			}
		},

		// specifying our scenes in the configuration
		scene: [menu_Scene, controls_Scene, load_Scene, play_Scene, Win_Scene],
		pixelArt: true
	};

	
	var gameSettings = {
		winner: 0
	}
	

	var game = new Phaser.Game(config);