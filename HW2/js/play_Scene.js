
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

		this.winner = 0;
        //this.score = 0;
        this.background = this.add.image(400, 300, 'background');
        //this.add.image(400, 300, 'background');
        this.background.setScale(1.5);

		// A Static Body simply has a position and a size. It isn't touched by gravity, you cannot set 
		// velocity on it and when something collides with it, it never moves. Static by name, static by nature.
		this.platforms = this.physics.add.staticGroup();

		// Scale the ground platform by 2 and refresh body to update physics body. -->
		this.platforms.create(950, 568, 'ground').setScale(2).refreshBody();
		this.platforms.create(760, 568, 'ground').setScale(2).refreshBody();
		this.platforms.create(570, 568, 'ground').setScale(2).refreshBody();
		this.platforms.create(380, 568, 'ground').setScale(2).refreshBody();
		this.platforms.create(190, 568, 'ground').setScale(2).refreshBody();
		this.platforms.create(0, 568, 'ground').setScale(2).refreshBody();

		this.platforms.create(600, 400, 'ground');
		this.platforms.create(200, 400, 'ground');
		this.platforms.create(50, 250, 'ground');
		this.platforms.create(750, 250, 'ground');
		this.platforms.create(310, 200, 'ground');
		this.platforms.create(405, 200, 'ground');
		this.platforms.create(500, 200, 'ground');
        
        // Creates a black strip background for our Score to rest on
        var graphics = this.add.graphics();
        // Black solid fill
        graphics.fillStyle(0x000000, 1);
        // Draw polygon lines with coords
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(800, 0);
        graphics.lineTo(800, 35);
        graphics.lineTo(0, 35);
        graphics.lineTo(0, 0);
        // Close and fill
        graphics.closePath();
        graphics.fillPath();

		// Create our variable player: Creation of Physics Sprite and animations it can use. -->
		// Creates a new sprite called player, positioned at 100 x 450 pixels from the bottom of the game. Has Dynamic Physics body by default. -->
		this.player = this.physics.add.sprite(100, 200, 'shrek');
		// call back function to control idle animation
		this.player.on('animationcomplete', this.animCompleteShrek, this);
        this.player.setScale(1.5);
        this.player.anims.play('idle', true);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		
		this.player2 = this.physics.add.sprite(300, 200, 'pepe');
		// call back function to control idle animation
		this.player2.on('animationcomplete', this.animCompletePepe, this);
        this.player2.setScale(1.5);
        this.player2.anims.play('idle_pepe', true);
		this.player2.setBounce(0.2);
        this.player2.setCollideWorldBounds(true);
        
		// Set Player and Enemy variables
		this.max_health = 100;
		this.player.health = 100;
		this.player2.health = 100;

		// Phaser built in keyboard manager
        //cursors = this.input.keyboard.createCursorKeys();
        
        this.cursorKeys = this.input.keyboard.addKeys({
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
			'right': Phaser.Input.Keyboard.KeyCodes.D,
			'left_tackle': Phaser.Input.Keyboard.KeyCodes.Y,
			'right_tackle': Phaser.Input.Keyboard.KeyCodes.R,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
			'spacebar': Phaser.Input.Keyboard.KeyCodes.T,
			'up_pepe': Phaser.Input.Keyboard.KeyCodes.UP,
			'down_pepe': Phaser.Input.Keyboard.KeyCodes.DOWN,
			'left_pepe': Phaser.Input.Keyboard.KeyCodes.LEFT,
			'right_pepe': Phaser.Input.Keyboard.KeyCodes.RIGHT,
			'left_tackle_pepe': Phaser.Input.Keyboard.KeyCodes.QUOTES,
			'right_tackle_pepe': Phaser.Input.Keyboard.KeyCodes.L,
            'shift_pepe': Phaser.Input.Keyboard.KeyCodes.P,
            'spacebar_pepe': Phaser.Input.Keyboard.KeyCodes.SEMICOLON
			
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

       
		//this.shrek_punch01 = this.sound.add("shrek_punch01");
		this.shrek_powerup_sound = this.sound.add("shrek_powerup");
		this.pepe_powerup_sound = this.sound.add("shrek_powerup");

		// Collider takes two objects and tests for collision and performs separation against them. In this case we're giving		
		// the player sprite and the platforms Group.
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.player2, this.platforms);
		//this.physics.add.collider(this.player, this.player2);

		// Determines if the players hurt each other
		this.physics.add.overlap(this.player, this.player2, this.playerCombat, null, this);

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

		this.hp4 = this.add.image(760, 15, 'red');
        this.hp5 = this.add.image(730, 15, 'red');
        this.hp6 = this.add.image(700, 15, 'red');
        this.hp4.setScale(4);
        this.hp5.setScale(4);
        this.hp6.setScale(4);
        this.hp4.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
        this.hp5.setOrigin(0.5, 0.5).setDisplaySize(30, 10);
		this.hp6.setOrigin(0.5, 0.5).setDisplaySize(30, 10);

		// Player Health UI
		this.player1_HPUI = this.add.bitmapText(10, 5, "pixelFont", "SHREK HP: ", 32);
		this.player2_HPUI = this.add.bitmapText(545, 5, "pixelFont", "PEPE HP: ", 32);

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
		if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift)) {
			this.shrek_powerup_sound.play();
		}
		
		else if (this.cursorKeys.shift.isUp) {
			this.shrek_powerup_sound.stop();
		}
		
		if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift_pepe)) {
			this.pepe_powerup_sound.play();
		}
		
		else if (this.cursorKeys.shift_pepe.isUp) {
			this.pepe_powerup_sound.stop();
		}
		
		this.playerManager(this.player, this.cursorKeys.left, this.cursorKeys.right, this.cursorKeys.up, this.cursorKeys.down, this.cursorKeys.spacebar, this.cursorKeys.left_tackle, this.cursorKeys.right_tackle, this.cursorKeys.shift);
		this.pepeManager(this.player2, this.cursorKeys.left_pepe, this.cursorKeys.right_pepe, this.cursorKeys.up_pepe, this.cursorKeys.down_pepe, this.cursorKeys.spacebar_pepe, this.cursorKeys.left_tackle_pepe, this.cursorKeys.right_tackle_pepe, this.cursorKeys.shift_pepe);
		
		// update our health trackers
        var player1_health = this.zeroPadding(Math.round(this.player.health), 3);
		this.player1_HPUI.text = "SHREK HP: " + player1_health;
		
		var player2_health = this.zeroPadding(Math.round(this.player2.health), 3);
		this.player2_HPUI.text = "PEPE HP: " + player2_health;
		

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

	playerCombat (player1, player2)
    {
        if (this.cursorKeys.down.isDown || this.cursorKeys.spacebar.isDown) {
			player2.health -= 0.1;
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
			var randomX = Phaser.Math.Between(player2.x - 12, player2.x + 12);
			var randomY = Phaser.Math.Between(player2.y - 20, player2.y + 20);
			var blood = new Blood(this, randomX, randomY);
			// flips the blood sprite depending on the aggressors orientation
			if (player1.flipX == true) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}

			// Win conditions: Player 2 has no more health
			if (player2.health <= 0) {
				gameSettings.winner = 1;
				this.scene.start("win_game");
			}
		}

		if (this.cursorKeys.down_pepe.isDown || this.cursorKeys.spacebar_pepe.isDown) {
			player1.health -= 0.1;
			// play pain sound to notify player they are taking damage
			var pain_sound = Phaser.Utils.Array.GetRandom(this.pain_sounds);
			pain_sound.play();
			var randomX = Phaser.Math.Between(player1.x - 12, player1.x + 12);
			var randomY = Phaser.Math.Between(player1.y - 20, player1.y + 20);
			var blood = new Blood(this, randomX, randomY);
			// flips the blood sprite depending on the aggressors orientation
			if (player2.flipX == true) {
				blood.flipX = true;
			}
			else {
				blood.flipX = false;
			}

			// Win conditions: Player 1 has no more health
			if (player1.health <= 0) {
				gameSettings.winner = 2;
				this.scene.start("win_game");
			}
		}
	
    }

	animCompleteShrek (animation, frame)
	{		
		if (this.player.body.touching.down) {
			this.player.anims.play('idle');
		}
    //  Animation is over, let's fade the sprite out
	/*
	this.tweens.add({
        targets: gem,
        duration: 3000,
        alpha: 0
	});
	*/
	}

	animCompletePepe (animation, frame)
	{		
		if (this.player2.body.touching.down) {
			this.player2.anims.play('idle_pepe');
		}
	}

	
	playerManager(player, left, right, up, kick, punch, left_tackle, right_tackle, powerup) 
	{
		// Player is moving left and touches the ground
		if (left.isDown)
		{
            player.setVelocityX(-160);
            // Her we flip our sprite for our one walking animation
			player.flipX = false;
			if (player.body.touching.down && up.isUp)
			{
            	// Her we flipe our sprite for our one walking animation
            	player.flipX = true;
            	player.anims.play('walk', true);
			}
		}
		
		// Player is moving right and touches the ground
		else if (right.isDown)
		{
            player.setVelocityX(160);
			player.flipX = true;
			if (player.body.touching.down && up.isUp) 
			{
            	player.flipX = false;
				player.anims.play('walk', true);
			}
		}

		else if (right.isDown && player.body.touching.down && up.isUp)
		{
            player.setVelocityX(160);
            player.flipX = false;
			player.anims.play('walk', true);
		}


		// Single Punching Animation
		else if (Phaser.Input.Keyboard.JustDown(punch))
		{
			
			if (left.isDown) {
				player.setVelocityX(-160);
				player.flipX = true;
			}
			if (right.isDown) {
				player.setVelocityX(160);
				player.flipX = false;
			}
			player.anims.play('punch', true);
			var punch_sound = Phaser.Utils.Array.GetRandom(this.punch_sounds);
			//var n = Phaser.Math.Between(0, 4);
			//var punch_sound = this.shrek_sounds.getFirstNth(n);
			punch_sound.play();
			/*this.shrek_punch01.play();*/
			//this.player.anims.play('idle');
		}

		// Held Down Punching
		else if (punch.isDown) {
			if (left.isDown) {
				player.setVelocityX(-160);
				player.flipX = true;
			}
			if (right.isDown) {
				player.setVelocityX(160);
				player.flipX = false;
			}
			player.anims.play('punch', true);
			//this.shrek_punch01.play();
			var punch_sound = Phaser.Utils.Array.GetRandom(this.punch_sounds);
			punch_sound.play();
		}

        else if (kick.isDown)
		{
			
			player.anims.play('kick', true);
			var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
			kick_sound.play();
        }

		// Power Up animation if the player is touching the ground and not moving
        else if (powerup.isDown && player.body.touching.down && left.isUp && right.isUp)
		{
			player.anims.play('powerup', true);
			if (player.health < this.max_health) {
				player.health += 0.025;
			}
		}

		// Jump works if the player is touching the ground
		else if (up.isDown && player.body.touching.down)
		{
            player.setVelocityY(-800);
			player.anims.play('jump', true);
			var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
			jump_sound.play();
		}

		else if (Phaser.Input.Keyboard.JustDown(left_tackle)) {
			player.flipX = false;
			player.anims.play('tackle', true);
			player.setVelocityX(800);
			var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
			tackle_sound.play();
			//console.log("Playing Tackle");
		}

		else if (Phaser.Input.Keyboard.JustDown(right_tackle)) {
			player.flipX = true;
			player.anims.play('tackle', true);
			player.setVelocityX(-800);
			var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
			tackle_sound.play();
			//console.log("Playing Tackle");
		}

		else if (left.isUp && right.isUp && left_tackle.isUp && right_tackle.isUp)
		{
			// player is not moving -->
			player.setVelocityX(0);
            //this.player.anims.play('idle');
            //console.log("Playing Idle");
		}
		/*
		if (Phaser.Input.Keyboard.JustDown(powerup)) {
			this.shrek_powerup_sound.play();
		}
		
		else if (powerup.isUp) {
			this.shrek_powerup_sound.stop();
		}
		*/
			/*
			this.tweens.add({
				targets: this.shrek_powerup_sound,
				volume:   0,
				duration: 200
			});
			
		} */
	}

	pepeManager(player, left, right, up, kick, punch, left_tackle, right_tackle, powerup) 
	{
		// Player is moving left and touches the ground
		if (left.isDown)
		{
            player.setVelocityX(-160);
            // Her we flip our sprite for our one walking animation
			player.flipX = false;
			if (player.body.touching.down && up.isUp)
			{
            	// Her we flipe our sprite for our one walking animation
            	player.flipX = true;
            	player.anims.play('walk_pepe', true);
			}
		}
		
		// Player is moving right and touches the ground
		else if (right.isDown)
		{
            player.setVelocityX(160);
			player.flipX = true;
			if (player.body.touching.down && up.isUp) 
			{
            	player.flipX = false;
				player.anims.play('walk_pepe', true);
			}
		}

		else if (right.isDown && player.body.touching.down && up.isUp)
		{
            player.setVelocityX(160);
            player.flipX = false;
			player.anims.play('walk_pepe', true);
		}


		// Single Punching Animation
		else if (Phaser.Input.Keyboard.JustDown(punch))
		{
			
			if (left.isDown) {
				player.setVelocityX(-160);
				player.flipX = true;
			}
			if (right.isDown) {
				player.setVelocityX(160);
				player.flipX = false;
			}
			player.anims.play('punch_pepe', true);
			var punch_sound = Phaser.Utils.Array.GetRandom(this.punch_sounds);
			//var n = Phaser.Math.Between(0, 4);
			//var punch_sound = this.shrek_sounds.getFirstNth(n);
			punch_sound.play();
			/*this.shrek_punch01.play();*/
			//this.player.anims.play('idle');
		}

		// Held Down Punching
		else if (punch.isDown) {
			if (left.isDown) {
				player.setVelocityX(-160);
				player.flipX = true;
			}
			if (right.isDown) {
				player.setVelocityX(160);
				player.flipX = false;
			}
			player.anims.play('punch_pepe', true);
			//this.shrek_punch01.play();
			var punch_sound = Phaser.Utils.Array.GetRandom(this.punch_sounds);
			punch_sound.play();
		}

        else if (kick.isDown)
		{
			
			player.anims.play('kick_pepe', true);
			var kick_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
			kick_sound.play();
        }

		// Power Up animation if the player is touching the ground and not moving
        else if (powerup.isDown && player.body.touching.down && left.isUp && right.isUp)
		{
			player.anims.play('powerup_pepe', true);
			if (player.health < this.max_health) {
				player.health += 0.025;
			}
		}

		// Jump works if the player is touching the ground
		else if (up.isDown && player.body.touching.down)
		{
            player.setVelocityY(-800);
			player.anims.play('jump_pepe', true);
			var jump_sound = Phaser.Utils.Array.GetRandom(this.jump_sounds);
			jump_sound.play();
		}

		else if (Phaser.Input.Keyboard.JustDown(left_tackle)) {
			player.flipX = false;
			player.anims.play('tackle_pepe', true);
			player.setVelocityX(800);
			var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
			tackle_sound.play();
			//console.log("Playing Tackle");
		}

		else if (Phaser.Input.Keyboard.JustDown(right_tackle)) {
			player.flipX = true;
			player.anims.play('tackle_pepe', true);
			player.setVelocityX(-800);
			var tackle_sound = Phaser.Utils.Array.GetRandom(this.kick_sounds);
			tackle_sound.play();
			//console.log("Playing Tackle");
		}

		else if (left.isUp && right.isUp && left_tackle.isUp && right_tackle.isUp)
		{
			// player is not moving -->
			player.setVelocityX(0);
            //this.player.anims.play('idle');
            //console.log("Playing Idle");
		}
		/*
		if (Phaser.Input.Keyboard.JustDown(powerup)) {
			this.shrek_powerup_sound.play();
		}
		
		else if (powerup.isUp) {
			this.shrek_powerup_sound.stop();
		}
		*/
			/*
			this.tweens.add({
				targets: this.shrek_powerup_sound,
				volume:   0,
				duration: 200
			});
			
		} */
	}
}