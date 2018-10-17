import { Hero } from "../objects/hero";
import { Obstacle } from "../objects/obstacle";
import { Ground } from "../objects/ground";

/**
 * Main gameplay scene!
 */
export class GamePlayScene extends Phaser.Scene {
  // objects
  private hero: Hero;
  private obstacles: Phaser.GameObjects.Group;
  private groundTiles: Phaser.Physics.Arcade.StaticGroup;
  private bg: Phaser.GameObjects.TileSprite;

  // variables
  private timer: Phaser.Time.TimerEvent;
  private score: number;
  private scoreText: Phaser.GameObjects.Text[];

  constructor() {
    super({ key: "GamePlayScene" });
  }

  // 'init' is the very first function called per scene
  // https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.BasePlugin.html#init
  init(): void {
    // objects
    this.hero = null;
    this.obstacles = this.add.group({ classType: Obstacle });
    this.groundTiles = this.physics.add.staticGroup();
    this.bg = null;

    // variables
    this.timer = undefined;
    this.score = -1;
    this.scoreText = [];
  }

  preload(): void {
    // preload before create
    
  } // preload()

  create(): void {
    // display in order, so make sure everything comes AFTER bg
    this.bg = this.add.tileSprite(0, 0, 135, 200, "background");
    this.bg.setScale(9);

    for (var i = 0; i < 2; i += 1) {
      this.groundTiles.create(i * 380, 590, 'ground');
    }

    this.groundTiles;

    // score text shadow
    this.scoreText.push(
      this.add.text(this.sys.canvas.width / 2 - 14, 30, "0", {
        fontFamily: "Connection",
        fontSize: "40px",
        fill: "#000"
      })
    );

    // score text white
    this.scoreText.push(
      this.add.text(this.sys.canvas.width / 2 - 16, 30, "0", {
        fontFamily: "Connection",
        fontSize: "40px",
        fill: "#fff"
      })
    );

    this.addRowOfObstacles();
    this.addRowOfGround();

    this.hero = new Hero({
      scene: this, // belongs to 'this' scene (i.e. 'GamePlayScene')
      x: 20, // x-position in the world (from canvas 0,0)
      y: 275, // y-position spawn in world (from canvas 0,0)
      key: "hero", // keyword for preloaded image/sprite
    });

    // make sure our hero doesn't fall through the ground
    this.physics.add.collider(this.hero, this.groundTiles);
    this.physics.add.overlap(this.hero, this.obstacles, this.hitObstacle, null, this);

    this.timer = this.time.addEvent({
      delay: 2500,
      callback: this.addRowOfObstacles,
      callbackScope: this,
      loop: true
    });
  } // create

  update(): void {
    // things to perform every update cycle (like... every millisecond)

    if (!this.hero.getDead()) {
      this.bg.tilePositionX -= 1;
      this.hero.update(); // jumping and screen detection as per hero.update()
    } else {
      Phaser.Actions.Call(
        this.obstacles.getChildren(),
        function(obstacle) {
          obstacle.body.setVelocityX(0);
        },
        this
      );

      if (this.hero.y > this.sys.canvas.height) {
        this.restartGame();
      }
    }
  } // update

  private addOneObstacle(x, y, frame): void {
    // create a obstacle at the position x and y
    let obstacle = new Obstacle({
      scene: this,
      x: x,
      y: y,
      frame: frame,
      key: "obstacle"
    });

    // add obstacle to group
    this.obstacles.add(obstacle);
  }

  private addOneGround(x, y, frame): void {
    let ground = new Ground({
      scene: this,
      x: x,
      y: y,
      frame: frame,
      key: "ground"
    });

    // add groundTile to group
    this.groundTiles.add(ground);
  }

  private addRowOfObstacles(): void {
    // update the score
    this.score += 1;
    this.scoreText[0].setText("" + this.score);
    this.scoreText[1].setText("" + this.score);

    // randomly pick a number between 1 and 5
    let double = Math.floor(Math.random() * 5) + 1;

    // add 6 obstacles with one big hole at position hole and hole + 1
    for (let i = 0; i < 10; i += 1) {
      this.addOneObstacle(600, 430, 0);
    }
  }

  private addRowOfGround(): void {
    let currentGround: number;

    for (currentGround = 0; currentGround < 10; currentGround += 1) {
      this.addOneGround(201 * currentGround, 510, 0);
    }
  }

  private hitObstacle() {
    this.hero.setDead(true);

    this.scene.start("GameOverScene");
  }

  private restartGame(): void {
    this.scene.start("GameOverScene");
  }
}
