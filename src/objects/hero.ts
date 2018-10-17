/**
 * Our jumping hero
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

  public setDead(dead: boolean): void {
    this.isDead = dead;
  }

  // 'constructor' sets your 'this' scope for the class
  constructor({scene, x, y, key}) {
    // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html
    super(scene, x, y, key);

    // image
    this.setScale(1);
    this.setOrigin(0, 0);

    // animations?
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNames('hero',
      {
        prefix: 'bunny1_walk',
        start: 1,
        end: 2,
        zeroPad: 0
      }),
      frameRate: 10,
      repeat: -1
    });

    // physics
    this.scene.physics.world.enable(this); // add our hero to the physics collision
    this.body.setGravityY(500); // gravity specific for our hero character
    this.body.setSize(33, 53); // hit-box size (different from visual image size)

    // input
    this.jumpKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.scene.add.existing(this);

    this.finger = this.scene.input.manager.activePointer;
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
    this.play('walk');
  }

  private isOffTheScreen(): void {
    if (this.y + this.height > this.scene.sys.canvas.height || this.y + this.height < 0) {
      this.isDead = true;
    }
  }
}
