
// class name is the same as the file name
class play_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "playGame" is the identifier for this scene
		super ("play_game");
		
    }
	
	
    create() {
		// Sound arrays for our players
		this.punch_sounds = [];
		this.jump_sounds = [];
		this.kick_sounds = [];
		this.pain_sounds = [];

		this.alex_punch_sounds = [];
		this.alex_pain_sounds = [];
		this.alex_insult_sounds = [];

		this.hound_attack_sounds = [];

		this.winner = 0;
		// Timer for enemies
		//this.timer = 0;

        //this.score = 0;
		//this.background = this.add.image(400, 300, 'background');
		//this.background = this.add.image(600, 350, 'city_background');
		// Specifies X and Y location of sprite, Size of Sprite --> set the y location to 0
		
		// Sets the position, size and properties of the World boundary. (3rd parameter is the length of our boundary)
		this.physics.world.setBounds(0,-500, 6400, 1200);

		this.background = this.add.tileSprite(600, 30, 1211, 1080, "city_background");
        //this.add.image(400, 300, 'background');
        //this.background.setScale(1.5);

		// Buildings are for aesthetic background purposes --> they do not need physics
		this.buildings = this.add.group();

		this.buildings.create(0, 50, 'building01').setScale(6);
		this.buildings.create(800, 0, 'building02').setScale(6);
		this.buildings.create(1600, 0, 'building03').setScale(6);
		this.buildings.create(2400, 100, 'building04').setScale(6);
		this.buildings.create(3200, 50, 'building05').setScale(6);
		this.buildings.create(4000, 50, 'building01').setScale(6);
		this.buildings.create(4800, 0, 'building03').setScale(6);
		this.buildings.create(5600, 0, 'building02').setScale(6);
		this.buildings.create(6400, 100, 'building04').setScale(6);

		this.scenery = this.add.group();
		this.scenery.create(1200, 540, 'control_box01').setScale(2);

		// A Static Body simply has a position and a size. It isn't touched by gravity, you cannot set 
		// velocity on it and when something collides with it, it never moves. Static by name, static by nature.

		
		this.platforms = this.physics.add.staticGroup({ 
			// sets the texture key to the star image. 
			key: 'concrete',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			repeat: 24,
			// Sets the star position then steps the next one by 70 on the x. 
			setXY: { x: -640, y: 610, stepX: 320 }
		});

		//this.platforms.scaleXY(1.25);
		this.platforms.children.iterate(function (child) { 
			child.setScale(2);
			child.body.setSize(320, 120);
		});
		
		this.obstacles = this.physics.add.staticGroup();
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
		this.obstacles.create(1000, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1285, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1285, 429, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1570, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1570, 429, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1570, 333, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1570, 237, 'ground').setScale(3).refreshBody();
		this.obstacles.create(1855, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(2400, 237, 'ground').setScale(3).refreshBody();
		this.obstacles.create(2685, 237, 'ground').setScale(3).refreshBody();
		this.obstacles.create(2970, 237, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3600, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3600, 429, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3885, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(3885, 429, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 525, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 429, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 333, 'ground').setScale(3).refreshBody();
		this.obstacles.create(4170, 237, 'ground').setScale(3).refreshBody();
		this.obstacles.create(5000, 237, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(5170, 237, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(5500, 237, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(200, 400, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(50, 250, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(750, 250, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(310, 200, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(405, 200, 'ground').setScale(3).refreshBody();
		//this.obstacles.create(500, 200, 'ground').setScale(3).refreshBody();
		
		
        
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
		
		this.alex = this.physics.add.sprite(500, 200, 'alex');
		// Changing our rectangular collider to be smaller width, height
		this.alex.body.setSize(100, 120);
		// call back function to control idle animation
		this.alex.on('animationcomplete', this.animCompleteAlex, this);
        //this.player2.setScale(1.5);
        this.alex.anims.play('idle', true);
		this.alex.setBounce(0.2);
		this.alex.setCollideWorldBounds(true);
		
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

		// ENEMY: Demon
		this.demon = this.physics.add.group({ 
			// sets the texture key to the star image. 
			key: 'demon_boss_idle',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			repeat: 0,
			// Sets the star position then steps the next one by 70 on the x. 
			//setXY: { x: 6100, y: -300, stepX: 100}
			setXY: { x: 6000, y: -300, stepX: 100}
		});

		this.demon.children.iterate(function (child) { 
			// call back function to control idle animation
			//child.on('animationcomplete', child.animCompleteHound, this);
			//child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
			child.health = 200;
			child.setScale(4);
			child.anims.play('demon_idle'); 
		});

		// Set Player and Enemy variables
		this.max_health = 100;

		/*
		this.player.health = 100;
		this.player2.health = 100;
		*/

		// Setting Alex Jones Health
		this.alex.health = 100;
		// Keep track of Alex Jones aerial status
		this.alex.isDown = true;
		this.alex.isPowerup = false;
		this.alex.energyRelease = false;
		// Directions false = facing right, true = facing left
		this.alex.direction = false;

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

		// Hound Bite Array
		Phaser.Utils.Array.Add(this.hound_attack_sounds, this.sound.add("bite"));

       
		//this.shrek_punch01 = this.sound.add("shrek_punch01");
		//this.shrek_powerup_sound = this.sound.add("shrek_powerup");
		//this.pepe_powerup_sound = this.sound.add("shrek_powerup");
		this.alex_powerup_sound = this.sound.add("alex_powerup01");

		this.effects = this.physics.add.staticGroup();
		this.effects.create(1000, 425, 'fire').setScale(3).anims.play('fire_anim', true);
		this.effects.create(1570, 333, 'fire').setScale(3).anims.play('fire_anim', true);
		this.effects.create(2485, 137, 'fire').setScale(3).anims.play('fire_anim', true);
		this.effects.create(2885, 137, 'fire').setScale(3).anims.play('fire_anim', true);
		this.effects.create(3600, 237, 'fire').setScale(3).anims.play('fire_anim', true);
		this.effects.create(4170, 137, 'fire').setScale(3).anims.play('fire_anim', true);
		//this.fire = this.add.sprite(1000, 425, 'fire');
		//this.fire.setScale(3);
		//this.fire.anims.play('fire_anim', true);

		// Collider takes two objects and tests for collision and performs separation against them. In this case we're giving		
		// the player sprite and the platforms Group.

		/*
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.player2, this.platforms);
		*/

		this.physics.add.collider(this.alex, this.platforms);
		this.physics.add.collider(this.alex, this.obstacles);
		this.physics.add.collider(this.demon, this.platforms);
		this.physics.add.collider(this.demon, this.obstacles);
		this.physics.add.collider(this.hounds, this.platforms);
		this.physics.add.collider(this.hounds, this.obstacles);
		//this.physics.add.collider(this.player, this.player2);

		// Determines if the players hurt each other
		//this.physics.add.overlap(this.player, this.player2, this.playerCombat, null, this);

		//this.physics.add.overlap(this.player, this.alex, this.playerCombat, null, this);
		//this.physics.add.overlap(this.player2, this.alex, this.playerCombat, null, this);

		/*
		this.physics.add.overlap(this.alex, this.player, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.player2, this.playerCombat, null, this);
		*/

		this.physics.add.overlap(this.alex, this.demon, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.hounds, this.playerCombat, null, this);
		this.physics.add.overlap(this.alex, this.effects, this.fireDamage, null, this);

		this.playerEnergyBlasts = this.physics.add.group({ classType: EnergyBlast, runChildUpdate: true });
		this.physics.add.collider(this.playerEnergyBlasts, this.platforms);
		this.physics.add.collider(this.playerEnergyBlasts, this.obstacles);
		this.physics.add.overlap(this.playerEnergyBlasts, this.hounds, this.energyHit, null, this);
		this.physics.add.overlap(this.playerEnergyBlasts, this.demon, this.energyHit, null, this);
		//this.playerEnergyBlasts.setVelocityX(200);

		//this.stars = this.physics.add.group({
		// sets the texture key to the star image. 
		//key: 'star',
		// creates 1 child automatically, repeating 11 times means until we get 12 in total.
		//repeat: 11,
		// Sets the star position then steps the next one by 70 on the x. 
		//setXY: { x: 12, y: 0, stepX: 70 }
		//});

		/*
		this.stars.children.iterate(function (child) {
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});

		this.physics.add.collider(this.stars, this.platforms);

		// Check to see if the player overlaps with a star or not: If found then they are passed to the 'collectStar' function.
		this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
		this.physics.add.overlap(this.player2, this.stars, this.collectStar, null, this);
		*/

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

		/*
		this.hp4 = this.add.image(760, 15, 'red');
        this.hp5 = this.add.image(730, 15, 'red');
        this.hp6 = this.add.image(700, 15, 'red');
        this.hp4.setScale(4);
        this.hp5.setScale(4);
        this.hp6.setScale(4);
        this.hp4.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
        this.hp5.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
		this.hp6.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
		*/

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

		// Alex random insult
		var choice = Phaser.Math.Between(0, 300);
		if (choice == 1) {
			// Returns us an array of all sounds that are currently playing
			var sound_check = Phaser.Utils.Array.GetAll(this.alex_insult_sounds, 'isPlaying', true);
			// If there a currently no sounds playing we can play a punch sound
			if (sound_check.length == 0) {
				//this.shrek_punch01.play();
				var insult = Phaser.Utils.Array.GetRandom(this.alex_insult_sounds);
				insult.play();
			}
		}

		// Update our Player Health trackers
        var player_health = this.zeroPadding(Math.round(this.alex.health), 3);
		this.player1_HPUI.text = "ALEX HP: " + player_health;

		if (this.alex.health <= 0) {
			this.winner = 2;
			this.scene.start("win_game", {winner: 2});
		}
		
		/*
		var player2_health = this.zeroPadding(Math.round(this.player2.health), 3);
		this.player2_HPUI.text = "PEPE HP: " + player2_health;
		*/

		/*
		if (this.timer == 10) {
			this.timer = 0;
			
		}
		this.timer++;
		*/
		

	}
	
	// Takes a number and returns a number as a string with 0s to left
    zeroPadding(number, size){
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

	// Star has its physics body disabled and its parent Game Object is made inactive and invisible, which removes it from display.
	/*
	collectStar (player, star)
    {
        star.disableBody(true, true);

		//this.score += 10;
		//this.scoreText.setText('Score: ' + this.score);
		//this.shrek_powerup_sound.play();

		// Release the bomb! countActive see how many stars are still alive. -->
		if (this.stars.countActive(true) === 0)
		{
			// Resets the stars positions. -->
			this.stars.children.iterate(function (child) {
				child.enableBody(true, child.x, 0, true, true);
			});

			// picks a random coordinate for bomb generation that is on the opposite screen side of the player. -->
			var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

			var bomb = this.bombs.create(x, 16, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		}
	}
	*/

	/*
	// Turns player red and ends the game. -->
	hitBomb (player, bomb)
	{
		this.physics.pause();
		this.player.setTint(0xff0000);
		this.player.anims.play('idle');
		//gameOver = true;
	}
	*/
	
	// Damage and Blood effects
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

			//var demonCheck = this.demon.getFirst();
			//if (enemy.contains(demonCheck)) {
				//player.health -= 1;
			//if (child.anims.currentAnim.key == 'demon_eruption') {
				//player.health -= 1;
			//}

			/*
			// Win conditions: Player 2 has no more health
			if (enemy.health <= 0) {
				this.winner = 1;
				this.scene.start("win_game", {winner: 1});
			}
			*/
		}

		this.demon.children.iterate(function (child) {
			if (child.anims.currentAnim.key == 'demon_eruption') {
				player.health -= 0.5;
			}
		});
	}

	// Deals Damage to enemies hit by energy blasts and creates and explosion
	fireDamage (player, fire)
    { 
		player.health -= 0.5;
		// Returns us an array of all sounds that are currently playing
		var sound_check = Phaser.Utils.Array.GetAll(this.alex_pain_sounds, 'isPlaying', true);
		// If there a currently no sounds playing we can play a punch sound
		if (sound_check.length == 0) {
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
		}
    }

	// Deals Damage to enemies hit by energy blasts and creates and explosion
	energyHit (energy, enemy)
    { 
		enemy.health -= 5;
		//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
		//pain_sound.play();
		var randomX = Phaser.Math.Between(enemy.x - 12, enemy.x + 12);
		var randomY = Phaser.Math.Between(enemy.y - 20, enemy.y + 20);
		this.explosion_sound.play();
		energy.destroy();
		var energyExplosion = new Explosion(this, randomX, randomY);
    }

	/*
	animCompleteShrek (animation, frame)
	{		
		if (this.player.body.touching.down) {
			this.player.anims.play('idle_shrek');
		}
    //  Animation is over, let's fade the sprite out
	
	
	this.tweens.add({
        targets: gem,
        duration: 3000,
        alpha: 0
	});
	
	
	}



	animCompletePepe (animation, frame)
	{		
		if (this.player2.body.touching.down) {
			this.player2.anims.play('idle_pepe');
		}
	}
	*/


	animCompleteAlex (animation, frame)
	{		
		if (this.alex.body.touching.down && this.alex.anims.currentAnim.key != 'powerup_phase01') {
			this.alex.anims.play('idle');
		}

		// When the powerup_phase01 is complete the animation complete will call and set powerup to true
		else if (this.alex.body.touching.down && this.alex.anims.currentAnim.key == 'powerup_phase01') {
			this.alex.isPowerup = true;
		}
	}

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

			/*
			if (child.anims.currentAnim.key != 'demon_fireball') {
				child.anims.play('demon_fireball', true);
				//child.body.setSize(256, 256);
			}

			if (child.anims.currentAnim.key != 'demon_eruption') {
				child.anims.play('demon_eruption', true);
				//child.body.setSize(296, 640);
			}

			if (child.anims.currentAnim.key != 'demon_idle') {
				child.anims.play('demon_idle', true);
				//child.body.setSize(220, 268);
			}
			*/

			
			// ------------------
			// If the Hound is within range of the Player --> Move Towards Player
			if (Math.abs(player.body.position.x - child.body.position.x) <= 500) {
				// Math.sign returns positive, negative, or 0
				// If the child is further left from the player --> launch fireballs 
				if (child.body.position.x < player.body.position.x - 148) {
					child.flipX = true;

					var adjust = 0;
					if (child.anims.currentAnim.key == 'demon_eruption') {
						adjust = 192;
					}

					else if (child.anims.currentAnim.key == 'demon_eruption') {
						adjust = 6;
					}

					// Set the demon's animation to launch fire balls if it isn't already
					if (child.anims.currentAnim.key != 'demon_fireball') {
						child.anims.play('demon_fireball', true);
						child.body.setSize(64, 64);
						child.body.position.y += adjust;
					}

					// Jump towards the player
					if (child.body.touching.down) {
						child.body.velocity.x = 300;
						child.body.velocity.y = -600;
					}
				} 
				
				// If the child is further right from the player --> launch fireballs 
				else if (child.body.position.x > player.body.position.x + 148) {
					child.flipX = false;
				
					// Set the hounds animation to run if it isn't already
					var adjust = 0;
					if (child.anims.currentAnim.key == 'demon_eruption') {
						adjust = 192;
					}

					else if (child.anims.currentAnim.key == 'demon_eruption') {
						adjust = 6;
					}

					if (child.anims.currentAnim.key != 'demon_fireball') {
						child.anims.play('demon_fireball', true);
						child.body.setSize(64, 64);
						child.body.position.y += adjust;
					}

					// Jump towards the player
					if (child.body.touching.down) {
						child.body.velocity.x = -300;
						child.body.velocity.y = -600;
					}
				}

				else if (child.body.position.x <= player.body.position.x + 148 && child.body.position.x >= player.body.position.x - 148 && child.body.position.y <= player.body.position.y + 320 && child.body.position.y >= player.body.position.y - 320) {

					if (child.anims.currentAnim.key != 'demon_eruption') {
						child.anims.play('demon_eruption', true);
						child.body.setSize(74, 160);
						child.body.position.y -= 192;

						// addition
						child.body.velocity.x = 0;
					}
				}
				//childCounter += 1;
			}

			// Otherwise (the player is not in range), make idle
			else {
				if (child.anims.currentAnim.key != 'demon_idle') {
					child.anims.play('demon_idle', true);
					child.body.setSize(55, 67);
					child.body.position.y -= 6;

					child.body.velocity.x = 0;
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

		// Winning Game end screen
		if (this.demon.countActive(true) != 1) {
			this.winner = 1;
			this.scene.start("win_game", {winner: 1});
		}
	}

	// Controls Alex's actions and movements
	alexManager(player, left, right, up, kick, punch, powerup, pickup, sprint, energy_blast) 
	{
		// Player is walking left and touches the ground
		if (left.isDown && sprint.isUp)
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
		else if (right.isDown && sprint.isUp)
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
		else if (((sprint.isDown && right.isDown) || (sprint.isDown && left.isDown)))
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
			
			/*
			if (left.isDown) {
				player.setVelocityX(-160);
				player.flipX = true;
			}
			if (right.isDown) {
				player.setVelocityX(160);
				player.flipX = false;
			}
			*/

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
		else if (punch.isDown) {
			
			/*
			if (left.isDown) {
				player.setVelocityX(-160);
				player.flipX = true;
			}
			if (right.isDown) {
				player.setVelocityX(160);
				player.flipX = false;
			}
			*/

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

        else if (kick.isDown)
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

		// -------------------------------
		// Power Up animation if the player is touching the ground and not moving
        else if (powerup.isDown && player.body.touching.down && left.isUp && right.isUp)
		{
			if (player.isPowerup == true) {
				player.anims.play('powerup_phase02', true);
			}

			else if (player.isPowerup == false && player.anims.currentAnim.key != 'powerup_phase01'){
				//player.y -= 51;
				player.body.setSize(177, 171);
				player.setTexture("alex_powerup");
				player.anims.play('powerup_phase01', true);
			}

			if (player.health < this.max_health) {
				player.health += 0.025;
			}

		}

		// Upon release of power up, set isPowerup back to false
		else if (powerup.isUp && (player.anims.currentAnim.key == 'powerup_phase01' || player.anims.currentAnim.key == 'powerup_phase02')) {
			player.setTexture("alex");
			this.alex.body.setSize(100, 120);
			player.isPowerup = false;
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

		/*
		else if (Phaser.Input.Keyboard.JustDown(left_tackle)) {
			player.setVelocityX(400);
			player.flipX = false;

			if (player.body.touching.down && up.isUp)
			{
				player.anims.play('run', true);
				//var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//tackle_sound.play();
			}
		}

		else if (Phaser.Input.Keyboard.JustDown(right_tackle)) {
			player.setVelocityX(-400);
			player.flipX = true;

			if (player.body.touching.down && up.isUp)
			{
				player.anims.play('run', true);
				//var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//tackle_sound.play();
			}
		}

		// Player is moving right or left and touches the ground (holds down left or right)
		else if (left_tackle.isDown)
		{
			player.setVelocityX(400);
			player.flipX = false;

			if (player.body.touching.down && up.isUp)
			{
				player.anims.play('run', true);
				//var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//tackle_sound.play();
			}
		}
		else if (right_tackle.isDown)
		{
			player.setVelocityX(-400);
			player.flipX = true;

			if (player.body.touching.down && up.isUp)
			{
				player.anims.play('run', true);
				//var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//tackle_sound.play();
			}
		}
		*/

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

		/*
		else if (energy_blast.isDown)
		{
			player.anims.play('energy_blast', true);
			var blast = new EnergyBlast(this, player.x, player.y - 20);
			//blast.setVelocityX(200);
			//blast.body.velocity.x = 200;
			//this.playerEnergyBlasts.add(blast);
			//var blast = this.playerEnergyBlasts.get().setActive(true).setVisible(true);
			//blast.fire(this);
		}
		*/

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