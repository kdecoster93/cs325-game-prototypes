// class name is the same as the file name
class menu_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("menu");
    }

    preload() {
        this.load.image("menu_background", "assets/menu_launch.jpg");
    }

    create() {
        this.menu_background = this.add.image(800 / 2, 600 / 2, 'menu_background');
        this.menu_background.setScale(0.6);
        //this.background.setOrigin(0,0);
        this.titleText = this.add.text(175, 600 / 2 - 200, 'LAUNCH!', { font: '96px Roboto', fill: '#ff0000' });
        this.eText = this.add.text(50, (600 / 2), 'Press E to Play!', { font: '32px Roboto', fill: '#ffffff' });
        this.controlsText1 = this.add.text(50, (600 / 2) + 50, 'Movement: WASD', { font: '32px Roboto', fill: '#ffffff' });
        this.controlsText2 = this.add.text(50, (600 / 2) + 100, 'To Fire: Right/Left Click', { font: '32px Roboto', fill: '#ffffff' });
        this.controlsText3 = this.add.text(50, (600 / 2) + 150, 'Accelerate: Hold down SHIFT', { font: '32px Roboto', fill: '#ffffff' });
        this.goalText = this.add.text(50, (600 / 2) + 200, 'Goal: Hold down shift long enough to reach your \nmaximum velocity and leave the planet!', { font: '32px Roboto', fill: '#ffffff' });
        // Add the e button to enter the game
        this.e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
        // Load the game if the player presses the e key
        if (this.e_key.isDown) {
            this.scene.start("load_game")
        }
    }
}
