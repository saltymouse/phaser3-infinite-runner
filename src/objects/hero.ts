/**
 * Player 1
 */

export class Hero extends Phaser.GameObjects.Sprite {
  // Accessible only within the Hero class
  private jumpKey: Phaser.Input.Keyboard.Key;
  private finger: Phaser.Input.Pointer;
  private isDead: boolean = false;
  private jumpPower: number = 2;

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead): void {
    this.isDead = dead;
  }

  // 'constructor' sets your 'this' scope for the class
  constructor(phaserSprite) {
    // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html
    super(phaserSprite.scene, phaserSprite.x, phaserSprite.y, phaserSprite.key, phaserSprite.frame);

    // image
    this.setScale(1);
    this.setOrigin(0, 0);

    // physics
    phaserSprite.scene.physics.world.enable(this);
    this.body.setGravityY(500);
    this.body.setSize(65, 70); // hit-box size (different from visual image size)

    // input
    this.jumpKey = phaserSprite.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    phaserSprite.scene.add.existing(this);

    this.finger = phaserSprite.scene.input.manager.activePointer;
  } // constructor

  update(): void {
    this.handleInput();
    this.isOffTheScreen();

  }

  private handleInput(): void {
    if (this.body.touching.down) {
      this.jumpPower = 3;
      console.log('jumpPower:', this.jumpPower)
    }

    if (
      (this.jumpKey.isDown && this.jumpPower > 0) ||
      (this.finger.isDown && this.jumpPower > 0)
      ) {
      this.jump();
    }
  }

  public jump(): void {
    this.jumpPower -= 1;
    this.body.setVelocityY(-350);
    console.log(this.jumpPower);
  }

  private isOffTheScreen(): void {
    if (this.y + this.height > this.scene.sys.canvas.height || this.y + this.height < 0) {
      this.isDead = true;
    }
  }
}
