var theyAreColliding = function(greendino, reddino) {
  greenX = greendino.attrs.x;
  greenY = greendino.attrs.y;
  redX = reddino.attrs.x;
  redY = reddino.attrs.y;

  return( !(greenX > redX + 64 ||  //
   greenX + 64 < redX ||  // 
   greenY > redY + 64 ||   //
   greenY + 64 < redY));  //
};

var collisionHandler = function(){
  if(theyAreColliding(greendino, reddino)){
    if (greendino.getAnimation() === 'attacking_'+GreenDino.directions[dir]){
      if (!RedDino.hit) {
        RedDino.hit = true;
        reddino.setAnimation('hit_'+RedDino.directions[dir]);
      }
    }
    if (reddino.getAnimation() === 'attacking_'+RedDino.directions[dir]){
      if (!GreenDino.hit) {
        GreenDino.hit = true;
        console.log(GreenDino.hit);
        greendino.setAnimation('hit_'+GreenDino.directions[dir]);
      }
    }
  } else {
    RedDino.hit = false;
    GreenDino.hit = false;
  }
};