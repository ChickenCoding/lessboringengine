var System = require('lib/system');

module.exports = {
    ShapeRenderSystem: System.extend({
        init: function() {
            this._super();
            this.requiredComponents = [
                'graphics', 'position', 'size', 'color'
            ];
        },

        updateNode: function(node) {
            node.graphics.graphics.clear();
            node.graphics.graphics.beginFill(0xFF0000);
            node.graphics.graphics.drawRect(node.position.x, node.position.y, node.size.width, node.size.height);
        }
    }),

    MovementSystem: System.extend({
        init: function() {
            this._super();
            this.requiredComponents = [
                'position', 'velocity', 'actionInput'
            ];
        },
        updateNode: function(node) {
            node.velocity.dx = node.velocity.dy = 0;
            if (node.actionInput.left)  node.velocity.dx -= node.velocity.maxSpeed;
            if (node.actionInput.right) node.velocity.dx += node.velocity.maxSpeed;
            if (node.actionInput.up)    node.velocity.dy -= node.velocity.maxSpeed;
            if (node.actionInput.down)  node.velocity.dy += node.velocity.maxSpeed;

            node.position.x += node.velocity.dx;
            node.position.y += node.velocity.dy;
        }
    }),


    KeyboardInputSystem: System.extend({
        init: function(input) {
            this._super();
            this.requiredComponents = [
                'actionInput', 'keyboardInput'
            ];
            this.input = input;
        },
        updateNode: function(node) {
            node.actionInput.left = this.input.keys.left;
            node.actionInput.right = this.input.keys.right;
            node.actionInput.up = this.input.keys.up;
            node.actionInput.down = this.input.keys.down;
            node.actionInput.action = this.input.keys.space;
            node.actionInput.cancel = this.input.keys.escape;
        }
    }),

    RandomInputSystem: System.extend({
        init: function() {
            this._super();
            this.requiredComponents = [
                'actionInput', 'randomInput'
            ];
        },
        updateNode: function(node) {
            node.actionInput.left = node.actionInput.right = node.actionInput.up = node.actionInput.down = false;
            var chance = 0.002;
            if (Math.random() < chance)
                if (node.actionInput.left   == 'hit') node.actionInput.left   = 'held'; else node.actionInput.left   = 'hit';
            if (Math.random() < chance)
                if (node.actionInput.right  == 'hit') node.actionInput.right  = 'held'; else node.actionInput.right  = 'hit';
            if (Math.random() < chance)
                if (node.actionInput.up     == 'hit') node.actionInput.up     = 'held'; else node.actionInput.up     = 'hit';
            if (Math.random() < chance)
                if (node.actionInput.down   == 'hit') node.actionInput.down   = 'held'; else node.actionInput.down   = 'hit';
            if (Math.random() < chance)
                if (node.actionInput.action == 'hit') node.actionInput.action = 'held'; else node.actionInput.action = 'hit';
        }
    }),

    DirectionSystem: System.extend({
        init: function() {
            this._super();
            this.requiredComponents = [
                'direction', 'velocity'
            ];
        },
        updateNode: function(node) {
            if (node.velocity.dx < 0) node.direction.direction = 'left';
            if (node.velocity.dx > 0) node.direction.direction = 'right';
            if (node.velocity.dy < 0) node.direction.direction = 'up';
            if (node.velocity.dy > 0) node.direction.direction = 'down';
        }
    }),

    PlayerActionDeterminerSystem: System.extend({
        init: function() {
            this._super();
            this.requiredComponents = [
                'direction', 'currentAnimationAction', 'velocity'
            ];
        },
        updateNode: function(node) {
            if (node.velocity.dx !== 0 || node.velocity.dy !== 0) {
                if (!/^walk/.test(node.currentAnimationAction.name)) {
                    node.currentAnimationAction.name = 'walk-' + node.direction.direction;
                }
            }
            else {
                if (!/^idle/.test(node.currentAnimationAction.name)) {
                    node.currentAnimationAction.name = 'idle-' + node.direction.direction;
                }
            }
        }
    }),

    AnimationSystem: System.extend({
        init: function() {
            this._super();
            this.requiredComponents = [
                'currentAnimationAction', 'animationActions', 'position'
            ];
        },
        updateNode: function(node) {
            var anim = node.animationActions;
            var curAction = anim.actions[node.currentAnimationAction.name];
            anim.frameTimer++;
            if (anim.frameTimer >= curAction.frameLength || anim.currentFrame === undefined) {
                anim.frameTimer = 0;
                anim.currentFrameIndex++;
                if (anim.currentFrameIndex >= curAction.frames.length) {
                    anim.currentFrameIndex = 0;
                }
                anim.currentFrame = curAction.frames[anim.currentFrameIndex];
                anim.sprite.texture = anim.currentFrame;
            }

            anim.sprite.position.x = node.position.x;
            anim.sprite.position.y = node.position.y;
        }
    })
};
