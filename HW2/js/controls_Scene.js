class controls_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("controls");
    }

    create() 
    {
        //this.menu_background = this.add.image(config.width / 2, config.height / 2, 'menu_background');
        //this.menu_background.setScale(0.78);

        //this.background.setOrigin(0,0);
        this.titleText = this.add.text(0, 600 / 2 - 300, 'Meme Royale', { font: '82px Engravers MT', fill: '#ff0000' });
        this.goalText = this.add.text(50, (600 / 2) - 200, 'Goal: Defeat your fellow meme player!', { font: '32px Roboto', fill: '#ffffff' });
        this.twoPlayerText = this.add.text(50, (600 / 2) - 100, 'This is a Two Player Game', { font: '32px Roboto', fill: '#ffffff' });
        this.eText = this.add.text(50, (600 / 2), 'Press E to Play!', { font: '32px Roboto', fill: '#ffffff' });
        this.controlsText1 = this.add.text(10, (600 / 2) + 50, 'Player 1 Movement: WAD', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText2 = this.add.text(10, (600 / 2) + 100, 'Player 1 Dash: R and Y', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText3 = this.add.text(10, (600 / 2) + 150, 'Player 1 Punch: T', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText4 = this.add.text(10, (600 / 2) + 200, 'Player 1 Kick: S', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText5 = this.add.text(10, (600 / 2) + 250, 'Player 1 Health Regen: Hold SHIFT', { font: '24px Roboto', fill: '#ffffff' });

        this.controlsText6 = this.add.text(400, (600 / 2) + 50, 'Player 2 Movement: Arrow Keys', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText7 = this.add.text(400, (600 / 2) + 100, 'Player 2 Dash: L and "', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText8 = this.add.text(400, (600 / 2) + 150, 'Player 2 Punch: :', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText9 = this.add.text(400, (600 / 2) + 200, 'Player 2 Kick: Down Arrow Key', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText10 = this.add.text(400, (600 / 2) + 250, 'Player 2 Health Regen: Hold P', { font: '24px Roboto', fill: '#ffffff' });
        
        // Add the e button to enter the game
        this.e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() 
    {
        // Load the game if the player presses the e key
        if (this.e_key.isDown) {
            this.scene.start("load_game")
        }
    }
}