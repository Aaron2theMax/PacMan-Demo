document.querySelector('title').text = 'Game Resizing';

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

window.addEventListener('keydown', function(e){
  keyState[e.keyCode || e.which] = true;
});

window.addEventListener('keyup', function(e){
  keyState[e.keyCode || e.which] = false;
});


window.addEventListener('resize',resizeGame, false);
function resizeGame(){
  var gameArea = document.getElementById('gameArea');
  var widthToHeight = 4 / 3;
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWidthToHeight = newWidth / newHeight;

  if(newWidthToHeight > widthToHeight){
    newWidth = newHeight * widthToHeight;
  }else{
    newHeight = newWidth / widthToHeight;
  }
  gameArea.style.height = newHeight + 'px';
  gameArea.style.width = newWidth + 'px';

  gameArea.style.marginTop = (-newHeight / 2) + 'px';
  gameArea.style.marginLeft = (-newWidth / 2) + 'px';

  var gameCanvas = document.getElementById('gameCanvas');
  gameCanvas.width = newWidth;
  gameCanvas.height = newHeight;

  pacMan.reposition(newWidth/2, newHeight/2);
}

function animate(){  
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);

  if(keyState[d.kc.up]){
    if(pacMan.y + pacMan.speed - pacMan.r > 0)
      pacMan.moveUp();
    pacMan.animateUp();
  }
  else if(keyState[d.kc.down]){
    if(pacMan.y + pacMan.speed + pacMan.r < canvas.height)
      pacMan.moveDown();
    pacMan.animateDown();
  }
  else if(keyState[d.kc.left]){
    if(pacMan.x  + pacMan.speed - pacMan.r > 0)
      pacMan.moveLeft();
    pacMan.animateLeft();
  }
  else if(keyState[d.kc.right]){
    if(pacMan.x + pacMan.speed + pacMan.r < canvas.width)
      pacMan.moveRight();
    pacMan.animateRight()
  }

  pacMan.update();
}

let keyState, pacMan;
function init(){
  keyState = [];
  pacMan = new PacMan();
  resizeGame();
  pacMan.update();
}

init();
animate();