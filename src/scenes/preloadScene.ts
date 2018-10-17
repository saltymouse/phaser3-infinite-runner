/**
 * The preload screen to display while assets load
 */

export class PreloadScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: "PreloadScene" });
  }

  // Comment toggle init() on/off for debugging
  init(): void { console.log(this.scene.key);
    this.load.image('logo', './src/assets/sprites/Enemies/cloud.png'); }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x000000);

    // load the logo image immediately (before the asset preloader begins)
    this.add.image(this.centerX(), this.centerY(), 'logo');

    // initialize our progress bar
    this.createProgressbar();

    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#pack
    this.load.pack({
      key: 'preloadPack',                   // give this pack a name to reference
      url: './src/assets/pack.json',        // target json file path to load
      dataKey: 'preloadAssets'              // section name within the json file to load
    });
    console.log(this.cache)

    // Let's see what's being loaded...
    this.load.on('fileprogress', function (file) {
      console.log('preload,', file.src);
    });

    // pass value to change the loading bar fill
    this.load.on("progress",
      function(value) {
        console.log(value * 100)
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      }, this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      "complete",
      function() {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );
  } // preload()

  // if we've reached the 'update' function, that means the 'preload' is over so we can go to the next scene!
  update(): void {
    this.scene.start('MainMenuScene');
  }

  private createProgressbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  } // createProgressbar()

  centerX (): number {
    return Number(this.sys.game.config.width) / 2;
  }

  centerY (): number {
    return Number(this.sys.game.config.height) / 2;
  }
}
