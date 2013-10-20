DVC
========
--dinos vs. chickens, get it? 
aaand it's [(a)live](http://dinosaurio.jit.su  "Dino")  


Stack
--------
*Node.js/Express   
*Kinetic.js (and HTML5 canvas)     
*Socket.IO   
*Mousetrap   
*ImageMagick   

What it is
--------
The one and only multiplayer dinosaur chicken eating game, of course.


Code
--------
Head into the game directory to explore my code.   
The directory is split into 'app,' which contains all of the server side functionality,
and 'public' which contains all of the client side functionality.   

'init()' in 'game/public/src/init.js' is called on the click of the play button, which instantiates the game. 'game/public/src/game.js' contains the bulk of the client-side game logic. Here, the canvas is created and the stage is loaded. Although the coordinate movement of the spiders and chickens is controlled by the server, all objects are rendered to the client facing game itself in this file. Each type of game actor is associated with a class, which can be found in 'game/public/src/actors/*.js', and all helper functions are found in 'game/public/src/util.js'.
As soon as a game is instantiated and there are two users connected, the new game on the client side pings the server, which creates a new server-side game for a pair of users. When collisions occur, and as actors must be updated, clients ping the server which broadcasts events containing the specified data. The server also contains classes for the AI chickens and spiders, which control their movement. Each dinosaur send their coordinates to the server, so that their dino object moves appropriately on their opponent's screen.

TLDR: The entire shabang begins in app.js, and then user connection is established through the creation of a new game in /public/src/init.js which creates a new game. User dinosaurs are created client-side, and 'game/app.js' instructs broadcasts chicken positions and opponent movements to all players once users are paired.  


Animations
--------
The sprites were originally a file of serveral hundred pngs. I used ImageMagick to horizontally append them, and then
based my animation sequences off of their direction and action in the original file. Each animation contains a set of eight 
images, and there are eight directions for each image. When a new actor is instantiated, they are endowed with the ability
to move based on these animations in through the 'getAnimArray' function in 'public/src/getanimations.js'. Their direction
and coordinates are synced constantly, so that the animation is always current.


Struggles
--------
Establishing connections between users and then ensuring that all data is synced between using Socket.IO was an endeavor in itself. I initially intended for the game to work as a giant dino fragfest, but I decided to use a pairing system instead because I wanted to further explore Socket.IO.
