/**
 * Game over, dude
 */
export class GameOverScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({ key: "GameOverScene" });
  }

  init(): void {
    // input tracking is handled by the Scene
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
        "TRY AGAIN?",
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
    if (this.startKey.isDown) {
      this.scene.start("GamePlayScene");
    }
  }
}
