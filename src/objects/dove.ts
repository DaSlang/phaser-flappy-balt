import { Input, Physics, Scene } from "phaser";

export default class Dove extends Physics.Arcade.Sprite {

  static readonly POINT_SCORED: string = 'POINT_SCORED';

  constructor(scene: Scene) {
    super(scene, 0, 0, 'dove', 2);
  }

  create(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBounceX(1);

    this.setX(this.scene.renderer.width / 2);
    this.setY(this.scene.renderer.height / 2);

    this.anims.create({
      key: 'flap',
      frames: 'dove',
      frameRate: 8,
    });

    this.scene.input.keyboard
      .addKey('space', false, false)
      .addListener(Input.Keyboard.Events.DOWN, this.onFlap, this);
    this.scene.input.
      addListener(Input.Events.POINTER_DOWN, this.onFlap, this);
  }

  reset(): void {
    this.setX(this.scene.renderer.width / 2);
    this.setY(this.scene.renderer.height / 2);

    this.anims.setCurrentFrame(this.anims.get('flap').frames[2]);
    this.setFlipX(false);

    this.setGravityY(0);
    this.setVelocity(0, 0);
  }

  private onFlap(): void {
    if (this.body.gravity.y === 0)
      this.setGravityY(300);

    if (this.body.velocity.x === 0)
      this.body.velocity.x = 80;

    this.body.velocity.y = -150;
    this.anims.play('flap');
  }

  changeDirection(): void {
    this.setFlipX(!this.flipX);
  }

}