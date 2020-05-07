class cinematic_Intro extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "menu" is the identifier for this scene"
        super ("cinematic00");
    }

    create() { 
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
		
        var cinematic = this.add.video(1200 / 2, 700 / 2, 'cinematic_Intro');
        cinematic.setScale(0.64);
        // Play the video once
        cinematic.play(false);
        var tempScene = this.scene;
        var music = this.game_music;
        cinematic.on('complete', function () {
            cinematic.destroy();
            music.play(music_Config);
            tempScene.start("play_Level01");
        });
    }
 }