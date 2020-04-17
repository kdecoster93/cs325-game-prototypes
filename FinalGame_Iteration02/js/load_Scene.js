
// class name is the same as the file name
class load_Scene extends Phaser.Scene {
    // constructor function calls super() which makes the class inherit all the characteristics of its predecessor = the class scene from Phaser
    constructor() {
        // "bootGame is the identifier for this scene"
        super ("load_game");
    }

    // load our images, sprites, and audio into memory
    preload() {
        // Loads in 5 assets: 4 images and a spritesheet.
		// The first parameter is the name for the object you will use for programming.
		this.load.image('background', 'assets/memewar_background.png');
		this.load.image('city_background', 'assets/city_background.png')
		this.load.image('level02_background', 'assets/Level_02/junkyard_background3.png')
		this.load.image('pepe_win', 'assets/pepe_win.png');
		this.load.image('shrek_win', 'assets/shrek_win.png');
		this.load.image('ground', 'assets/platform_block.png');
		this.load.image('concrete', 'assets/concrete_block.png');

		// Platforms
		this.load.image('skullPlatform', 'assets/SkullPlatform.png');
		this.load.image('redPlatform', 'assets/RedPlatform.png');
		this.load.image('landRed', 'assets/LandRed.png');
		this.load.image('landBase', 'assets/LandBase.png');

		// Pillars
		this.load.image('pillar_01', 'assets/Pillar.png');
		this.load.image('pillar_02', 'assets/Pillar2.png');

		//this.load.image('star', 'assets/star.png');
		//this.load.image('bomb', 'assets/bomb.png');
		this.load.spritesheet('shrek', 'assets/shrek_sprite.png',
		{ frameWidth: 53, frameHeight: 56 });
		this.load.spritesheet('pepe', 'assets/pepe_sprite.png',
		{ frameWidth: 53, frameHeight: 56 });
		// Alex Jones Spritesheet
		this.load.spritesheet('alex', 'assets/alexsprite_temp.png',
		{ frameWidth: 160, frameHeight: 120 });
		// Alex Jones Powerup Spritesheet
		this.load.spritesheet('alex_powerup', 'assets/alexsprite_powerup.png',
		{ frameWidth: 177, frameHeight: 171 });
		// Alex Jones Powerup Spritesheet
		this.load.spritesheet('energy_blast', 'assets/energy_blast_temp.png',
		{ frameWidth: 136, frameHeight: 111 });

		// Blood Effects
		this.load.spritesheet('blood_effect', 'assets/blood_effect.png',
		{ frameWidth: 512, frameHeight: 512 });
		this.load.spritesheet('blood_explode', 'assets/blood_splat.png',
		{ frameWidth: 192, frameHeight: 192 });
		this.load.audio("blood_splatter", "assets/audio/BloodSplatter.mp3");

		// Explosion Effect
		this.load.spritesheet('explosion', 'assets/explode.png',
		{ frameWidth: 128, frameHeight: 128 });
		this.load.audio("explode", "assets/audio/Blast.mp3");
		
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        // Loading health bar
		this.load.image('red', 'assets/health.jpg');

		// Level 01 Demon Boss
		this.load.spritesheet('demon_boss_idle', 'assets/hell-beast-idle.png',
		{ frameWidth: 55, frameHeight: 67 });
		this.load.spritesheet('demon_boss_breath', 'assets/hell-beast-breath.png',
		{ frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('demon_boss_burn', 'assets/hell-beast-burn.png',
		{ frameWidth: 74, frameHeight: 160 });

		// Demon Fireball Effect
		this.load.spritesheet('fireball', 'assets/fire-ball.png',
		{ frameWidth: 19, frameHeight: 16 });

		// Level 02 Bat Demon
		this.load.spritesheet('batDemon', 'assets/Level_02/BatDemon_IdleAttack.png',
		{ frameWidth: 160, frameHeight: 134 });
		this.load.spritesheet('batDemon_attack', 'assets/Level_02/BatDemon_AttackFire.png',
		{ frameWidth: 130, frameHeight: 160 });
		
		// Bat Demon Fire Attack
		this.load.spritesheet('batDemon_fire', 'assets/breath-fire.png',
		{ frameWidth: 160, frameHeight: 96 });

		// Level 03 Hillary Demon
		this.load.spritesheet('hillary', 'assets/HillaryV2.png',
		{ frameWidth: 152, frameHeight: 140 });
		this.load.spritesheet('hillary_tentacles', 'assets/HillaryTentacle.png',
		{ frameWidth: 102, frameHeight: 106 });

		// Environmental Fire Effect
		this.load.spritesheet('fire', 'assets/fire.png',
		{ frameWidth: 64, frameHeight: 128 });

		// ENEMY Loads
		// Hell Hound
		this.load.spritesheet('hound_idle', 'assets/hell-hound-idle.png',
		{ frameWidth: 64, frameHeight: 32 });
		this.load.spritesheet('hound_walk', 'assets/hell-hound-walk.png',
		{ frameWidth: 64, frameHeight: 32 });
		this.load.spritesheet('hound_run', 'assets/hell-hound-run.png',
		{ frameWidth: 67, frameHeight: 32 });
		this.load.spritesheet('hound_jump', 'assets/hell-hound-jump.png',
		{ frameWidth: 65, frameHeight: 48 });
		this.load.audio("bite", "assets/audio/Bite.mp3");

		this.load.image('building01', 'assets/building01.png');
		this.load.image('building02', 'assets/building02.png');
		this.load.image('building03', 'assets/building03.png');
		this.load.image('building04', 'assets/building04.png');
		this.load.image('building05', 'assets/building05.png');
		this.load.image('antenna', 'assets/antenna.png');
		this.load.image('control_box01', 'assets/control-box-1.png');
		this.load.image('control_box02', 'assets/control-box-3.png');
		
		// Load sound effects
		// Shrek Jumps
		this.load.audio("shrek_jump01", "assets/audio/shrek_wall_jump1.wav");
		this.load.audio("shrek_jump02", "assets/audio/shrek_wall_jump2.wav");
		this.load.audio("shrek_jump03", "assets/audio/shrek_wall_jump3.wav");
		this.load.audio("shrek_jump04", "assets/audio/shrek_wall_jump4.wav");

		// Shrek Punches
		this.load.audio("shrek_punch01", "assets/audio/shrek_punch1.wav");
		this.load.audio("shrek_punch02", "assets/audio/shrek_punch2.wav");
		this.load.audio("shrek_punch03", "assets/audio/shrek_punch3.wav");
		this.load.audio("shrek_punch04", "assets/audio/shrek_punch4.wav");
		this.load.audio("shrek_punch05", "assets/audio/shrek_punch6.wav");

		// Shrek Kicks
		this.load.audio("shrek_kick01", "assets/audio/shrek_grunt1.wav");
		this.load.audio("shrek_kick02", "assets/audio/shrek_grunt2.wav");
		this.load.audio("shrek_kick03", "assets/audio/shrek_grunt3.wav");
		this.load.audio("shrek_kick04", "assets/audio/shrek_grunt4.wav");
		this.load.audio("shrek_kick05", "assets/audio/shrek_grunt5.wav");
		this.load.audio("shrek_kick06", "assets/audio/shrek_grunt6.wav");
		this.load.audio("shrek_kick07", "assets/audio/shrek_grunt7.wav");

		// Shrek landing after jump
		this.load.audio("shrek_land01", "assets/audio/shrek_land1.wav");
		this.load.audio("shrek_land02", "assets/audio/shrek_land2.wav");
		this.load.audio("shrek_land03", "assets/audio/shrek_land3.wav");

		// Shrek taking damage
		this.load.audio("shrek_pain01", "assets/audio/shrek_pain1.wav");
		this.load.audio("shrek_pain02", "assets/audio/shrek_pain2.wav");
		this.load.audio("shrek_pain03", "assets/audio/shrek_pain3.wav");
		this.load.audio("shrek_pain04", "assets/audio/shrek_pain4.wav");
		this.load.audio("shrek_pain05", "assets/audio/shrek_pain5.wav");

		// Shrek Power Up scream
		this.load.audio("shrek_powerup", "assets/audio/broly_scream.mp3");

		// Alex Intro
		this.load.audio("alex_intro01", "assets/audio/alex_jones/Intro01_WereDealingWithDemons.mp3");
		this.load.audio("alex_intro02", "assets/audio/alex_jones/Intro02_IntergalacticInvasion.mp3");
		this.load.audio("alex_intro03", "assets/audio/alex_jones/Intro03_TheyreDemons.mp3");

		// Alex Punches
		this.load.audio("alex_punch01", "assets/audio/alex_jones/alex_jones_punch01.mp3");
		this.load.audio("alex_punch02", "assets/audio/alex_jones/alex_jones_punch02.mp3");
		this.load.audio("alex_punch03", "assets/audio/alex_jones/alex_jones_punch03.mp3");
		this.load.audio("alex_punch04", "assets/audio/alex_jones/alex_jones_punch04.mp3");
		this.load.audio("alex_punch05", "assets/audio/alex_jones/alex_jones_punch05.mp3");

		// Alex Insults
		this.load.audio("alex_insult01", "assets/audio/alex_jones/alex_jones_insult01.mp3");
		this.load.audio("alex_insult02", "assets/audio/alex_jones/alex_jones_insult02.mp3");
		this.load.audio("alex_insult03", "assets/audio/alex_jones/alex_jones_insult03.mp3");
		this.load.audio("alex_insult04", "assets/audio/alex_jones/alex_jones_insult04.mp3");
		this.load.audio("alex_insult05", "assets/audio/alex_jones/alex_jones_insult05.mp3");
		this.load.audio("alex_insult06", "assets/audio/alex_jones/alex_jones_insult06.mp3");
		this.load.audio("alex_insult07", "assets/audio/alex_jones/alex_jones_insult07.mp3");
		this.load.audio("alex_insult08", "assets/audio/alex_jones/alex_jones_insult08.mp3");
		this.load.audio("alex_insult09", "assets/audio/alex_jones/alex_jones_insult09.mp3");
		this.load.audio("alex_insult10", "assets/audio/alex_jones/alex_jones_insult10.mp3");
		this.load.audio("alex_insult11", "assets/audio/alex_jones/alex_jones_insult11.mp3");
		this.load.audio("alex_insult12", "assets/audio/alex_jones/alex_jones_insult12.mp3");
		this.load.audio("alex_insult13", "assets/audio/alex_jones/alex_jones_insult13.mp3");
		// Additions
		this.load.audio("alex_insult14", "assets/audio/alex_jones/Insult_BeatYourAss.mp3");
		this.load.audio("alex_insult15", "assets/audio/alex_jones/Insult_SeeYouRealGood.mp3");
		this.load.audio("alex_insult16", "assets/audio/alex_jones/Insult_WannaFight.mp3");
		this.load.audio("alex_insult17", "assets/audio/alex_jones/Insult_TheyHate.mp3");

		// Level 3 Audio
		this.load.audio("alex_Level3_01", "assets/audio/alex_jones/Level3_DangerousWoman.mp3");
		this.load.audio("alex_Level3_02", "assets/audio/alex_jones/Level3_HillaryDemon.mp3");
		this.load.audio("alex_Level3_03", "assets/audio/alex_jones/Level3_SheIsDemon.mp3");
		this.load.audio("alex_Level3_04", "assets/audio/alex_jones/Level3_SheIsPsycho.mp3");
		this.load.audio("alex_Level3_05", "assets/audio/alex_jones/Level3_ShesADemon.mp3");
		this.load.audio("alex_Level3_06", "assets/audio/alex_jones/Level3_ThatsADemon.mp3");

		// Alex Pain
		this.load.audio("alex_pain01", "assets/audio/alex_jones/alex_jones_pain01.mp3");
		this.load.audio("alex_pain02", "assets/audio/alex_jones/alex_jones_pain02.mp3");

		// Alex Pickup
		this.load.audio("alex_pickup01", "assets/audio/alex_jones/alex_jones_pickup01.mp3");

		// Alex Powerup
		this.load.audio("alex_powerup01", "assets/audio/alex_jones/alex_jones_powerup01.mp3");

		// Alex Win or Die
		this.load.audio("alex_WinOrDie", "assets/audio/alex_jones/alex_jones_WinOrDie.mp3");
    }

    create() {
        // X, Y axis
        this.add.text(20,20, "Loading game...");
		// Switching scenes
		/*
		this.scene.start("play_Level01");
		*/
		this.scene.start("play_Level01");

        // ---------- ANIMATIONS -----------
        // Animation Manager is a global system. Animations created within it are globally available to all Game Objects. They share the base -->
		// animation data while managing their own timelines. This allows you to define a single animation once and apply it to as many Game --> 
		// Objects as you require. -->
		// Start and end cover the frames for each animation on the sprite sheet. -->
		this.anims.create({
			key: 'walk_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 16, end: 22 }),
			frameRate: 10,
			//Tells the animation to loop.
			repeat: 0
		});

		this.anims.create({
			key: 'idle_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 0, end: 4 }),
            frameRate: 4,
            //Tells the animation to loop.
			repeat: -1
        });
        
        this.anims.create({
			key: 'jump_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 5, end: 6 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'kick_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 36, end: 37 }),
			frameRate: 10,
			repeat: 0
        });

        this.anims.create({
			key: 'punch_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 48, end: 51 }),
			frameRate: 10,
			repeat: 0
        });
        
        this.anims.create({
			key: 'powerup_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 80, end: 95 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'tackle_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 102, end: 110 }),
			frameRate: 5,
			repeat: 0
		});

		this.anims.create({
			key: 'take_damage_shrek',
			frames: this.anims.generateFrameNumbers('shrek', { start: 112, end: 126 }),
			frameRate: 10,
			repeat: 0
		});

		// Pepe
		this.anims.create({
			key: 'walk_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 16, end: 22 }),
			frameRate: 10,
			//Tells the animation to loop.
			repeat: 0
		});

		this.anims.create({
			key: 'idle_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 0, end: 4 }),
            frameRate: 4,
            //Tells the animation to loop.
			repeat: -1
        });
        
        this.anims.create({
			key: 'jump_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 5, end: 6 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'kick_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 36, end: 37 }),
			frameRate: 10,
			repeat: 0
        });

        this.anims.create({
			key: 'punch_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 48, end: 51 }),
			frameRate: 10,
			repeat: 0
        });
        
        this.anims.create({
			key: 'powerup_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 80, end: 95 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'tackle_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 102, end: 110 }),
			frameRate: 5,
			repeat: 0
		});

		this.anims.create({
			key: 'take_damage_pepe',
			frames: this.anims.generateFrameNumbers('pepe', { start: 112, end: 126 }),
			frameRate: 10,
			repeat: 0
		});

		// Blood Splatter Animation
		this.anims.create({
			key: "blood_anim",
			frames: this.anims.generateFrameNumbers("blood_effect"),
			frameRate: 30,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
		});

		// Blood Explosion Animation
		this.anims.create({
			key: "blood_explode_anim",
			frames: this.anims.generateFrameNumbers("blood_explode", { start: 0, end: 7 }),
			frameRate: 30,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
		});

		// Explosion Animation
		this.anims.create({
			key: "explosion_anim",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 30,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
			hideOnComplete: true
		});

		// Looping Energy Blast
		this.anims.create({
			key: "energy_attack",
			frames: this.anims.generateFrameNumbers('energy_blast', { start: 10, end: 13 }),
			frameRate: 8,
			// repeat 0 --> Run through one time then hide 
			repeat: -1,
		});

		// -----------------------------------
		// Looping Demon Boss Idle
		this.anims.create({
			key: "demon_idle",
			frames: this.anims.generateFrameNumbers('demon_boss_idle'),
			frameRate: 6,
			// repeat 0 --> Run through one time then hide 
			repeat: -1,
		});

		// Demon Boss Eruption
		this.anims.create({
			key: "demon_prep",
			frames: this.anims.generateFrameNumbers('demon_boss_burn', { start: 0, end: 3 }),
			frameRate: 4,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
		});

		// Demon Boss Eruption
		this.anims.create({
			key: "demon_eruption",
			frames: this.anims.generateFrameNumbers('demon_boss_burn', { start: 4, end: 5 }),
			frameRate: 6,
			// repeat 0 --> Run through one time then hide 
			repeat: -1,
		});

		// Demon Boss Fireball Attack
		this.anims.create({
			key: "demon_fireball",
			frames: this.anims.generateFrameNumbers('demon_boss_breath'),
			frameRate: 6,
			// repeat 0 --> Run through one time then hide 
			repeat: 0,
		});

		// Looping Fire Blast
		this.anims.create({
			key: "fire_attack",
			frames: this.anims.generateFrameNumbers('fireball'),
			frameRate: 6,
			// repeat 0 --> Run through one time then hide 
			repeat: -1,
		});

		// -----------------------------------
		// Bat Demon Boss Idle
		this.anims.create({
			key: "batDemon_Idle",
			frames: this.anims.generateFrameNumbers('batDemon', { start: 0, end: 5 }),
			frameRate: 12,
			// Loop
			repeat: -1,
		});

		// Bat Demon Boss Attack Prep
		this.anims.create({
			key: "batDemon_Prep",
			frames: this.anims.generateFrameNumbers('batDemon', { start: 6, end: 11 }),
			frameRate: 6,
			// One time
			repeat: 0,
		});

		// Bat Demon Boss Attack 
		this.anims.create({
			key: "batDemon_FireAttack",
			frames: this.anims.generateFrameNumbers('batDemon_attack'),
			frameRate: 6,
			// Loop
			repeat: -1,
		});

		// Bat Demon Boss Fire
		this.anims.create({
			key: "batDemon_Flames",
			frames: this.anims.generateFrameNumbers('batDemon_fire'),
			frameRate: 10,
			// Loop
			repeat: 0,
		});

		// -----------------------------------
		// Hillary Demon Boss Idle
		this.anims.create({
			key: "hillary_Idle",
			frames: this.anims.generateFrameNumbers('hillary', { start: 0, end: 2 }),
			frameRate: 1,
			// Loop
			repeat: -1,
		});

		// Hillary Demon Boss Bite
		this.anims.create({
			key: "hillary_Bite",
			frames: this.anims.generateFrameNumbers('hillary', { start: 3, end: 5 }),
			frameRate: 3,
			// Loop
			repeat: -1,
		});

		// Hillary Demon Boss Powerup
		this.anims.create({
			key: "hillary_Powerup",
			frames: this.anims.generateFrameNumbers('hillary', { start: 6, end: 10 }),
			frameRate: 5,
			// One Time
			repeat: 0,
		});

		// Hillary Demon Boss Range Attack
		this.anims.create({
			key: "hillary_RangeAttack",
			frames: this.anims.generateFrameNumbers('hillary', { start: 10, end: 11 }),
			frameRate: 2,
			// One Time
			repeat: 0,
		});

		// Hillary Tentacle Idle
		this.anims.create({
			key: "tentacle_Idle",
			frames: this.anims.generateFrameNumbers('hillary_tentacles', { start: 0, end: 2 }),
			frameRate: 3,
			// Loop
			repeat: -1,
		});

		// Hillary Tentacle Attack
		this.anims.create({
			key: "tentacle_Attack",
			frames: this.anims.generateFrameNumbers('hillary_tentacles', { start: 0, end: 12 }),
			frameRate: 7,
			// Loop
			repeat: -1,
		});

		// -----------------------------------

		// Looping Environmental Fire
		this.anims.create({
			key: "fire_anim",
			frames: this.anims.generateFrameNumbers('fire'),
			frameRate: 30,
			// repeat 0 --> Run through one time then hide 
			repeat: -1,
		});
		
		// ---------------------------------------------------------
		// Alex Jones Animations
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('alex', { start: 0, end: 7 }),
            frameRate: 5,
            //Tells the animation to loop.
			repeat: -1
        });
		
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('alex', { start: 12, end: 23 }),
			frameRate: 20,
			//Tells the animation to loop.
			repeat: 0
		});

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('alex', { start: 24, end: 29 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'punch_01',
			frames: this.anims.generateFrameNumbers('alex', { start: 36, end: 41 }),
			frameRate: 20,
			repeat: 0
		});
		
		this.anims.create({
			key: 'punch_02',
			frames: this.anims.generateFrameNumbers('alex', { start: 48, end: 53 }),
			frameRate: 20,
			repeat: 0
		});
		
		this.anims.create({
			key: 'punch_03',
			frames: this.anims.generateFrameNumbers('alex', { start: 60, end: 67 }),
			frameRate: 20,
			repeat: 0
        });
		
		this.anims.create({
			key: 'kick',
			frames: this.anims.generateFrameNumbers('alex', { start: 72, end: 78 }),
			frameRate: 20,
			repeat: 0
		});
		
        this.anims.create({
			key: 'jump_up',
			frames: this.anims.generateFrameNumbers('alex', { start: 84, end: 89 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'air_up',
			frames: this.anims.generateFrameNumbers('alex', { start: 86, end: 89 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'jump_fall',
			frames: this.anims.generateFrameNumbers('alex', { start: 90, end: 92 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'land',
			frames: this.anims.generateFrameNumbers('alex', { start: 93, end: 94 }),
			frameRate: 4,
			repeat: 0
		});

		this.anims.create({
			key: 'air_punch',
			frames: this.anims.generateFrameNumbers('alex', { start: 96, end: 101 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'air_kick',
			frames: this.anims.generateFrameNumbers('alex', { start: 108, end: 114 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'air_thrust',
			frames: this.anims.generateFrameNumbers('alex', { start: 108, end: 112 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'energy_blast',
			frames: this.anims.generateFrameNumbers('alex', { start: 120, end: 123 }),
			frameRate: 10,
			repeat: 0
		});
        
        this.anims.create({
			key: 'victory',
			frames: this.anims.generateFrameNumbers('alex', { start: 124, end: 127 }),
			frameRate: 10,
			repeat: 0
		});

		// Alex Powerup
		this.anims.create({
			key: 'powerup_phase01',
			frames: this.anims.generateFrameNumbers('alex_powerup', { start: 0, end: 4 }),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: 'powerup_phase02',
			frames: this.anims.generateFrameNumbers('alex_powerup', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});

		// -----------------------
		// Hell Hound
		this.anims.create({
			key: 'hound_idle_anim',
			frames: this.anims.generateFrameNumbers('hound_idle', { start: 0, end: 5 }),
            frameRate: 5,
            //Tells the animation to loop.
			repeat: -1
		});
		
		this.anims.create({
			key: 'hound_walk_anim',
			frames: this.anims.generateFrameNumbers('hound_walk', { start: 0, end: 11 }),
            frameRate: 5,
            //Tells the animation to loop.
			repeat: -1
		});
		
		this.anims.create({
			key: 'hound_run_anim',
			frames: this.anims.generateFrameNumbers('hound_run', { start: 0, end: 4 }),
            frameRate: 10,
            //Tells the animation to loop.
			repeat: -1
		});
		
		this.anims.create({
			key: 'hound_jump_anim',
			frames: this.anims.generateFrameNumbers('hound_jump', { start: 0, end: 5 }),
            frameRate: 5,
			repeat: 0
        });
    }
}