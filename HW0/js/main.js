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
		<!-- Width and Height determine the size of the Phaser canvas -->
		width: 800,
		height: 600,
	     	parent: 'game',

		<!-- Including the physics system for our game. -->
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 0 },
				debug: false
			}
		},

		scene: {
			preload: preload,
			create: create,
			update: update,

			<!-- Any additional properties, which will be copied to the Scene after it's created -->
			//extend: {
                    //player: null,
                    //healthpoints: null,
                    //reticle: null,
                    //moveKeys: null,
                    //playerBullets: null,
                    //enemyBullets: null,
                    //time: 0,
			//}
		}
	};

	// KAD ----
	var player;
	var enemy;
	var healthpoints;
	var reticle;
	var moveKeys;
	var playerBullets;
	var enemyBullets;
	var time = 0;
	var hp1;
	var hp2;
	var hp3;
	// Creating acceleration variables for the player
	var player_X_Accel = 0;
	var player_Y_Accel = 0;
	var y_Accel_Text;
	var x_Accel_Text;
	var velocity_X_Text;
	var velocity_Y_Text;
	var score = 0;
	var scoreText;
	var gameoverText;
	// acceleration value for our ship
	var accel_val = 200;
	var max_accel = 800;
	var game_music;
	var laser_sound;
	var explosion_sound;

	var game = new Phaser.Game(config);
	
	// Top Down Shooter Example Code ------------
	<!-- Creating a new Bullet class that constructs a Bullet and controls its firing properties -->
	var Bullet = new Phaser.Class({

		Extends: Phaser.GameObjects.Image,
		//Extends: Phaser.Image,

		initialize:

		// Bullet Constructor
		function Bullet (scene)
		{
			Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
			this.speed = 1;
			this.born = 0;
			this.direction = 0;
			this.xSpeed = 0;
			this.ySpeed = 0;
			this.setSize(12, 12, true);
		},

		// Fires a bullet from the player to the reticle
		fire: function (shooter, target){

			this.setPosition(shooter.x, shooter.y); // Initial position
			this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

			// Calculate X and y velocity of bullet to moves it from shooter to target
			if (target.y >= this.y) {

				this.xSpeed = this.speed*Math.sin(this.direction);
				this.ySpeed = this.speed*Math.cos(this.direction);
			}

			else {

				this.xSpeed = -this.speed*Math.sin(this.direction);
				this.ySpeed = -this.speed*Math.cos(this.direction);
			}

			this.rotation = shooter.rotation; // angle bullet with shooters rotation
			this.born = 0; // Time since new bullet spawned
			// play laser sound
			laser_sound.play();
		},

		// Updates the position of the bullet each cycle
		update: function (time, delta) {

			this.x += this.xSpeed * delta;
			this.y += this.ySpeed * delta;
			this.born += delta;
			if (this.born > 1800) {

            this.setActive(false);
            this.setVisible(false);
			}
		}
	});
	// -----------------

	<!-- Load the assets we need for our game -->
	function preload () {

		// Load in images and sprites
		// The first parameter is the name for the object you will use for programming.
		// Spritesheet is a collection of images in a single file seperated by frames. Each frame has the same size as the previous one.
		this.load.spritesheet('player_ship', 'assets/space_ship4.png', { frameWidth: 260, frameHeight: 270 });
		this.load.spritesheet('enemy_ship', 'assets/enemy_ship.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('bullet', 'assets/laser_orb.png', { frameWidth: 20, frameHeight: 20 });
		// loading our explosion spritesheet
		this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 16, frameHeight: 16 });
		this.load.image('target', 'assets/target_icon.jpg');
		this.load.image('red', 'assets/health.jpg');
		this.load.image('background', 'assets/space_background.jpg');
		this.load.audio('space_music', 'assets/Automation.mp3');
		this.load.audio('laser_01', 'assets/heat-vision.mp3');
		this.load.audio('explosion_01', 'assets/Blast.mp3');
	}
	
	// Create sprites, particles, and anything else that uses assets loaded by preoload function. Contains bulk of setup code and gameobjects
	function create () {

		// Set the boundaries of the world: The World boundary is an invisible rectangle that defines the edges of the World. If a Body is set 
		// to collide with the world bounds then it will automatically stop when it reaches any of the edges. Parameters: Top Left X, Top Left Y,
		// Boundary Width, Boundary Height. 1920 x 1024 is the size of space_background
		this.physics.world.setBounds(-960, -512, 3840, 2048);
		
		// Top Down Shooter Example Code ------------
		// Add 2 groups for Bullet objects: Differentiates between enemy bullets and players
		playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		// ------------------------------------------

		// Add background player, enemy, reticle, healthpoint sprites
		var background = this.add.image(0, 0, 'background');
		var background_02 = this.add.image(0, 1024, 'background');
		var background_03 = this.add.image(1920, 0, 'background');
		var background_04 = this.add.image(1920, 1024, 'background');

		// Create our variable player: Creation of Physics Sprite and animations it can use.
		// Creates a new sprite called player, positioned at 800 x 600 pixels from the bottom of the game. Has Dynamic Physics body by default.
		//player = this.physics.add.sprite(800, 600, 'player_handgun');
		player = this.physics.add.sprite(800, 600, 'player_ship');
		enemy = this.physics.add.sprite(300, 600, 'enemy_ship');
		reticle = this.physics.add.sprite(800, 700, 'target');

		/*for (var i = 0; i < 10; i++)	{
			var x = Phaser.Math.Between(0, 790);
			var y = Phaser.Math.Between(0, 590);

			enemy = this.physics.add.sprite(x, y, 'enemy_ship');

			//boom.anims.delayedPlay(Math.random() * 3, 'explode');
		}*/

		/*enemy = this.physics.add.group({
		// sets the texture key to the enemy_ship image 
		key: 'enemy_ship',
		// creates 1 child automatically, repeating 11 times means until we get 12 in total.
		repeat: 11,
		// Sets the enemy position then steps the next one by 70 on the x. -->
		setXY: { x: 12, y: 0, stepX: 70 }
		});

		enemy.children.iterate(function (child) {
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		}); */

		/*
		hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
		hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
		hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);
		*/
		hp1 = this.add.image(430, 300, 'red').setScrollFactor(0, 0);
		hp2 = this.add.image(400, 300, 'red').setScrollFactor(0, 0);
		hp3 = this.add.image(370, 300, 'red').setScrollFactor(0, 0);

		game_music = this.sound.add('space_music');
		laser_sound = this.sound.add('laser_01');
		explosion_sound = this.sound.add('explosion_01');

		// Configures and plays our background game music
		var music_Config = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: true,
			delay: 0
		}
		game_music.play(music_Config);

		this.anims.create({
			// creating an animation called enemy_ship_anim
			key: "enemy_ship_anim",
			// using the frames from the enemy_ship spritesheet
			frames: this.anims.generateFrameNumbers("enemy_ship"),
			frameRate: 20,
			// repeat -1 --> Tells the animation to loop.
			repeat: -1
		});

		this.anims.create({
			// creating an animation called explosion
			key: "explosion_anim",
			// using the frames from the explosion spritesheet
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 20,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
		});

		enemy.anims.play("enemy_ship_anim", true);
		//player.anims.play("enemy_ship_anim", true);
		
		// Top Down Shooter Example Code ------------
		// Set image/sprite properties
		// Default origin values
		background.setOrigin(0.5, 0.5).setDisplaySize(1920, 1024);
		player.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
		enemy.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
		reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
		hp1.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
		hp2.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
		hp3.setOrigin(0.5, 0.5).setDisplaySize(30, 10);

		//enemy.setRotation(-Math.PI);

		// Set sprite variables
		player.health = 3;
		enemy.health = 3;
		enemy.lastFired = 0;

		// Set camera properties
		this.cameras.main.zoom = 0.5;
		this.cameras.main.startFollow(player);
		// ------------------------------------------

		// Font size and color, default font type is courier. X, Y coords
		y_Accel_Text = this.add.text(-400, -300, 'Y Acceleration: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
		x_Accel_Text = this.add.text(-400, -252, 'X Acceleration: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
		velocity_X_Text = this.add.text(-400, -204, 'Velocity X: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
		velocity_Y_Text = this.add.text(-400, -156, 'Velocity Y: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
		scoreText = this.add.text(300, -300, 'Score: ' + score, { font: '48px Arial', fill: '#ffffff' });
		gameoverText = this.add.text(150, 0, 'Game Over', { font: '96px Arial', fill: '#ff0000' });
		gameoverText.visible = false;

		// Fixing our UI to the camera
		y_Accel_Text.setScrollFactor(0, 0);
		x_Accel_Text.setScrollFactor(0, 0);
		velocity_X_Text.setScrollFactor(0, 0);
		velocity_Y_Text.setScrollFactor(0, 0);
		scoreText.setScrollFactor(0, 0);
		gameoverText.setScrollFactor(0, 0);
		//y_Accel_Text.fixedToCamera = true;
		//y_Accel_Text.cameraOffset.setTo(16, 16);
		//x_Accel_Text.fixedToCamera = true;
		//x_Accel_Text.cameraOffset.setTo(16, 16);
		//----------
		
		// Top Down Shooter Example Code ------------
		// Phaser built in keyboard manager
		// Creates object for input with WASD kets
		moveKeys = this.input.keyboard.addKeys({
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
			'right': Phaser.Input.Keyboard.KeyCodes.D
		});
		// ------------------------------------------

		// Key variables
		/*var key_W = scene.input.keyboard.addKey('W');  // Get key object
		var key_S = scene.input.keyboard.addKey('S');
		var key_A = scene.input.keyboard.addKey('A');
		var key_D = scene.input.keyboard.addKey('D');
		var isDown_W = key_W.isDown;
		var isUp_W = key_W.isUp;
		var isDown_S = key_S.isDown;
		var isUp_S = key_S.isUp;
		var isDown_A = key_A.isDown;
		var isUp_A = key_A.isUp;
		var isDown_D = key_D.isDown;
		var isUp_D = key_D.isUp;*/

		// Enables movement of player with WASD keys
		/*
		this.input.keyboard.on('keydown_W', function (event) {
			player_Y_Accel += -accel_val;
			y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
			player.setAccelerationY(player_Y_Accel);
		});
		this.input.keyboard.on('keydown_S', function (event) {
			player_Y_Accel += accel_val;
			y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
			player.setAccelerationY(player_Y_Accel);
		});
		this.input.keyboard.on('keydown_A', function (event) {
			player_X_Accel += -accel_val;
			y_Accel_Text.setText('Y Acceleration: ' + player_X_Accel);
			player.setAccelerationX(player_X_Accel);
		});
		this.input.keyboard.on('keydown_D', function (event) {
			player_X_Accel += accel_val;
			y_Accel_Text.setText('Y Acceleration: ' + player_X_Accel);
			player.setAccelerationX(player_X_Accel);
		});
		*/

		/*
		// Stops player acceleration on uppress of WASD keys
		this.input.keyboard.on('keyup_W', function (event) {
			if (moveKeys['down'].isUp) {
				player.setAccelerationY(0);
			}
		});
		this.input.keyboard.on('keyup_S', function (event) {
			if (moveKeys['up'].isUp) {
				player.setAccelerationY(0);
			}
		});
		this.input.keyboard.on('keyup_A', function (event) {
			if (moveKeys['right'].isUp) {
				player.setAccelerationX(0);
			}
		});
		this.input.keyboard.on('keyup_D', function (event) {
			if (moveKeys['left'].isUp) {
				player.setAccelerationX(0);
			}
		});
		*/
		
		// Top Down Shooter Example Code ------------
		// Fires bullet from player on left click of mouse
		this.input.on('pointerdown', function (pointer, time, lastFired) {
			if (player.active === false) {
				return;
			}

			// Get bullet from bullets group
			var bullet = playerBullets.get().setActive(true).setVisible(true);

			if (bullet) {
				bullet.fire(player, reticle);

				// When the enemy and a bullet collide, we enter enemyHitCallback function
				this.physics.add.collider(enemy, bullet, enemyHitCallback);
			}
		}, this);

		// Pointer lock will only work after mousedown
		game.canvas.addEventListener('mousedown', function () {
			game.input.mouse.requestPointerLock();
		});

		// Exit pointer lock when Q or escape (by default) is pressed.
		this.input.keyboard.on('keydown_Q', function (event) {
			if (game.input.mouse.locked)
				game.input.mouse.releasePointerLock();
		}, 0, this);

		// Move reticle upon locked pointer move
		this.input.on('pointermove', function (pointer) {
			if (this.input.mouse.locked)
			{
				reticle.x += pointer.movementX;
				reticle.y += pointer.movementY;
			}
		}, this);
	}
	// -----------------------------------------------------------

	// Bullet hits an enemy
	function enemyHitCallback(enemyHit, bulletHit) {
		// Reduce health of enemy
		if (bulletHit.active === true && enemyHit.active === true) {
			enemyHit.health = enemyHit.health - 1;
			console.log("Enemy hp: ", enemyHit.health);

			// KAD ---------------------------------------------------------
			// Place score counter here otherwise it will add score for hits that make the health less than 0
			if (enemyHit.health == 0) {
				score += 20;
				scoreText.text = 'Score: ' + score;
				explosion_sound.play();
			}
			// Kill enemy if health <= 0
			if (enemyHit.health <= 0) {
				//player.anims.play("enemy_ship_anim", false);
				enemyHit.setTexture("explosion");
				enemyHit.anims.play("explosion_anim", true);
				// Once the explosion animation is complete, the enemy will become inactive and invisible 
				enemyHit.once('animationcomplete', () => {
					console.log('animationcomplete')
					//enemyHit.setActive(false).setVisible(false);
				});
				enemyHit.setX(Phaser.Math.Between(0, 1920));
				enemyHit.setY(Phaser.Math.Between(0, 1024));
				enemyHit.setTexture("enemy_ship");
				enemyHit.anims.play("enemy_ship_anim", true);
				enemyHit.health += 3
			}
			// ----------------------------------------------------------------

			// Destroy the bullet upon hitting an enemy
			bulletHit.setActive(false).setVisible(false);
		}
	}
	
	// Top Down Shooter Example Code ------------
	// Reduces the health of the player and destroys the bullet when called. If the player loses all their health the game ends. 
	function playerHitCallback(playerHit, bulletHit) {

		if (bulletHit.active === true && playerHit.active === true) {

			playerHit.health = playerHit.health - 1;
			console.log("Player hp: ", playerHit.health);

			// Kill hp sprites and kill player if health <= 0
			if (playerHit.health == 2) {
				hp3.destroy();
			}

			else if (playerHit.health == 1) {
				hp2.destroy();
			}

			else {
				hp1.destroy();
				// Game over state should execute here
				//this.physics.pause();
				game.scene.pause("default");
				// KAD -----------------------------
				player.setTint(0xff0000);
				//gameOver = true;
				gameoverText.visible = true;
				// ---------------------------------
			}

			// Destroy bullet
			bulletHit.setActive(false).setVisible(false);
		}
	}
	
	// Top Down Shooter Example Code ------------
	// Determines whether or not an enemy can fire at the player based on the amount of time that has passed.
	function enemyFire(enemy, player, time, gameObject) {
		if (enemy.active === false) {
			return;
		}

		if ((time - enemy.lastFired) > 1000) {
			enemy.lastFired = time;

			// Get bullet from bullets group
			var bullet = enemyBullets.get().setActive(true).setVisible(true);

			if (bullet) {
				bullet.fire(enemy, player);
				// Add collider between bullet and player
				// When the player and a bullet collide, we enter playerHitCallback function
				gameObject.physics.add.collider(player, bullet, playerHitCallback);
			}
		}
	}

	// Ensures sprite speed doesnt exceed maxVelocity while update is called
	function constrainVelocity(sprite, maxVelocity) {
		
		if (!sprite || !sprite.body) {
			return;
		}

		var angle, currVelocitySqr, vx, vy;
		vx = sprite.body.velocity.x;
		vy = sprite.body.velocity.y;
		currVelocitySqr = vx * vx + vy * vy;

		if (currVelocitySqr > maxVelocity * maxVelocity) {
			angle = Math.atan2(vy, vx);
			vx = Math.cos(angle) * maxVelocity;
			vy = Math.sin(angle) * maxVelocity;
			sprite.body.velocity.x = vx;
			sprite.body.velocity.y = vy;
		}
	}

	// Ensures reticle does not move offscreen
	function constrainReticle(reticle) {

		var distX = reticle.x-player.x; // X distance between player & reticle
		var distY = reticle.y-player.y; // Y distance between player & reticle

		// Ensures reticle cannot be moved offscreen (player follow)
		if (distX > 800)
			reticle.x = player.x+800;
		else if (distX < -800)
			reticle.x = player.x-800;

		if (distY > 600)
			reticle.y = player.y+600;
		else if (distY < -600)
			reticle.y = player.y-600;
	}
	// --------------------------------------
	/*function enemySpawn (player, star)
    {
        

		<!-- Release the bomb! countActive see how many stars are still alive. -->
		if (stars.countActive(true) === 0)
		{
			<!-- Resets the stars positions. -->
			stars.children.iterate(function (child) {
				child.enableBody(true, child.x, 0, true, true);
			});

			<!-- picks a random coordinate for bomb generation that is on the opposite screen side of the player. -->
			var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

			var bomb = bombs.create(x, 16, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		}
    } */

	<!-- The update (and render) functions are called every frame. Update is where you look for input to move a player, check for object collision, etc -->
	function update (time, delta) {

		//enemy.anims.play("enemy_ship_anim", true);
		//player.anims.play("enemy_ship_anim", true);

		// In space any velocity made must be negated by an equivalent velocity, otherwise an object will drift endlessly. 
		// Therefore in space there is no acceleration since acceleration drops off

		// KAD ------

		
		// Up movements
		if (moveKeys.up.isDown) {
			// Upward movement is either Up or Up & Right & Left
			if ((moveKeys.down.isUp && moveKeys.left.isUp && moveKeys.right.isUp) || (moveKeys.down.isUp && moveKeys.left.isDown && moveKeys.right.isDown)) {
				if (player_Y_Accel + -accel_val >= -max_accel ) {
					player_Y_Accel += -accel_val;
					/*if (player_Y_Accel > 0) {
						// Add Boost to resistance
						player_Y_Accel += -accel_val;
					}*/
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
					//player.anims.play('left', true);
				}
			}

			// Up Right movement
			else if (moveKeys.down.isUp && moveKeys.left.isUp && moveKeys.right.isDown) {
				if (player_Y_Accel + -accel_val >= -max_accel ) {
					player_Y_Accel += -accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
				}

				if (player_X_Accel + accel_val <= max_accel ) {
					player_X_Accel += accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
					//player.anims.play('left', true);
				}
			}

			// Up Left movement
			else if (moveKeys.down.isUp && moveKeys.left.isDown && moveKeys.right.isUp) {
				if (player_Y_Accel + -accel_val >= -max_accel ) {
					player_Y_Accel += -accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
				}

				if (player_X_Accel + -accel_val >= -max_accel ) {
					player_X_Accel += -accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
					//player.anims.play('left', true);
				}
			}
			// Up Down Right and Left together result in no movement
		}

		// Down movements
		else if (moveKeys.down.isDown) {

			// Down movement is either Down or Down & Right & Left
			if ((moveKeys.up.isUp && moveKeys.left.isUp && moveKeys.right.isUp) || (moveKeys.up.isUp && moveKeys.left.isDown && moveKeys.right.isDown)) {
				if (player_Y_Accel + accel_val <= max_accel ) {
					player_Y_Accel += accel_val;
					/*if (player_Y_Accel < 0) {
						// Add Boost to resistance
						player_Y_Accel += accel_val;
					}*/
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
					//player.anims.play('right', true);
				}
			}

			// Down Right movement
			else if (moveKeys.up.isUp && moveKeys.left.isUp && moveKeys.right.isDown) {
				if (player_Y_Accel + accel_val <= max_accel ) {
					player_Y_Accel += accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
				}

				if (player_X_Accel + accel_val <= max_accel ) {
					player_X_Accel += accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
					//player.anims.play('left', true);
				}
			}

			// Down Left movement
			else if (moveKeys.up.isUp && moveKeys.left.isDown && moveKeys.right.isUp) {
				if (player_Y_Accel + accel_val <= max_accel ) {
					player_Y_Accel += accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
				}

				if (player_X_Accel + -accel_val >= -max_accel ) {
					player_X_Accel += -accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
					//player.anims.play('left', true);
				}
			}
			// Up Down Right and Left together result in no movement
		}

		// Left movements
		else if (moveKeys.left.isDown) {
			
			// Left movement is either Left or Left & Up & Down
			if ((moveKeys.up.isUp && moveKeys.down.isUp && moveKeys.right.isUp) || (moveKeys.up.isDown && moveKeys.down.isDown && moveKeys.right.isUp)) {
				if (player_X_Accel + -accel_val >= -max_accel ) {
					player_X_Accel += -accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
					//player.anims.play('right', true);
				}
			}

			// Left Up movement
			else if (moveKeys.up.isDown && moveKeys.down.isUp && moveKeys.right.isUp) {
				
				if (player_X_Accel + -accel_val >= -max_accel ) {
					player_X_Accel += -accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
				}

				if (player_Y_Accel + -accel_val >= -max_accel ) {
					player_Y_Accel += -accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
					//player.anims.play('left', true);
				}
			}

			// Left Down movement
			else if (moveKeys.up.isUp && moveKeys.down.isDown && moveKeys.right.isUp) {

				if (player_X_Accel + -accel_val >= -max_accel ) {
					player_X_Accel += -accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
				}
				
				if (player_Y_Accel + accel_val <= max_accel ) {
					player_Y_Accel += accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
					//player.anims.play('left', true);
				}
			}
			// Up Down Right and Left together result in no movement
		}

		else if (moveKeys.right.isDown) {
			
			// Right movement is either Right or Right & Up & Down
			if ((moveKeys.up.isUp && moveKeys.down.isUp && moveKeys.left.isUp) || (moveKeys.up.isDown && moveKeys.down.isDown && moveKeys.left.isUp)) {
				if (player_X_Accel + accel_val <= max_accel ) {
					player_X_Accel += accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
					//player.anims.play('right', true);
				}
			}

			// Right Up movement
			else if (moveKeys.up.isDown && moveKeys.down.isUp && moveKeys.left.isUp) {
				if (player_X_Accel + accel_val <= max_accel ) {
					player_X_Accel += accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
				}

				if (player_Y_Accel + -accel_val >= -max_accel ) {
					player_Y_Accel += -accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
					//player.anims.play('left', true);
				}
			}

			// Right Down movement
			else if (moveKeys.up.isUp && moveKeys.down.isDown && moveKeys.left.isUp) {
				if (player_X_Accel + accel_val <= max_accel ) {
					player_X_Accel += accel_val;
					x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
					player.setAccelerationX(player_X_Accel);
					//player.setVelocityX(player_X_Accel);
				}
				
				if (player_Y_Accel + accel_val <= max_accel ) {
					player_Y_Accel += accel_val;
					y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
					player.setAccelerationY(player_Y_Accel);
					//player.setVelocityY(player_Y_Accel);
					//player.anims.play('left', true);
				}
			}
			// Up Down Right and Left together result in no movement
		}

		// Slow Down
		else if (moveKeys.down.isUp && moveKeys.up.isUp && moveKeys.left.isUp && moveKeys.right.isUp) {
				if (player_Y_Accel != 0) {
					if (player_Y_Accel > 0) {
						player_Y_Accel += -accel_val;
						y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
						player.setAccelerationY(player_Y_Accel);
					}
					else {
						player_Y_Accel += accel_val;
						y_Accel_Text.setText('Y Acceleration: ' + player_Y_Accel);
						player.setAccelerationY(player_Y_Accel);
					}
				}

				if (player_X_Accel != 0) {
					if (player_X_Accel > 0) {
						player_X_Accel += -accel_val;
						x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
						player.setAccelerationX(player_X_Accel);
					}
					else {
						player_X_Accel += accel_val;
						x_Accel_Text.setText('X Acceleration: ' + player_X_Accel);
						player.setAccelerationX(player_X_Accel);
					}
				}
		}
		// -------------
		velocity_X_Text.setText('Velocity X: ' + player.body.velocity.x);
		velocity_Y_Text.setText('Velocity Y: ' + player.body.velocity.y);

		// Top Down Shooter Example Code ------------
		// Rotates player to face towards reticle
		player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

		// Rotates enemy to face towards player
		enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);

		//Make reticle move with player
		reticle.body.velocity.x = player.body.velocity.x;
		reticle.body.velocity.y = player.body.velocity.y;

		// Constrain velocity of player
		//constrainVelocity(player, 500);

		// Constrain position of constrainReticle
		constrainReticle(reticle);

		// Update constantly checks to make enemies fire at the player
		enemyFire(enemy, player, time, this);
	}
};
