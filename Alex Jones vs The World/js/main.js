var config = {
		type: Phaser.AUTO,
		// Width and Height determine the size of the Phaser canvas
		// Test
		width: 1200,
		height: 700,

		// Including the physics system for our game.
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 1000 },
				debug: false
			}
		},

		// specifying our scenes in the configuration
		scene: [loadVisual_Scene, menu_Scene, controls_Scene, load_Scene, cinematic_Intro, play_Scene01, play_Scene02, play_Scene03, cinematic_Level03_04, play_Scene04, Win_Scene],
		pixelArt: true
	};

	
	var gameSettings = {
		winner: 0
	}
	

	var game = new Phaser.Game(config);