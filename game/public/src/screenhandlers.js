var translateScreen = function(){
  var dinoX = GreenDino.greenDinoObj.getPosition().x + 128/2;
  var dinoY = GreenDino.greenDinoObj.getPosition().y + 128/2;

  var width = window.innerWidth;
  var height = window.innerHeight;

  var backgroundWidth = document.getElementById('background').offsetWidth;
  var backgroundHeight = document.getElementById('background').offsetHeight;

  var sizeX = 2048;
  var sizeY = 2048;

  var translateLeft = 0;
  var translateTop = 0;

  if (dinoX + width/2 > sizeX) {
    translateLeft = (sizeX - width);
  }
  else if (dinoX > width/2) {
    translateLeft = (dinoX - width/2);
  }

  if (dinoY + height/2 > sizeY) {
    translateTop = (sizeY - height);
  }
  else if (dinoY > height/2) {
    translateTop = (dinoY - height/2);
  }
  stage.setOffsetX(translateLeft);
  stage.setOffsetY(translateTop);
  background.style.webkitTransform = 'translate3d('+Math.floor(translateLeft*-1)+'px, '+Math.floor(translateTop*-1)+'px, 0)';
};

var checkBoundaries = function(){
  var dinoX = GreenDino.greenDinoObj.getPosition().x;
  var dinoY = GreenDino.greenDinoObj.getPosition().y;

  var sizeX = 1935;
  var sizeY = 1950;
  var backgroundWidth = document.getElementById('background').offsetHeight;

  if (dinoY >= sizeY){
    GreenDino.greenDinoObj.setPosition(dinoX, sizeY);
  }
  if (dinoY <= -20){
    GreenDino.greenDinoObj.setPosition(dinoX, -20);
  }
  if (dinoX >= sizeX){
    GreenDino.greenDinoObj.setPosition(sizeX, dinoY);
  }
  if (dinoX <= -15){
    GreenDino.greenDinoObj.setPosition(-15, dinoY);
  }
  if (dinoX <= -15 && dinoY <= -20){
    GreenDino.greenDinoObj.setPosition(-15, -20);
  }
  if (dinoX >= sizeX && dinoY >= sizeY){
    GreenDino.greenDinoObj.setPosition(sizeX, sizeY);
  }
  if (dinoX >= sizeX && dinoY <= -20){
    GreenDino.greenDinoObj.setPosition(sizeX, -20);
  }
  if (dinoX <= -15 && dinoY >= sizeY){
    GreenDino.greenDinoObj.setPosition(-15, sizeY);
  }
};
