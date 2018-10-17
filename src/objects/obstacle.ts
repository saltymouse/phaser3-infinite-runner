/**
 * Obstacle to jump over (or die!)
 */
export class Obstacle extends Phaser.GameObjects.Sprite {
  constructor({scene, x, y, key, frame}) {
    super(scene, x, y, key, frame);

    // animations
    this.scene.anims.create({
      key: 'spin',
      frames: this.scene.anims.generateFrameNames('obstacle', {
        prefix: 'spikeBall',
        start: 1,
        end: 2,
        zeroPad: 0
      }),
      frameRate: 5,
      repeat: -1 // forever!
    });

    // image
    this.setScale(0.5);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-200);
    this.body.setSize(this.width, this.height);

    this.scene.add.existing(this);
  }
}
