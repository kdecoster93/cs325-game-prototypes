// class name is the same as the file name
class menu_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("menu");
    }

    preload() {

        
        // Loading Graphic
        var loadVisual = this.add.sprite(1200 / 2, 700 / 2, 'loadingScreen');
        loadVisual.setScale(1.5);
        loadVisual.anims.play('loading_Loop', true);
        
        // Code derived from Zain Fazal's Final Game Loading Screen --------------
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        //progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillStyle(0xbb0a1e, 0.8);
		progressBox.fillRect(1200 / 2 - 350, 700 / 2 - 40, 640, 50);

		var loadingText = this.make.text({
            x: 1200 / 2,
            y: 700 / 2 - 80,
            text: 'Loading...',
            style: {
                font: '40px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: 1200 / 2,
            y: 700 / 2 - 15,
            text: '0%',
            style: {
                font: '36px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: 1200 / 2 - 25,
            y: 700 / 2 + 30,
            text: '',
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
		
		this.load.on('progress', function (value) {
            //console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(1200 / 2 - 340, 700 / 2 - 30, 625 * value, 30);
            //First arg 10 more than first arg of fillRect above, second arg same
        });

        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
            assetText.setText('Loading asset: ' + file.src);
        });

        this.load.on('complete', function () {
            //console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            loadVisual.destroy();
            //this.scene.scene.start('titleScene');
        });
        // End of Zain Fazal's Code --------------------------------------
        
        this.load.image("menu_background", "assets/AlexJones_StartScreen.png");
        //this.load.audio("menu_music", "assets/audio/allstar.mp3");
        //this.load.audio("menu_music", "assets/audio/Gwyn, Lord of Cinder.mp3");
        this.load.audio("menu_music", "assets/audio/Gladiator.mp3");
    }

    create() {
        this.menu_background = this.add.image(1200 / 2, 700 / 2, 'menu_background');
        this.menu_background.setScale(1.25);

        // Boolean that controls whether or not the scene changes
        this.nextScene = false;

        // Creates a black strip background for our Score to rest on
        var graphics = this.add.graphics();
        // Black solid fill
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

        //this.background.setOrigin(0,0);
        //this.titleText = this.add.text(0, 600 / 2 - 300, 'Meme Royale', { font: '82px Engravers MT', fill: '#ff0000' });
        this.eText = this.add.text(815, 605, 'Continue', { font: '40px Copperplate Gothic Bold', fill: '#0f0' })
            .setInteractive()
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', () => this.enterButtonActiveState() )
            .on('pointerup', () => { 
                this.enterButtonHoverState();
                this.nextScene = true;
            });
        
        // Add the e button to enter the game
        //this.e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Add our game music to the menu scene
        /*
        this.game_music = this.sound.add("menu_music");
        var music_Config = {
			mute: false,
			volume: 0.1,
			rate: 1,
			detune: 0,
			seek: 0, 
			loop: false,
			delay: 0
        }

        this.game_music.play(music_Config);
        */
        
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

    update() {
        // Load the game if the player presses the e key
        /*
        if (this.e_key.isDown) {
            this.scene.start("controls")
        }
        */
        if (this.nextScene == true) {
            this.scene.start("controls")
        } 
    }
}