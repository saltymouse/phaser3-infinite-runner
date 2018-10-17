/**
 * Initialize the whole game by preparing the preloader
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  // Comment toggle this init() on/off for debugging
  init(): void { console.log(this.scene.key) }

  preload(): void {
    // load all files necessary for the loading screen

    // load our json asset pack(age)
    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#pack
    this.load.json("assets", "./src/assets/pack.json");
    this.load.image('logo', './src/assets/sprites/Enemies/flyMan_fly.png');
  }

  create(): void {
    // now that we've got our json file loaded, we can continue on to the next
    // scene to actually load the files specified within above json file!!! (?)
    this.scene.start('PreloadScene')
  }
}
