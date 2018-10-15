/**
 * Ground tiles
 */

export class Ground extends Phaser.GameObjects.Sprite {
  constructor(phaserSprite) {
    super(phaserSprite.scene, phaserSprite.x, phaserSprite.y, phaserSprite.key, phaserSprite.frame);

    // image
    this.setScale(1); // scale sprite relative to original size
    this.setOrigin(0, 0); // where the center of the sprite is

    // physics
    phaserSprite.scene.physics.world.enable(this); // add Ground to current scene's physics inventory
    this.body.allowGravity = false; // object won't fall due to gravity
    this.body.setVelocityX(-300); // set the speed (emulate player running over it)
    this.body.setSize(201, 100); // size of the image imported

    phaserSprite.scene.add.existing(this);
  }
}
