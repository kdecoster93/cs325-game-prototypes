class cinematic_Intro extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("cinematic00");
    }

    create() { 
        var cinematic = this.add.video(1200 / 2, 700 / 2, 'cinematic_Intro');
        cinematic.setScale(0.64);
        // Play the video once
        cinematic.play(false);
        var tempScene = this.scene;
        cinematic.on('complete', function () {
            cinematic.destroy();
            tempScene.start("play_Level01");
        });
    }
 }