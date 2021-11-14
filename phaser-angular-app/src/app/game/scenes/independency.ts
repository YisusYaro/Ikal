import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';

@Injectable()

export class Independency extends Phaser.Scene {

  background?: GameObjects.Image;

  music?: Phaser.Sound.BaseSound;
  independency?: Phaser.Sound.BaseSound;
  paco?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  numberLifes: number;
  numberBells: number;
  myCursor?: Phaser.Types.Input.Keyboard.CursorKeys;
  platforms?: Phaser.Physics.Arcade.StaticGroup;
  axes: Map<string, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>;
  bells: Map<string, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>;


  lifesText?: GameObjects.BitmapText;
  bellsText?: GameObjects.BitmapText;

  principalText?: GameObjects.BitmapText;

  isPlaying: Boolean;



  constructor() {
    super({ key: "Independency" });
    this.axes = new Map();
    this.bells = new Map();
    this.numberLifes = 5;
    this.numberBells = 0;
    this.isPlaying = true;
  }

  init() {
    this.axes = new Map();
    this.bells = new Map();
    this.numberLifes = 5;
    this.numberBells = 0;
    this.isPlaying = true;
  }

  preload() {
    this.load.path = "../../assets/";
    this.load.audio('music', 'audio/jarabe-tapatio.mp3');
    this.load.audio('independency', 'audio/independency.mp3');
    this.load.image('night-sky', 'phaser_images/night-sky.png');

    this.load.image('ground', 'phaser_images/ground.png');

    //paco
    this.load.atlas('paco_side', 'sprites/paco_side/paco_side.png',
      'sprites/paco_side/paco_side_atlas.json');
    this.load.animation('paco_side_anim', 'sprites/paco_side/paco_side_anim.json');

    //axe
    this.load.atlas('axe', 'sprites/axe/axe.png',
      'sprites/axe/axe_atlas.json');

    //axe
    this.load.atlas('bell', 'sprites/bell/bell.png',
      'sprites/bell/bell_atlas.json');

    this.load.image('retro', 'fonts/retro.png');
    this.load.json('retro_json', 'fonts/retro.json');

  }

  listenCursor(character: any, characterCursor: any) {
    if (characterCursor.left.isDown) {
      character.setVelocityX(-200);
      character.flipX = false;
      this.paco!.play('paco_side_anim', true);
    }
    else if (characterCursor.right.isDown) {
      character.setVelocityX(200);
      character.flipX = true;
      this.paco!.play('paco_side_anim', true);
    }
    else {
      character.setVelocityX(0);
      this.paco!.play('paco_side_anim', false);
    }

    if (characterCursor.up.isDown && character.body.touching.down) {
      character.setVelocityY(-400);
    }


  }

  setKeyboard() {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.myCursor = this.input.keyboard.createCursorKeys();

  }


  create() {

    //keyboard
    this.setKeyboard();

    //background
    this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'night-sky').setScale(0.7);

    const musicVolume = 0.09;
    this.music = this.sound.add('music', { volume: musicVolume, loop: true });

    const independencyVolume = 0.5;
    this.independency = this.sound.add('independency', { volume: independencyVolume, loop: false });

    this.music.play();

    // this.axe.setCollideWorldBounds(true);
    // this.axe.setBounce(0.2);


    this.paco = this.physics.add.sprite(this.scale.width / 2, 200, 'paco_side');
    this.paco.setScale(6);
    this.paco.setCollideWorldBounds(true);
    this.paco.setGravityY(800);
    this.paco.setBounce(0.2);

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(360, 360, 'ground').setScale(2).refreshBody();



    //collider
    this.physics.add.collider(this.paco, this.platforms);


    this.createAxes();
    this.createBells();

    //text
    let fontConfig = this.cache.json.get('retro_json');
    this.cache.bitmapFont.add('retro', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
    this.lifesText = this.add.bitmapText(20, 335, 'retro', 'Vidas 5').setScale(0.2);

    this.cache.bitmapFont.add('retro', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
    this.bellsText = this.add.bitmapText(420, 335, 'retro', 'Campanas 0').setScale(0.2);

    this.cache.bitmapFont.add('retro', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
    this.principalText = this.add.bitmapText(160, 6, 'retro', 'Recoge 5 campanas para ganar').setScale(0.1);

  }

  async followPaco(axe: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    while (axe) {
      await this.sleep(20);
      if (this.paco!.x < axe.x)
        axe.x -= 3;
      else
        axe.x += 3;
    }
  }


  removePhysicsSpriteFromItsMap(key: string, map: Map<string, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>) {
    map.get(key)!.destroy();
    map.delete(key);
  }

  handleAxeCollision(key: string) {
    this.numberLifes--;

    this.lifesText!.text = `Vidas ${this.numberLifes}`;

    if (this.numberLifes == 0) {
      this.isPlaying = false;
      this.music!.stop();
      alert('Perdiste :(');
      this.scene.start('Title');
    }

  }

  handleBellCollision(key: string) {
    this.numberBells++;

    this.bellsText!.text = `Campanas ${this.numberBells}`;

    if (this.numberBells == 5) {
      this.isPlaying = false;
      this.music!.stop();
      this.independency!.play();
      alert('Ganaste :)');
      this.scene.start('Title');
    }
  }

  getRandomValidXPosition(): number {
    return Math.floor(Math.random() * (this.scale.width - 0 + 1) + 0)
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  async createAxes() {

    while (true && this.isPlaying) {
      await this.sleep(this.randomIntFromInterval(500, 2000));
      if (this.axes && this.isPlaying) {
        const keyAxe = `axe${this.randomIntFromInterval(0, 1000)}`;
        this.axes.set(keyAxe, (this.physics.add.sprite(this.getRandomValidXPosition(), 20, 'axe')));
        this.axes.get(keyAxe)!.setScale(4);
        this.axes.get(keyAxe)!.setGravityY(0);
        this.axes.get(keyAxe)!.setBounce(0.2);
        this.tweens.add({
          targets: [this.axes.get(keyAxe)!],
          duration: 2000,
          repeat: -1,
          angle: -360,
        });
        this.followPaco(this.axes.get(keyAxe)!);
        this.physics.add.collider(this.axes.get(keyAxe)!, this.platforms!, () => { this.removePhysicsSpriteFromItsMap(keyAxe, this.axes); });
        this.physics.add.collider(this.axes.get(keyAxe)!, this.paco!, () => { this.handleAxeCollision(keyAxe); this.removePhysicsSpriteFromItsMap(keyAxe, this.axes); });
      }
    }

  }

  async getAwayFromPaco(bell: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    while (bell) {
      await this.sleep(20);
      if (this.paco!.x > bell.x)
        bell.x -= 1;
      else
        bell.x += 1;
    }
  }


  async createBells() {

    while (true && this.isPlaying) {
      await this.sleep(this.randomIntFromInterval(500, 2000));
      if (this.bells && this.isPlaying) {
        const keyBell = `bell${this.randomIntFromInterval(0, 1000)}`;
        this.bells.set(keyBell, (this.physics.add.sprite(this.getRandomValidXPosition(), 20, 'bell')));
        this.bells.get(keyBell)!.setScale(0.3);
        this.bells.get(keyBell)!.setGravityY(0);
        this.bells.get(keyBell)!.setBounce(0.2);
        this.bells.get(keyBell)!.setCollideWorldBounds(true);
        this.tweens.add({
          targets: [this.bells.get(keyBell)!],
          duration: 2000,
          repeat: -1,
          angle: 360,
        });
        this.getAwayFromPaco(this.bells.get(keyBell)!);
        this.physics.add.collider(this.bells.get(keyBell)!, this.platforms!, () => { this.removePhysicsSpriteFromItsMap(keyBell, this.bells); });
        this.physics.add.collider(this.bells.get(keyBell)!, this.paco!, () => { this.handleBellCollision(keyBell); this.removePhysicsSpriteFromItsMap(keyBell, this.bells); });
      }
    }

  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  update(time: number, delta: number) {

    if (this.paco) {
      this.listenCursor(this.paco, this.myCursor);
    }

  }


}