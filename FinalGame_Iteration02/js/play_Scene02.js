// class name is the same as the file name
class play_Scene02 extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "play_Scene02" is the identifier for this scene
        super ("play_Level02");
    }
    
    create() {
        // class variable for background named this.background
        // Pivot set at 0,0 means its pivot is at the top left corner
        // A tile sprite is a sprite that has a repeating texture - set width and height of tileSprite
        //this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        //this.background.setOrigin(0,0);


        this.background = this.add.tileSprite(0,0, 800, 600, "level02_background");
        this.background.setScale(2.5);
        this.background.setOrigin(0,0);

        // The speed that the map will initially move
        this.mapSpeed = 2.5;
        // The maximum speed the map reaches
        this.mapMaxSpeed = 100;

        this.enemy_BaseSpeed = 0.5;
        this.enemy_MaxSpeed = 105;

        this.bulletVelocity = 250;
        this.maxBulletVelocity = 1000;

        this.time = 0;
        this.tintChecker = 10;
        this.game_over = false;

        this.punch_sounds = [];
        this.pain_sounds = [];
        //this.alex_pain_sounds = [];
        this.alex_punch_sounds = [];
        this.alex_insult_sounds = [];


        // Punch Sounds Array
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch01"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch02"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch03"));
		Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch04"));
        Phaser.Utils.Array.Add(this.punch_sounds, this.sound.add("shrek_punch05"));
        
        // Alex Sounds -----------
		// Alex Punch Sounds Array
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch01"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch02"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch03"));
		Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch04"));
        Phaser.Utils.Array.Add(this.alex_punch_sounds, this.sound.add("alex_punch05"));
        
        // Take Damage Sounds Array
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain01"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain02"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain03"));
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain04"));
        Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("shrek_pain05"));
        // Alex takes damage Sounds Array
		Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("alex_pain01"));
        Phaser.Utils.Array.Add(this.pain_sounds, this.sound.add("alex_pain02"));
        
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
        
        this.alex_powerup_sound = this.sound.add("alex_powerup01");

        /*
        this.anim1 = true;
        this.anim2 = false;
        this.anim3 = false;
        this.anim4 = false;
        */

        //Add both the background and ground layers. We won't be doing anything with the
        //GroundLayer though
        //this.foregroundPlusLayer = this.map.createLayer('Foreground Plus Layer');
        //this.foregroundLayer = this.map.createLayer('Foreground Layer');
        //this.detailLayer = this.map.createLayer('Detail Layer')
        //this.groundLayer = this.map.createLayer('Ground Layer');
    
        //Before you can use the collide function you need to set what tiles can collide
        //this.map.setCollisionBetween(1, 100, true, 'Foreground Layer');
        //this.map.setCollisionBetween(1, 100, true, 'Foreground Plus Layer');

        //Change the world size to match the size of this layer
        //this.groundLayer.resizeWorld();

        this.explosion_sound = this.sound.add("explode");
        /*
        this.laser_sound = this.sound.add("laser_sound");
        this.explosion_sound = this.sound.add("explosion_sound");
        this.item_sound = this.sound.add("laser_sound");
        */

        /*
        this.game_music = this.sound.add("level01_music");
        var music_Config = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: true,
			delay: 0
        }
        this.game_music.play(music_Config);
        */

        this.blood_splatter_sound = this.sound.add("blood_splatter");
        this.gameoverText = this.add.text(150, 0, 'Game Over', { font: '96px Arial', fill: '#ff0000' });
		this.gameoverText.visible = false;

        // using the config variable to position ships in the scene (X, Y)
        //this.squidShip = this.physics.add.sprite(config.width/2 - 50, config.height/2, "ship1");
        // flipping the Squid Ship upside down
        //this.squidShip.flipY = true;
        //this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        //this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");
        
        /*
        // using the config variable to position ships in the scene (X, Y)
        this.squidShip = this.physics.add.sprite(800 / 2 - 250, 600 / 2 + 150, "batDemon");
        // flipping the Squid Ship upside down
        //this.squidShip.flipY = true;
        this.ship2 = this.add.sprite(800 / 2 + 100, 600 / 2 + 200, "batDemon");
        this.ship3 = this.add.sprite(800 / 2 + 250, 600 / 2 + 150, "batDemon");

        this.squidShip.setScale(2);
        this.ship2.setScale(2);
        this.ship3.setScale(2);
        */

        // Make the bosses seperate from the group beforehand so we can call functions with them using .on
        this.bat1 = this.physics.add.sprite(0 , 2000, "batDemon");
        this.bat2 = this.physics.add.sprite(600, 2000, "batDemon");
        this.bat3 = this.physics.add.sprite(1200, 2000, "batDemon");
        this.bat1.body.setSize(80, 67);
        this.bat2.body.setSize(80, 67);
        this.bat3.body.setSize(80, 67);

        this.bat1.hp = new HealthBar(this, this.bat1.x, this.bat1.y - 110, 1000);
        this.bat2.hp = new HealthBar(this, this.bat2.x, this.bat2.y - 110, 1000);
        this.bat3.hp = new HealthBar(this, this.bat3.x, this.bat2.y - 110, 1000);

        this.bat1.on('animationcomplete', this.animCompleteBat1, this);
        this.bat2.on('animationcomplete', this.animCompleteBat2, this);
        this.bat3.on('animationcomplete', this.animCompleteBat3, this);


        // enemy that attacks our player
        //this.enemy = this.physics.add.sprite(800 / 2, 600/2 + 250, "batDemon")
        //this.enemy.setScale(2);
        //this.enemy.body.setAllowGravity(false);

        // ENEMY Boss: Demon Bats
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
			child.health = 1000;
            child.setScale(2);
            child.anims.play('batDemon_Idle');
            //child.on('animationcomplete', this.animCompleteBat, this);
        });
        
        this.physics.add.collider(this.bats, this.bats);

        /*
        // Putting our enemy ships into a physics group 
        this.enemies = this.physics.add.group({ 
			// Removes gravity from the members
			allowGravity: false });
        this.enemies.add(this.squidShip);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);
        */

        // Set Player Max Health
        this.max_health = 100;
        
        this.alex = this.physics.add.sprite(600, 600 / 2 - 150, "alex");
        this.alex.body.setSize(100, 120);
        this.alex.on('animationcomplete', this.animCompleteAlex, this);
        this.alex.body.setAllowGravity(false);
		// call back function to control idle animation
		//this.alex.on('animationcomplete', this.animCompleteAlex, this);
        this.alex.anims.play('jump_fall', true);
        this.alex.setCollideWorldBounds(true);
        this.alex.isPowerup = false;

        // Group for Alex Jones Energy Blasts
        this.playerEnergyBlasts = this.physics.add.group({ 
            classType: EnergyBlast,
            allowGravity: false, 
            runChildUpdate: true 
        });
        this.physics.add.overlap(this.playerEnergyBlasts, this.bats, this.energyHit, null, this);
        
        this.batFlames = this.physics.add.group({ 
			classType: DemonFlames,
			// Removes gravity from the members
			allowGravity: false, 
            runChildUpdate: true });

        this.physics.add.overlap(this.alex, this.bats, this.playerCombat, null, this);
        
        this.physics.add.overlap(this.batFlames, this.alex, this.fireBlastHit, null, this);
        

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
        this.velocityUI = this.add.bitmapText(1000, 5, "pixelFont", "VELOCITY: ", 32);

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
        else {
            this.tintChecker += 1;
        }

        // update our speed tracker
        var speed = this.zeroPadding(Math.round(this.mapSpeed), 3);
        this.velocityUI.text = "VELOCITY: " + speed;
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
        this.background.tilePositionY += this.mapSpeed;

        this.movePlayerManager();
    }

    animCompleteAlex (animation, frame)
	{	
        // Plays for the completion of animations that aren't the two air idle animations
		if (this.alex.anims.currentAnim.key != 'air_up' && this.alex.anims.currentAnim.key != 'jump_fall' && this.alex.anims.currentAnim.key != 'powerup_phase01' && this.alex.anims.currentAnim.key != 'air_thrust') {
			this.alex.anims.play('air_up');
        }
        
        // When the powerup_phase01 is complete the animation complete will call and set powerup to true
		else if (this.alex.anims.currentAnim.key == 'powerup_phase01') {
			this.alex.isPowerup = true;
        }
        
        else if (this.alex.anims.currentAnim.key == 'air_thrust') {
            //if (this.alex.body.velocity.x <= 0) {
                if (this.cursorKeys.shift.isUp) {
                this.alex.anims.play('air_up');
            }
        }
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

        // Winning Game end screen
		
		if (this.bats.countActive(true) < 1 && this.time >= 20) {
			this.winner = 1;
			this.scene.start("win_game", {winner: 1});
        }
        
        // Used to give a breather before the next level
        else if (this.bats.countActive(true) < 1 && this.time < 20) {
            this.time += 1;
        }
		
    }

    pauseGame() {
        game.scene.pause("default");
    }

    // Controls Player movement - this function is constantly checked in update()
    movePlayerManager() {
        if (this.cursorKeys.left.isDown && this.cursorKeys.shift.isUp) {
            this.alex.flipX = true;
            this.alex.setVelocityX(-300);
            // Left Up
            if (this.cursorKeys.up.isDown && this.cursorKeys.down.isUp) {
                this.alex.setVelocityY(-300);
            }
            // Left Down
            else if (this.cursorKeys.up.isUp && this.cursorKeys.down.isDown) {
                this.alex.setVelocityY(300);
            }
        }
        else if (this.cursorKeys.right.isDown && this.cursorKeys.shift.isUp) {
            this.alex.flipX = false;
            this.alex.setVelocityX(300);
            // Right Up
            if (this.cursorKeys.up.isDown && this.cursorKeys.down.isUp) {
                this.alex.setVelocityY(-300);
            }
            // Right Down
            else if (this.cursorKeys.up.isUp && this.cursorKeys.down.isDown) {
                this.alex.setVelocityY(300);
            }
        }
        else if (this.cursorKeys.up.isDown) {
            this.alex.setVelocityY(-300);
            if (this.alex.anims.currentAnim.key != 'air_up' && this.alex.anims.currentAnim.key != 'energy_blast' && this.alex.anims.currentAnim.key != 'air_thrust') {
                this.alex.anims.play('air_up', true);
            }
            // Up Left
            if (this.cursorKeys.left.isDown && this.cursorKeys.right.isUp) {
                this.alex.setVelocityX(-300);
            }
            // Up Right
            else if (this.cursorKeys.left.isUp && this.cursorKeys.right.isDown) {
                this.alex.setVelocityX(300);
            }
        }
        else if (this.cursorKeys.down.isDown) {
            this.alex.setVelocityY(300);
            // If we are not already in the fall animation
            if (this.alex.anims.currentAnim.key != 'jump_fall' && this.alex.anims.currentAnim.key != 'energy_blast' && this.alex.anims.currentAnim.key != 'air_thrust') {
                this.alex.anims.play('jump_fall', true);
            }

            // Down Left
            if (this.cursorKeys.left.isDown && this.cursorKeys.right.isUp) {
                this.alex.setVelocityX(-300);
            }
            // Down Right
            else if (this.cursorKeys.left.isUp && this.cursorKeys.right.isDown) {
                this.alex.setVelocityX(300);
            }
        }
        // ------------------------
        // Single Punching Animation
		else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up_Arrow))
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
			if (this.alex.anims.currentAnim.key != 'punch_01' && this.alex.anims.currentAnim.key != 'punch_02' && this.alex.anims.currentAnim.key != 'punch_03' && this.alex.anims.currentAnim.key != 'air_punch') {
				// Standing Punch
				if (this.alex.body.touching.down) 
				{
					// Generate a random number and use the random number to choose which punch animation we use
					var choice = Phaser.Math.Between(0, 2);
					if (choice == 0) {
						this.alex.anims.play('punch_01', true);
					}
					else if (choice == 1) {
						this.alex.anims.play('punch_02', true);
					}
					else if (choice == 2) {
						this.alex.anims.play('punch_03', true);
					}
				}

				// Jumping Punch
				else {
					this.alex.anims.play('air_punch', true);
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
		else if (this.cursorKeys.up_Arrow.isDown) {

			if (this.alex.anims.currentAnim.key != 'punch_01' && this.alex.anims.currentAnim.key != 'punch_02' && this.alex.anims.currentAnim.key != 'punch_03' && this.alex.anims.currentAnim.key != 'air_punch') {
				// Generate a random number and use the random number to choose which punch animation we use
				if (this.alex.body.touching.down) 
				{
					var choice = Phaser.Math.Between(0, 2);
					if (choice == 0) {
						this.alex.anims.play('punch_01', true);
					}
					else if (choice == 1) {
						this.alex.anims.play('punch_02', true);
					}
					else if (choice == 2) {
						this.alex.anims.play('punch_03', true);
					}
				}

				// Jumping Punch
				else {
					this.alex.anims.play('air_punch', true);
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
			else if (this.alex.anims.currentAnim.key == 'air_punch' && this.alex.body.touching.down) {

				var choice = Phaser.Math.Between(0, 2);
				if (choice == 0) {
					this.alex.anims.play('punch_01', true);
				}
				else if (choice == 1) {
					this.alex.anims.play('punch_02', true);
				}
				else if (choice == 2) {
					this.alex.anims.play('punch_03', true);
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

        // Player is running right and touches the ground
		// Just checking for sprint being down puts it in a loop that does nothing
		else if ((this.cursorKeys.shift.isDown && this.cursorKeys.right.isDown) || (this.cursorKeys.shift.isDown && this.cursorKeys.left.isDown))
		{
            if (this.cursorKeys.left.isDown == true) {
                this.alex.flipX = true;
                this.alex.setVelocityX(-600);
            }
            else if (this.cursorKeys.right.isDown == true) {
                this.alex.flipX = false;
                this.alex.setVelocityX(600);
            }

            // Air Thrusting animation
            if (this.alex.anims.currentAnim.key != 'air_thrust') {
                this.alex.anims.play('air_thrust', true);
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();
            }
        }
        else if (this.cursorKeys.shift.isDown)
		{
            if (this.alex.anims.currentAnim.key != 'kick' && this.alex.anims.currentAnim.key != 'air_kick') 
			{
				if (this.alex.body.touching.down) 
				{
					this.alex.anims.play('kick', true);
				}

				// Jumping Kick
				else {
					this.alex.anims.play('air_kick', true);
				}

				//var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//kick_sound.play();
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();
			}

			// If the player is holding down the kick key, they are still in the air kick animation and they are touching the ground
			// --> play kick animation
			else if (this.alex.anims.currentAnim.key == 'air_kick' && this.alex.body.touching.down) {

				this.alex.anims.play('kick', true);

				//var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
				//kick_sound.play();
				var punch_sound01 = Phaser.Utils.Array.GetRandom(this.punch_sounds);
				punch_sound01.play();
			}
        }
        // ------------------------

        // -------------------------------
		// Power Up animation if the player is touching the ground and not moving
        else if (this.cursorKeys.powerup.isDown && this.cursorKeys.left.isUp && this.cursorKeys.right.isUp)
		{
			if (this.alex.isPowerup == true) {
				this.alex.anims.play('powerup_phase02', true);
			}

			else if (this.alex.isPowerup == false && this.alex.anims.currentAnim.key != 'powerup_phase01'){
				//player.y -= 51;
				this.alex.body.setSize(177, 171);
				this.alex.setTexture("alex_powerup");
				this.alex.anims.play('powerup_phase01', true);
			}

			if (this.alex.health < this.max_health) {
				this.alex.health += 0.05;
			}

		}

		// Upon release of power up, set isPowerup back to false
		else if (this.cursorKeys.powerup.isUp && (this.alex.anims.currentAnim.key == 'powerup_phase01' || this.alex.anims.currentAnim.key == 'powerup_phase02')) {
			this.alex.setTexture("alex");
			this.alex.body.setSize(100, 120);
			this.alex.isPowerup = false;
        }
        
        // ---------------------------
        else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down_Arrow)) {
			this.alex.anims.play('energy_blast', true);
			var blast = new EnergyBlast(this, this.alex.x - 40, this.alex.y - 40, this.alex.flipX);
			//blast.setVelocityX(200);
			//blast.body.velocity.x = 200;
			//this.playerEnergyBlasts.add(blast);
			//var blast = this.playerEnergyBlasts.get().setActive(true).setVisible(true);
			//blast.fire(this);
		}
        else {
            this.alex.setVelocityX(0);
            this.alex.setVelocityY(0);
        }

        if (this.mapSpeed < this.mapMaxSpeed) {
            this.mapSpeed += 0.018;
        }

        /*
        // Acceleerate the speed of the players ship
        if (this.cursorKeys.shift.isDown) {
            // Check to see if we have reached max speed. If so, do not increase
            if (this.mapSpeed < this.mapMaxSpeed) {
                this.mapSpeed += 0.018;
            }
            /*if (this.enemy_BaseSpeed < this.enemy_MaxSpeed) {
                this.enemy_BaseSpeed += 0.018;
            }
            if (this.bulletVelocity < this.maxBulletVelocity) {
                this.bulletVelocity += 1;
            }

        }
        else if (this.cursorKeys.shift.isUp) {
            if (this.mapSpeed > 2.5) {
                this.mapSpeed -= 0.5;
            }
            /*if (this.enemy_BaseSpeed > 1) {
                this.enemy_BaseSpeed -= 0.5;
            }
            if (this.bulletVelocity > 250) {
                this.bulletVelocity -= 1;
            }
            
        }
        */
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

    /*
    // resets player and enemy position
    hurtPlayer(player, enemy) {
        this.resetShipPos(enemy);
        if (this.player.alpha < 1) {
            return;
        }
        var explosion = new Explosion(this, player.x, player.y);
        this.explosion_sound.play();
        player.disableBody(true, true);

        this.enemy_BaseSpeed = 1;
        this.mapSpeed = 0.5;
        this.bulletVelocity = 250;
        
        this.time.addEvent({
            delay: 1000,
            // reset the player after 1000ms
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
    }

    // Moves the player back to their starting position and resets the game
    resetPlayer() {
        var x = 800 / 2 - 8;
        var y = 600 + 64;
        this.alex.enableBody(true, x, y, true, true);
        this.alex.alpha = 0.5;

        var tween = this.tweens.add({
            // tween targets ship
            targets: this.alex,
            // player's ship is hidden below the screen, move 64 pixels above the bottom of screen
            y: 600 - 64,
            ease: 'Power1',
            // duration is 1.5 seconds
            duration: 1500,
            repeat: 0,
            // when tween is done, player alpha returns
            onComplete: function(){
                this.alex.alpha = 1;
            },
            callbackScope: this
        });
        
    }
    */

    // Damage and Blood effects
	playerCombat (player, enemy)
    {
        if (this.cursorKeys.shift.isDown ||  this.cursorKeys.up_Arrow.isDown) {
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
		var energyExplosion = new Explosion(this, randomX, randomY);
    }
    
    
    fireBlastHit (player, fire)
    { 
        player.health -= 0.2;
        // No need to destroy fire since it will do that itself
        //fire.destroy();
        var sound_check = Phaser.Utils.Array.GetAll(this.pain_sounds, 'isPlaying', true);
		// If there a currently no sounds playing we can play a punch sound
		if (sound_check.length == 0) {
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
        }
        player.setTint(0xff0000);
        
        if (player.health <= 0) {
            this.scene.restart();
        }
    }
    

    /*
    // destroys the projectile and resets the enemy position
    hitEnemy(projectile, enemy) {
        // instantiates a new explosion object at the enemy's location
        //enemy.setTint(0xff0000);
        var explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.explosion_sound.play();
        this.resetShipPos(enemy);
        //this.score += 15;
        //var scoreFormatted = this.zeroPadding(this.score, 6);
        //this.scoreLabel.text = "SCORE " + scoreFormatted;
    }
    */

    // Takes a number and returns a number as a string with 0s to left
    zeroPadding(number, size){
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}
