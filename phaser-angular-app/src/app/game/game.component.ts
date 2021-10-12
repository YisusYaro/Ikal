import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { Scene } from './scene';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  phaserGame?: Phaser.Game;
  config?: Phaser.Types.Core.GameConfig;
  gameContainer: any;

  public innerWidth: any;
  public innerHeight: any;


  constructor() {




  }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;


    this.config = {
      width: this.innerWidth,
      height: this.innerHeight,
      scene: [Scene],
      parent: 'game-container',
      pixelArt: true,
    };

    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
    }
  }

}
