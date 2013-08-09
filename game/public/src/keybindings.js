var keyBindings = function(Game, DinoClass, dinoinstance, run, left, right, attack, roar){

  Mousetrap.bind(run, function(){
    DinoClass.running = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[dinoinstance.attrs.dir]);
    Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
  }, 'keyup');
  Mousetrap.bind(run, function(){
    if (!DinoClass.running) {
      dinoinstance.setAnimation('running_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    }
    DinoClass.running = true;
  }, 'keydown');

  Mousetrap.bind(left, function(){
    dinoinstance.attrs.dir= dinoinstance.attrs.dir=== 0 ? 7 : dinoinstance.attrs.dir-1;
    if (DinoClass.running) {
      dinoinstance.setAnimation('running_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    } else {
      dinoinstance.setAnimation('paused_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    }
  });
  Mousetrap.bind(right, function(){
    dinoinstance.attrs.dir= dinoinstance.attrs.dir=== 7 ? 0 : dinoinstance.attrs.dir+1;
    if (DinoClass.running) {
      dinoinstance.setAnimation('running_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    } else {
      dinoinstance.setAnimation('paused_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    }
  });

  Mousetrap.bind(attack, function(){
    DinoClass.attacking = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[dinoinstance.attrs.dir]);
    Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    var sound = document.getElementById('bite');
    sound.pause();
    sound.play();
  }, 'keyup');
  Mousetrap.bind(attack, function(){
    DinoClass.running = false;
    if (!DinoClass.attacking) {
      dinoinstance.setAnimation('attacking_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    }
    DinoClass.attacking = true;
    var sound = document.getElementById('bite');
    sound.play();
  }, 'keydown');

  Mousetrap.bind(roar, function(){
    DinoClass.roaring = false;
    dinoinstance.setAnimation('paused_'+DinoClass.directions[dinoinstance.attrs.dir]);
    Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
  }, 'keyup');
  Mousetrap.bind(roar, function(){
    DinoClass.running = false;
    if (!DinoClass.roaring) {
      dinoinstance.setAnimation('roaring_'+DinoClass.directions[dinoinstance.attrs.dir]);
      Game.socket.emit('dinochangeanim', Game.room, dinoinstance.getAnimation());
    }
    DinoClass.roaring = true;
  }, 'keydown');
};