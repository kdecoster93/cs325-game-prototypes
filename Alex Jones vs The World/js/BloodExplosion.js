class BloodExplosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // explosion is the texture key
        super(scene, x, y, "blood_explode");
        scene.add.existing(this);
        //this.setScale(0.2);
        this.play("blood_explode_anim");
    }
}