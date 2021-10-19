import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { Title } from './scenes/title';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Independency } from './scenes/independency';

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

    this.config = {
      scene: [Title, Independency],
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false 
        }
      },
      scale: {
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 360
      }
    };

    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
    }
  }

}
