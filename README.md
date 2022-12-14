# Phaser Flappy Balt
<img src="screenshot.png" alt="Phaser Flappy Balt Screenshot" width="200"/>

A Phaser 3 edition of FlappyBalt by [adamatomic](http://adamatomic.com/).

Ported from the [Haxeflixel version](https://haxeflixel.com/demos/Flappybalt/) of the game.

---

### Useful commands
To run the game in debug mode use the command:

```bash
npm run dev
```

When in debug mode, phaser arcade physics is in debug mode also. To disable this behaviour set to false the ```debug``` option in ```main.ts```:

```typescript
...
arcade: {
  debug: false,
  fixedStep: true,
}
...
```

To run the game in preview mode use the command:
```bash
npm run build && npm run preview
```

---

### Resources
Original HaxeFlixel version: https://github.com/HaxeFlixel/flixel-demos/tree/dev/Arcade/Flappybalt/

#### Code 👾
Typescript: https://www.typescriptlang.org/

Phaser 3: https://phaser.io/

ViteJS: https://vitejs.dev/

#### Font 🖋️
Fipps font: https://pheist.net/fonts.php?id=51

Bitmap font generator: https://snowb.org/
