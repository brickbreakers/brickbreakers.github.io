export default class InputHandler
{
  constructor(paddle, game)
  {
    //I really like this input system, it's pretty similar to unity
    document.addEventListener("keydown", (event) => 
    {
      switch(event.keyCode)
      {
         case 37:
          paddle.moveLeft();
          break;
         case 39:
          paddle.moveRight();
          break;
         case 27:
          game.togglePause();
         case 32:
          game.start()
          break;
      }
    })

    document.addEventListener("keyup", (event) => 
    {
      switch(event.keyCode)
      {
         case 37:
          if(paddle.speed < 0)
           paddle.stop();
          break;
         case 39:
          if(paddle.speed > 0)
           paddle.stop();
          break;
      }
    })
  }
}