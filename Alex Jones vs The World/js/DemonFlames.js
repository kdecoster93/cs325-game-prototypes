// Laser Class extends Sprite Class
class DemonFlames extends Phaser.GameObjects.Sprite {
    // reference to the scene
    constructor(scene, x, y, direction_input) {
    
        // Inheriting from the sprite means we have to pass paramaters to parent
        //super(scene, x, y, "laser");
        super(scene, x, y, "batDemon_fire");
        // Add the Game Object to the scene
        scene.add.existing(this);
        // Plays its animation
        // Enable the spritesheet to have physics
        scene.physics.world.enableBody(this);
        this.body.setSize(80, 48);
        this.setScale(3);
        this.play("batDemon_Flames");
        //this.body.setSize(480, 288);
        this.body.setAllowGravity(false);

        
        this.born = 0;
        this.direction = direction_input;

        // Add the laser to the projectiles group
        scene.batFlames.add(this);
    }
    
    // Updates the position of the bullet each cycle
    update (time, delta) {

        /*
        if (this.direction == false) {
            this.x += 10;
        }
        else {
            this.x -= 10;
        }
        */
        /*
        this.x += this.xSpeed * delta;
		this.y += this.ySpeed * delta;
        */
       this.born += delta;
        // removes the bullet if to much time since it was created passes
		if (this.born > 600) {

        this.setActive(false);
        this.setVisible(false);
        this.destroy();
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