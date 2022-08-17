import { Physics, Scene } from "phaser";

export default class Bounce extends Physics.Arcade.Sprite {

  constructor(scene: Scene, x: number) {
    super(scene, x, scene.renderer.height / 2, 'bounce');
  }

  create(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    this.anims.create({
      key: 'flash',
      frames: this.anims.generateFrameNumbers('bounce', { frames: [1, 0] }),
      frameRate: 8,
      repeat: 0,
      yoyo: false
    });
  }

  flash(): void {
    this.play('flash');
  }

}