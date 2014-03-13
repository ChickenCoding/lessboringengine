var Class = require('../../lib/class');
var Engine = require('../../lib/engine');
var Input = require('../../lib/input');

var s = require('./systems');
var EntityFactory = require('./entity-factory');
var PIXI = require('../../vendor/pixi');

var Main = Class.extend({
    init: function() {
        this.engine = new Engine();
        this.input = new Input();
        this.renderer = PIXI.autoDetectRenderer(800, 600);
        this.stage = new PIXI.Stage();

        this.entityFactory = new EntityFactory(this.engine, this.stage);

        document.body.appendChild(this.renderer.view);
        this.resize();

        // TODO currently the entities must all be created before the systems

        this.engine.addSystem(new s.KeyboardInputSystem(this.input), 0);
        this.engine.addSystem(new s.RandomInputSystem(this.input), 0);
        this.engine.addSystem(new s.MovementSystem(), 1);
        this.engine.addSystem(new s.DirectionSystem(), 2);
        this.engine.addSystem(new s.PlayerActionDeterminerSystem(), 3);
        this.engine.addSystem(new s.AnimationSystem(), 4);

        this.entityFactory.createSquirrel(40, 40);

        var renderLoop = function() {
            this.renderer.render(this.stage);
            requestAnimFrame(renderLoop);
        }.bind(this);
        requestAnimationFrame(renderLoop);

        setInterval(function() {
            this.input.update();
            this.engine.update();
        }.bind(this), 1000/60);

    },

    resize: function() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }
});

var loader = new PIXI.AssetLoader([
    'images/squirrel.png'
]);
loader.onComplete = function() {
    window.GAME = new Main();
};
loader.load();
