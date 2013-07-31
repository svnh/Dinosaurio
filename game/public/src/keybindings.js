var keyBindings = function(DinoClass, dinoinstance, run, left, right, attack, roar){

  // DinoClass keyboard bindings

  Mousetrap.bind(run, function(){
    DinoClass.running = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[dir]);
  }, 'keyup');
  Mousetrap.bind(run, function(){
    if (!DinoClass.running) {
      dinoinstance.setAnimation('running_'+DinoClass.directions[dir]);
    }
    DinoClass.running = true;
  }, 'keydown');

  Mousetrap.bind(left, function(){
    dir = dir === 0 ? 7 : dir -1;
    if (DinoClass.running)
      dinoinstance.setAnimation('running_'+DinoClass.directions[dir]);
    else
      dinoinstance.setAnimation('paused_'+DinoClass.directions[dir]);
  });
  Mousetrap.bind(right, function(){
    dir = dir === 7 ? 0 : dir+1;
    if (DinoClass.running)
      dinoinstance.setAnimation('running_'+DinoClass.directions[dir]);
    else
      dinoinstance.setAnimation('paused_'+DinoClass.directions[dir]);
  });

  Mousetrap.bind(attack, function(){
    DinoClass.attacking = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[dir]);
  }, 'keyup');
  Mousetrap.bind(attack, function(){
    DinoClass.running = false;
    if (!DinoClass.attacking) {
      dinoinstance.setAnimation('attacking_'+DinoClass.directions[dir]);
    }
    DinoClass.attacking = true;
  }, 'keydown');

  Mousetrap.bind(roar, function(){
    DinoClass.roaring = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[dir]);
  }, 'keyup');
  Mousetrap.bind(roar, function(){
    DinoClass.running = false;
    if (!DinoClass.roaring) {
      dinoinstance.setAnimation('roaring_'+DinoClass.directions[dir]);
    }
    DinoClass.roaring = true;
  }, 'keydown');

  // RedDino keyboard bindings

};