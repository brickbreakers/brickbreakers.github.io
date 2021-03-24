import Paddle from '/src/paddle.js';
import InputHandler from '/src/input.js';
import Ball from '/src/ball.js';
import Brick from '/src/brick.js';
import {buildLevel, level1, level2, level3, level4, level5} from '/src/levels.js'

const GAMESTATE = 
{
 PAUSED: 0,
 RUNNING: 1,
 MENU: 2,
 GAMEOVER: 3,
 NEWLEVEL: 4
}

export default class Game
{
  constructor(gameWidth, gameHeight)
  {
     this.gameWidth = gameWidth
     this.gameHeight = gameHeight
     this.gamestate = GAMESTATE.MENU;
     this.paddle = new Paddle(this);
     this.ball = new Ball(this);
     this.lives = 3;

     this.gameObjects = [];

     this.bricks = [];

     this.levels = [level1, level2, level3, level4, level5];
     this.currentLevel = 0;

     new InputHandler(this.paddle, this);
  }

  start()
  {

    if(this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball,this.paddle];
    this.ball.reset()

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime)
  {
    if(this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

    [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

    if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if(this.bricks.length === 0)
    {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start()
    }

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);


  }

  draw(ctx)
  {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if(this.gamestate === GAMESTATE.MENU)
    {
      ctx.rect(0,0,this.gameWidth, this.gameHeight);  
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("BRICK BREAKERS", this.gameWidth / 2, this.gameHeight / 2 - 50)
      ctx.fillText("PRESS 'SPACEBAR' TO BEGIN", this.gameWidth / 2, this.gameHeight / 2 + 50)
    }

    if(this.gamestate === GAMESTATE.PAUSED){
    ctx.rect(0,0,this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2)
    }

    if(this.gamestate === GAMESTATE.GAMEOVER)
    {
      ctx.rect(0,0,this.gameWidth, this.gameHeight);  
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 - 50)
    }
  }

  togglePause()
  {

     if(this.gamestate == GAMESTATE.PAUSED)
     {
        this.gamestate = GAMESTATE.RUNNING;
     }
     else if(this.gamestate !== GAMESTATE.MENU || this.gamestate !== GAMESTATE.GAMEOVER)
     {
       this.gamestate = GAMESTATE.PAUSED
     }
  }

}
