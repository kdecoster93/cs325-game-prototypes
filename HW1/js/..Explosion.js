class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // explosion is the texture key
        super(scene, x, y, "explode");
        scene.add.existing(this);
        // play the explosion animation
        this.play("explode_anim");
    }
}
