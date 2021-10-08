import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';

@Injectable()

export class Scene extends Phaser.Scene {

  bg?: GameObjects.Image;
  myCharacter?: GameObjects.Image;
  myCursor?: Phaser.Types.Input.Keyboard.CursorKeys;
  myCombo?: Phaser.Input.Keyboard.KeyCombo;
  character: string;



  constructor() {
    super({ key: "Bootloader" });
    this.character = "demon";
  }

  ngOnInit(): void {
  }

  preload() {
    this.load.path = "../../assets/";
    this.load.image('bg', 'bg.png');
    this.load.image('demon', 'demon.png');
    this.load.image('knight', 'knight.png');
  }

  getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  listenCursor(character: any, characterCursor: any) {
    if (characterCursor.left.isDown) {
      character.x--;
      character.flipX = true;
    }
    if (characterCursor.right.isDown) {
      character.x++;
      character.flipX = false;
    }
    if (characterCursor.up.isDown) {
      character.y--;
    }
    if (characterCursor.down.isDown) {
      character.y++;
    }
  }

  setKeyboard() {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.myCursor = this.input.keyboard.createCursorKeys();

    this.myCombo = this.input.keyboard.createCombo(
      [keyCodes.B, keyCodes.N, keyCodes.M],
      { resetOnMatch: true }
    );

    this.input.keyboard.on('keycombomatch', (keyCombo: Phaser.Input.Keyboard.KeyCombo) => {

      //event for demonCombo
      if (this.arraysAreIdentical([keyCodes.B, keyCodes.N, keyCodes.M], keyCombo.keyCodes)) {
        this.setTintCharacter(this.myCharacter!);
      }

    });
  }

  async setTintCharacter(character: GameObjects.Image) {
    character.setTint(0xff0000);
    await this.sleep(200);
    character.setTint(0xffffff);
    await this.sleep(200);
    character.setTint(0xff0000);
    await this.sleep(100);
    character.setTint(0xffffff);
    await this.sleep(100);
    character.setTint(0xff0000);
    await this.sleep(50);
    character.setTint(0xffffff);
    await this.sleep(50);
    character.setTint(0xff0000);
    await this.sleep(10);
    character.setTint(0xffffff);
    await this.sleep(10);
    character.setTint(0xff0000);
    await this.sleep(10);
    character.setTint(0xffffff);
    await this.sleep(10);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  arraysAreIdentical(arr1: number[], arr2: number[]) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  create() {

    //keyboard
    this.setKeyboard();
    //bg

    this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg');
    //characters
    if (this.character! == 'demon') {
      this.myCharacter = this.add.image(100, 250, 'demon');
      this.myCharacter.scale = 2;
    }
    if (this.character! == 'knight') {
      this.myCharacter = this.add.image(200, 250, 'knight');
      this.myCharacter.scale = 2;
    }
  }

  update(time: number, delta: number) {
    this.listenCursor(this.myCharacter, this.myCursor);

  }


}