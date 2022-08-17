import { Math, Physics, Scene, Tweens } from "phaser";

export default class Paddle extends Physics.Arcade.Image {

  currentTween?: Tweens.Tween;

  constructor(scene: Scene, right: boolean = false) {
    super(scene, 0, scene.game.canvas.height + 100, 'paddle');

    if (right)
      this.setRotation(Math.PI2 / 2);

    const x = right ? this.scene.renderer.width - this.width - 2 : this.width + 1;
    this.setX(x);
    this.setY(this.scene.renderer.height + this.height);
  }

  create(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.immovable = true;
  }

  moveToRandomPoint(): void {
    const screenHalfHeight = this.scene.renderer.height / 2;
    const halfHeight = this.height / 2;
    const target = Math.RND.realInRange(screenHalfHeight - halfHeight, screenHalfHeight + halfHeight);

    this.currentTween = this.scene.tweens.add({
      targets: this,
      y: target,
      paused: false,
      yoyo: false,
      duration: 250,
      onComplete: () => this.currentTween = undefined
    });
  }

  reset(): void {
    if (this.currentTween?.isPlaying()) {
      this.currentTween.stop();
      this.currentTween = undefined;
    }

    this.setY(this.scene.renderer.height + this.height);
  }
}