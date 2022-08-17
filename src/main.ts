import { Game } from 'phaser';
import GameScene from './scene/game-scene';

new Game({
  type: Phaser.AUTO,
  scale: {
    parent: 'game-container',
    width: 160,
    height: 240,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: import.meta.env.DEV,
      fixedStep: true,
    }
  },
  scene: GameScene
});