var Class = require('lib/class');

var System = Class.extend({
    init: function() {
        this.nodes = [];
        this.requiredComponents = [];
    },
    update: function() {
        for (var i=0; i<this.nodes.length; i++) {
            this.updateNode(this.nodes[i]);
        }
    }
});

module.exports = System;
