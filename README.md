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


What it is
--------
The one and only multiplayer dinosaur chicken eating game, of course.


Code
--------
Head into the game directory to explore my code. The entire shabang begins in app.js, and then user connection is established through the creation of a new game in /public/init.js which creates a new game. User dinosaurs are created client-side, and app.js instructs broadcasts chicken positions and opponent movements to all players once users are paired.  


Struggles
--------
Establishing connections between users and then ensuring that all data was synced between using Socket.IO was an endeavor in itself. I initially intended for the game to work as a giant dino fragfest, but I decided to use a pairing system instead in order to further explore Socket.IO.