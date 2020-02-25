// class name is the same as the file name
class menu_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("menu");
    }

    preload() {
        this.load.image("menu_background", "assets/shrekboom2.png");
        this.load.audio("menu_music", "assets/audio/allstar.mp3");
    }

    create() {
        this.menu_background = this.add.image(800 / 2, 600 / 2, 'menu_background');
        this.menu_background.setScale(0.78);

        //this.background.setOrigin(0,0);
        this.titleText = this.add.text(0, 600 / 2 - 300, 'Meme Royale', { font: '82px Engravers MT', fill: '#ff0000' });
        this.eText = this.add.text(50, (600 / 2), 'Press E to Continue!', { font: '32px Roboto', fill: '#ffffff' });
        
        // Add the e button to enter the game
        this.e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Add our game music to the menu scene
        this.game_music = this.sound.add("menu_music");
        var music_Config = {
			mute: false,
			volume: 0.40,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: true,
			delay: 0
        }
        this.game_music.play(music_Config);
    }

    update() {
        // Load the game if the player presses the e key
        if (this.e_key.isDown) {
            this.scene.start("controls")
        }
    }
}