class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // explosion is the texture key
        super(scene, x, y, "explosion");
        scene.add.existing(this);
        //this.setScale(0.2);
        this.play("explosion_anim");
    }
}