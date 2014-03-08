//var G = require('src/constants');
var Class = require('lib/class');
var Entity = require('lib/entity');
var c = require('src/components');

var EntityFactory = Class.extend({
    init: function(engine, stage) {
        this.engine = engine;
        this.stage = stage;
    },
    destroyEntity: function(entity) {
        this.engine.removeEntity(entity);
    },
    createRectangle: function(x, y) {
        var rect = (new Entity()
            .add(new c.Graphics(this.stage))
            .add(new c.Position(window.innerWidth/2, window.innerHeight/2))
            .add(new c.Size(100, 100))
            .add(new c.Color('blue'))
            .add(new c.Velocity(2))
            .add(new c.KeyboardInput())
            .add(new c.ActionInput())
        );
        this.engine.addEntity(rect);
        return rect;
    },
    createSquirrel: function(x, y) {
        var squirrel = (new Entity()
            .add(new c.Position(window.innerWidth/2, window.innerHeight/2))
            .add(new c.Direction('right'))
            .add(new c.Size(112, 112))
            .add(new c.Velocity(2))
            .add(new c.KeyboardInput())
            .add(new c.ActionInput())
            .add(new c.CurrentAnimationAction('walk-right'))
            .add(new c.AnimationActions(this.stage, {
                spritesheetUrl: 'images/squirrel.png',
                frameWidth: 112,
                frameHeight: 112,
                offsetX: 24,
                offsetY: 48,
                actions: {
                    'idle-right': { row: 0, indices: [0], frameLength: 100 },
                    'idle-left':  { row: 1, indices: [0], frameLength: 100 },
                    'idle-down':  { row: 2, indices: [0], frameLength: 100 },
                    'idle-up':    { row: 3, indices: [0], frameLength: 100 },
                    'walk-right': { row: 0, indices: [0,1,2], frameLength: 5 },
                    'walk-left':  { row: 1, indices: [0,1,2], frameLength: 5 },
                    'walk-down':  { row: 2, indices: [0,1,2], frameLength: 5 },
                    'walk-up':    { row: 3, indices: [0,1,2], frameLength: 5 }
                }
            }))
        );
        this.engine.addEntity(squirrel);
        return squirrel;
    }
});

module.exports = EntityFactory;

