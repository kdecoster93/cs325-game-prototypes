
// class name is the same as the file name
class play_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "playGame" is the identifier for this scene
        super ("play_game");
    }
    
    create() {
        // class variable for background named this.background
        // Pivot set at 0,0 means its pivot is at the top left corner
        // A tile sprite is a sprite that has a repeating texture - set width and height of tileSprite
        //this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        //this.background.setOrigin(0,0);

        //Add the tilemap and tileset image. The first parameter in addTilesetImage
        //is the name you gave the tilesheet when importing it into Tiled, the second
        //is the key to the asset in Phaser
        // this.map = this.add.tilemap('tilemap');
        //this.map.addTilesetImage('Tile_Test_01', 'tiles');
        // this.terrain = this.map.addTilesetImage('Tile_Test_01', 'tiles');


        this.background = this.add.tileSprite(0,0, config.width, config.height, "tiles");
        this.background.setOrigin(0,0);
        // The speed that the map will initially move
        this.mapSpeed = 2.5;
        this.mapMaxSpeed = 100;
        this.enemy_BaseSpeed = 0.5;
        this.enemy_MaxSpeed = 105;
        this.bulletVelocity = 250;
        this.maxBulletVelocity = 1000;
        this.time = 0;
        this.game_over = false;

        this.anim1 = true;
        this.anim2 = false;
        this.anim3 = false;
        this.anim4 = false;

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

        this.laser_sound = this.sound.add("laser_sound");
        this.explosion_sound = this.sound.add("explosion_sound");
        this.item_sound = this.sound.add("laser_sound");

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

        this.gameoverText = this.add.text(150, 0, 'Game Over', { font: '96px Arial', fill: '#ff0000' });
		this.gameoverText.visible = false;

        // using the config variable to position ships in the scene (X, Y)
        //this.squidShip = this.physics.add.sprite(config.width/2 - 50, config.height/2, "ship1");
        // flipping the Squid Ship upside down
        //this.squidShip.flipY = true;
        //this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        //this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");
        
        // using the config variable to position ships in the scene (X, Y)
        this.squidShip = this.physics.add.sprite(config.width / 2 - 250, config.height / 2 + 150, "ship1");
        // flipping the Squid Ship upside down
        //this.squidShip.flipY = true;
        this.ship2 = this.add.sprite(config.width / 2 + 100, config.height / 2 + 200, "ship1");
        this.ship3 = this.add.sprite(config.width / 2 + 250, config.height / 2 + 150, "ship1");

        this.squidShip.setScale(0.5);
        this.ship2.setScale(0.85);
        this.ship3.setScale(1.2);

        // enemy that attacks our player
        this.enemy = this.physics.add.sprite(config.width / 2, config.height/2 + 250, "ship1")
        this.enemy.setScale(1.5);

        // Putting our enemy ships into a physics group 
        this.enemies = this.physics.add.group();
        this.enemies.add(this.squidShip);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.player = this.physics.add.sprite(config.width / 2, config.height / 2 - 150, "player");
        // scale an image
        this.player.setScale(0.75);
        this.player.play("gear_first");
        this.player.setCollideWorldBounds(true);

        // Creates a black strip background for our Score to rest on
        var graphics = this.add.graphics();
        // Black solid fill
        graphics.fillStyle(0x000000, 1);
        // Draw polygon lines with coords
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 35);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        // Close and fill
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
        // Last parameter is font size
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

        // Velocity for the player
        this.velocityUI = this.add.bitmapText(600, 5, "pixelFont", "VELOCITY: ", 32);

        // Creating the player's aiming reticle
        this.reticle = this.physics.add.sprite(this.player.x, this.player.y + 50, 'target');
        this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

        // Velocity for the player
        this.hpText = this.add.bitmapText(320, 0, "pixelFont", "HP: ", 32);
        // Creating the player's health bar - placing it up top
        this.hp1 = this.add.image(430, 10, 'red');
        this.hp2 = this.add.image(400, 10, 'red');
        this.hp3 = this.add.image(370, 10, 'red');
        this.hp1.setScale(4);
        this.hp2.setScale(4);
        this.hp3.setScale(4);
        this.hp1.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
        this.hp2.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
        this.hp3.setOrigin(0.5, 0.5).setDisplaySize(30, 10);

        // Set Player and Enemy variables
		this.player.health = 3;
		this.enemy.health = 6;
        this.enemy.lastFired = 0;
        this.squidShip.health = 2;
        this.squidShip.lastFired = 0;
        this.ship2.health = 3;
        this.ship2.lastFired = 0;
        this.ship3.health = 4;
		this.ship3.lastFired = 0;

        // Add 2 groups for Bullet objects: Differentiates between enemy and player lasers
        // holds all laser instances
        this.playerLasers = this.physics.add.group({ classType: Laser, runChildUpdate: true });
        this.enemyLasers = this.physics.add.group({ classType: Laser, runChildUpdate: true });
        // group for all laser projectiles -> lasers automatically populate this group when created
        //this.projectiles = this.add.group();

        // holds all powerUp instances
        this.powerUps = this.physics.add.group();

        // Powerups
        /*
        var maxObjects = 4;
        for (var i = 0; i <= maxObjects; i++) {
            // 16,16 = X,Y coordinates
            var powerUp = this.physics.add.sprite(16,16, "power_up");
            // adding them to our group
            this.powerUps.add(powerUp);
            // setting their positions at random points on the screen
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
             
            // 50/50 chance to play either red or gray animation
            if (Math.random() > 0.5) {
                powerUp.play("red");
            }
            else {
                powerUp.play("gray");
            }
 
            // physics based object can use velocity
            powerUp.setVelocity(100,100);
            // Contain our power ups within the world boundaries
            powerUp.setCollideWorldBounds(true);
            // Allow our power ups to bounce off the world boundaries
            powerUp.setBounce(1);
        }
        */

        /*
        // The projectiles and powerUps can collide - checking against two groups of objects
        // anonymous function is called to destroy the projectile
        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
            projectile.destroy();
        });
        */

        // pickPowerUp callback function
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

        
        // Enemy Player touch
        //this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        // Enemy Laser hit
        this.physics.add.overlap(this.playerLasers, this.enemies, this.hitEnemy, null, this);

        // KAD --------------------
        //this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.cursorKeys = this.input.keyboard.addKeys({
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        //this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        // ------------------------
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // rotate continously from inside update function
        //this.ship1.angle += 3;
        
        // Plays the looping animation for each ship
        this.squidShip.play("squidShip_anim");
        this.ship2.play("squidShip_anim");
        this.ship3.play("squidShip_anim");
        this.enemy.play("squidShip_anim");

        /*
        this.squidShip.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();
        */

        // event listener that listens for when an interactive object is clicked
        // gameobjectdown defines the event triggers when object is clicked
        // then it passes callback function destroyShip
        /*
        this.input.on('gameobjectdown', this.destroyShip, this);
        */

        // Fires bullet from player on left click of mouse
		this.input.on('pointerdown', function (pointer, time, lastFired) {
			if (this.player.active === false) {
				return;
			}

			// Get bullet from bullets group
			var laser = this.playerLasers.get().setActive(true).setVisible(true);

			if (laser) {
                laser.fire(this.player, this.reticle);
                this.laser_sound.play();

				// When the enemy and a bullet collide, we enter enemyHitCallback function
				this.physics.add.collider(this.enemy, laser, this.enemyHitCallback);
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
				this.reticle.x += pointer.movementX;
				this.reticle.y += pointer.movementY;
			}
        }, this);
    }

    // Bullet hits an enemy
	enemyHitCallback(enemyHit, laserHit) {
		// Reduce health of enemy
		if (laserHit.active === true && enemyHit.active === true) {
			enemyHit.health = enemyHit.health - 1;
			console.log("Enemy hp: ", enemyHit.health);

			// KAD ---------------------------------------------------------
			// Place score counter here otherwise it will add score for hits that make the health less than 0
            
            if (enemyHit.health == 0) {
				/*this.score += 20;
                var scoreFormatted = this.zeroPadding(this.score, 6);
                this.scoreLabel.text = "SCORE " + scoreFormatted;
				//explosion_sound.play(); */
			}
			// Kill enemy if health <= 0
			if (enemyHit.health <= 0) {
				//player.anims.play("enemy_ship_anim", false);
				enemyHit.setTexture("explode");
				enemyHit.anims.play("explode_anim", true);
				// Once the explosion animation is complete, the enemy will become inactive and invisible 
				enemyHit.once('animationcomplete', () => {
					console.log('animationcomplete')
					//enemyHit.setActive(false).setVisible(false);
				});
				//enemyHit.setX(Phaser.Math.Between(0, config.width));
				//enemyHit.setY(Phaser.Math.Between(0, config.height));
                // respawn the enemy back at the bottom
                enemyHit.y = config.height;
                var randomX = Phaser.Math.Between(0, config.width);
                enemyHit.x = randomX;
                enemyHit.setTexture("ship1");
                enemyHit.anims.play("squidShip_anim", true);
				enemyHit.health += 6
			}
			// ----------------------------------------------------------------

			// Destroy the bullet upon hitting an enemy
			laserHit.setActive(false).setVisible(false);
		}
    }
    
    // Reduces the health of the player and destroys the bullet when called. If the player loses all their health the game ends. 
	playerHitCallback(playerHit, laserHit) {

		if (laserHit.active === true && playerHit.active === true) {

			playerHit.health = playerHit.health - 1;
			console.log("Player hp: ", playerHit.health);

			/*// Kill hp sprites and kill player if health <= 0
			if (playerHit.health == 2) {
                this.hp3.destroy();
                //this.hp3.visible = false;
			}

			else if (playerHit.health == 1) {
                this.hp2.destroy();
                //this.hp2.visible = false;
			}

			else {
                this.hp1.destroy(); 
                //this.hp1.visible = false;
				// Game over state should execute here
				//this.physics.pause();
				game.scene.pause("default");
				this.player.setTint(0xff0000);
				//gameOver = true;
				this.gameoverText.visible = true;
            } */
            
            /*if (playerHit.health <= 0) {
                // Game over state should execute here
				//this.physics.pause();
				game.scene.pause("default");
				this.player.setTint(0xff0000);
				//gameOver = true;
				this.gameoverText.visible = true;
            }*/

			// Destroy laser
			laserHit.setActive(false).setVisible(false);
		}
    }
    
    // Determines whether or not an enemy can fire at the player based on the amount of time that has passed.
	enemyFire(enemy, player, time, gameObject) {
		if (enemy.active === false) {
			return;
		}

		if ((time - enemy.lastFired) > 1000) {
			enemy.lastFired = time;

			// Get laser from lasers group
			var laser = this.enemyLasers.get().setActive(true).setVisible(true);

			if (laser) {
                laser.fire(enemy, player);
                this.laser_sound.play();
				// Add collider between bullet and player
				// When the player and a bullet collide, we enter playerHitCallback function
				gameObject.physics.add.collider(player, laser, this.playerHitCallback);
			}
		}
    }
    
    // Ensures reticle does not move offscreen
	constrainReticle(reticle) {

		var distX = this.reticle.x - this.player.x; // X distance between player & reticle
		var distY = this.reticle.y - this.player.y; // Y distance between player & reticle

		// Ensures reticle cannot be moved offscreen (player follow)
		if (distX > 800)
			this.reticle.x = this.player.x + 800;
		else if (distX < -800)
			this.reticle.x = this.player.x - 800;

		if (distY > 600)
			this.reticle.y = this.player.y + 600;
		else if (distY < -600)
			this.reticle.y = this.player.y - 600;
	}

    update(time, delta) {
        //this.game.physics.arcade.collide(this.player, this.foregroundLayer);
        //this.game.physics.arcade.collide(this.player, this.foregroundPlusLayer);

        // Speed of all enemies
        this.moveShip(this.squidShip, this.enemy_BaseSpeed + 1);
        this.moveShip(this.ship2, this.enemy_BaseSpeed + 0.75);
        this.moveShip(this.ship3, this.enemy_BaseSpeed + 0.5);
        this.moveShip(this.enemy, this.enemy_BaseSpeed + 0.25);

        // decrease the position of the texture
        this.background.tilePositionX -= 0.1;
        this.background.tilePositionY -= this.mapSpeed;

        this.movePlayerManager();
        console.log(this.mapSpeed);

        if (this.player.health == 2) {
            this.hp3.visible = false;
        }
        else if (this.player.health == 1) {
            this.hp2.visible = false;
            //this.hp2.visible = false;
        }

        else if (this.player.health == 0 && this.game_over == false) {
            console.log(this.game_over);
            this.game_over = true;
            console.log(this.game_over);
            this.hp1.visible = false;
            //this.scene.start("bootGame");
		    this.player.setTint(0xff0000);
            //gameOver = true;
            this.gameoverText.visible = true;
            this.game_music.stop();
            this.scene.restart();
            //this.hp1.visible = false;
            // Game over state should execute here
            //this.physics.pause();
        }

        /*
        // listening for event JustDown - activated when pressed
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.player.active) {
                console.log("Fire!");
                this.shootLaser();
            }
        }
        */

        /*
        // iterate through each element of the projectile group and update
        // this is done to prevent lasers from continuing on infinitely off screen
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var laser = this.projectiles.getChildren()[i];
            laser.update();
        }
        */

        // Constrain position of constrainReticle
		this.constrainReticle(this.reticle);

		// Update constantly checks to make enemies fire at the player
		this.enemyFire(this.enemy, this.player, time, this);

        // KAD -------------------------
        // Player Ship animations
        if (this.mapSpeed > 15) {
            //console.log("true");
            if (this.mapSpeed > 50) {
                if (this.mapSpeed > 80) {
                    if (this.anim4 == false) {
                        //console.log("fourth");
                        this.player.play("gear_fourth");
                        this.anim4 = true;
                        this.anim3 = false;
                    }
                }
                else {
                    if (this.anim3 == false) {
                        //console.log("third");
                        this.player.play("gear_third");
                        this.anim3 = true;
                        this.anim2 = false;
                        this.anim4 =false;
                    }
                }
            }
            else {
                if (this.anim2 == false) {
                    //console.log("second");
                    this.player.play("gear_second");
                    this.anim2 = true;
                    this.anim1 = false;
                    this.anim3 =false;
                }
            }
        }
        else {
            //console.log("false");
            if (this.anim1 == false) {
                //console.log("first");
                this.player.play("gear_first");
                this.anim1 = true;
                this.anim2 = false;
            }
        }

        if (this.mapSpeed >= this.mapMaxSpeed) {
            this.scene.start("win_game");
        }

        // update our speed tracker
        var speed = this.zeroPadding(Math.round(this.mapSpeed), 3);
        this.velocityUI.text = "VELOCITY: " + speed;
        // ------------------------------
    }

    pauseGame() {
        game.scene.pause("default");
    }

    // Controls Player movement - this function is constantly checked in update()
    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }

        // Acceleerate the speed of the players ship
        if (this.cursorKeys.shift.isDown) {
            // Check to see if we have reached max speed. If so, do not increase
            if (this.mapSpeed < this.mapMaxSpeed) {
                this.mapSpeed += 0.018;
            }
            /*if (this.enemy_BaseSpeed < this.enemy_MaxSpeed) {
                this.enemy_BaseSpeed += 0.018;
            }*/
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
            }*/
            if (this.bulletVelocity > 250) {
                this.bulletVelocity -= 1;
            }
            
        }
    }

    /*
    shootLaser() {
        // passing the current scene as the parameter to instantiate our laser
        var laser = new Laser(this);
        this.laser_sound.play();
        //var laser = this.physics.add.sprite(this.player.x, this.player.y, "laser");
    }
    */

    // function that moves a ship on y axis
    moveShip(ship, speed) {
        ship.y -= speed;
        if (ship.y < 0) {
            // if the ship goes off screen it is reset
            this.resetShipPos(ship);
        }
    }

    // resets a ships position at the top of the config screen on a random x coordinate
    resetShipPos(ship) {
        ship.y = config.height;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    // pass the mouse pointer, second is the clicked object
    /*
    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explosion_anim");
    }
    */

    // takes two objects colliding and removes the item being picked up from the game
    pickPowerUp(player, powerUp) {
        // makes the object inactive and hides it from display
        powerUp.disableBody(true, true);
        this.player.health += 1;
        this.item_sound.play();
    }

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
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            // tween targets ship
            targets: this.player,
            // player's ship is hidden below the screen, move 64 pixels above the bottom of screen
            y: config.height - 64,
            ease: 'Power1',
            // duration is 1.5 seconds
            duration: 1500,
            repeat: 0,
            // when tween is done, player alpha returns
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    // destroys the projectile and resets the enemy position
    hitEnemy(projectile, enemy) {
        // instantiates a new explosion object at the enemy's location
        //enemy.setTint(0xff0000);
        var explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.explosion_sound.play();
        this.resetShipPos(enemy);
        this.score += 15;
        var scoreFormatted = this.zeroPadding(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormatted;
    }

    // Takes a number and returns a number as a string with 0s to left
    zeroPadding(number, size){
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}