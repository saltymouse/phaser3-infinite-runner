/**
 * Obstacle you must jump over
 */

export class Obstacle extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(0.5);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-200);
    this.body.setSize(70, 70);

    params.scene.add.existing(this);
  }
}
