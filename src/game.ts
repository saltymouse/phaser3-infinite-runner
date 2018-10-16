/// <reference path="./phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/bootScene";
import { PreloadScene } from "./scenes/preloadScene";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";
import { GameOverScene } from "./scenes/gameOverScene";

// initialize our game according to Phaser's 'GameConfig' object model
// (this GameConfig object was aquired when we imported 'phaser' above)
// https://photonstorm.github.io/phaser3-docs/Phaser.Boot.Config.html
// https://jwiese.eu/en/blog/2017/08/phaser-3---game-configuration/
const config: GameConfig = {
  title: "Infinite Runner",
  url: "https://github.com/saltymouse/phaser3-infinite-runner",
  version: "1.0.0",
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

// create a 'Game' class based on Phaser.Game
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// initialize our phaser game as 'game' after DOM is ready
window.onload = () => {
  var game = new Game(config);
};
