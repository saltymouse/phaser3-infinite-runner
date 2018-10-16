/**
 * Initialize the whole game by preparing the preloader
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  // Comment toggle init() on/off for debugging
  init(): void { console.log(this.scene.key) }

  preload(): void {
    // load all files necessary for the loading screen

    // load out our json asset package
    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#pack
    this.load.pack(
      "preload",
      "./src/assets/pack.json",
      "preload"
    );
    this.load.image('logo', './src/assets/sprites/Enemies/flyMan_fly.png');
  }

  create(): void {
    // now that we've got our json file preloaded, we can continue on to the next
    // scene to actually load the files specified within above json file!!! (?)
    this.scene.start('PreloadScene')
  }
}
