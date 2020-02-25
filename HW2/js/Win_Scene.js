// class name is the same as the file name
class Win_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "bootGame is the identifier for this scene"
        super ("win_game");
    }
    create() {
        //console.log(this.winner);
        if (gameSettings.winner == 1) {
            this.background = this.add.image(0, 0, 'shrek_win');
            this.background.setScale(1.5);
            this.background.setOrigin(0,0);
        }
        if (gameSettings.winner == 2) {
            this.background = this.add.image(200, 150, 'pepe_win');
            this.background.setScale(1.5);
            this.background.setOrigin(0,0);
        }
        //this.sky = new Phaser.Display.Color(120, 120, 255);
        //this.cameras.main.setBackgroundColor(sky);
        this.winText = this.add.text(180, 500, 'You Win!', { font: '96px Roboto', fill: '#ff0000' }); 
    }
}