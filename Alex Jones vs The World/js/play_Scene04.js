// class name is the same as the file name
class play_Scene04 extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "play_Scene02" is the identifier for this scene
        super ("play_Level04");
    }
    
    create() {
        // class variable for background named this.background
        // Pivot set at 0,0 means its pivot is at the top left corner
        // A tile sprite is a sprite that has a repeating texture - set width and height of tileSprite
        //this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        //this.background.setOrigin(0,0);


        this.background = this.add.sprite(1200 / 2, 700 / 2, "FinalBattleBackground");
		this.background.setScale(3);
        this.background.anims.play('final_Loop', true);
		
		
		this.endingMusic = this.sound.add("ending_music");
		this.gameOver = false;
		this.musicConfig = {
			mute: false,
			volume: 0.25,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: true,
			delay: 0
		}
		
        /*
        this.background = this.add.sprite(0,0, 800, 600, "level02_background");
        this.background.setScale(2.5);
        this.background.setOrigin(0,0);
        */

        // Main ground 
		this.platforms = this.physics.add.staticGroup({ 
			// sets the texture key to the star image. 
			key: 'landBase',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			repeat: 8,
			// Sets the star position then steps the next one by 70 on the x. 
			setXY: { x: -640, y: 700, stepX: 955 }
        });

        this.ground = this.add.sprite(1200 / 2, 800, "pillar_02");
        this.ground.setScale(9, 9.9);
        this.ground.setAngle(90);
        
        //this.platforms.scaleXY(1.25);
		//this.platforms.scaleXY(1.25);
		this.platforms.children.iterate(function (child) { 
			child.setScale(5);
			child.body.setSize(955, 85);
			child.body.setOffset(-380, -35);
		});

        // The speed that the map will initially move
        //this.mapSpeed = 2.5;
        // The maximum speed the map reaches
        //this.mapMaxSpeed = 100;

        //this.enemy_BaseSpeed = 0.5;
        //this.enemy_MaxSpeed = 105;

        //this.bulletVelocity = 250;
        //this.maxBulletVelocity = 1000;

        this.time = 0;
        this.levelFadeOut = false;
        this.tintChecker = 10;
        this.hillaryDead = false;
        this.hillaryLaugh = this.sound.add("hillaryLaugh");
        this.energyPresent = 0;
        //this.game_over = false;


        // Sound arrays for our players
		this.punch_sounds = [];
		this.jump_sounds = [];
		this.kick_sounds = [];
		this.pain_sounds = [];
		this.frog_pain_sounds = [];

		this.alex_punch_sounds = [];
		this.alex_pain_sounds = [];
        this.alex_insult_sounds = [];

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
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_01"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_02"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult03"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult04"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult05"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_03"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult07"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult08"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_03"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_04"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult11"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult12"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult13"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult14"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult15"));
		Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult16"));
        Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_insult17"));
        Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_05"));
        Phaser.Utils.Array.Add(this.alex_insult_sounds, this.sound.add("alex_Level3_06"));
        
        
        this.alex_powerup_sound = this.sound.add("alex_powerup01");

        this.explosion_sound = this.sound.add("explode");
        this.scream = this.sound.add("hillaryDeath");
        
        this.blood_splatter_sound = this.sound.add("blood_splatter");

        // Make the bosses seperate from the group beforehand so we can call functions with them using .on
        this.bat1 = this.physics.add.sprite(0 , 8000, "batDemon");
        this.bat2 = this.physics.add.sprite(600, 8000, "batDemon");
        this.bat3 = this.physics.add.sprite(1200, 8000, "batDemon");
        this.bat1.body.setSize(80, 67);
        this.bat2.body.setSize(80, 67);
        this.bat3.body.setSize(80, 67);

        this.bat1.hp = new HealthBar(this, this.bat1.x, this.bat1.y - 110, 300);
        this.bat2.hp = new HealthBar(this, this.bat2.x, this.bat2.y - 110, 300);
        this.bat3.hp = new HealthBar(this, this.bat3.x, this.bat2.y - 110, 300);

        this.bat1.on('animationcomplete', this.animCompleteBat1, this);
        this.bat2.on('animationcomplete', this.animCompleteBat2, this);
        this.bat3.on('animationcomplete', this.animCompleteBat3, this);


        // ENEMY: Demon Bats
		this.bats = this.physics.add.group({ 
            // Removes gravity from the members
			allowGravity: false,
            // sets the texture key to the star image. 
			//key: 'batDemon',
			// creates 1 child automatically, repeating 11 times means until we get 12 in total.
			//repeat: 3,
			// Sets the star position then steps the next one by 70 on the x. 
			//setXY: { x: 100, y: 200, stepX: 200}
        });
        this.bats.add(this.bat1);
        this.bats.add(this.bat2);
        this.bats.add(this.bat3);

		this.bats.children.iterate(function (child) { 
			// call back function to control idle animation
			//child.on('animationcomplete', child.animCompleteHound, this);
			//child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
			child.health = 300;
            child.setScale(2);
            child.anims.play('batDemon_Idle');
        });
        
        this.physics.add.collider(this.bats, this.bats);

        this.hillary = this.physics.add.sprite(600, 0, 'hillaryFinalForm');
		this.hillary.setScale(1.5);
		// call back function to control idle animation
		this.hillary.on('animationcomplete', this.animCompleteHillary, this);
        //this.player2.setScale(1.5);
        this.hillary.anims.play('idle_hillary', true);
        this.hillary.setCollideWorldBounds(true);
		this.hillary.health = 1000;
		this.hillary.fireTimer = 25;
		this.hillary.powerupTimer = 0;
        this.hillary.greeting = false;
        this.hillary.flipX = true;
        // Controls the current attack animation
        this.hillary.attack = 0;
		this.hillary.hp = new HealthBar(this, this.hillary.x, this.hillary.y - 110, 1000);


        // Set Player Max Health
        this.max_health = 100;
        
        this.alex = this.physics.add.sprite(150, 0, "alex");
        this.alex.body.setSize(100, 120);
        this.alex.on('animationcomplete', this.animCompleteAlex, this);
        //this.alex.body.setAllowGravity(false);
		// call back function to control idle animation
		//this.alex.on('animationcomplete', this.animCompleteAlex, this);
        this.alex.anims.play('idle', true);
        this.alex.setCollideWorldBounds(true);
        this.alex.isPowerup = false;



        // Group for Alex Jones Energy Blasts
        this.playerEnergyBlasts = this.physics.add.group({ 
            classType: EnergyBlast,
            allowGravity: false, 
            runChildUpdate: true 
        });
        this.physics.add.overlap(this.playerEnergyBlasts, this.bats, this.energyHit, null, this);
        this.physics.add.overlap(this.playerEnergyBlasts, this.hillary, this.energyHitHillary, null, this);
        
        this.batFlames = this.physics.add.group({ 
			classType: DemonFlames,
			// Removes gravity from the members
			allowGravity: false, 
            runChildUpdate: true });

        this.physics.add.overlap(this.alex, this.bats, this.playerCombat, null, this);
        this.physics.add.overlap(this.alex, this.hillary, this.playerCombat, null, this);
        this.physics.add.overlap(this.batFlames, this.alex, this.fireFlamesHit, null, this);

        this.physics.add.collider(this.alex, this.platforms);
        this.physics.add.collider(this.hillary, this.platforms);
        this.physics.add.collider(this.playerEnergyBlasts, this.platforms);
        

        this.demonFireBlasts = this.physics.add.group({ 
			classType: DemonFire,
			// Removes gravity from the members
			allowGravity: false, 
			runChildUpdate: true });
        this.physics.add.collider(this.demonFireBlasts, this.platforms);
        this.physics.add.overlap(this.demonFireBlasts, this.alex, this.fireBlastHit, null, this);
        
        this.obstacles = this.physics.add.group();
		
		// 285 width x 96 height

        this.obstacle01 = this.physics.add.sprite(100 , 1000, "ground");
        this.obstacle01.flipX = true;
        this.obstacle02 = this.physics.add.sprite(400, 1850, "ground");
        this.obstacle03 = this.physics.add.sprite(700, 1200, "ground");
        this.obstacle03.flipX = true;
        this.obstacle04 = this.physics.add.sprite(1000, 1500, "ground");

        this.obstacles.add(this.obstacle01);
        this.obstacles.add(this.obstacle02);
        this.obstacles.add(this.obstacle03);
        this.obstacles.add(this.obstacle04);
        
        this.obstacles.children.iterate(function (child) { 
            child.body.setAllowGravity(false);
            child.body.immovable = true;
            child.setScale(2);
            //child.body.moves = false;
            // Used to check if a first collision has occurred
            //child.collideCheck = false;
            //child.originalY = child.y;
            //child.tweenActive = false;
        });
        
        this.physics.add.collider(this.alex, this.obstacles);
        this.physics.add.collider(this.hillary, this.obstacles);
        
        
        this.debris = this.add.tileSprite(600,350, 640, 480, "debris");
        this.debris.setScale(2);
        //this.debris.setOrigin(0,0);

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

        //this.score = 0;
        // Last parameter is font size
        //this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);


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
        
        // Velocity for the player
        //this.velocityUI = this.add.bitmapText(1000, 5, "pixelFont", "VELOCITY: ", 32);

        // Set Player and Enemy variables
        this.alex.health = 100;
        
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
			// Kick
			'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
			// Energy blast
			'up_Arrow': Phaser.Input.Keyboard.KeyCodes.UP,
			// Punch
			'down_Arrow': Phaser.Input.Keyboard.KeyCodes.DOWN,
			// Swap weapons
			'left_Arrow': Phaser.Input.Keyboard.KeyCodes.LEFT,
			'right_Arrow': Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });
    }

    update(time, delta) {
        var player_health = this.zeroPadding(Math.round(this.alex.health), 3);
        this.player1_HPUI.text = "ALEX HP: " + player_health;

        //console.log(this.energyPresent);

        this.debris.tilePositionY += 1;

        this.debrisManager();

		
		/*
		if (this.hillaryDead == true && this.gameOver == false) {
			this.gameOver = true;
			
			this.sound.removeByKey('finalBattle_music');
			
			this.tweens.add({
				targets:  this.finalBattleMusic,
				volume:   0,
				duration: 500
			});
			

			this.endingMusic.play(this.musicConfig);
		}
		*/
		

        if (this.hillaryDead == true && this.time >= 500) {
			
			this.sound.removeByKey('finalBattle_music');
			this.endingMusic.play(this.musicConfig);

            this.scene.start("win_game")
			//this.winner = 1;
			//this.scene.start("win_game", {winner: 1});
        }
        
		// Used to give a breather before the next level
        else if (this.hillaryDead == true && this.time < 500) {
            this.time += 1;
        }
        
        //  Move the Boss Health Bars with them
        if (this.bat1.flipX == false) {
            this.bat1.hp.x = this.bat1.x - 60;
        }
        else {
            this.bat1.hp.x = this.bat1.x;
        }

        if (this.bat2.flipX == false) {
            this.bat2.hp.x = this.bat2.x - 60;
        }
        else {
            this.bat2.hp.x = this.bat2.x;
        }

        if (this.bat3.flipX == false) {
            this.bat3.hp.x = this.bat3.x - 60;
        }
        else {
            this.bat3.hp.x = this.bat3.x;
        }
        
        this.bat1.hp.y = this.bat1.y - 110
        this.bat2.hp.y = this.bat2.y - 110
        this.bat3.hp.y = this.bat3.y - 110
        this.bat1.hp.draw();
        this.bat2.hp.draw();
        this.bat3.hp.draw();

        // Clears out the damage tint on Alex
        if (this.alex.isTinted == true && this.tintChecker >= 10) {
            this.alex.clearTint();
            this.tintChecker = 0;
        }
        else if (this.alex.isTinted == true && this.tintChecker < 10) {
            this.tintChecker += 1;
        }

        // update our speed tracker
        /*
        var speed = this.zeroPadding(Math.round(this.mapSpeed), 3);
        this.velocityUI.text = "VELOCITY: " + speed;
        */
        // ------------------------------

        var choice = Phaser.Math.Between(0, 300);
		if (choice == 1) {
			// Returns us an array of all sounds that are currently playing
			var sound_check = Phaser.Utils.Array.GetAll(this.alex_insult_sounds, 'isPlaying', true);
            var sound_punch_check = Phaser.Utils.Array.GetAll(this.alex_punch_sounds, 'isPlaying', true);
            var sound_pain_check = Phaser.Utils.Array.GetAll(this.pain_sounds, 'isPlaying', true);
			// If there a currently no sounds playing we can play a punch sound
			if (sound_check.length == 0 && sound_punch_check.length == 0 && sound_pain_check.length == 0 && this.alex_powerup_sound.isPlaying == false) {
				var insult = Phaser.Utils.Array.GetRandom(this.alex_insult_sounds);
				insult.play();
			}
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.powerup)) {
			this.alex_powerup_sound.play();
		}
		
		else if (this.cursorKeys.powerup.isUp) {
			this.alex_powerup_sound.stop();
		}

        //this.game.physics.arcade.collide(this.player, this.foregroundLayer);
        //this.game.physics.arcade.collide(this.player, this.foregroundPlusLayer);

        // Speed of all enemies
        /*
        this.moveBat(this.squidShip, this.enemy_BaseSpeed + 1);
        this.moveBat(this.ship2, this.enemy_BaseSpeed + 0.75);
        this.moveBat(this.ship3, this.enemy_BaseSpeed + 0.5);
        */

        this.batManager(this.alex);
        //this.moveBat(this.enemy, this.enemy_BaseSpeed + 0.25);

        // decrease the position of the texture
        //this.background.tilePositionX -= 0.1;
        //this.background.tilePositionY += this.mapSpeed;

        this.alexManager(this.alex, this.cursorKeys.left, this.cursorKeys.right, this.cursorKeys.up, this.cursorKeys.down, this.cursorKeys.up_Arrow, this.cursorKeys.powerup, this.cursorKeys.pickup, this.cursorKeys.shift, this.cursorKeys.down_Arrow);
        //this.movePlayerManager();

        if (this.hillaryDead == false) {
            this.hillaryManager(this.alex);
        }
    }
    
    /*
    fireBlastHit (player, fire)
    { 
		//this.alex.health -= 1;
		player.health -= 1;
		// Player Take Damage effect
		player.setTint(0xff0000);
		fire.destroy();
    }
    */

    debrisManager() {
        this.obstacles.children.iterate(function (child) { 
            //moveBat(child, this.enemy_BaseSpeed);
            // Move the bat vertically
            child.y -= 1;
            // if the ship goes off screen it is reset
            if (child.y < -100) {
                var randomX = Phaser.Math.Between(100, 1100);
                child.y = 900;
                child.x = randomX;
            }
        });

    }

    // Damage and Blood effects
    playerCombat (player, enemy)
    {
        if (this.cursorKeys.down.isDown || this.cursorKeys.down_Arrow.isDown ||  this.cursorKeys.up_Arrow.isDown) {
			//enemy.health -= 1;

			var amount = 1;
            enemy.health -= amount;
            enemy.hp.decrease(amount);
			
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

		if (this.hillary == enemy) {
			if (enemy.anims.currentAnim.key == 'punch_01_hillary' || enemy.anims.currentAnim.key == 'punch_02_hillary' || enemy.anims.currentAnim.key == 'punch_03_hillary' || enemy.anims.currentAnim.key == 'punch_04_hillary' || enemy.anims.currentAnim.key == 'kick_hillary') {
				// Deal damage to player
				player.health -= 0.1;
				// Player Take Damage effect
				player.setTint(0xff0000);
				//pain_sound.play();
			}
		}
	}

    // Deals Damage to enemies hit by energy blasts and creates and explosion
	energyHit (energy, enemy)
    { 
        var amount = 5;
        enemy.health -= amount;
        enemy.hp.decrease(amount);

		//var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
		//pain_sound.play();
		var randomX = Phaser.Math.Between(enemy.x - 12, enemy.x + 12);
		var randomY = Phaser.Math.Between(enemy.y - 20, enemy.y + 20);
		this.explosion_sound.play();
        energy.destroy();
        this.energyPresent -= 1;
		var energyExplosion = new Explosion(this, randomX, randomY);
    }

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
        this.energyPresent -= 1;
		var energyExplosion = new Explosion(this, randomX, randomY);
	}
    
    
    fireFlamesHit (player, fire)
    { 
        player.health -= 0.05;
        // No need to destroy fire since it will do that itself
        player.setTint(0xff0000);
        //fire.destroy();
        var sound_check = Phaser.Utils.Array.GetAll(this.pain_sounds, 'isPlaying', true);
		// If there a currently no sounds playing we can play a punch sound
		if (sound_check.length == 0) {
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
        }
    }

    fireBlastHit (player, fire)
    { 
        player.health -= 2;
        // No need to destroy fire since it will do that itself
        player.setTint(0xff0000);
        fire.destroy();
        var randomX = Phaser.Math.Between(player.x - 12, player.x + 12);
		var randomY = Phaser.Math.Between(player.y - 20, player.y + 20);
		this.explosion_sound.play();
        var energyExplosion = new Explosion(this, randomX, randomY);
        
        var sound_check = Phaser.Utils.Array.GetAll(this.pain_sounds, 'isPlaying', true);
		// If there a currently no sounds playing we can play a punch sound
		if (sound_check.length == 0) {
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
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
    
    animCompleteBat1 (animation, frame)
	{	
        // Plays for the completion of animations that aren't the two air idle animations
		if (this.bat1.anims.currentAnim.key == 'batDemon_Prep') {
            this.bat1.anims.play('batDemon_FireAttack');
            // flips the fire sprite depending on the player's orientation
            this.bat1.body.setSize(65, 80);
			if (this.bat1.flipX == false) {
                this.bat1.body.setOffset(20, 75);
				var flames = new DemonFlames(this, this.bat1.x - 200, this.bat1.y + 100, !this.bat1.flipX);
				flames.flipX = false;
			}
			else {
                this.bat1.body.setOffset(50, 75);
				var flames = new DemonFlames(this, this.bat1.x + 200, this.bat1.y + 100, !this.bat1.flipX);
				flames.flipX = true;
            }
            
        }
    }
    animCompleteBat2 (animation, frame)
	{	
        // Plays for the completion of animations that aren't the two air idle animations
        if (this.bat2.anims.currentAnim.key == 'batDemon_Prep') {
            this.bat2.anims.play('batDemon_FireAttack');

            this.bat2.body.setSize(65, 80);
            if (this.bat2.flipX == false) {
                this.bat2.body.setOffset(20, 75);
				var flames = new DemonFlames(this, this.bat2.x - 200, this.bat2.y + 100, !this.bat2.flipX);
				flames.flipX = false;
			}
			else {
                this.bat2.body.setOffset(50, 75);
				var flames = new DemonFlames(this, this.bat2.x + 200, this.bat2.y + 100, !this.bat2.flipX);
				flames.flipX = true;
            }
        }
    }
    animCompleteBat3 (animation, frame)
	{	
        // Plays for the completion of animations that aren't the two air idle animations
        if (this.bat3.anims.currentAnim.key == 'batDemon_Prep') {
			this.bat3.anims.play('batDemon_FireAttack');
        }
        
        this.bat3.body.setSize(65, 80);
        if (this.bat3.flipX == false) {
            this.bat3.body.setOffset(20, 75);
            var flames = new DemonFlames(this, this.bat3.x - 200, this.bat3.y + 100, !this.bat3.flipX);
            flames.flipX = false;
        }
        else {
            this.bat3.body.setOffset(50, 75);
            var flames = new DemonFlames(this, this.bat3.x + 200, this.bat3.y + 100, !this.bat3.flipX);
            flames.flipX = true;
        }
	}

    batManager(player) {

        var bloodSplat = this.blood_splatter_sound;
        var batSpeed = 2;

        this.bats.children.iterate(function (child) { 
            //moveBat(child, this.enemy_BaseSpeed);
            // Move the bat vertically
            child.y -= batSpeed;
            // if the ship goes off screen it is reset
            if (child.y < -100) {
                var randomX = Phaser.Math.Between(100, 1100);
                child.y = 900;
                child.x = randomX;
            }
            // Iterate for the next bat
            batSpeed += 1;

			// If the child is further left from the player --> launch fireballs 
			if (child.body.position.x < player.body.position.x - 300) {
                child.flipX = true;
                // Set to idle if not already
                if (child.anims.currentAnim.key != 'batDemon_Idle') {
                    child.anims.play('batDemon_Idle', true);
                    child.body.setSize(80, 67);
                    child.body.setOffset(30, 55);
                }
               // Set velocity to move towards player
               child.body.velocity.x = 200;
            }
            // If the child is further right from the player --> launch fireballs 
			else if (child.body.position.x > player.body.position.x + 300) {
                child.flipX = false;
                // Set to idle if not already
                if (child.anims.currentAnim.key != 'batDemon_Idle') {
                    child.anims.play('batDemon_Idle', true);
                    child.body.setSize(80, 67);
                    child.body.setOffset(30, 40);
                }
                // Set velocity to move towards player
                child.body.velocity.x = -200;
            }

            // If the batdemon is in range of the player, unleash fire
			else if (child.body.position.x <= player.body.position.x + 300 && child.body.position.x >= player.body.position.x - 300 && child.body.position.y <= player.body.position.y + 20 && child.body.position.y >= player.body.position.y - 20) {

				if (child.anims.currentAnim.key != 'batDemon_Prep') {
                    child.anims.play('batDemon_Prep', true);
                    child.body.setSize(80, 67);
                    child.body.setOffset(30, 55);
                }
                child.body.velocity.x = 0;
			}
            
            /*
            // Set the demon's animation to launch fire if it isn't already
			if (child.anims.currentAnim.key != 'demon_fireball') {
				child.anims.play('demon_fireball', true);
				child.body.setSize(64, 64);
				child.body.position.y += adjust;
				//var blast = new DemonFire(this, child.x - 40, child.y - 40, child.flipX);
			}

            if (child.anims.currentAnim.key != 'demon_fireball') {
                child.anims.play('demon_fireball', true);
                child.body.setSize(64, 64);
                child.body.position.y += adjust;
            }
            */

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
        
		// If dead demons exist --> remove them
		if (this.bats.countActive(true) < this.bats.countActive(true) + this.bats.countActive(false)) {
			// While dead exist?
			var deadBat = this.bats.getFirstDead();
			var blood = new BloodExplosion(this, deadBat.x, deadBat.y);
			// flips the blood sprite depending on the player's orientation
			if (player.flipX == false) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
			this.bats.remove(this.bats.getFirstDead(), true, true);
        }

        // Start next level when all bat bosses are dead

        // If there are no more bats, start to fade out the level
        /*
        if (this.bats.countActive(true) < 1 && this.levelFadeOut == false)  {
            // Removes the current music
            
            this.sound.removeByKey('menu_music');

            this.transitionMusic.play(this.musicConfig);
            
            this.levelFadeOut = true;
            var tween = this.tweens.add({
                targets: this.background,
                alpha: { from: 1, to: 0 },
                // alpha: { start: 0, to: 1 },
                // alpha: 1,
                // alpha: '+=1',
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 5500,
                repeat: 0,            // -1: infinity
                yoyo: false
            });
            
        }
        */
		
    }

    pauseGame() {
        game.scene.pause("default");
    }

    animCompleteHillary (animation, frame) {

        if (this.hillary.anims.currentAnim.key == 'energyPrep_hillary') {
			this.hillary.anims.play('energyBlast_hillary', true);
        }
        
        /*
		if (this.hillary.anims.currentAnim.key == 'hillary_Powerup' && this.hillary.powerupTimer >= 5) {
			this.hillary.anims.play('hillary_RangeAttack', true);
			this.hillary.powerupTimer = 0;
		}

		else if (this.hillary.anims.currentAnim.key == 'hillary_Powerup' && this.hillary.powerupTimer < 5){
			this.hillary.anims.play('hillary_Powerup', true);
			this.hillary.powerupTimer += 1;
        }
        */
    }
    
    // Enemy Demon Manager
	hillaryManager (player) {

		var bloodSplat = this.blood_splatter_sound;
		var punch_sound = Phaser.Utils.Array.GetRandom(this.punch_sounds);
		var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
		var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);

		// ------------------
		// If the Demon is within range of the Player --> Move Towards Player

		if (this.hillary.health > 0 && this.hillary.health <= 750 && Math.abs(player.body.position.x - this.hillary.body.position.x) >= 250 && this.energyPresent <= 2) {
			this.hillary.body.velocity.x = 0;
            this.hillary.anims.play('powerup_hillary', true);
            var choice = Phaser.Math.Between(0, 500);
			if (choice == 1 && this.hillaryLaugh.isPlaying == false) {
                this.hillaryLaugh.play();
			}
			if (this.hillary.health < 1000) {
				this.hillary.health += 0.25;
				this.hillary.hp.increase(0.25);
			}
		}

        else if (Math.abs(player.body.position.x - this.hillary.body.position.x) <= 1000 && Math.abs(player.body.position.x - this.hillary.body.position.x) > 250) {

            this.hillary.body.velocity.x = 0;

            // If the player is not touching the ground and this gay frog is --> jump towards the player
			if (!player.body.touching.down && this.hillary.body.touching.down) {
				this.hillary.body.velocity.y = -800;
				this.hillary.anims.play('jump_hillary', true);
				jump_sound.play();
			}

            if (this.hillary.anims.currentAnim.key != 'energyBlast_hillary' && this.hillary.anims.currentAnim.key != 'energyPrep_hillary') {
				this.hillary.anims.play('energyPrep_hillary', true);
            }
            
            else if (this.hillary.anims.currentAnim.key == 'energyBlast_hillary' && this.hillary.fireTimer >= 25) {

                var flip = this.hillary.flipX;
                var offset = 0;
                if (flip == false) {
                    offset = 65;
                }
                else {
                    offset = -65;
                }
                var blast = new DemonFire(this, this.hillary.x + offset, this.hillary.y, flip);
                blast.setScale(6);
                blast.body.setSize(9, 8);
                blast.body.setOffset(2, 4);
                if (flip == false) {
                    blast.flipX = true;
                }
                else {
                    blast.flipX = false;
                }
				//blast.flipX = false;
				this.hillary.fireTimer = 0;
			}
	
			else if (this.hillary.fireTimer < 25){
				this.hillary.fireTimer += 1;
			}
        }

		else if (Math.abs(player.body.position.x - this.hillary.body.position.x) <= 250) {
			// Math.sign returns positive, negative, or 0
			// If the child is further left from the player --> run at the player 
			if (this.hillary.body.position.x < player.body.position.x - 60) {
				this.hillary.flipX = false;

				// Set the gayfrog's animation to running if it isn't already
				if (this.hillary.anims.currentAnim.key != 'run_hillary' && this.hillary.body.touching.down) {
					this.hillary.anims.play('run_hillary', true);
				}

				this.hillary.body.velocity.x = 325;
					
				// If the player is not touching the ground and this gay frog is --> jump towards the player
				if (!player.body.touching.down && this.hillary.body.touching.down) {
					this.hillary.body.velocity.y = -800;
					this.hillary.anims.play('jump_hillary', true);
					jump_sound.play();
				}
			} 
				
			// If the child is further right from the player --> launch fireballs 
			else if (this.hillary.body.position.x > player.body.position.x + 80) {
				this.hillary.flipX = true;

				if (this.hillary.anims.currentAnim.key != 'run_hillary' && this.hillary.body.touching.down) {
					this.hillary.anims.play('run_hillary', true);
				}

				this.hillary.body.velocity.x = -325;
					
				// If the player is not touching the ground and this gay frog is --> jump towards the player
				if (!player.body.touching.down && this.hillary.body.touching.down) {
					this.hillary.body.velocity.y = -800;
					this.hillary.anims.play('jump_hillary', true);
					jump_sound.play();
				}
			}

			else if (this.hillary.body.position.x <= player.body.position.x + 80 && this.hillary.body.position.x >= player.body.position.x - 60 && this.hillary.body.position.y <= player.body.position.y + 50 && this.hillary.body.position.y >= player.body.position.y - 50) {

				//var attackType = Phaser.Math.Between(0, 10000);
				// If the player is grounded we punch
                
                var choice = Phaser.Math.Between(0, 500);
			    if (choice == 1 && this.hillaryLaugh.isPlaying == false) {
                    this.hillaryLaugh.play();
			    }
					
				
				if (this.hillary.attack < 50) {
					if (this.hillary.anims.currentAnim.key != 'punch_01_hillary') {
						this.hillary.anims.play('punch_01_hillary', true);
						this.hillary.body.velocity.x = 0;
					}
                    punch_sound.play();
					this.hillary.attack += 1;
				}
				else if (this.hillary.attack >= 50 && this.hillary.attack < 100) {
					if (this.hillary.anims.currentAnim.key != 'punch_02_hillary') {
						this.hillary.anims.play('punch_02_hillary', true);
						this.hillary.body.velocity.x = 0;
					}
					punch_sound.play();
                    this.hillary.attack += 1;
                }
                else if (this.hillary.attack >= 100 && this.hillary.attack < 150) {
					if (this.hillary.anims.currentAnim.key != 'punch_03_hillary') {
						this.hillary.anims.play('punch_03_hillary', true);
						this.hillary.body.velocity.x = 0;
					}
					punch_sound.play();
                    this.hillary.attack += 1;
                }
                else if (this.hillary.attack >= 150 && this.hillary.attack < 200) {
					if (this.hillary.anims.currentAnim.key != 'punch_04_hillary') {
						this.hillary.anims.play('punch_04_hillary', true);
						this.hillary.body.velocity.x = 0;
					}
					punch_sound.play();
                    this.hillary.attack += 1;
                }
                else if (this.hillary.attack >= 200) {
					if (this.hillary.anims.currentAnim.key != 'kick_hillary') {
						this.hillary.anims.play('kick_hillary', true);
						this.hillary.body.velocity.x = 0;
					}
					kick_sound.play();
                    this.hillary.attack += 1;
                    
                    // Resets attack counter
					if (this.hillary.attack >= 250) {
						this.hillary.attack = 0;
					}
				}

				// If the player is not touching the ground and this gay frog is --> jump towards the player
				if (!player.body.touching.down && this.hillary.body.touching.down) {
					this.hillary.body.velocity.y = -800;
					this.hillary.anims.play('jump_hillary', true);
					jump_sound.play();
				}
			}
		}

		// Otherwise (the player is not in range), make idle
		else {
			// If the demon is not already in and idle state
			if (this.hillary.anims.currentAnim.key != 'idle_hillary') {
				this.hillary.anims.play('idle_hillary', true);
				this.hillary.body.velocity.x = 0;
			}
		}

		// If the Demon's health is below or equal to 0
		if (this.hillary.health <= 0) {
            // Blood Explosion noise
            var blood = new BloodExplosion(this, this.hillary.x, this.hillary.y);
            if (player.flipX == false) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}
            bloodSplat.play();
            this.scream.play();
			//var blood = new BloodExplosion(this, randomX, randomY);
			this.hillary.setActive(false);
            this.hillary.setVisible(false);
            this.hillary.hp.bar.destroy();
            this.hillary.destroy();
            this.hillaryDead = true;
		}

		if (this.hillary.flipX == false) {
			this.hillary.hp.x = this.hillary.x - 40;
		}
		else {
			this.hillary.hp.x = this.hillary.x - 40;
		}
			
		this.hillary.hp.y = this.hillary.y - 80;
        this.hillary.hp.draw();
        
        /*
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
        */
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

    // Controls Player movement - this function is constantly checked in update()
    // Controls Alex's actions and movements
	alexManager(player, left, right, up, kick, punch, powerup, pickup, sprint, energy_blast) 
	{	
        // -------------------------------
        
        if (player.health <= 0) {
            this.scene.restart();
        }

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
				player.setVelocityX(-500);
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
				player.setVelocityX(500);
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
            this.energyPresent += 1;
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

    // Function that moves a Bat Demon on y axis
    moveBat(ship, speed) {
        ship.y -= speed;
        // if the ship goes off screen it is reset
        if (ship.y < 0) {
            this.resetBatPos(ship);
        }
    }

    // resets a ships position at the top of the config screen on a random x coordinate
    resetBatPos(ship) {
        var randomX = Phaser.Math.Between(100, 1100);
        ship.y = 900;
        ship.x = randomX;
    }

    /*
    // takes two objects colliding and removes the item being picked up from the game
    pickPowerUp(player, powerUp) {
        // makes the object inactive and hides it from display
        powerUp.disableBody(true, true);
        this.player.health += 1;
        this.item_sound.play();
    }
    */
}
