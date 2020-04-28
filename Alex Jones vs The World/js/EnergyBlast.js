
// Laser Class extends Sprite Class
class EnergyBlast extends Phaser.GameObjects.Sprite {
    // reference to the scene
    
    constructor(scene, x, y, direction_input) {
        // position of player's ship - every instantiate will be positioned 
        // where player's ship is located
        //var x = scene.player.x;
        //var y = scene.player.y;

        // Inheriting from the sprite means we have to pass paramaters to parent
        //super(scene, x, y, "laser");
        super(scene, x, y, "energy_blast");
        // Add the Game Object to the scene
        scene.add.existing(this);
        // Plays its animation
        this.setScale(0.5);
        this.play("energy_attack");

        
        this.born = 0;
        this.direction = direction_input;
        this.Scene = scene;
        //this.xSpeed = 100;
        //this.setVelocity(200, 0);
        /*
        this.speed = 0.25;
		this.direction = 0;
		this.xSpeed = 0;
		this.ySpeed = 0;
        this.setSize(24, 24, true);
        */

        // Enable the spritesheet to have physics
        scene.physics.world.enableBody(this);
        this.body.setSize(68, 55.5);
        //this.body.allowGravity = false;
        // set velocity
        //this.body.velocity.y = -scene.bulletVelocity;
        //this.body.y = -scene.bulletVelocity;

        // Add the laser to the projectiles group
        scene.playerEnergyBlasts.add(this);
    }

    
    //fire(shooter) {
            //this.setPosition(shooter.x, shooter.y); // Initial position
			//this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

            //this.xSpeed = -160;
            
            // Calculate X and y velocity of bullet to moves it from shooter to target
            /*
			if (target.y >= this.y) {

				this.xSpeed = this.speed*Math.sin(this.direction);
				this.ySpeed = this.speed*Math.cos(this.direction);
			}

			else {

				this.xSpeed = -this.speed*Math.sin(this.direction);
				this.ySpeed = -this.speed*Math.cos(this.direction);
            }
            */
            

            // angle bullet with shooters rotation
            //this.rotation = shooter.rotation;
            // Time since new bullet spawned
			//this.born = 0; 
    //}
    

    // Updates the position of the bullet each cycle
    update (time, delta) {

        if (this.direction == false) {
            this.x += 10;
        }
        else {
            this.x -= 10;
        }
        /*
        this.x += this.xSpeed * delta;
		this.y += this.ySpeed * delta;
        */
       this.born += delta;
        // removes the bullet if to much time since it was created passes
		if (this.born > 1800) {

        this.setActive(false);
        this.setVisible(false);
        this.destroy();
        this.Scene.energyPresent -= 1;
        }

        /*
        // Top of the scene Y = 0
        // removes the Game Object from existence if it is too far beyond the scene bounds
        if (this.y < 32) {
            this.destroy();
        }
        */
        
    }
}