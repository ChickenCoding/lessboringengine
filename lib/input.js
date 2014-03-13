var Class = require('../lib/class');

var Input = Class.extend({
    init: function() {
        this.keyNameToCode = {
            'backspace': 8,
            'tab': 9,
            'enter': 13,
            'shift': 16,
            'ctrl': 17,
            'alt': 18,
            'pause': 19,
            'capslock': 20,
            'escape': 27,
            'pageUp': 33,
            'pageDown': 34,
            'end': 35,
            'home': 36,
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'insert': 45,
            'delete': 46,
            '_0': 48,
            '_1': 49,
            '_2': 50,
            '_3': 51,
            '_4': 52,
            '_5': 53,
            '_6': 54,
            '_7': 55,
            '_8': 56,
            '_9': 57,
            'a': 65,
            'b': 66,
            'c': 67,
            'd': 68,
            'e': 69,
            'f': 70,
            'g': 71,
            'h': 72,
            'i': 73,
            'j': 74,
            'k': 75,
            'l': 76,
            'm': 77,
            'n': 78,
            'o': 79,
            'p': 80,
            'q': 81,
            'r': 82,
            's': 83,
            't': 84,
            'u': 85,
            'v': 86,
            'w': 87,
            'x': 88,
            'y': 89,
            'z': 90,
            'leftWindows': 91,
            'rightWindows': 92,
            'select': 93,
            'numpad0': 96,
            'numpad1': 97,
            'numpad2': 98,
            'numpad3': 99,
            'numpad4': 100,
            'numpad5': 101,
            'numpad6': 102,
            'numpad7': 103,
            'numpad8': 104,
            'numpad9': 105,
            'multiply': 106,
            'add': 107,
            'subtract': 109,
            'decimal': 110,
            'divide': 111,
            'f1': 112,
            'f2': 113,
            'f3': 114,
            'f4': 115,
            'f5': 116,
            'f6': 117,
            'f7': 118,
            'f8': 119,
            'f9': 120,
            'f10': 121,
            'f11': 122,
            'f12': 123,
            'numLock': 144,
            'scrollLock': 145,
            'semicolon': 186,
            'equal': 187,
            'comma': 188,
            'dash': 189,
            'period': 190,
            'slash': 191,
            'grave': 192,
            'leftBracket': 219,
            'backslash': 220,
            'rightBracket': 221,
            'quote': 222
        };

        this.keys = {};
        this.keyCodeToName = [];
        // Initialize the keys hash using the keycodes
        for (var keyName in this.keyNameToCode) {
            var keyCode = this.keyNameToCode[keyName];
            this.keyCodeToName[keyCode] = keyName;
            this.keys[keyName] = false;
        }
        window.addEventListener('keydown', this.keyDown.bind(this), false);
        window.addEventListener('keyup', this.keyUp.bind(this), false);
        this.eventQueue = [];
    },

    keyDown: function(event) {
        this.eventQueue.push({ kind: 'keyDown', value: event.keyCode });
    },

    keyUp: function(event) {
        this.eventQueue.push({ kind: 'keyUp', value: event.keyCode });
    },

    update: function() {
        for (var keyName in this.keys) {
            if (this.keys[keyName] == 'hit') {
                this.keys[keyName] == 'held';
            }
        }
        for (var i=0; i<this.eventQueue.length; i++) {
            var event = this.eventQueue[i];
            if (event.kind === 'keyUp') {
                this.keys[this.keyCodeToName[event.value]] = false;
            }
            if (event.kind === 'keyDown') {
                this.keys[this.keyCodeToName[event.value]] = 'hit';
            }
        }
        this.eventQueue = [];
    }
});

module.exports = Input;
