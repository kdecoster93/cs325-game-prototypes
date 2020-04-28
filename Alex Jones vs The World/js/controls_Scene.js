class controls_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("controls");
    }

    create() 
    {   
        // Boolean used to signal a switch to the next scene
        this.nextScene = false;

        //this.menu_background = this.add.image(config.width / 2, config.height / 2, 'menu_background');
        //this.menu_background.setScale(0.78);

        //this.background.setOrigin(0,0);
        this.titleText = this.add.text(0, 600 / 2 - 300, 'Alex Jones vs The World', { font: '65px Engravers MT', fill: '#ff0000' });
        this.goalText = this.add.text(50, (600 / 2) - 200, 'Rats mutated by the corona virus have taken over New York City. \nGoal: Find and defeat the corona plague demon that controls the rats!', { font: '32px Roboto', fill: '#ffffff' });
        //this.twoPlayerText = this.add.text(50, (600 / 2) - 100, 'This is a Two Player Game', { font: '32px Roboto', fill: '#ffffff' });
        
        this.eText = this.add.text(50, (600 / 2) - 75, 'CONTROLS', { font: '48px Roboto', fill: '#ffffff' });

        // Creates a red button
        var graphics = this.add.graphics();
        graphics.fillStyle(0xbb0a1e, 1);
        // Draw polygon lines with coords
        graphics.beginPath();
        graphics.moveTo(800, 600);
        graphics.lineTo(1200, 600);
        graphics.lineTo(1200, 650);
        graphics.lineTo(800, 650);
        graphics.lineTo(800, 600);
        // Close and fill
        graphics.closePath();
        graphics.fillPath();

        // Next scene button text
        this.eText = this.add.text(815, 605, 'Play Game!', { font: '40px Copperplate Gothic Bold', fill: '#0f0' })
            .setInteractive()
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', () => this.enterButtonActiveState() )
            .on('pointerup', () => { 
                this.enterButtonHoverState();
                this.nextScene = true;
            });

        // Controls Text
        this.controlsText1 = this.add.text(10, (600 / 2), 'Movement: WAD', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText2 = this.add.text(10, (600 / 2) + 50, 'Sprint: Hold SHIFT while moving', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText3 = this.add.text(10, (600 / 2) + 100, 'Kick: S', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText4 = this.add.text(10, (600 / 2) + 150, 'Punch: UP Arrow', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText5 = this.add.text(10, (600 / 2) + 200, 'Energy Blast: DOWN Arrow', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText6 = this.add.text(10, (600 / 2) + 250, 'Pick up item: E', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText7 = this.add.text(10, (600 / 2) + 300, 'Switch Weapons: RIGHT & LEFT Arrows', { font: '24px Roboto', fill: '#ffffff' });
        this.controlsText8 = this.add.text(10, (600 / 2) + 350, 'Health Regen: Hold SPACE', { font: '24px Roboto', fill: '#ffffff' });

        //this.controlsText6 = this.add.text(400, (600 / 2) + 50, 'Player 2 Movement: Arrow Keys', { font: '24px Roboto', fill: '#ffffff' });
        //this.controlsText7 = this.add.text(400, (600 / 2) + 100, 'Player 2 Dash: L and "', { font: '24px Roboto', fill: '#ffffff' });
        //this.controlsText8 = this.add.text(400, (600 / 2) + 150, 'Player 2 Punch: :', { font: '24px Roboto', fill: '#ffffff' });
        //this.controlsText9 = this.add.text(400, (600 / 2) + 200, 'Player 2 Kick: Down Arrow Key', { font: '24px Roboto', fill: '#ffffff' });
        //this.controlsText10 = this.add.text(400, (600 / 2) + 250, 'Player 2 Health Regen: Hold P', { font: '24px Roboto', fill: '#ffffff' });
        
        // Add the e button to enter the game
        this.e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    enterButtonHoverState() {
        this.eText.setStyle({ fill: '#ff0'});
    }
    
    enterButtonRestState() {
        this.eText.setStyle({ fill: '#0f0' });
    }
    
    enterButtonActiveState() {
        this.eText.setStyle({ fill: '#0ff' });
    }

    update() 
    {
        // Load the game if the player presses the e key
        /*
        if (this.e_key.isDown) {
            this.scene.start("load_game")
        }
        */
        if (this.nextScene == true) {
            this.scene.start("load_game")
        } 
    }
}