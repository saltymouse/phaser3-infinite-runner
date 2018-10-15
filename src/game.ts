/// <reference path="./phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/bootScene";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";
import { GameOverScene } from "./scenes/gameOver";

const config: GameConfig = {
  title: "Ran Run Mitainya",
  url: "https://www.himeji-mitai.com/game",
  version: "1.0",
  width: 600,
  height: 600,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game", // <div id="game"></div>
  scene: [BootScene, MainMenuScene, GameScene, GameOverScene], // load scenes in this order
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  physics: {
    default: "arcade", // standard & performant rectangle-based collision system
    arcade: {
      gravity: { y: 300 }, // global gravity
      debug: true // show collision outlines or not
    }
  },
  backgroundColor: "#98d687",
  pixelArt: true,
  antialias: false
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// initialize our phaser game after DOM is ready
window.onload = () => {
  var game = new Game(config);
};
