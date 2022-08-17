import { Physics, Scene } from "phaser";

export default class Spike extends Physics.Arcade.Image {

  constructor(scene: Scene, top: boolean = false) {
    super(scene, 0, 0, 'spike');

    this.setX(this.width / 2);
    this.setY(!top ? this.scene.renderer.height - this.height / 2 : this.height / 2);

    if (top)
      this.rotation = Math.PI;
  }

  create(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
  }

}