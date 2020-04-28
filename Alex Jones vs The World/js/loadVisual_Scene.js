// class name is the same as the file name
class loadVisual_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("visual");
    }

    preload() {
        this.load.spritesheet('loadingScreen', 'assets/loadingScreen.png',
		{ frameWidth: 500, frameHeight: 500 });
    }

    create() {


        // Loading Screen Looping Background
		this.anims.create({
			key: 'loading_Loop',
			frames: this.anims.generateFrameNumbers('loadingScreen'),
            frameRate: 25,
            //Tells the animation to loop.
			repeat: -1
        });
        
        this.scene.start("menu");
    }
}