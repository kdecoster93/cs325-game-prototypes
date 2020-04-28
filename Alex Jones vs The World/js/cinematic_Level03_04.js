class cinematic_Level03_04 extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("cinematic01");
    }

    create() { 
        var cinematic = this.add.video(1200 / 2, 700 / 2, 'cinematic_Hillary');
        cinematic.setScale(2.25);
        // Play the video once
        cinematic.play(false);
        var tempScene = this.scene;
        cinematic.on('complete', function () {
            cinematic.destroy();
            tempScene.start("play_Level04");
        });
        
        
    }
 }