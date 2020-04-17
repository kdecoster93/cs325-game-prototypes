// class name is the same as the file name
class Win_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "bootGame is the identifier for this scene"
        super ("win_game");
    }

    init(data) {
        //console.log('init', data);
        this.winner = data.winner;
    }

    create() {
        console.log(this.winner);
        if (this.winner == 1) {
            this.background = this.add.image(1200 / 2, 700 / 2, 'menu_background');
            this.background.setScale(1.25);
            //this.background.setOrigin(0,0);
            this.winText = this.add.text(180, 500, 'You Win! Final Level Coming Soon', { font: '96px Roboto', fill: '#ff0000' }); 
        }
        if (this.winner == 2) {
            this.background = this.add.image(1200 / 2, 700 / 2, 'menu_background');
            this.background.setScale(1.25);
            //this.background.setOrigin(0,0);
            this.winText = this.add.text(180, 500, 'Game Over', { font: '96px Roboto', fill: '#ff0000' }); 
        }
        //this.sky = new Phaser.Display.Color(120, 120, 255);
        //this.cameras.main.setBackgroundColor(sky);
        //this.winText = this.add.text(180, 500, 'You Win! Level 2 Coming Soon', { font: '96px Roboto', fill: '#ff0000' }); 
    }
}