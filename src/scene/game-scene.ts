import { GameObjects, Scene } from "phaser";

import Bounce from "../objects/bounce";
import Dove from "../objects/dove";
import Paddle from "../objects/paddle";
import Spike from "../objects/spike";

export default class GameScene extends Scene {

  private dove!: Dove;
  private leftPaddle!: Paddle;
  private rightPaddle!: Paddle;
  private spikes: (Spike | Paddle)[] = [];
  private bounces: Bounce[] = [];

  private emitter!: GameObjects.Particles.ParticleEmitter;

  private currentScore: number = 0;
  private currentScoreText!: GameObjects.BitmapText;

  private bestScoreText!: GameObjects.BitmapText;

  preload(): void {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('spike', 'assets/spike.png');
    this.load.image('paddle', 'assets/paddle.png');
    this.load.image('feather', 'assets/feather.png');

    this.load.spritesheet('dove', 'assets/dove.png', { frameWidth: 8 });

    this.load.bitmapFont('fipps', 'fipps-font/fipps.png', 'fipps-font/fipps.xml');

    this.generateBounceTexture();
  }

  private generateBounceTexture(): void {
    const frameWidth = 4;
    const frameHeight = this.renderer.height - (this.textures.get('spike').get(0).height + 2);

    const canvas = this.textures.createCanvas('bounce', frameWidth * 2, frameHeight);
    const ctx = canvas.context;

    let xOffset = 0;

    ctx.fillStyle = '#35353D';
    ctx.fillRect(xOffset + 1, 0, frameWidth - 2, 1);
    ctx.fillRect(xOffset + (frameWidth - 1), 1, 1, frameHeight - 2);
    ctx.fillRect(xOffset + 1, frameHeight - 1, frameWidth - 2, 1);
    ctx.fillRect(xOffset + 0, 1, 1, frameHeight - 2);
    ctx.fillStyle = '#646A7D';
    ctx.fillRect(xOffset + 1, 1, frameWidth - 2, frameHeight - 2);
    canvas.add(0, 0, xOffset + 0, 0, frameWidth, frameHeight);

    xOffset = frameWidth;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(xOffset + 1, 0, frameWidth - 2, 1);
    ctx.fillRect(xOffset + (frameWidth - 1), 1, 1, frameHeight - 2);
    ctx.fillRect(xOffset + 1, frameHeight - 1, frameWidth - 2, 1);
    ctx.fillRect(xOffset + 0, 1, 1, frameHeight - 2);
    ctx.fillStyle = '#B0B0BF';
    ctx.fillRect(xOffset + 1, 1, frameWidth - 2, frameHeight - 2);
    canvas.add(1, 0, xOffset + 0, 0, frameWidth, frameHeight);

    canvas.refresh();
  }

  create(): void {
    const bg = this.add.image(0, 0, 'bg');
    bg.setX(bg.width / 2);
    bg.setY(bg.height / 2);

    const bottomSpike = new Spike(this);
    bottomSpike.create();
    this.spikes.push(bottomSpike);

    const topSpike = new Spike(this, true);
    topSpike.create();
    this.spikes.push(topSpike);

    this.leftPaddle = new Paddle(this);
    this.leftPaddle.create();
    this.spikes.push(this.leftPaddle);

    this.rightPaddle = new Paddle(this, true);
    this.rightPaddle.create();
    this.spikes.push(this.rightPaddle);

    this.dove = new Dove(this);
    this.dove.create();

    this.bounces.push(new Bounce(this, 3));
    this.bounces.push(new Bounce(this, this.renderer.width - 3));
    this.bounces.forEach(b => b.create());

    this.emitter = this.add.particles('feather').createEmitter({
      x: 0,
      y: 0,
      speed: { min: -80, max: 80 },
      angle: { min: 0, max: 360 },
      blendMode: 'SCREEN',
      active: true,
      lifespan: 2000,
      frequency: -1
    });

    this.currentScore = 0;
    this.currentScoreText = this.add.bitmapText(0, 24, 'fipps', '0', 8);
    this.currentScoreText.setAlpha(0.75);
    this.updateCurrentScoreText();

    this.bestScoreText = this.add.bitmapText(0, this.renderer.height - 64, 'fipps', '0', 14);
    this.bestScoreText.setAlpha(0.25);
    this.updateBestScoreText();
  }

  update(_time: number, _delta: number): void {
    this.physics.collide(
      this.dove,
      this.bounces,
      (dove, bounce) => {
        this.onPointScored(dove.body.velocity.x > 0);
        (dove as Dove).changeDirection();
        (bounce as Bounce).flash();
      }
    );

    if (this.physics.collide(this.dove, this.spikes)) {
      this.cameras.getCamera('').shake(500);
      this.cameras.getCamera('').flash(500);
      this.emitter.explode(10, this.dove.x, this.dove.y);
      this.resetScene();
    }
  }

  private onPointScored(rightDirection: boolean): void {
    if (rightDirection)
      this.rightPaddle.moveToRandomPoint()
    else
      this.leftPaddle.moveToRandomPoint();

    this.currentScore++;
    this.updateCurrentScoreText();
  }

  private updateBestScoreText(): void {
    const bestScore = +(localStorage.getItem('bestScore') ?? 0);
    this.bestScoreText.setText(bestScore + '');
    this.bestScoreText.setX((this.renderer.width / 2) - (this.bestScoreText.width / 2));
  }

  private updateCurrentScoreText(): void {
    this.currentScoreText.setText(this.currentScore + '');
    this.currentScoreText.setX((this.renderer.width / 2) - (this.currentScoreText.width / 2));
  }

  private saveBestScore(): void {
    const bestScore = +(localStorage.getItem('bestScore') ?? 0);
    if (this.currentScore > bestScore) {
      localStorage.setItem('bestScore', this.currentScore + '');
    }
  }

  private resetScene(): void {
    this.saveBestScore();
    this.updateBestScoreText();

    this.currentScore = 0;
    this.updateCurrentScoreText();

    this.dove.reset();

    this.leftPaddle.reset();
    this.rightPaddle.reset();
  }

}