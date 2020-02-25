class Blood extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // explosion is the texture key
        super(scene, x, y, "blood_effect");
        scene.add.existing(this);
        // play the explosion animation
        this.setScale(0.2);
        this.play("blood_anim");
    }
}