Less Boring Engine
================

[![Build Status](https://travis-ci.org/ChickenCoding/lessboringengine.png?branch=fork)](https://travis-ci.org/ChickenCoding/lessboringengine)

An entity system game engine made in Javascript, inspiried by Ash.

By David Colgan

This project is still fairly rough, but the core of the engine is in place.  My eventual goal with this project is to make a Javascript game engine that is ideal for Ludum Dares, but also for larger projects as well.  I want to get the core engine solid, and then start adding as many stock components and systems as possible.  Common things should be easy, and uncommon things should be possible.

Future Systems planned:
* Finish Animations
* Tilemaps
* A-star Pathfinding
* Dialog Boxes
* Tweens
* Programmatic Cutscenes
* Bullets and bullet managers
* Platforming characters
* Game States
* Saving/Loading/Serializing
* Music/Audio
* Simple Preloaders
* Particles
* Collision Detection

I also want to add unit tests to this.

How to use :
* type ``npm install .`` in the terminal to install the needed dependencies. You will need to have nodejs installed.
* type ``grunt`` in the terminal to compile
* open ``index.html`` in your browser
* ???
* Profit

This engine makes use of John Resig's simple Javascript inheritance system: [http://ejohn.org/blog/simple-javascript-inheritance/](http://ejohn.org/blog/simple-javascript-inheritance/)
