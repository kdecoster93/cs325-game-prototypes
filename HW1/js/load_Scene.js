
// class name is the same as the file name
class load_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "bootGame is the identifier for this scene"
        super ("load_game");
    }

    // load our images, sprites, and audio into memory
    preload() {
        this.load.image("background", "assets/desert_background.png");
        this.load.spritesheet("squidShip", "assets/Squidmove.png", { 
            frameWidth: 53, frameHeight: 105 
        });
        /*this.load.spritesheet("ship1", "assets/ship1.png", { 
            frameWidth: 16, frameHeight: 16 
        });*/
        this.load.spritesheet("ship2", "assets/ship2.png", { 
            frameWidth: 32, frameHeight: 16 
        });
        this.load.spritesheet("ship3", "assets/ship3.png", { 
            frameWidth: 32, frameHeight: 32 
        });
        this.load.spritesheet("explosion", "assets/explosion.png",{
            frameWidth: 16, frameHeight: 16
        });
        this.load.spritesheet("explode", "assets/explode.png",{
            frameWidth: 128, frameHeight: 128
        });
        this.load.spritesheet("power_up", "assets/power_up.png",{
            frameWidth: 16, frameHeight: 16
        });
        /*this.load.spritesheet("player", "assets/player_ship.png",{
            frameWidth: 16, frameHeight: 24
        });*/
        //this.load.spritesheet("player", "assets/playership_short.png",{
        //    frameWidth: 96, frameHeight: 164
        //});
        this.load.spritesheet("laser", "assets/laser_bolt.png",{
            frameWidth: 16, frameHeight: 16
        });
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        this.load.audio("laser_sound", "assets/audio/heat_vision.mp3");
        this.load.audio("explosion_sound", "assets/audio/Blast.mp3");
        this.load.audio("level01_music", "assets/audio/Roller Mobster.mp3");

        // Loading our level background and tile map
        //this.load.tilemap('tilemap', 'assets/CrashSite_Level01.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/CrashSite_Level01.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/CrashSite_Level01.json');

        // Loading reticle
        this.load.image('target', 'assets/target_icon.jpg');
        // Loading health bar
        this.load.image('red', 'assets/health.jpg');
        this.load.spritesheet('laser_orb', 'assets/laser_orb.png', { frameWidth: 20, frameHeight: 20 });
    }

    create() {
        // X, Y axis
        this.add.text(20,20, "Loading game...");
        // Switching scenes
        this.scene.start("play_game");

        // ---------- ANIMATIONS -----------
        this.anims.create({
			key: "squidShip_anim",
			frames: this.anims.generateFrameNumbers("squidShip"),
			frameRate: 20,
			// repeat -1 --> Tells the animation to loop.
			repeat: -1
        });
        
        this.anims.create({
			key: "ship2_anim",
			frames: this.anims.generateFrameNumbers("ship2"),
			frameRate: 20,
			// repeat -1 --> Tells the animation to loop.
			repeat: -1
        });
        
        this.anims.create({
			key: "ship3_anim",
			frames: this.anims.generateFrameNumbers("ship3"),
			frameRate: 20,
			// repeat -1 --> Tells the animation to loop.
			repeat: -1
		});

		this.anims.create({
			key: "explosion_anim",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 20,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
        });

        this.anims.create({
			key: "explode_anim",
			frames: this.anims.generateFrameNumbers("explode"),
			frameRate: 20,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
        });

        // creating two objects from same sprite sheet
        this.anims.create({
			key: "red",
			frames: this.anims.generateFrameNumbers("power_up", {
                start: 0,
                end: 1
            }),
			frameRate: 20,
			repeat: -1
        });

        this.anims.create({
			key: "gray",
			frames: this.anims.generateFrameNumbers("power_up", {
                start: 2,
                end: 3
            }),
			frameRate: 20,
			repeat: -1
        });

        /*this.anims.create({
			key: "thrust",
			frames: this.anims.generateFrameNumbers("player"),
			frameRate: 20,
			repeat: -1
        });*/
	/*
        this.anims.create({
			key: 'gear_first',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
			frameRate: 20,
			repeat: -1
		});

		this.anims.create({
			key: 'gear_second',
			frames: this.anims.generateFrameNumbers('player', { start: 3, end: 8 }),
            frameRate: 20,
            repeat: -1
		});

		this.anims.create({
			key: 'gear_third',
			frames: this.anims.generateFrameNumbers('player', { start: 9, end: 13 }),
			frameRate: 20,
			repeat: -1
        });

        this.anims.create({
			key: 'gear_fourth',
			frames: this.anims.generateFrameNumbers('player', { start: 14, end: 17 }),
			frameRate: 20,
			repeat: -1
		});
	*/

        this.anims.create({
			key: "laser_anim",
			frames: this.anims.generateFrameNumbers("laser"),
			frameRate: 20,
			repeat: -1
        });

    }
}
