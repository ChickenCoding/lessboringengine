var Class = require('./class');
var Signal = require('../vendor/signals');

var Entity = Class.extend({
    init: function() {
        this.components = {};
        this.componentAdded = new Signal();
        this.componentRemoved = new Signal();
    },
    add: function(component) {
        if (component._name in this.components) {
            throw new Error('This component is already attached to this entity!');
        }
        this.components[component._name] = component;
        this.componentAdded.dispatch(component._name);
        return this;
    },
    remove: function(componentName) {
        if (componentName in this.components) {
            delete this.components[componentName];
            this.componentRemoved.dispatch(this, componentName);
        }
        else {
            throw new Error('This component is not a part of this entity!');
        }
    },
    has: function(componentName) {
        return componentName in this.components;
    },
    hasAll: function(componentNames) {
        for (var i=0; i<componentNames.length; i++) {
            if (!this.has(componentNames[i])) {
                return false;
            }
        }
        return true;
    },
    getAll: function(componentNames) {
        var components = {};
        for (var i=0; i<componentNames.length; i++) {
            var componentName = componentNames[i];
            if (this.has(componentName)) {
                components[componentName] = this.components[componentName];
            }
        }
        components._entity = this; // Allows nodes to be removed later
        return components;
    }
});

module.exports = Entity
