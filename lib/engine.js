var Class = require('lib/class');
var Signal = require('vendor/signals');
var _ = require('vendor/lodash');

var Engine = Class.extend({
    init: function() {
        this.systems = [];
        this.entities = [];
        this.nodes = [];
    },

    addSystem: function(system, priority) {
        // Gather the nodes for this system from the current entities
        for (var i=0; i<this.entities.length; i++) {
            var entity = this.entities[i];
            if (entity.hasAll(system.requiredComponents)) {
                system.nodes.push(entity.getAll(system.requiredComponents));
            }
        }
        // Add the system with a priority to the engine
        if (this.systems[priority] === undefined) {
            this.systems[priority] = [];
        }
        this.systems[priority].push(system);
    },
    removeSystem: function(system) {
        // Maybe at some point have a node pool to reduce garbage collection?
        // Currently nodes are just anonymous hashes
        _.remove(this.systems, system);
    },

    addEntity: function(entity) {
        // See if this entity should be added to any existing systems
        for (var priority=0; priority<this.systems.length; priority++) {
            var priorityList = this.systems[priority];
            if (priorityList !== undefined) {
                for (var i=0; i<priorityList.length; i++) {
                    var system = priorityList[i];
                    if (entity.hasAll(system.requiredComponents)) {
                        system.nodes.push(entity.getAll(system.requiredComponents));
                    }
                }
            }
        }
        entity.componentAdded.add(this.componentAdded, this);
        entity.componentRemoved.add(this.componentRemoved, this);
        this.entities.push(entity);
    },

    removeEntity: function(entity) {
        for (var i=0; i<this.systems.length; i++) {
            var system = this.systems[i];
            // Remove this entity from any systems' nodes that are using it
            if (entity.hasAll(system.requiredComponents)) {
                for (var j=0; j<system.nodes.length; j++) {
                    var node = system.nodes[j];
                    if (node._entity === entity) {
                        _.remove(node, system.nodes);
                        // Theoretically there should only be one match
                        break;
                    }
                }
            }
        }
        entity.componentAdded.remove(this.componentAdded);
        entity.componentRemoved.remove(this.componentRemoved);
        _.remove(entity, this.entities);
    },

    update: function() {
        for (var priority=0; priority<this.systems.length; priority++) {
            var priorityList = this.systems[priority];
            if (priorityList !== undefined) {
                for (var i=0; i<priorityList.length; i++) {
                    var system = priorityList[i];
                    system.update();
                }
            }
        }
    },

    // Signal callbacks
    componentAdded: function() {
        // TODO implement me
        console.log('Registered a component added from engine.');
    },

    componentRemoved: function(entity, componentName) {
        // TODO implement me
        console.log('Registered a component removed from engine.');
    }
});

module.exports = Engine;
