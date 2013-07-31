var keyBindings = function(){

  Mousetrap.bind('up', function(){
    GreenDino.running = false;
    dino.setAnimation('paused_'+actor.directions[dir]);
  }, 'keyup');
  Mousetrap.bind('up', function(){
    if (!GreenDino.running) {
      dino.setAnimation('running_'+actor.directions[dir]);
    }
    GreenDino.running = true;
  }, 'keydown');

  Mousetrap.bind('left', function(){
    dir = dir === 0 ? 7 : dir -1;
    if (GreenDino.running)
      dino.setAnimation('running_'+actor.directions[dir]);
    else
      dino.setAnimation('paused_'+actor.directions[dir]);
  });
  Mousetrap.bind('right', function(){
    dir = dir === 7 ? 0 : dir+1;
    if (GreenDino.running)
      dino.setAnimation('running_'+actor.directions[dir]);
    else
      dino.setAnimation('paused_'+actor.directions[dir]);
  });

  Mousetrap.bind('space', function(){
    GreenDino.attacking = false;
    dino.setAnimation('paused_'+actor.directions[dir]);
  }, 'keyup');
  Mousetrap.bind('space', function(){
    GreenDino.running = false;
    if (!GreenDino.attacking) {
      dino.setAnimation('attacking_'+actor.directions[dir]);
    }
    GreenDino.attacking = true;
  }, 'keydown');

  Mousetrap.bind('/', function(){
    GreenDino.roaring = false;
    dino.setAnimation('paused_'+actor.directions[dir]);
  }, 'keyup');
  Mousetrap.bind('/', function(){
    GreenDino.running = false;
    if (!GreenDino.roaring) {
      dino.setAnimation('roaring_'+actor.directions[dir]);
    }
    GreenDino.roaring = true;
  }, 'keydown');

};