var keyBindings = function(DinoClass, dinoinstance, run, left, right, attack, roar){

  Mousetrap.bind(run, function(){
    DinoClass.running = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[DinoClass.dir]);
  }, 'keyup');
  Mousetrap.bind(run, function(){
    if (!DinoClass.running) {
      dinoinstance.setAnimation('running_'+DinoClass.directions[DinoClass.dir]);
    }
    DinoClass.running = true;
  }, 'keydown');

  Mousetrap.bind(left, function(){
    DinoClass.dir = DinoClass.dir === 0 ? 7 : DinoClass.dir -1;
    if (DinoClass.running)
      dinoinstance.setAnimation('running_'+DinoClass.directions[DinoClass.dir]);
    else
      dinoinstance.setAnimation('paused_'+DinoClass.directions[DinoClass.dir]);
  });
  Mousetrap.bind(right, function(){
    DinoClass.dir = DinoClass.dir === 7 ? 0 : DinoClass.dir+1;
    if (DinoClass.running)
      dinoinstance.setAnimation('running_'+DinoClass.directions[DinoClass.dir]);
    else
      dinoinstance.setAnimation('paused_'+DinoClass.directions[DinoClass.dir]);
  });

  Mousetrap.bind(attack, function(){
    DinoClass.attacking = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[DinoClass.dir]);
  }, 'keyup');
  Mousetrap.bind(attack, function(){
    DinoClass.running = false;
    if (!DinoClass.attacking) {
      dinoinstance.setAnimation('attacking_'+DinoClass.directions[DinoClass.dir]);
    }
    DinoClass.attacking = true;
  }, 'keydown');

  Mousetrap.bind(roar, function(){
    DinoClass.roaring = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[DinoClass.dir]);
  }, 'keyup');
  Mousetrap.bind(roar, function(){
    DinoClass.running = false;
    if (!DinoClass.roaring) {
      dinoinstance.setAnimation('roaring_'+DinoClass.directions[DinoClass.dir]);
    }
    DinoClass.roaring = true;
  }, 'keydown');

};