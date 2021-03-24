import Game from '/src/game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


let game = new Game(GAME_WIDTH,GAME_HEIGHT);



let lastTime = 0;

//area reserved for images starts here!



//area reserved for images ends here!



function gameLoop(timestamp){
  let deltaTime = timestamp - lastTime;

  lastTime = timestamp;

  let rem = lastTime%255;

  if (0<rem<85){
    var r = Math.floor(rem%85);
    var g = Math.floor(0);
    var b = Math.floor(85-r);
  }
  else if (84<rem<170){
    var g = Math.floor(rem%85);
    var b = Math.floor(0);
    var r = Math.floor(85-g);
  }
  else{
    var b = Math.floor(rem%85);
    var r = Math.floor(0);
    var g = Math.floor(85-b);
  }

  ctx.font = r + 'px arial';
  ctx.fillStyle = r+','+g+','+b;
  ctx.fillText("shuffle", 400, 600)

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);