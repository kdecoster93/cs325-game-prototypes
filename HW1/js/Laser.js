
// Laser Class extends Sprite Class
class Laser extends Phaser.GameObjects.Sprite {
    // reference to the scene
    constructor(scene) {
        // position of player's ship - every instantiate will be positioned 
        // where player's ship is located
        var x = scene.player.x;
        var y = scene.player.y;

        // Inheriting from the sprite means we have to pass paramaters to parent
        //super(scene, x, y, "laser");
        super(scene, x, y, "laser_orb");
        // Add the Game Object to the scene
        scene.add.existing(this);

		this.speed = 0.25;
		this.born = 0;
		this.direction = 0;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.setSize(24, 24, true);

        // Plays its animation
        //this.play("laser_anim");
        // Enable the spritesheet to have physics
        scene.physics.world.enableBody(this);
        // set velocity
        //this.body.velocity.y = -scene.bulletVelocity;
        //this.body.y = -scene.bulletVelocity;

        // Add the laser to the projectiles group
        //scene.projectiles.add(this);
    }

    // Spawns the projectile at the shooter and launches projectile at target
    fire(shooter, target) {
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

            // angle bullet with shooters rotation
            this.rotation = shooter.rotation;
            // Time since new bullet spawned
			this.born = 0; 
    }

    // Updates the position of the bullet each cycle
    update (time, delta) {

        this.x += this.xSpeed * delta;
		this.y += this.ySpeed * delta;
        this.born += delta;
        // removes the bullet if to much time since it was created passes
		if (this.born > 1800) {

        this.setActive(false);
        this.setVisible(false);
        }

        // Top of the scene Y = 0
        // removes the Game Object from existence if it is too far beyond the scene bounds
        if (this.y < 32) {
            this.destroy();
        }
    }
}