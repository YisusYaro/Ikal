import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';

@Injectable()

export class Title extends Phaser.Scene {

  
  background?: GameObjects.Image;
  mexicoFlag?: GameObjects.Image;
  clickText?: GameObjects.BitmapText;
  titleText?: GameObjects.BitmapText;

  isFirstClick: boolean;



  constructor() {
    super({ key: "Title" });
    this.isFirstClick = true;
  }

  init(): void {
    this.isFirstClick = true;
  }

  preload() {
    this.load.path = "../../assets/";
    this.load.image('retro', 'fonts/retro.png');
    this.load.json('retro_json', 'fonts/retro.json');
    this.load.image('background', 'phaser_images/background.png');
    this.load.image('mexico-flag', 'phaser_images/mexico-flag.png');
  }

  create() {

    //background
    this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background').setScale(1);

    //mexico-flag
    this.mexicoFlag = this.add.image(this.scale.width / 2, this.scale.height / 2, 'mexico-flag').setScale(0.2);

    //text
    let fontConfig = this.cache.json.get('retro_json');
    this.cache.bitmapFont.add('retro', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
    this.titleText = this.add.bitmapText(200, 40, 'retro', 'IKAL').setTint(0x000000).setScale(0.7);

    this.cache.bitmapFont.add('retro', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
    this.clickText = this.add.bitmapText(100, 270, 'retro', 'Haz clic para iniciar...').setTint(0x000000).setScale(0.2);

    this.tweens.add({
      targets: [this.clickText],
      alpha: 0,
      duration: 300,
      repeat: -1,
      yoyo: true,
      repeatDelay: 300
    });

    const events = Phaser.Input.Events;

    this.input.on(events.POINTER_DOWN, () => {
      if (this.isFirstClick) {
        this.isFirstClick = false;
        this.scene.start('Independency');
      }
    });
  }

  update(time: number, delta: number) {

    

    


  }


}