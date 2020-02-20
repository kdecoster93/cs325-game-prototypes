// class name is the same as the file name
class Win_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "bootGame is the identifier for this scene"
        super ("win_game");
    }
    create() {
        this.background = this.add.tileSprite(0,0, config.width, config.height, "tiles");
        this.background.setOrigin(0,0);
        //this.sky = new Phaser.Display.Color(120, 120, 255);
        //this.cameras.main.setBackgroundColor(sky);
        this.winText = this.add.text(config.width / 2, config.height / 2, 'You Win!', { font: '96px Roboto', fill: '#ff0000' }); 
    }
}