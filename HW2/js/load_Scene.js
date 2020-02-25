
// class name is the same as the file name
class load_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "bootGame is the identifier for this scene"
        super ("load_game");
    }

    // load our images, sprites, and audio into memory
    preload() {
        // Loads in 5 assets: 4 images and a spritesheet.
		// The first parameter is the name for the object you will use for programming.
		this.load.image('background', 'assets/memewar_background.png');
		this.load.image('pepe_win', 'assets/pepe_win.png');
		this.load.image('shrek_win', 'assets/shrek_win.png');
		this.load.image('ground', 'assets/platform_block.png');
		//this.load.image('star', 'assets/star.png');
		//this.load.image('bomb', 'assets/bomb.png');
		this.load.spritesheet('shrek', 'assets/shrek_sprite.png',
		{ frameWidth: 53, frameHeight: 56 });
		this.load.spritesheet('pepe', 'assets/pepe_sprite.png',
		{ frameWidth: 53, frameHeight: 56 });
		this.load.spritesheet('blood_effect', 'assets/blood_effect.png',
        { frameWidth: 512, frameHeight: 512 });
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        // Loading health bar
		this.load.image('red', 'assets/health.jpg');
		
		// Load sound effects
		// Shrek Jumps
		this.load.audio("shrek_jump01", "assets/audio/shrek_wall_jump1.wav");
		this.load.audio("shrek_jump02", "assets/audio/shrek_wall_jump2.wav");
		this.load.audio("shrek_jump03", "assets/audio/shrek_wall_jump3.wav");
		this.load.audio("shrek_jump04", "assets/audio/shrek_wall_jump4.wav");

		// Shrek Punches
		this.load.audio("shrek_punch01", "assets/audio/shrek_punch1.wav");
		this.load.audio("shrek_punch02", "assets/audio/shrek_punch2.wav");
		this.load.audio("shrek_punch03", "assets/audio/shrek_punch3.wav");
		this.load.audio("shrek_punch04", "assets/audio/shrek_punch4.wav");
		this.load.audio("shrek_punch05", "assets/audio/shrek_punch6.wav");

		// Shrek Kicks
		this.load.audio("shrek_kick01", "assets/audio/shrek_grunt1.wav");
		this.load.audio("shrek_kick02", "assets/audio/shrek_grunt2.wav");
		this.load.audio("shrek_kick03", "assets/audio/shrek_grunt3.wav");
		this.load.audio("shrek_kick04", "assets/audio/shrek_grunt4.wav");
		this.load.audio("shrek_kick05", "assets/audio/shrek_grunt5.wav");
		this.load.audio("shrek_kick06", "assets/audio/shrek_grunt6.wav");
		this.load.audio("shrek_kick07", "assets/audio/shrek_grunt7.wav");

		// Shrek landing after jump
		this.load.audio("shrek_land01", "assets/audio/shrek_land1.wav");
		this.load.audio("shrek_land02", "assets/audio/shrek_land2.wav");
		this.load.audio("shrek_land03", "assets/audio/shrek_land3.wav");

		// Shrek taking damage
		this.load.audio("shrek_pain01", "assets/audio/shrek_pain1.wav");
		this.load.audio("shrek_pain02", "assets/audio/shrek_pain2.wav");
		this.load.audio("shrek_pain03", "assets/audio/shrek_pain3.wav");
		this.load.audio("shrek_pain04", "assets/audio/shrek_pain4.wav");
		this.load.audio("shrek_pain05", "assets/audio/shrek_pain5.wav");

		// Shrek Power Up scream
		this.load.audio("shrek_powerup", "assets/audio/broly_scream.mp3");
    }

    create() {
        // X, Y axis
        this.add.text(20,20, "Loading game...");
        // Switching scenes
        this.scene.start("play_game");

        // ---------- ANIMATIONS -----------
        // Animation Manager is a global system. Animations created within it are globally available to all Game Objects. They share the base -->
		// animation data while managing their own timelines. This allows you to define a single animation once and apply it to as many Game --> 
		// Objects as you require. -->
		// Start and end cover the frames for each animation on the sprite sheet. -->
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('shrek', { start: 16, end: 22 }),
			frameRate: 10,
			//Tells the animation to loop.
			repeat: 0
		});

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('shrek', { start: 0, end: 4 }),
            frameRate: 4,
            //Tells the animation to loop.
			repeat: -1
        });
        
        this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('shrek', { start: 5, end: 6 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'kick',
			frames: this.anims.generateFrameNumbers('shrek', { start: 36, end: 37 }),
			frameRate: 10,
			repeat: 0
        });

        this.anims.create({
			key: 'punch',
			frames: this.anims.generateFrameNumbers('shrek', { start: 48, end: 51 }),
			frameRate: 10,
			repeat: 0
        });
        
        this.anims.create({
			key: 'powerup',
			frames: this.anims.generateFrameNumbers('shrek', { start: 80, end: 95 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'tackle',
			frames: this.anims.generateFrameNumbers('shrek', { start: 102, end: 110 }),
			frameRate: 5,
			repeat: 0
		});

		this.anims.create({
			key: 'take_damage',
			frames: this.anims.generateFrameNumbers('shrek', { start: 112, end: 126 }),
			frameRate: 10,
			repeat: 0
		});

		// Pepe
		this.anims.create({
			key: 'walk_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 16, end: 22 }),
			frameRate: 10,
			//Tells the animation to loop.
			repeat: 0
		});

		this.anims.create({
			key: 'idle_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 0, end: 4 }),
            frameRate: 4,
            //Tells the animation to loop.
			repeat: -1
        });
        
        this.anims.create({
			key: 'jump_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 5, end: 6 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'kick_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 36, end: 37 }),
			frameRate: 10,
			repeat: 0
        });

        this.anims.create({
			key: 'punch_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 48, end: 51 }),
			frameRate: 10,
			repeat: 0
        });
        
        this.anims.create({
			key: 'powerup_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 80, end: 95 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'tackle_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 102, end: 110 }),
			frameRate: 5,
			repeat: 0
		});

		this.anims.create({
			key: 'take_damage_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 112, end: 126 }),
			frameRate: 10,
			repeat: 0
		});

		// Blood Splatter Animation
		this.anims.create({
			key: "blood_anim",
			frames: this.anims.generateFrameNumbers("blood_effect"),
			frameRate: 30,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
        });


    }
}