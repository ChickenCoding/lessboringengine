var PIXI = require('../vendor/pixi');

module.exports = {
    Graphics: function(stage) {
        this._name = 'graphics';
        this.graphics = new PIXI.Graphics();
        stage.addChild(this.graphics);
    },

    Position: function(x, y) {
        this._name = 'position';
        this.x = x;
        this.y = y;
    },

    Direction: function(which) {
        this._name = 'direction';
        this.direction = which;
    },

    Size: function(width, height) {
        this._name = 'size';
        this.width = width;
        this.height = height;
    },

    Color: function(color) {
        this._name = 'color';
        this.color = color;
    },

    Velocity: function(maxSpeed) {
        this._name = 'velocity';
        this.maxSpeed = maxSpeed;
        this.dx = 0;
        this.dy = 0;
    },

    KeyboardInput: function() {
        this._name = 'keyboardInput';
    },

    RandomInput: function() {
        this._name = 'randomInput';
    },

    ActionInput: function() {
        this._name = 'actionInput';
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.action = false;
        this.cancel = false;
    },

    CurrentAnimationAction: function(name) {
        this._name = 'currentAnimationAction';
        this.name = name;
    },

    AnimationActions: function(stage, config) {
        this._name = 'animationActions';
        this.spritesheetUrl = config.spritesheetUrl;
        this.frameWidth = config.frameWidth;
        this.frameHeight = config.frameHeight;
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;
        this.actions = config.actions;

        this.currentFrameIndex = 0;
        this.frameTimer = 0;

        // Generate the frames from the image and config
        var texture = PIXI.Texture.fromImage(config.spritesheetUrl);
        for (var actionName in config.actions) {
            var action = config.actions[actionName];
            action.frames = [];
            for (var i=0; i<action.indices.length; i++) {
                var index = action.indices[i];
                // Add a new property to this.action containing the textures of each frame
                action.frames[i] = new PIXI.Texture(texture, {
                    x: action.indices[i] * config.frameWidth,
                    y: action.row * config.frameHeight,
                    width: config.frameWidth,
                    height: config.frameHeight
                });
                PIXI.TextureCache[PIXI.TextureCacheIdGenerator++] = action.frames[i];
            }
        }


        this.sprite = new PIXI.Sprite(texture);
        stage.addChild(this.sprite);
    }

    //Tilemap: function(tilesetPath, layers) {
    //    this.tilesetPath = tilesetPath;
    //    this.texture = PIXI.Texture.fromImage(tilesetPath)
    //    this.sprite = new PIXI.Sprite(texture);
    //    this.layers = new PIXI.
    //}
};
