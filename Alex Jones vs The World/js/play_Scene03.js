
// class name is the same as the file name
class play_Scene03 extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "playGame" is the identifier for this scene
		super ("play_Level03");
		
    }
	
	
    init(data) {
        //console.log('init', data);
        this.restart = data.restart;
    }
    

    create() {

		// Final Battle Music
        this.finalBattleMusic = this.sound.add("finalBattle_music");
        this.musicConfig = {
			mute: false,
			volume: 0.25,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: true,
			delay: 0
		}

		this.preFinalBattleMusic = this.sound.add("preFinalBattle_music");
		this.specialConfig = {
			mute: false,
			volume: 0.1,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: true,
			delay: 0
		}

		this.explosionConfig = {
			mute: false,
			volume: 0.5,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: false,
			delay: 0
		}
        

		this.hillaryGreeting = this.sound.add("hillaryGreeting");
		this.hillaryLaugh = this.sound.add("hillaryLaugh");
		
		// Sound arrays for our players
		this.punch_sounds = [];
		this.jump_sounds = [];
		this.kick_sounds = [];
		this.pain_sounds = [];
		this.frog_pain_sounds = [];

		this.alex_punch_sounds = [];
		this.alex_pain_sounds = [];
		this.alex_insult_sounds = [];

		this.hound_attack_sounds = [];

		this.winner = 0;
		//this.demonTimer = 20;
        this.tintChecker = 10;
		this.enterWorld = false;
		this.levelFadeOut = false;
		this.time = 0;
		this.energyPresent = 0;
		this.hillaryDead = false;
		// Timer for enemies
		//this.timer = 0;

        //this.score = 0;
		//this.background = this.add.image(400, 300, 'background');
		//this.background = this.add.image(600, 350, 'city_background');
		// Specifies X and Y location of sprite, Size of Sprite --> set the y location to 0
		
		// Sets the position, size and properties of the World boundary. (3rd parameter is the length of our boundary)
		// Top Left x coord, Top Left Y coord, width, length
		this.physics.world.setBounds(0,-500, 12000, 1800);

        this.background = this.add.tileSprite(600, 30, 828, 358, "level03_background");
		this.background.setScale(3);
		this.background02 = this.add.sprite(11100, -70, "level03_background02");
		this.background02.setScale(4);
		this.background02.anims.play('level03_Loop', true);
        //this.background.anims.play('level03_Loop', true);

		//this.exitBackground = this.add.image(8050, 2000, 'level02_background');
        //this.exitBackground.setScale(3);

		// Buildings are for aesthetic background purposes --> they do not need physics
		this.buildings = this.add.group();

        // Outer Pillars
		//this.buildings.create(435, 0, 'pillar_01').setScale(9);
		//this.buildings.create(870, 0, 'pillar_01').setScale(9);
		//this.buildings.create(1305, 0, 'pillar_01').setScale(9);
		//this.buildings.create(2175, 0, 'pillar_01').setScale(9);
        //this.buildings.create(3045, 0, 'pillar_01').setScale(9);
        
        // Inner Pillars
        this.buildings.create(0, 25, 'pillar_02').setScale(9);
        this.buildings.create(860, 25, 'pillar_02').setScale(9);
        this.buildings.create(1720, 25, 'pillar_02').setScale(9);
        this.buildings.create(2580, 25, 'pillar_02').setScale(9);
        this.buildings.create(3440, 25, 'pillar_02').setScale(9);
        this.buildings.create(4300, 25, 'pillar_02').setScale(9);
        this.buildings.create(5160, 25, 'pillar_02').setScale(9);
        this.buildings.create(6020, 25, 'pillar_02').setScale(9);
        this.buildings.create(6880, 25, 'pillar_02').setScale(9);
        this.buildings.create(7740, 25, 'pillar_02').setScale(9);
        this.buildings.create(8600, 25, 'pillar_02').setScale(9);
        this.buildings.create(9460, 25, 'pillar_02').setScale(9);
        this.buildings.create(10320, 25, 'pillar_02').setScale(9);

		//this.scenery = this.add.group();
		//this.scenery.create(1200, 540, 'control_box01').setScale(2);

		// A Static Body simply has a position and a size. It isn't touched by gravity, you cannot set 
		// velocity on it and when something collides with it, it never moves. Static by name, static by nature.

        
        // Main ground 
		this.platforms = this.physics.add.staticGroup({ 
			// sets the texture key to the star image. 
			key: 'landRed',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			repeat: 20,
			// Sets the star position then steps the next one by 70 on the x. 
			setXY: { x: -640, y: 610, stepX: 480 }
		});

		//this.platforms.scaleXY(1.25);
		this.platforms.children.iterate(function (child) { 
			child.setScale(2.5);
			child.body.setSize(480, 108);
		});

		this.platforms02 = this.physics.add.staticGroup({ 
			// sets the texture key to the star image. 
			key: 'landBase',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			repeat: 10,
			// Sets the star position then steps the next one by 70 on the x. 
			setXY: { x: 9500, y: 640, stepX: 955 }
		});

		//this.platforms.scaleXY(1.25);
		this.platforms02.children.iterate(function (child) { 
			child.setScale(5);
			child.body.setSize(955, 85);
			child.body.setOffset(-380, -35);
		});
		
        this.obstacles = this.physics.add.staticGroup();
        this.dropPlatforms = this.physics.add.group();
		/*
		// Scale the ground platform by 2 and refresh body to update physics body. -->
		this.platforms.create(1920, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(1600, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(1280, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(960, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(640, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(320, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(0, 610, 'concrete').setScale(2).refreshBody();
		this.platforms.create(-320, 610, 'concrete').setScale(2).refreshBody();
		*/

        // 285 width x 96 height
        this.obstacles.create(-150, 550, 'ground').setScale(3).refreshBody();
        this.obstacles.create(-150, 454, 'ground').setScale(3).setFlip(true).refreshBody();
        this.obstacles.create(-150, 358, 'ground').setScale(3).refreshBody();
        this.obstacles.create(-150, 262, 'ground').setScale(3).refreshBody();
        this.obstacles.create(-150, 166, 'ground').setScale(3).setFlip(true).refreshBody();
        this.obstacles.create(-150, 70, 'ground').setScale(3).setFlip(true).refreshBody();
        this.obstacles.create(-150, -26, 'ground').setScale(3).refreshBody();
        this.obstacles.create(-150, -122, 'ground').setScale(3).refreshBody();
        this.obstacles.create(-150, -218, 'ground').setScale(3).setFlip(true).refreshBody();
        this.obstacles.create(-150, -314, 'ground').setScale(3).refreshBody();
        this.obstacles.create(-150, -410, 'ground').setScale(3).setFlip(true).refreshBody();
        //this.obstacles.create(135, 550, 'ground').setScale(3).setFlip(true).refreshBody();  

        this.dropPlatforms.create(164, 300, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(500, 300, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(836, 300, 'skullPlatform').setScale(3); 
        this.dropPlatforms.create(1172, 300, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(1508, 300, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(1844, 300, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(2180, 300, 'skullPlatform').setScale(3);

        //this.obstacles.create(5000, 262, 'ground').setScale(3).refreshBody();
        //this.dropPlatforms.create(4500, 200, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(4836, 200, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(5172, 200, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(5508, 200, 'skullPlatform').setScale(3);
        this.dropPlatforms.create(5844, 200, 'skullPlatform').setScale(3);
		this.dropPlatforms.create(6180, 200, 'skullPlatform').setScale(3);
		
		this.dropPlatforms.create(11000, 150, 'skullPlatform').setScale(3);

        this.dropPlatforms.children.iterate(function (child) { 
            child.body.setAllowGravity(false);
            child.body.immovable = true;
            child.body.moves = false;
            // Used to check if a first collision has occurred
            child.collideCheck = false;
            child.originalY = child.y;
            child.tweenActive = false;
		});

		this.obstacles.create(2400, 262, 'ground').setScale(3).refreshBody();
		this.obstacles.create(2685, 262, 'ground').setScale(3).refreshBody();
		this.obstacles.create(2970, 262, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3600, 550, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3600, 454, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3885, 550, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3885, 454, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 550, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 454, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 358, 'ground').setScale(3).refreshBody();
        this.obstacles.create(4170, 262, 'ground').setScale(3).refreshBody();

		// Next Level Entrance
		this.obstacles.create(6495, 550, 'ground').setScale(3).refreshBody();
		this.obstacles.create(6780, 550, 'ground').setScale(3).refreshBody();
		this.obstacles.create(6780, 454, 'ground').setScale(3).refreshBody();
		this.obstacles.create(7065, 550, 'ground').setScale(3).refreshBody();
		this.obstacles.create(7065, 454, 'ground').setScale(3).refreshBody();
		this.obstacles.create(7065, 358, 'ground').setScale(3).refreshBody();
		this.obstacles.create(7065, 262, 'ground').setScale(3).refreshBody();
		
		this.obstacles.create(7424, 238, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(7856, 238, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(7856, -50, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(8288, 238, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(8720, 238, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(8720, -50, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(9152, 238, 'redPlatform').setScale(3).refreshBody();
		this.obstacles.create(9584, 238, 'redPlatform').setScale(3).refreshBody();

		this.obstacles.create(10340, 380, 'redPlatform').setScale(3).refreshBody();
		//this.obstacles.create(11000, 150, 'redPlatform').setScale(3).refreshBody();
		//this.obstacles.create(10016, 238, 'redPlatform').setScale(3).refreshBody();
       
        
        // Creates a black strip background for our Score to rest on
        var graphics = this.add.graphics();
        // Black solid fill
        graphics.fillStyle(0x000000, 1);
        // Draw polygon lines with coords
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(1200, 0);
        graphics.lineTo(1200, 35);
        graphics.lineTo(0, 35);
        graphics.lineTo(0, 0);
        // Close and fill
        graphics.closePath();
        graphics.fillPath();

		// Create our variable player: Creation of Physics Sprite and animations it can use. -->
		// Creates a new sprite called player, positioned at 100 x 450 pixels from the bottom of the game. Has Dynamic Physics body by default. -->
		/*
		this.player = this.physics.add.sprite(100, 200, 'shrek');
		// call back function to control idle animation
		this.player.on('animationcomplete', this.animCompleteShrek, this);
        this.player.setScale(1.5);
        this.player.anims.play('idle_shrek', true);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		
		this.player2 = this.physics.add.sprite(300, 200, 'pepe');
		// call back function to control idle animation
		this.player2.on('animationcomplete', this.animCompletePepe, this);
        this.player2.setScale(1.5);
        this.player2.anims.play('idle_pepe', true);
		this.player2.setBounce(0.2);
		this.player2.setCollideWorldBounds(true);
		*/
		this.hillary = this.physics.add.sprite(11800, -300, 'hillary');
		this.hillary.setScale(3.5);
		// call back function to control idle animation
		this.hillary.on('animationcomplete', this.animCompleteHillary, this);
        //this.player2.setScale(1.5);
		this.hillary.anims.play('hillary_Idle', true);
		this.hillary.health = 1000;
		this.hillary.fireTimer = 30;
		this.hillary.powerupTimer = 0;
		this.hillary.greeting = false;
		this.hillary.hp = new HealthBar(this, this.hillary.x, this.hillary.y - 110, 1000);
		
		this.tentacle01 = this.physics.add.sprite(9800 , 200, "hillary_tentacles");
		this.tentacle02 = this.physics.add.sprite(10750 , -300, "hillary_tentacles");
		this.tentacle03 = this.physics.add.sprite(11500 , -300, "hillary_tentacles");
		this.tentacle04 = this.physics.add.sprite(11800 , -300, "hillary_tentacles");
		this.tentacle05 = this.physics.add.sprite(12100 , -300, "hillary_tentacles");
		
		// ENEMY: Gay Frog
		this.tentacles = this.physics.add.group();

		this.tentacles.add(this.tentacle01);
		this.tentacles.add(this.tentacle02);
		this.tentacles.add(this.tentacle03);
		this.tentacles.add(this.tentacle04);
		this.tentacles.add(this.tentacle05);
		
		this.tentacles.children.iterate(function (child) { 
			child.anims.play('tentacle_Idle'); 
			child.setScale(3);
			child.setSize(102, 20);
			child.setOffset(0, 85);
		});
		
		this.hillaryMorph = this.add.sprite(11800, 400, 'hillaryMorph');
		this.hillaryMorph.setScale(3);
		this.hillaryMorph.setAlpha(0);

		/*
		this.boss = this.physics.add.sprite(6100, -300, 'demon_boss_idle');
		// Changing our rectangular collider to be smaller width, height
		//this.alex.body.setSize(100, 120);
		// call back function to control idle animation
		//this.boss.on('animationcomplete', this.animCompleteBoss, this);
		this.boss.setScale(4);
		//this.boss.body.setSize(165, 201);
        this.boss.anims.play('demon_idle', true);
		this.boss.setBounce(0.2);
        this.boss.setCollideWorldBounds(true);
        // Setting Boss Health
		this.boss.health = 200;
		*/

		// Demon Boss
		this.demon01 = this.physics.add.sprite(6000 , -300, "demon_boss_idle");
        this.demon01.hp = new HealthBar(this, this.demon01.x, this.demon01.y - 110, 200);
        this.demon01.demonTimer = 20;
        
        this.demon02 = this.physics.add.sprite(2800 , -300, "demon_boss_idle");
        this.demon02.hp = new HealthBar(this, this.demon02.x, this.demon02.y - 110, 200);
        this.demon02.demonTimer = 20;

        this.demon03 = this.physics.add.sprite(4000 , -300, "demon_boss_idle");
        this.demon03.hp = new HealthBar(this, this.demon03.x, this.demon03.y - 110, 200);
        this.demon03.demonTimer = 20;

		// ENEMY: Demon
		this.demon = this.physics.add.group({ 
			// sets the texture key to the star image. 
			//key: 'demon_boss_idle',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			//repeat: 0,
			//setXY: { x: 6000, y: -300, stepX: 100}
		});

        this.demon.add(this.demon01);
        this.demon.add(this.demon02);
        this.demon.add(this.demon03);

		this.demon.children.iterate(function (child) { 
			// call back function to control idle animation
			//child.on('animationcomplete', child.animCompleteHound, this);
			//child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.health = 200;
            child.speed = Phaser.Math.Between(200, 300);
			child.setScale(4);
			child.anims.play('demon_idle'); 
		});

		this.gayfrog01 = this.physics.add.sprite(8500 , -300, "'pepe");
		this.gayfrog01.hp = new HealthBar(this, this.gayfrog01.x + 10, this.gayfrog01.y - 110, 200);
		
		this.gayfrog02 = this.physics.add.sprite(8600 , -300, "'pepe");
		this.gayfrog02.hp = new HealthBar(this, this.gayfrog02.x + 10, this.gayfrog02.y - 110, 200);
		
		this.gayfrog03 = this.physics.add.sprite(8700 , -300, "'pepe");
		this.gayfrog03.hp = new HealthBar(this, this.gayfrog03.x + 10, this.gayfrog03.y - 110, 200);
		
		this.gayfrog04 = this.physics.add.sprite(8800 , -300, "'pepe");
		this.gayfrog04.hp = new HealthBar(this, this.gayfrog04.x + 10, this.gayfrog04.y - 110, 200);
		
		this.gayfrog05 = this.physics.add.sprite(8900 , -300, "'pepe");
		this.gayfrog05.hp = new HealthBar(this, this.gayfrog05.x + 10, this.gayfrog05.y - 110, 200);
		
		// Hillary Supporters
		this.gayfrog06 = this.physics.add.sprite(11100 , -2000, "'pepe");
		this.gayfrog06.hp = new HealthBar(this, this.gayfrog05.x + 10, this.gayfrog05.y - 110, 200);
		
		this.gayfrog07 = this.physics.add.sprite(11300 , -2000, "'pepe");
		this.gayfrog07.hp = new HealthBar(this, this.gayfrog05.x + 10, this.gayfrog05.y - 110, 200);
		
		this.gayfrog08 = this.physics.add.sprite(11500 , -2000, "'pepe");
		this.gayfrog08.hp = new HealthBar(this, this.gayfrog05.x + 10, this.gayfrog05.y - 110, 200);

		this.gayfrog09 = this.physics.add.sprite(11700 , -2000, "'pepe");
        this.gayfrog09.hp = new HealthBar(this, this.gayfrog05.x + 10, this.gayfrog05.y - 110, 200);
		
		// ENEMY: Gay Frog
		this.gayfrogs = this.physics.add.group();

		this.gayfrogs.add(this.gayfrog01);
		this.gayfrogs.add(this.gayfrog02);
		this.gayfrogs.add(this.gayfrog03);
		this.gayfrogs.add(this.gayfrog04);
		this.gayfrogs.add(this.gayfrog05);
		this.gayfrogs.add(this.gayfrog06);
		this.gayfrogs.add(this.gayfrog07);
		this.gayfrogs.add(this.gayfrog08);
		this.gayfrogs.add(this.gayfrog09);

		this.gayfrogs.children.iterate(function (child) { 
            child.health = 200;
			child.speed = Phaser.Math.Between(200, 350);
			child.attack = 0;
			child.anims.play('idle_pepe'); 
			child.setScale(2);
			child.setSize(40, 56);
			child.setOffset(5, 0);
		});

		this.gayfrog06.body.setAllowGravity(false);
		this.gayfrog06.attack = false;
		this.gayfrog07.body.setAllowGravity(false);
		this.gayfrog07.attack = false;
		this.gayfrog08.body.setAllowGravity(false);
		this.gayfrog08.attack = false;
		this.gayfrog09.body.setAllowGravity(false);
		this.gayfrog09.attack = false;


		/*
		this.player.health = 100;
		this.player2.health = 100;
		*/

		this.alex = this.physics.add.sprite(500, -4000, 'alex');
		//this.alex = this.physics.add.sprite(10000, -4000, 'alex');

		// Changing our rectangular collider to be smaller width, height
		this.alex.body.setSize(100, 120);
		// call back function to control idle animation
		this.alex.on('animationcomplete', this.animCompleteAlex, this);
        //this.player2.setScale(1.5);
        this.alex.anims.play('idle', true);
		this.alex.setBounce(0.2);
        this.alex.setCollideWorldBounds(false);
        // Sets a high speed for descent
		this.alex.setVelocityY(800);

		// Set Player and Enemy variables
		this.max_health = 100;

		// Setting Alex Jones Health
		this.alex.health = 100;
		//this.alex.health = 100;
		// Keep track of Alex Jones aerial status
		this.alex.isDown = true;
		this.alex.isPowerup = false;
		this.alex.energyRelease = false;
		// Directions false = facing right, true = facing left
		this.alex.direction = false;
		this.alex.levelMusic = false;

		this.cameras.main.startFollow(this.alex);

		// ENEMY: Hell Hound
		this.hounds = this.physics.add.group({ 
			// sets the texture key to the star image. 
			key: 'hound_idle',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			repeat: 40,
			// Sets the star position then steps the next one by 70 on the x. 
			setXY: { x: 1500, y: 0, stepX: 100}
		});

		this.hounds.children.iterate(function (child) { 
			// call back function to control idle animation
			//child.on('animationcomplete', child.animCompleteHound, this);
			//child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
			child.health = 30;
			child.setScale(2);
			child.anims.play('hound_idle_anim'); 
		});

		this.explosion_sound = this.sound.add("explode");
		this.blood_splatter_sound = this.sound.add("blood_splatter");
		//this.bite_sound = this.sound.add("bite");
		//this.physics.add.collider(this.hounds, this.hounds);

		// Phaser built in keyboard manager
        //cursors = this.input.keyboard.createCursorKeys();
        
        this.cursorKeys = this.input.keyboard.addKeys({
			// Player movement
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
			'right': Phaser.Input.Keyboard.KeyCodes.D,
			// Powerup
			'powerup': Phaser.Input.Keyboard.KeyCodes.SPACE,
			// Item pickup
			'pickup': Phaser.Input.Keyboard.KeyCodes.E,
			// Sprint
			'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
		
			//'spacebar': Phaser.Input.Keyboard.KeyCodes.T,

			// Energy blast
			'up_Arrow': Phaser.Input.Keyboard.KeyCodes.UP,
			// Punch
			'down_Arrow': Phaser.Input.Keyboard.KeyCodes.DOWN,
			// Swap weapons
			'left_Arrow': Phaser.Input.Keyboard.KeyCodes.LEFT,
			'right_Arrow': Phaser.Input.Keyboard.KeyCodes.RIGHT,

			'left_tackle_pepe': Phaser.Input.Keyboard.KeyCodes.QUOTES,
			'right_tackle_pepe': Phaser.Input.Keyboard.KeyCodes.L,
            'shift_pepe': Phaser.Input.Keyboard.KeyCodes.P,
			'spacebar_pepe': Phaser.Input.Keyboard.KeyCodes.SEMICOLON
			
			// Use equipped weapon / powerup
			//'space': Phaser.Input.Keyboard.KeyCodes.SPACE
			
		});
		
		// creating an array
		//this.shrek_sounds = Phaser.Sound.BaseSound[] = [];
		/*
		this.shrek_sounds = this.add.group();
		this.shrek_sounds.add(this.sound.add("shrek_punch01"));
		this.shrek_sounds.add(this.sound.add("shrek_punch02"));
		this.shrek_sounds.add(this.sound.add("shrek_punch03"));
		this.shrek_sounds.add(this.sound.add("shrek_punch04"));
		this.shrek_sounds.add(this.sound.add("shrek_punch05"));
		*/

		// Punch Sounds Array
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch01"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch02"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch03"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch04"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch05"));

		// Jump Sounds Array
		Phaser.Utils.Array.Add(this.jump_sounds, this.sound.add("shrek_jump01"));
		Phaser.Utils.Array.Add(this.jump_sounds, this.sound.add("shrek_jump02"));
		Phaser.Utils.Array.Add(this.jump_sounds, this.sound.add("shrek_jump03"));
		Phaser.Utils.Array.Add(this.jump_sounds, this.sound.add("shrek_jump04"));

		// Kick Sounds Array
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick01"));
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick02"));
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick03"));
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick04"));
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick05"));
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick06"));
		Phaser.Utils.Array.Add(this.kick_sounds, this.sound.add("shrek_kick07"));

		// Take Damage Sounds Array
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain01"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain02"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain03"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain04"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain05"));

		// Alex Sounds -----------
		// Alex Punch Sounds Array
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch01"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch02"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch03"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch04"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch05"));

		// Alex takes damage Sounds Array
		Phaser.Utils.Array.Add(this.alex_pain_sounds, this.sound.add("alex_pain01"));
		Phaser.Utils.Array.Add(this.alex_pain_sounds, this.sound.add("alex_pain02"));

		Phaser.Utils.Array.Add(this.frog_pain_sounds, this.sound.add("frog_pain01"));
		Phaser.Utils.Array.Add(this.frog_pain_sounds, this.sound.add("frog_pain02"));
		Phaser.Utils.Array.Add(this.frog_pain_sounds, this.sound.add("frog_pain03"));

		// Alex random insults
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult01"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult02"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult03"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult04"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult05"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult06"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult07"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult08"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult09"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult10"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult11"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult12"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult13"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult14"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult15"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult16"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult17"));

		// Alex Intro Sounds --> Used when first starting the game
		//this.alex_intro_01 = this.sound.add("alex_intro01");
		//this.alex_intro_02 = this.sound.add("alex_intro02");
		//this.alex_intro_03 = this.sound.add("alex_intro03");

		// Used to control the order of dialogue
		//this.intro01Complete = false;
		//this.intro02Complete = false;
		//this.intro03Complete = false;

		// Hound Bite Array
		Phaser.Utils.Array.Add(this.hound_attack_sounds, this.sound.add("bite"));

       
		//this.shrek_punch01 = this.sound.add("shrek_punch01");
		//this.shrek_powerup_sound = this.sound.add("shrek_powerup");
		//this.pepe_powerup_sound = this.sound.add("shrek_powerup");
		this.alex_powerup_sound = this.sound.add("alex_powerup01");

        this.effects = this.physics.add.staticGroup();
        this.effects.create(50, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(150, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(250, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(350, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(450, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(550, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(650, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(750, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(850, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(950, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1050, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1150, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1250, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1350, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1450, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1550, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1650, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1750, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1850, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(1950, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(2050, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(2150, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		//this.effects.create(1570, 333, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(2485, 160, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(2885, 160, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(3600, 260, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(4170, 160, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        // Next section
        this.effects.create(5000, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(5350, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
        this.effects.create(5700, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(6000, 450, 'fire').setScale(3).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		// Gay Frog section
		this.effects.create(7300, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(7450, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(7600, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(7750, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(7900, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8050, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8200, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8350, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8500, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8650, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8800, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(8950, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(9100, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		this.effects.create(9250, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		//this.effects.create(9400, 350, 'fire').setScale(5).setSize(64, 128).setOffset(0, 80).anims.play('fire_anim', true);
		//this.fire = this.add.sprite(1000, 425, 'fire');
		//this.fire.setScale(3);
		//this.fire.anims.play('fire_anim', true);

		// Collider takes two objects and tests for collision and performs separation against them. In this case we're giving		
		// the player sprite and the platforms Group.

        //this.physics.add.collider(this.demon);

		this.physics.add.collider(this.alex, this.platforms);
		this.physics.add.collider(this.alex, this.platforms02);
		this.physics.add.collider(this.alex, this.obstacles);

		this.physics.add.collider(this.demon, this.platforms);
		this.physics.add.collider(this.demon, this.platforms02);
		this.physics.add.collider(this.demon, this.obstacles);

		this.physics.add.collider(this.hounds, this.platforms);
		this.physics.add.collider(this.hounds, this.platforms02);
		this.physics.add.collider(this.hounds, this.obstacles);

		this.physics.add.collider(this.gayfrogs, this.platforms);
		this.physics.add.collider(this.gayfrogs, this.platforms02);
		this.physics.add.collider(this.gayfrogs, this.obstacles);

		this.physics.add.collider(this.hillary, this.platforms);
		this.physics.add.collider(this.hillary, this.platforms02);
		this.physics.add.collider(this.hillary, this.obstacles);

		this.physics.add.collider(this.tentacles, this.platforms);
		this.physics.add.collider(this.tentacles, this.platforms02);
		this.physics.add.collider(this.tentacles, this.obstacles);
        
        this.physics.add.collider(this.alex, this.dropPlatforms, this.platformDrop, null, this);
		this.physics.add.collider(this.demon, this.dropPlatforms);
		this.physics.add.collider(this.hounds, this.dropPlatforms);
		this.physics.add.collider(this.gayfrogs, this.dropPlatforms);
		this.physics.add.collider(this.hillary, this.dropPlatforms);

        //this.physics.add.overlap(this.alex, this.dropPlatforms, this.platformDrop, null, this);
		//this.physics.add.collider(this.player, this.player2);

		this.physics.add.overlap(this.alex, this.tentacles, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.demon, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.gayfrogs, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.hounds, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.hillary, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.effects, this.fireDamage, null, this);

		this.playerEnergyBlasts = this.physics.add.group({ classType: EnergyBlast, runChildUpdate: true });
		this.physics.add.collider(this.playerEnergyBlasts, this.platforms);
		this.physics.add.collider(this.playerEnergyBlasts, this.platforms02);
        this.physics.add.collider(this.playerEnergyBlasts, this.obstacles);
        this.physics.add.collider(this.playerEnergyBlasts, this.dropPlatforms);
		this.physics.add.overlap(this.playerEnergyBlasts, this.hounds, this.energyHit, null, this);
		this.physics.add.overlap(this.playerEnergyBlasts, this.demon, this.energyHit, null, this);
		this.physics.add.overlap(this.playerEnergyBlasts, this.gayfrogs, this.energyHit, null, this);
		this.physics.add.overlap(this.playerEnergyBlasts, this.hillary, this.energyHitHillary, null, this);

		this.demonFireBlasts = this.physics.add.group({ 
			classType: DemonFire,
			// Removes gravity from the members
			allowGravity: false, 
			runChildUpdate: true });
		this.physics.add.collider(this.demonFireBlasts, this.platforms);
        this.physics.add.collider(this.demonFireBlasts, this.obstacles);
        this.physics.add.collider(this.demonFireBlasts, this.dropPlatforms);
		this.physics.add.overlap(this.demonFireBlasts, this.alex, this.fireBlastHit, null, this);

		// Font size and color, default font type is courier.
		//this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

		 // Health for the player 1
        //this.hpText = this.add.bitmapText(10, 0, "pixelFont", "Player 1 - HP: ", 32);
        // Creating the player's health bar - placing it up top
        this.hp1 = this.add.image(240, 15, 'red');
        this.hp2 = this.add.image(210, 15, 'red');
        this.hp3 = this.add.image(180, 15, 'red');
        this.hp1.setScale(4);
        this.hp2.setScale(4);
        this.hp3.setScale(4);
        this.hp1.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
        this.hp2.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
		this.hp3.setOrigin(0.5, 0.5).setDisplaySize(30, 10);

		// Player Health UI
		this.player1_HPUI = this.add.bitmapText(10, 5, "pixelFont", "ALEX HP: ", 32);
		//this.player2_HPUI = this.add.bitmapText(545, 5, "pixelFont", "PEPE HP: ", 32);

		// Fixing our UI to the camera
		this.background.setScrollFactor(0, 1);
		graphics.setScrollFactor(0, 0);
		this.hp1.setScrollFactor(0, 0);
		this.hp2.setScrollFactor(0, 0);
		this.hp3.setScrollFactor(0, 0);
		/*
		this.hp4.setScrollFactor(0, 0);
		this.hp5.setScrollFactor(0, 0);
		this.hp6.setScrollFactor(0, 0);
		*/

        this.player1_HPUI.setScrollFactor(0, 0);
        
        // Outer Pillars
        this.buildings.create(7140, -45, 'pillar_01').setScale(9);
        this.buildings.create(9465, -45, 'pillar_01').setScale(9);
		
		//this.player2_HPUI.setScrollFactor(0, 0);

		/*
		this.bombs = this.physics.add.group();
		this.physics.add.collider(this.bombs, this.platforms);
		// When player and bomb collide, we enter hitBomb function.
		this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
		this.physics.add.collider(this.player2, this.bombs, this.hitBomb, null, this);
		*/
    }

    update ()
    {	

        // Checks to see if alex entered the world boundaries
        if (this.alex.y >= 0 && this.enterWorld == false) {
            this.enterWorld = true;
        }

        if (this.enterWorld == true) {
            this.alex.setCollideWorldBounds(true);
		}
		
		if (this.alex.x >= 7000 && this.alex.levelMusic == false && this.restart == 0) {
			this.alex.levelMusic = true;
			this.sound.removeByKey('transition_music');
			this.preFinalBattleMusic.play(this.specialConfig);
		}

		// Update our Player Health trackers
        var player_health = this.zeroPadding(Math.round(this.alex.health), 3);
		this.player1_HPUI.text = "ALEX HP: " + player_health;

        // -------------------------------------------
		//  Move the Demons Health Bars with them
		if (this.demon01.flipX == false) {
            this.demon01.hp.x = this.demon01.x - 60;
        }
        else {
            this.demon01.hp.x = this.demon01.x;
		}
		
		this.demon01.hp.y = this.demon01.y - 110;
        this.demon01.hp.draw();
        
        //  Move the Demons Health Bars with them
		if (this.demon02.flipX == false) {
            this.demon02.hp.x = this.demon02.x - 60;
        }
        else {
            this.demon02.hp.x = this.demon02.x;
		}
		
		this.demon02.hp.y = this.demon02.y - 110;
        this.demon02.hp.draw();

        //  Move the Demons Health Bars with them
		if (this.demon03.flipX == false) {
            this.demon03.hp.x = this.demon03.x - 60;
        }
        else {
            this.demon03.hp.x = this.demon03.x;
		}
		
		this.demon03.hp.y = this.demon03.y - 110;
        this.demon03.hp.draw();
		// -------------------------------------------

		
		//  Move the Gay Frog Health Bars with them
		if (this.hillary.flipX == false) {
            this.hillary.hp.x = this.hillary.x - 40;
        }
        else {
            this.hillary.hp.x = this.hillary.x - 40;
		}
		
		this.hillary.hp.y = this.hillary.y - 80;
		this.hillary.hp.draw();
		
		// -------------------------------------------

		// Clears out the damage tint on Alex
        if (this.alex.isTinted == true && this.tintChecker >= 10) {
            this.alex.clearTint();
            this.tintChecker = 0;
        }
        else if (this.alex.isTinted == true && this.tintChecker < 10){
            this.tintChecker += 1;
        }

		if (this.alex.health <= 0) {
			/*
			this.winner = 2;
			this.scene.start("win_game", {winner: 2});
			*/
			if (this.alex.x < 7000 && this.restart == 0 && this.alex.levelMusic == false) {
				this.scene.restart({restart: 0});
			}
			else {
				this.scene.restart({restart: 1});
			}
		}

		// Next Level if player descends 
		/*
		if (this.alex.y > 1200) {
			
			this.winner = 1;
			this.scene.start("win_game", {winner: 1});
			
            this.scene.start("cinematic01");
		}
		*/

		//console.log(this.player.health);
		//console.log(this.player2.health);
		if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.powerup)) {
			this.alex_powerup_sound.play();
		}
		
		else if (this.cursorKeys.powerup.isUp) {
			this.alex_powerup_sound.stop();
		}
		
		/*
		if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift_pepe)) {
			this.pepe_powerup_sound.play();
		}
		
		else if (this.cursorKeys.shift_pepe.isUp) {
			this.pepe_powerup_sound.stop();
		}
		*/
		
		//this.shrekManager(this.player, this.cursorKeys.left_Arrow, this.cursorKeys.right_pepe, this.cursorKeys.up_pepe, this.cursorKeys.down_pepe, this.cursorKeys.spacebar_pepe, this.cursorKeys.left_tackle_pepe, this.cursorKeys.right_tackle_pepe, this.cursorKeys.shift_pepe);
		//this.pepeManager(this.player2, this.cursorKeys.left_Arrow, this.cursorKeys.right_pepe, this.cursorKeys.up_pepe, this.cursorKeys.down_pepe, this.cursorKeys.spacebar_pepe, this.cursorKeys.left_tackle_pepe, this.cursorKeys.right_tackle_pepe, this.cursorKeys.shift_pepe);
		// Player, Left Move, Right Move, Jump, Kick, Punch, Powerup, Pickup, Sprint, Energy Blast
		this.alexManager(this.alex, this.cursorKeys.left, this.cursorKeys.right, this.cursorKeys.up, this.cursorKeys.down, this.cursorKeys.up_Arrow, this.cursorKeys.powerup, this.cursorKeys.pickup, this.cursorKeys.shift, this.cursorKeys.down_Arrow);
		
		// Call Enemy Hound Manager to control AI behavior
		this.houndManager(this.alex, this.hound_attack_sounds);

		// Call Enemy Demon Manager to control AI behavior
		this.demonManager(this.alex);

		// Call Gay Frog Manager
		this.gayfrogManager(this.alex);

		this.tentacleManager(this.alex);

		if (this.hillary.health <= 900 && this.gayfrog06.attack == false) {
			this.gayfrog06.attack = true;
			this.gayfrog06.body.setAllowGravity(true);
		}
		else if (this.hillary.health <= 750 && this.gayfrog07.attack == false) {
			this.gayfrog07.attack = true;
			this.gayfrog07.body.setAllowGravity(true);
		}
		else if (this.hillary.health <= 500 && this.gayfrog08.attack == false) {
			this.gayfrog08.attack = true;
			this.gayfrog08.body.setAllowGravity(true);
		}
		else if (this.hillary.health <= 250 && this.gayfrog09.attack == false) {
			this.gayfrog09.attack = true;
			this.gayfrog09.body.setAllowGravity(true);
		}

		if (this.hillaryDead == true && this.time >= 355) {
			this.scene.start("cinematic01");
			//this.winner = 1;
			//this.scene.start("win_game", {winner: 1});
        }
        
        // Used to give a breather before the next level
        else if (this.hillaryDead == true && this.time < 355) {
            this.time += 1;
        }

		if (this.hillaryDead == false) {
			this.hillaryManager(this.alex);
		}

		// Alex Intro
		/*
		// If the first intro dialogue is not being played --> play
		if (this.intro01Complete == false) {
			this.alex_intro_01.play();
			this.intro01Complete = true;
		}
		else if (this.intro02Complete == false && this.alex_intro_01.isPlaying == false) {
			this.alex_intro_02.play();
			this.intro02Complete = true;
		}
		else if (this.intro03Complete == false && this.alex_intro_02.isPlaying == false && this.intro02Complete == true) {
			this.alex_intro_03.play();
			this.intro03Complete = true;
		}

		// If all intros have been completed, randomly play insults
		else if (this.intro03Complete == true && this.alex_intro_03.isPlaying == false) {
		*/
			var choice = Phaser.Math.Between(0, 300);
			if (choice == 1) {
				// Returns us an array of all sounds that are currently playing
				var sound_check = Phaser.Utils.Array.GetAll(this.alex_insult_sounds, 'isPlaying', true);
				var sound_punch_check = Phaser.Utils.Array.GetAll(this.alex_punch_sounds, 'isPlaying', true);
				// If there a currently no sounds playing we can play a punch sound
				if (sound_check.length == 0 && sound_punch_check.length == 0 && this.alex_powerup_sound.isPlaying == false) {
					//this.shrek_punch01.play();
					var insult = Phaser.Utils.Array.GetRandom(this.alex_insult_sounds);
					insult.play();
				}
			}
	}
	
	// Takes a number and returns a number as a string with 0s to left
    zeroPadding(number, size){
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    platformDrop(player, platform) {
        console.log("Platform collision!");
        console.log(platform.y);
        console.log(platform.originalY);
        console.log(platform.collideCheck);
        
        // Upon collision, if the platform is still at its original Y position and collideCheck == false, inital collision has occured
        if (platform.collideCheck == false && platform.y == platform.originalY) {
            console.log("Set to true");
            platform.collideCheck = true;
        }

        // If an inital collision has occurred --> drop the platform
        if (platform.collideCheck == true && platform.y == platform.originalY) {
            console.log("tween");
            platform.y += 1;
            this.tweens.add({
                targets: platform,
                // 600 - the difference between the locations
                y: 600,
                duration: 3000,
                ease: 'Sine.easeInOut',
                repeat: 0,
                onComplete: function(){
                    platform.y -= 1;;
                },
                yoyo: true
            });
            // Reset the collide checker
            //platform.tweenActive = true;
            platform.collideCheck = false;
        }

        // First collision may not yet be under
        /*
        if (platform.collideCheck == false && platform.tweenActive == true) {
            console.log("first");
            if (platform.y > platform.originalY) {
                console.log("second");
                platform.tweenActive = false;
            }
        }
        */

    }

	// Deal Damage to Minor Enemies
	/*
	playerCombat (player, enemy)
    {
        if (this.cursorKeys.down.isDown || this.cursorKeys.down_Arrow.isDown ||  this.cursorKeys.up_Arrow.isDown) {
			enemy.health -= 1;
		
			//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			//pain_sound.play();
			var randomX = Phaser.Math.Between(enemy.x - 12, enemy.x + 12);
			var randomY = Phaser.Math.Between(enemy.y - 20, enemy.y + 20);
			var blood = new Blood(this, randomX, randomY);
			// flips the blood sprite depending on the player's orientation
			if (player.flipX == true) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
		}
	}
	*/

	// Deal Damage to Demon Boss
	playerCombat (player, enemy)
    {
        if (this.cursorKeys.down.isDown || this.cursorKeys.down_Arrow.isDown ||  this.cursorKeys.up_Arrow.isDown) {
			//enemy.health -= 1;

			var amount = 1;
			enemy.health -= amount;
			if (this.demon.contains(enemy) || this.gayfrogs.contains(enemy) || this.hillary == enemy) {
				enemy.hp.decrease(amount);
			}
			
			//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			//pain_sound.play();
			var randomX = Phaser.Math.Between(enemy.x - 12, enemy.x + 12);
			var randomY = Phaser.Math.Between(enemy.y - 20, enemy.y + 20);
			var blood = new Blood(this, randomX, randomY);
			// flips the blood sprite depending on the player's orientation
			if (player.flipX == true) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
		}

		if (this.demon.contains(enemy)) {
			// Checks to see if the player is taking damage from eruption
			if (enemy.anims.currentAnim.key == 'demon_eruption') {
				player.health -= 0.1;
				// Player Take Damage effect
				player.setTint(0xff0000);
			}
		}

		else if (this.gayfrogs.contains(enemy)) {
			if (enemy.anims.currentAnim.key == 'punch_pepe' || enemy.anims.currentAnim.key == 'kick_pepe') {
				// Deal damage to player
				player.health -= 0.05;
				// Player Take Damage effect
				player.setTint(0xff0000);
				//pain_sound.play();
			}
		}

		else if (this.tentacles.contains(enemy)) {
			if (enemy.anims.currentAnim.key == 'tentacle_Attack') {
				// Deal damage to player
				player.health -= 0.05;
				// Player Take Damage effect
				player.setTint(0xff0000);
				//pain_sound.play();
			}
		}

		/*
		this.demon.children.iterate(function (child) {
			if (child.anims.currentAnim.key == 'demon_eruption') {
				player.health -= 0.5;
				// Player Take Damage effect
				player.setTint(0xff0000);
			}
		});
		*/
	}

	// Environmental Fire Damage
	fireDamage (player, fire)
    { 
		player.health -= 0.5;
		// Player Take Damage effect
		player.setTint(0xff0000);
		// Returns us an array of all sounds that are currently playing
		var sound_check = Phaser.Utils.Array.GetAll(this.alex_pain_sounds, 'isPlaying', true);
		// If there a currently no sounds playing we can play a punch sound
		if (sound_check.length == 0) {
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
		}
    }

	// Deals Damage to enemies hit by energy blasts and creates and explosion

	energyHitHillary (hillary, energy)
    { 
		//enemy.health -= 5;
		var amount = 5;
		hillary.health -= amount;
		hillary.hp.decrease(amount);
	
		//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
		//pain_sound.play();
		var randomX = Phaser.Math.Between(hillary.x - 12, hillary.x + 12);
		var randomY = Phaser.Math.Between(hillary.y - 20, hillary.y + 20);
		this.explosion_sound.play(this.explosionConfig);
		energy.destroy();
		var energyExplosion = new Explosion(this, randomX, randomY);
	}

	// Doesn't work with Hillary
	energyHit (energy, enemy)
    { 
		//enemy.health -= 5;

		var amount = 5;
		enemy.health -= amount;
		
		if (this.demon.contains(enemy)) {
			enemy.hp.decrease(amount);
		}
		else if (this.gayfrogs.contains(enemy)) {
			enemy.hp.decrease(amount);
		}
		
		//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
		//pain_sound.play();
		var randomX = Phaser.Math.Between(enemy.x - 12, enemy.x + 12);
		var randomY = Phaser.Math.Between(enemy.y - 20, enemy.y + 20);
		this.explosion_sound.play(this.explosionConfig);
		energy.destroy();
		var energyExplosion = new Explosion(this, randomX, randomY);
	}

	fireBlastHit (player, fire)
    { 
		player.health -= 1;
		// Player Take Damage effect
		player.setTint(0xff0000);
		fire.destroy();
	}
    /*

	animCompletePepe (animation, frame)
	{		
		if (this.player2.body.touching.down) {
			this.player2.anims.play('idle_pepe');
		}
	}
	*/

	/*
	animCompleteBoss (animation, frame) {
		if (this.boss.body.touching.down && boss.anims.currentAnim.key != 'demon_idle') {
			this.boss.anims.play('demon_idle');
		}
	}
	*/

	/*
	animCompleteHound (animation, frame)
	{		
		if (this.alex.body.touching.down && this.alex.anims.currentAnim.key != 'powerup_phase01') {
			this.alex.anims.play('idle');
		}

		// When the powerup_phase01 is complete the animation complete will call and set powerup to true
		else if (this.alex.body.touching.down && this.alex.anims.currentAnim.key == 'powerup_phase01') {
			this.alex.isPowerup = true;
		}
	}
	*/

	// Enemy Hound Manager
	houndManager (player, attack_sounds) {
		var childCounter = 0;
		var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
		var bite = this.bite_sound;
		var bloodSplat = this.blood_splatter_sound;
		this.hounds.children.iterate(function (child) { 
			// call back function to control idle animation
			//child.on('animationcomplete', child.animCompleteHound, this);
			//child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

			// ------------------
			// If the Hound is within range of the Player --> Move Towards Player
			if (Math.abs(player.body.position.x - child.body.position.x) <= 800) {
				// Math.sign returns positive, negative, or 0
				// If the child is further left from the player --> add 15 to velocity 
				// - (childCounter + 1) * 100 * Math.sign(player.body.velocity.x
				if (child.body.position.x < (player.body.position.x - 10) - (childCounter + 1) * 100 * Math.sign(player.body.velocity.x)) {
					child.flipX = true;
					child.body.velocity.x = 300;
					// If the child is touching a right collider and also the ground --> jump the wall
					if (child.body.touching.right && child.body.touching.down) {
						child.body.velocity.y = -600;
						// Set the hounds animation to run if it isn't already
						if (child.anims.currentAnim.key != 'hound_jump_anim') {
							child.anims.play('hound_jump_anim', true);
							// Change the physics body for the sprite shift
							child.body.setSize(65, 48);
						}
					}

					// Set the hounds animation to run if it isn't already
					else if (child.anims.currentAnim.key != 'hound_run_anim' && child.body.touching.down) {
						child.anims.play('hound_run_anim', true);
						child.body.setSize(67, 32);
					}
				} 
				
				else if (child.body.position.x > player.body.position.x + 10) {
					child.flipX = false;
					child.body.velocity.x = -300;
					// If the child is touching a left collider and also the ground --> jump the wall
					if (child.body.touching.left && child.body.touching.down) {
						child.body.velocity.y = -600;
						// Set the hounds animation to run if it isn't already
						if (child.anims.currentAnim.key != 'hound_jump_anim') {
							child.anims.play('hound_jump_anim', true);
							// Change the physics body for the sprite shift
							child.body.setSize(65, 48);
						}
					}

					// Set the hounds animation to run if it isn't already
					else if (child.anims.currentAnim.key != 'hound_run_anim' && child.body.touching.down) {
						child.anims.play('hound_run_anim', true);
						child.body.setSize(67, 32);
					}
				}

				else if (child.body.position.x <= player.body.position.x + 15 && child.body.position.x >= player.body.position.x - 15) {
					child.body.velocity.x = 0;
					if (child.anims.currentAnim.key != 'hound_idle_anim') {
						child.anims.play('hound_idle_anim', true);
						child.body.setSize(64, 32);
					}

					if (child.body.position.y <= player.body.position.y + 15 && child.body.position.y >= player.body.position.y - 15) {
						// Deal damage to player
						player.health -= 1;

						// Player Take Damage effect
						player.setTint(0xff0000);
						//pain_sound.play();

						// Returns us an array of all sounds that are currently playing
						var sound_check = Phaser.Utils.Array.GetAll(attack_sounds, 'isPlaying', true);
						// If there a currently no sounds playing we can play a punch sound
						if (sound_check.length == 0) {
							//this.shrek_punch01.play();
							var bite = Phaser.Utils.Array.GetFirst(attack_sounds);
							bite.play();
						}
					}
				}
				childCounter += 1;
			}

			// Otherwise (the player is not in range), make idle
			else {
				child.body.velocity.x = 0;
				if (child.anims.currentAnim.key != 'hound_idle_anim') {
					child.anims.play('hound_idle_anim', true);
				}
			}

			if (child.health <= 0) {
				//var randomX = Phaser.Math.Between(child.x - 12, child.x + 12);
				//var randomY = Phaser.Math.Between(child.y - 20, child.y + 20);
				// Blood Explosion noise
				bloodSplat.play();
				//var blood = new BloodExplosion(this, randomX, randomY);
				child.setActive(false);
				child.setVisible(false);
			}
			
		});

		// If dead hounds exist --> remove them
		if (this.hounds.countActive(true) < this.hounds.countActive(true) + this.hounds.countActive(false)) {
			// While dead exist?
			var deadHound = this.hounds.getFirstDead();
			var blood = new BloodExplosion(this, deadHound.x, deadHound.y);
			// flips the blood sprite depending on the player's orientation
			if (player.flipX == false) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
			this.hounds.remove(this.hounds.getFirstDead(), true, true);
		}
	}

	// Enemy Demon Manager
	demonManager (player) {
		//var childCounter = 0;
		//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
		//var bite = this.bite_sound;
		var bloodSplat = this.blood_splatter_sound;
		
		this.demon.children.iterate(function (child) { 
			// call back function to control idle animation
			//child.on('animationcomplete', child.animCompleteHound, this);
			//child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

			
			// ------------------
			// If the Demon is within range of the Player --> Move Towards Player
			if (Math.abs(player.body.position.x - child.body.position.x) <= 650) {
				// Math.sign returns positive, negative, or 0
				// If the child is further left from the player --> launch fireballs 
				if (child.body.position.x < player.body.position.x - 100) {
					child.flipX = true;

					// Adjust the sprites position in space to coincide with its sprite texture change
					var adjust = 0;
					if (child.anims.currentAnim.key == 'demon_eruption') {
						adjust = 192;
					}

					else if (child.anims.currentAnim.key == 'demon_idle') {
						// 
						adjust = 6;
					}

					// Set the demon's animation to launch fire balls if it isn't already
					if (child.anims.currentAnim.key != 'demon_fireball') {
						child.anims.play('demon_fireball', true);
                        //child.body.setSize(64, 64);
                        child.body.setSize(44, 64);
                        child.body.setOffset(10, 0);
						child.body.position.y += adjust;
						//var blast = new DemonFire(this, child.x - 40, child.y - 40, child.flipX);
					}

                    child.body.velocity.x = child.speed;
					// Jump towards the player
					if (child.body.touching.down) {
						child.body.velocity.y = -600;
					}
				} 
				
				// If the child is further right from the player --> launch fireballs 
				else if (child.body.position.x > player.body.position.x + 10) {
					child.flipX = false;
				
					// Set the hounds animation to run if it isn't already
					var adjust = 0;
					if (child.anims.currentAnim.key == 'demon_eruption') {
						adjust = 192;
					}

					else if (child.anims.currentAnim.key == 'demon_idle') {
						adjust = 6;
					}

					if (child.anims.currentAnim.key != 'demon_fireball') {
						child.anims.play('demon_fireball', true);
                        //child.body.setSize(64, 64);
                        child.body.setSize(44, 64);
                        child.body.setOffset(15, 0);
						child.body.position.y += adjust;
					}

                    child.body.velocity.x = -child.speed;
					// Jump towards the player
					if (child.body.touching.down) {
						child.body.velocity.y = -600;
					}
				}

				else if (child.body.position.x <= player.body.position.x + 10 && child.body.position.x >= player.body.position.x - 100 && child.body.position.y <= player.body.position.y + 320 && child.body.position.y >= player.body.position.y - 320) {

					if (child.anims.currentAnim.key != 'demon_eruption') {
						child.anims.play('demon_eruption', true);
                        //child.body.setSize(74, 160);
                        child.body.setSize(40, 160);
                        if (child.flipX == false) {
                            child.body.setOffset(12, 0);
                        }
                        else {
                            child.body.setOffset(20, 0);
                        }
						child.body.position.y -= 192;

						// addition
						child.body.velocity.x = 0;
					}
				}
				//childCounter += 1;
			}

			// Otherwise (the player is not in range), make idle
			else {
				// If the demon is not already in and idle state
				if (child.anims.currentAnim.key != 'demon_idle') {
					child.anims.play('demon_idle', true);
					child.body.setSize(55, 67);
					child.body.position.y -= 6;

					child.body.velocity.x = 0;
				}
			}

			// If the Demon's health is below or equal to 0
			if (child.health <= 0) {
				//var randomX = Phaser.Math.Between(child.x - 12, child.x + 12);
				//var randomY = Phaser.Math.Between(child.y - 20, child.y + 20);
				// Blood Explosion noise
				bloodSplat.play();
				//var blood = new BloodExplosion(this, randomX, randomY);
				child.setActive(false);
				child.setVisible(false);
				child.hp.bar.destroy();
			}
			
		});

		// If a demon exists
		if (this.demon.countActive(true) > 0) {

            // Array to hold the active demons that are launching fireballs
            var activeDemonPosition_X = [];
            var activeDemonPosition_Y = [];
            var activeDemonPosition_Flip = [];
            // Used to determine if we have fireballs that need to be fired
            var fireballCount = 0;
            this.demon.children.iterate(function (child) { 
                if (child.anims.currentAnim.key == 'demon_fireball' && child.demonTimer == 20) {
                   
                    Phaser.Utils.Array.Add(activeDemonPosition_X, child.x);
                    Phaser.Utils.Array.Add(activeDemonPosition_Y, child.y);
                    
                    // flips the fire sprite depending on the player's orientation
				    if (child.flipX == false) {
					    Phaser.Utils.Array.Add(activeDemonPosition_Flip, false);
				    }
				    else {
					    Phaser.Utils.Array.Add(activeDemonPosition_Flip, true);
                    }
                    
                    // Reset the firing timer
                    child.demonTimer = 0;
                    fireballCount += 1;
                }

                else if (child.demonTimer < 20){
                    child.demonTimer += 1;
                }
            });

            /*
			var currentDemon = this.demon.getFirstAlive();
			if (currentDemon.anims.currentAnim.key == 'demon_fireball' && this.demonTimer == 20) {

				// flips the fire sprite depending on the player's orientation
				if (currentDemon.flipX == false) {
					var blast = new DemonFire(this, currentDemon.x - 50, currentDemon.y, !currentDemon.flipX);
					blast.flipX = false;
				}
				else {
					var blast = new DemonFire(this, currentDemon.x + 50, currentDemon.y, !currentDemon.flipX);
					blast.flipX = true;
				}

				// Reset the firing timer
				this.demonTimer = 0;
			}

			else if (this.demonTimer < 20){
				this.demonTimer += 1;
            }
            */

            // Check to see if the arrays are not empty, if not empty --> create and fire new fireballs
            //var flipCheck = Phaser.Utils.Array.GetAll(activeDemonPosition_Flip, 'isPlaying', true);
            if (fireballCount > 0 && activeDemonPosition_Flip.length > 0 && activeDemonPosition_Flip.length == fireballCount) {
                var i = 0;
                while (i < fireballCount) {
                    var flip = Phaser.Utils.Array.RemoveAt(activeDemonPosition_Flip, 0);
                    var blast = new DemonFire(this, Phaser.Utils.Array.RemoveAt(activeDemonPosition_X, 0) - 50, Phaser.Utils.Array.RemoveAt(activeDemonPosition_Y, 0), !flip);
                    if (flip == false) {
                        blast.flipX = false;
                    }
                    else {
                        blast.flipX = true;
                    }
                    i += 1;
                }
                /*
                for (var i = 0; i < fireballCount; i++) {
                    var blast = new DemonFire(this, Phaser.Utils.Array.activeDemonPosition_X - 50, currentDemon.y, !currentDemon.flipX);
                }
                */
            }
		}
		
		// Generate fire blasts if the demon is playing the fire blast animation 
		// If dead demons exist --> remove them
		if (this.demon.countActive(true) < this.demon.countActive(true) + this.demon.countActive(false)) {
			// While dead exist?
			var deadDemon = this.demon.getFirstDead();
			var blood = new BloodExplosion(this, deadDemon.x, deadDemon.y);
			// flips the blood sprite depending on the player's orientation
			if (player.flipX == false) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
			this.demon.remove(this.demon.getFirstDead(), true, true);
		}
	}

	// Enemy Demon Manager
	gayfrogManager (player) {

		var bloodSplat = this.blood_splatter_sound;
		var punch_sound = Phaser.Utils.Array.GetRandom(this.punch_sounds);
		var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
		var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);

		this.gayfrogs.children.iterate(function (child) { 
			
			// ------------------
			// If the Demon is within range of the Player --> Move Towards Player

			if (child.health > 0 && child.health <= 150 && Math.abs(player.body.position.x - child.body.position.x) >= 100 && player.anims.currentAnim.key != 'energy_blast') {
				child.body.velocity.x = 0;
				child.anims.play('powerup_pepe', true);
				if (child.health < 200) {
					child.health += 0.5;
					child.hp.increase(0.5);
				}
			}

			else if (Math.abs(player.body.position.x - child.body.position.x) <= 800) {
				// Math.sign returns positive, negative, or 0
				// If the child is further left from the player --> run at the player 
				if (child.body.position.x < player.body.position.x - 60) {
					child.flipX = false;

					// Set the gayfrog's animation to running if it isn't already
					if (child.anims.currentAnim.key != 'tackle_pepe' && child.body.touching.down) {
						child.anims.play('tackle_pepe', true);
					}

					child.body.velocity.x = child.speed;
					
					// If the player is not touching the ground and this gay frog is --> jump towards the player
					if (!player.body.touching.down && child.body.touching.down) {
						child.body.velocity.y = -600;
						child.anims.play('jump_pepe', true);
						jump_sound.play();
					}
				} 
				
				// If the child is further right from the player --> launch fireballs 
				else if (child.body.position.x > player.body.position.x + 80) {
					child.flipX = true;

					if (child.anims.currentAnim.key != 'tackle_pepe' && child.body.touching.down) {
						child.anims.play('tackle_pepe', true);
					}

					child.body.velocity.x = -child.speed;
					
					// If the player is not touching the ground and this gay frog is --> jump towards the player
					if (!player.body.touching.down && child.body.touching.down) {
						child.body.velocity.y = -600;
						child.anims.play('jump_pepe', true);
						jump_sound.play();
					}
				}

				else if (child.body.position.x <= player.body.position.x + 80 && child.body.position.x >= player.body.position.x - 60 && child.body.position.y <= player.body.position.y + 50 && child.body.position.y >= player.body.position.y - 50) {

					//var attackType = Phaser.Math.Between(0, 10000);
					// If the player is grounded we punch
					if (player.body.touching.down && child.body.touching.down) {
						if (child.anims.currentAnim.key != 'punch_pepe') {
							child.anims.play('punch_pepe', true);

							child.body.velocity.x = 0;
						}
						punch_sound.play();
					}
					
					else {
						if (child.attack < 50) {
							if (child.anims.currentAnim.key != 'kick_pepe') {
								child.anims.play('kick_pepe', true);
	
								child.body.velocity.x = 0;
							}
							kick_sound.play();
							child.attack += 1;
						}
						else {
							if (child.anims.currentAnim.key != 'punch_pepe') {
								child.anims.play('punch_pepe', true);
						
								child.body.velocity.x = 0;
							}
							punch_sound.play();
							child.attack += 1;
							// Resets attack counter
							if (child.attack >= 100) {
								child.attack = 0;
							}
						}
					}

					// If the player is not touching the ground and this gay frog is --> jump towards the player
					if (!player.body.touching.down && child.body.touching.down) {
						child.body.velocity.y = -600;
						child.anims.play('jump_pepe', true);
						jump_sound.play();
					}
				}
			}

			// Otherwise (the player is not in range), make idle
			else {
				// If the demon is not already in and idle state
				if (child.anims.currentAnim.key != 'pepe_idle') {
					child.anims.play('pepe_idle', true);

					child.body.velocity.x = 0;
				}
			}

			// If the Demon's health is below or equal to 0
			if (child.health <= 0) {
				//var randomX = Phaser.Math.Between(child.x - 12, child.x + 12);
				//var randomY = Phaser.Math.Between(child.y - 20, child.y + 20);
				// Blood Explosion noise
				bloodSplat.play();
				//var blood = new BloodExplosion(this, randomX, randomY);
				child.setActive(false);
				child.setVisible(false);
				child.hp.bar.destroy();
			}

			if (child.flipX == false) {
				child.hp.x = child.x - 40;
			}
			else {
				child.hp.x = child.x - 40;
			}
			
			child.hp.y = child.y - 80;
			child.hp.draw();
		});

		/*
		// If a gayfrog exists
		if (this.gayfrogs.countActive(true) > 0) {

            // Array to hold the active demons that are launching fireballs
            var activeDemonPosition_X = [];
            var activeDemonPosition_Y = [];
            var activeDemonPosition_Flip = [];
            // Used to determine if we have fireballs that need to be fired
            var fireballCount = 0;
            this.demon.children.iterate(function (child) { 
                if (child.anims.currentAnim.key == 'demon_fireball' && child.demonTimer == 20) {
                   
                    Phaser.Utils.Array.Add(activeDemonPosition_X, child.x);
                    Phaser.Utils.Array.Add(activeDemonPosition_Y, child.y);
                    
                    // flips the fire sprite depending on the player's orientation
				    if (child.flipX == false) {
					    Phaser.Utils.Array.Add(activeDemonPosition_Flip, false);
				    }
				    else {
					    Phaser.Utils.Array.Add(activeDemonPosition_Flip, true);
                    }
                    
                    // Reset the firing timer
                    child.demonTimer = 0;
                    fireballCount += 1;
                }

                else if (child.demonTimer < 20){
                    child.demonTimer += 1;
                }
            });

            // Check to see if the arrays are not empty, if not empty --> create and fire new fireballs
            //var flipCheck = Phaser.Utils.Array.GetAll(activeDemonPosition_Flip, 'isPlaying', true);
            if (fireballCount > 0 && activeDemonPosition_Flip.length > 0 && activeDemonPosition_Flip.length == fireballCount) {
                var i = 0;
                while (i < fireballCount) {
                    var flip = Phaser.Utils.Array.RemoveAt(activeDemonPosition_Flip, 0);
                    var blast = new DemonFire(this, Phaser.Utils.Array.RemoveAt(activeDemonPosition_X, 0) - 50, Phaser.Utils.Array.RemoveAt(activeDemonPosition_Y, 0), !flip);
                    if (flip == false) {
                        blast.flipX = false;
                    }
                    else {
                        blast.flipX = true;
                    }
                    i += 1;
                }
            }
		}
		*/
		
		// If dead gayfrogs exist --> remove them
		if (this.gayfrogs.countActive(true) < this.gayfrogs.countActive(true) + this.gayfrogs.countActive(false)) {
			// While dead exist?
			var deadFrog = this.gayfrogs.getFirstDead();
			var blood = new BloodExplosion(this, deadFrog.x, deadFrog.y);
			var pain = Phaser.Utils.Array.GetRandom(this.frog_pain_sounds);
			pain.play();
			// flips the blood sprite depending on the player's orientation
			if (player.flipX == false) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
			this.gayfrogs.remove(this.gayfrogs.getFirstDead(), true, true);
		}
	}

	tentacleManager (player) {
		this.tentacles.children.iterate(function (child) { 
			
			//if (Math.abs(player.body.position.x - child.body.position.x) <= 100) {
				if (child.body.position.x <= player.body.position.x + 100 && child.body.position.x >= player.body.position.x - 300) {
				// Set the gayfrog's animation to running if it isn't already
				if (child.anims.currentAnim.key != 'tentacle_Attack' && child.body.touching.down) {
					child.anims.play('tentacle_Attack', true);
					child.setSize(102, 106);
					child.setOffset(0, 0);
				}
			}

			// Otherwise (the player is not in range), make idle
			else {
				// If the demon is not already in and idle state
				if (child.anims.currentAnim.key != 'tentacle_Idle') {
					child.anims.play('tentacle_Idle', true);
					child.setSize(102, 20);
					child.setOffset(0, 85);
				}
			}
		});
	}

	animCompleteHillary (animation, frame) {
		if (this.hillary.anims.currentAnim.key == 'hillary_Powerup' && this.hillary.powerupTimer >= 5) {
			this.hillary.anims.play('hillary_RangeAttack', true);
			this.hillary.powerupTimer = 0;
		}

		else if (this.hillary.anims.currentAnim.key == 'hillary_Powerup' && this.hillary.powerupTimer < 5){
			this.hillary.anims.play('hillary_Powerup', true);
			this.hillary.powerupTimer += 1;
		}
	}

	hillaryManager (player) {
		
		// If they have the same x position then the subtraction will result in 0
		if (Math.abs(player.body.position.x - this.hillary.body.position.x) <= 1000) {

			if (this.hillary.greeting == false) {
				this.hillary.greeting = true;
				this.hillaryGreeting.play();

			}

			if (this.hillary.body.position.x <= player.body.position.x + 200 && this.hillary.body.position.x >= player.body.position.x - 400) {
				if (this.hillary.anims.currentAnim.key != 'hillary_Bite') {
					this.hillary.anims.play('hillary_Bite', true);
				}
			}

			else if (this.hillary.anims.currentAnim.key != 'hillary_RangeAttack') {
				if (this.hillary.anims.currentAnim.key != 'hillary_Powerup') {
					this.hillary.anims.play('hillary_Powerup', true);
				}
			}

			if (this.hillary.anims.currentAnim.key == 'hillary_RangeAttack' && this.hillary.fireTimer >= 30) {

				var blast = new DemonFire(this, this.hillary.x - 150, this.hillary.y - 30, true);
				blast.setScale(6);
				//blast.flipX = false;
				this.hillary.fireTimer = 0;
			}
	
			else if (this.hillary.fireTimer < 30){
				this.hillary.fireTimer += 1;
			}
		}

		else {
			if (this.hillary.anims.currentAnim.key != 'hillary_Idle') {
				this.hillary.anims.play('hillary_Idle', true);
			}
		}

		// If the Demon's health is below or equal to 0
		if (this.hillary.health <= 0 && this.levelFadeOut == false) {
			this.hillaryDead = true;
			var bloodSplat = this.blood_splatter_sound;
			var blood = new BloodExplosion(this, this.hillary.x, this.hillary.y);
			var pain = Phaser.Utils.Array.GetRandom(this.frog_pain_sounds);
			pain.play();
			// Blood Explosion noise
			bloodSplat.play();
			//var blood = new BloodExplosion(this, randomX, randomY);
			this.hillary.setActive(false);
			this.hillary.setVisible(false);
			this.hillary.hp.bar.destroy();

			this.levelFadeOut = true;

			this.hillaryMorph.setAlpha(1);
			this.hillaryMorph.anims.play('hillary_Morph', true);

			//this.cameras.main.stopFollow();
			this.cameras.main.startFollow(this.hillaryMorph);
			
			var tween = this.tweens.add({
				targets: this.background,
					alpha: { from: 1, to: 0 },
					// alpha: { start: 0, to: 1 },
					// alpha: 1,
					// alpha: '+=1',
					ease: 'Bounce.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
					duration: 1000,
					repeat: 0,            // -1: infinity
					yoyo: false
				});

			var tween02 = this.tweens.add({
				targets: this.background02,
					alpha: { from: 1, to: 0 },
					// alpha: { start: 0, to: 1 },
					// alpha: 1,
					// alpha: '+=1',
					ease: 'Bounce.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
					duration: 1000,
					repeat: 0,            // -1: infinity
					yoyo: false
				});

				this.sound.removeByKey('preFinalBattle_music');
				this.finalBattleMusic.play(this.musicConfig);
				this.hillaryLaugh.play();
		}
	}

	animCompleteAlex (animation, frame)
	{	
		// Checking to make sure that Alex still is not in powerup state
		if (this.alex.body.touching.down && this.alex.anims.currentAnim.key != 'powerup_phase01' && this.alex.isPowerup == false) {
			this.alex.anims.play('idle');
		}

		// When the powerup_phase01 is complete the animation complete will call and set powerup to true
		else if (this.alex.body.touching.down && this.alex.anims.currentAnim.key == 'powerup_phase01') {
			this.alex.isPowerup = true;
		}
	}

	// Controls Alex's actions and movements
	alexManager(player, left, right, up, kick, punch, powerup, pickup, sprint, energy_blast) 
	{	
		// -------------------------------
		// Power Up animation if the player is touching the ground and not moving
        if (powerup.isDown && player.body.touching.down)
		{
			if (player.isPowerup == true) {
				player.anims.play('powerup_phase02', true);
			}

			else if (player.isPowerup == false && player.anims.currentAnim.key != 'powerup_phase01'){
				player.setVelocityX(0);
				//player.y -= 51;
				//this.cameras.main.stopFollow();
				player.anims.play('powerup_phase01', true);
				player.body.y -= 25;
				//player.body.setSize(177, 171);
				player.body.setSize(100, 120);
				player.body.setOffset(20, 50);
				//player.setTexture("alex_powerup");
			}

			if (player.health < this.max_health) {
				player.health += 0.05;
			}

		}

		// Upon release of power up, set isPowerup back to false
		else if (powerup.isUp && (player.anims.currentAnim.key == 'powerup_phase01' || player.anims.currentAnim.key == 'powerup_phase02')) {
			//this.cameras.main.startFollow(this.alex);
			player.setTexture("alex");
			player.anims.play('idle');
			//player.body.y -= 10;
			player.body.setSize(100, 120);
			player.body.y += 24;
			player.isPowerup = false;
		}

		// Player is walking left and touches the ground
		else if (left.isDown && sprint.isUp && powerup.isUp)
		{
			player.setVelocityX(-200);
			// += and -= since the postion of the tile is changing 
			this.background.tilePositionX -= 0.2;
			player.flipX = true;
			// Changing the direction of alex
			//player.direction = true;
			if (player.body.touching.down && up.isUp)
			{
            	player.anims.play('walk', true);
			}
			
			// Fall down when velocity == 0
			else if (player.body.velocity.y >= 0 && !(player.body.touching.down) && player.anims.currentAnim.key != 'jump_fall' && player.anims.currentAnim.key != 'air_punch' && player.anims.currentAnim.key != 'air_kick' && player.anims.currentAnim.key != 'energy_blast' && player.anims.currentAnim.key != 'land')
			{
				player.anims.play('jump_fall', true);
			}

			// If the player jumps
			if (up.isDown && player.body.touching.down)
			{
				player.setVelocityY(-800);
				player.isDown = false;
				player.anims.play('jump_up', true);
				var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
				jump_sound.play();
			}
		}

		// Player moving Right -------------------------
		// Player is walking right and touches the ground
		else if (right.isDown && sprint.isUp && powerup.isUp)
		{
			player.setVelocityX(200);
			this.background.tilePositionX += 0.2;
			player.flipX = false;
			// Changing the direction of alex
			//player.direction = false;
			
			if (player.body.touching.down && up.isUp) 
			{
            	//player.flipX = false;
				player.anims.play('walk', true);
			}

			// Fall down when velocity == 0
			else if (player.body.velocity.y >= 0 && !(player.body.touching.down) && player.anims.currentAnim.key != 'jump_fall' && player.anims.currentAnim.key != 'air_punch' && player.anims.currentAnim.key != 'air_kick' && player.anims.currentAnim.key != 'energy_blast' && player.anims.currentAnim.key != 'land')
			{
				player.anims.play('jump_fall', true);
			}

			// If the player jumps
			if (up.isDown && player.body.touching.down)
			{
				player.setVelocityY(-800);
				player.isDown = false;
				player.anims.play('jump_up', true);
				var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
				jump_sound.play();
			}
		}

		// Player is running right and touches the ground
		// Just checking for sprint being down puts it in a loop that does nothing
		else if (((sprint.isDown && right.isDown) || (sprint.isDown && left.isDown)) && powerup.isUp)
		{
			// Player runs left
			if (left.isDown)
			{
				player.setVelocityX(-400);
				this.background.tilePositionX -= 0.4;
				player.flipX = true;

				if (player.body.touching.down && up.isUp)
				{
					player.anims.play('run', true);
				}

				// Fall down when velocity == 0
				else if (player.body.velocity.y >= 0 && !(player.body.touching.down) && player.anims.currentAnim.key != 'jump_fall' && player.anims.currentAnim.key != 'air_punch' && player.anims.currentAnim.key != 'air_kick' && player.anims.currentAnim.key != 'energy_blast' && player.anims.currentAnim.key != 'land')
				{
					player.anims.play('jump_fall', true);
				}

				// If the player jumps
				if (up.isDown && player.body.touching.down)
				{
					player.setVelocityY(-800);
					player.isDown = false;
					player.anims.play('jump_up', true);
					var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
					jump_sound.play();
				}
			}


			else if (right.isDown)
			{
				player.setVelocityX(400);
				this.background.tilePositionX += 0.4;
				player.flipX = false;

				if (player.body.touching.down && up.isUp)
				{
					player.anims.play('run', true);
				}

				// Fall down when velocity == 0
				else if (player.body.velocity.y >= 0 && !(player.body.touching.down) && player.anims.currentAnim.key != 'jump_fall')
				{
					player.anims.play('jump_fall', true);
				}

				// If the player jumps
				if (up.isDown && player.body.touching.down)
				{
					player.setVelocityY(-800);
					player.isDown = false;
					player.anims.play('jump_up', true);
					var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
					jump_sound.play();
				}
			}
		}

		// Single Punching Animation
		else if (Phaser.Input.Keyboard.JustDown(punch))
		{

			// Don't throw a punch if a punch is already playing
			if (player.anims.currentAnim.key != 'punch_01' && player.anims.currentAnim.key != 'punch_02' && player.anims.currentAnim.key != 'punch_03' && player.anims.currentAnim.key != 'air_punch') {
				// Standing Punch
				if (player.body.touching.down) 
				{
					// Generate a random number and use the random number to choose which punch animation we use
					var choice = Phaser.Math.Between(0, 2);
					if (choice == 0) {
						player.anims.play('punch_01', true);
					}
					else if (choice == 1) {
						player.anims.play('punch_02', true);
					}
					else if (choice == 2) {
						player.anims.play('punch_03', true);
					}
				}

				// Jumping Punch
				else {
					player.anims.play('air_punch', true);
				}

				// Pure air punching noise
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();

				// Play an Alex Jones Voice Sound that accompanies our punch air noise
				var punch_sound02 = Phaser.Utils.Array.GetRandom(this.alex_punch_sounds);
				punch_sound02.play();
			}
		}

		// Held Down Punching
		else if (punch.isDown && powerup.isUp) {

			if (player.anims.currentAnim.key != 'punch_01' && player.anims.currentAnim.key != 'punch_02' && player.anims.currentAnim.key != 'punch_03' && player.anims.currentAnim.key != 'air_punch') {
				// Generate a random number and use the random number to choose which punch animation we use
				if (player.body.touching.down) 
				{
					var choice = Phaser.Math.Between(0, 2);
					if (choice == 0) {
						player.anims.play('punch_01', true);
					}
					else if (choice == 1) {
						player.anims.play('punch_02', true);
					}
					else if (choice == 2) {
						player.anims.play('punch_03', true);
					}
				}

				// Jumping Punch
				else {
					player.anims.play('air_punch', true);
				}
				
				// Pure air punching noise
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();

				// Returns us an array of all sounds that are currently playing
				var sound_check = Phaser.Utils.Array.GetAll(this.alex_punch_sounds, 'isPlaying', true);
				// If there a currently no sounds playing we can play a punch sound
				if (sound_check.length == 0) {
					//this.shrek_punch01.play();
					var punch_sound = Phaser.Utils.Array.GetRandom(this.alex_punch_sounds);
					punch_sound.play();
				}
			}

			// If the player is holding down the punch key, they are still in the air punch animation and they are touching the ground
			// --> play punch animation
			else if (player.anims.currentAnim.key == 'air_punch' && player.body.touching.down) {

				var choice = Phaser.Math.Between(0, 2);
				if (choice == 0) {
					player.anims.play('punch_01', true);
				}
				else if (choice == 1) {
					player.anims.play('punch_02', true);
				}
				else if (choice == 2) {
					player.anims.play('punch_03', true);
				}

				// Pure air punching noise
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();

				// Returns us an array of all sounds that are currently playing
				var sound_check = Phaser.Utils.Array.GetAll(this.alex_punch_sounds, 'isPlaying', true);
				// If there a currently no sounds playing we can play a punch sound
				if (sound_check.length == 0) {
					//this.shrek_punch01.play();
					var punch_sound = Phaser.Utils.Array.GetRandom(this.alex_punch_sounds);
					punch_sound.play();
				}
			}
		}

        else if (kick.isDown && powerup.isUp)
		{
			if (player.anims.currentAnim.key != 'kick' && player.anims.currentAnim.key != 'air_kick') 
			{
				if (player.body.touching.down) 
				{
					player.anims.play('kick', true);
				}

				// Jumping Kick
				else {
					player.anims.play('air_kick', true);
				}

				//var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//kick_sound.play();
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();
			}

			// If the player is holding down the kick key, they are still in the air kick animation and they are touching the ground
			// --> play kick animation
			else if (player.anims.currentAnim.key == 'air_kick' && player.body.touching.down) {

				player.anims.play('kick', true);

				//var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//kick_sound.play();
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();
			}
        }

		// Jump works if the player is touching the ground
		else if (up.isDown && player.body.touching.down)
		{
			player.setVelocityY(-800);
			player.isDown = false;
			player.anims.play('jump_up', true);
			var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
			jump_sound.play();
		}

		// Fall down animation when the player is descending and not making any actions
		else if (player.body.velocity.y >= 0 && !(player.body.touching.down) && player.anims.currentAnim.key != 'jump_fall' && player.anims.currentAnim.key != 'air_punch' && player.anims.currentAnim.key != 'air_kick' && player.anims.currentAnim.key != 'energy_blast' && player.anims.currentAnim.key != 'land' && player.anims.currentAnim.key != 'powerup_phase01')
		{
			player.anims.play('jump_fall', true);
		}

		// If the player's body touches down and they are currently in the air
		else if (player.body.touching.down && player.isDown == false) {
			// set our boolean to true since Alex has hit the gorund
			player.isDown = true;
			player.anims.play('land', true);
		}

		// ----------------------------
		// Energy Blast attack - occurs on down arrow click
		else if (Phaser.Input.Keyboard.JustDown(energy_blast)) {
			player.anims.play('energy_blast', true);
			var blast = new EnergyBlast(this, player.x - 40, player.y - 40, player.flipX);
			//blast.setVelocityX(200);
			//blast.body.velocity.x = 200;
			//this.playerEnergyBlasts.add(blast);
			//var blast = this.playerEnergyBlasts.get().setActive(true).setVisible(true);
			//blast.fire(this);
		}

		// Player is in idle if not moving left and not moving right
		else if (left.isUp && right.isUp)
		{
			// player is not moving -->
			player.setVelocityX(0);

			// not punching, not kicking, not powering up and they are touching the group and jump is not pressed
			// If the player is not pressing the kick button and they touch the ground -OR- the player is in air kick animation and touche sthe ground 
			if (player.body.touching.down && up.isUp && punch.isUp && kick.isUp && powerup.isUp && player.anims.currentAnim.key != 'punch_01' && player.anims.currentAnim.key != 'punch_02' && player.anims.currentAnim.key != 'punch_03' && player.anims.currentAnim.key != 'kick' && player.anims.currentAnim.key != 'energy_blast' && player.anims.currentAnim.key != 'powerup_phase01' && player.anims.currentAnim.key != 'powerup_phase02') 
			{
				player.anims.play('idle', true);
            	//this.player.anims.play('idle');
            	//console.log("Playing Idle");
			}
		}
	}
}