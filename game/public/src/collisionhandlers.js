var theyAreColliding = function(GreenDino, RedDino) {
  greenX = GreenDino.attrs.x;
  greenY = GreenDino.attrs.y;
  redX = RedDino.attrs.x;
  redY = RedDino.attrs.y;

  return( !(greenX > redX + 64 ||  //
   greenX + 64 < redX ||  // 
   greenY > redY + 64 ||   //
   greenY + 64 < redY));  //
};

var collisionHandler = function(){
  if(theyAreColliding(GreenDino.greenDinoObj, RedDino.redDinoObj)){
    if (GreenDino.greenDinoObj.getAnimation() === 'attacking_'+GreenDino.directions[GreenDino.dir]){
      if (!RedDino.hit) {
        RedDino.running = false;
        RedDino.hit = true;
        RedDino.redDinoObj.setAnimation('hit_'+RedDino.directions[RedDino.dir]);
      }
    }
    if (RedDino.redDinoObj.getAnimation() === 'attacking_'+RedDino.directions[RedDino.dir]){
      if (!GreenDino.hit) {
        GreenDino.running = false;
        GreenDino.hit = true;
        GreenDino.greenDinoObj.setAnimation('hit_'+GreenDino.directions[GreenDino.dir]);
      }
    }
  } else {
    RedDino.hit = false;
    GreenDino.hit = false;
  }
};


