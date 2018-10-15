/**
 * Title menu before game starts
 */

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() { // set the 'key' for Phaser to refer to this scene
    super({ key: "MainMenuScene" });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );

    this.startKey.isDown = false;
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 180,
        this.sys.canvas.height / 2 - 80,
        "pixelFont",
        "RUNNER",
        40
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 140,
        this.sys.canvas.height / 2 - 10,
        "pixelFont",
        "PRESS S TO PLAY",
        30
      )
    );
  }

  update(): void {
    if (this.startKey.isDown || this.input.activePointer.isDown) {
      this.scene.start("GameScene");
    }
  }
}
