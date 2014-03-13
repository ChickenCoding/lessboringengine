/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

///*
// * Original author: Axel Rauschmayer
// * Original code: https://github.com/rauschma/class-js
// */
//var Class = {
//    extend: function (properties) {
//        var superProto = this.prototype || Class;
//        var proto = Object.create(superProto);
//        Class.copyOwnTo(properties, proto);
//
//        var constr = proto.constructor;
//        if (!(constr instanceof Function)) {
//            throw new Error("You must define a method 'constructor'");
//        }
//        constr.prototype = proto;
//        constr.super = superProto;
//        constr.extend = this.extend;
//        return constr;
//    },
//    copyOwnTo: function(source, target) {
//        Object.getOwnPropertyNames(source).forEach(function(propName) {
//            Object.defineProperty(target, propName,
//                Object.getOwnPropertyDescriptor(source, propName));
//        });
//        return target;
//    }
//};

module.exports = Class;
