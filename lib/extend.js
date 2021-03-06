"use strict";

var isObject = function (v) {
    return Object.prototype.toString.call(v) === '[object Object]';
};

var iterate = function (to, from) {
    for (var key in from) {
        if (from.hasOwnProperty(key) && !isObject(from[key])) {
            if (from.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        } else {
            if(to.hasOwnProperty(key)) {
                iterate(to[key], from[key]);
            } else {
                to[key] = {};
                iterate(to[key], from[key]);
            }
        }
    }
    return to;
};

var extend_one = function (to, from) {
    var obj = {};
    for(var key in to) {
        if(to.hasOwnProperty(key)) {
            obj[key] = to[key];
        }
    }
    return iterate(obj, from);
};

var extend = function(to) {
    var temp = {};
    for(var i = 1; i < arguments.length; i++) {
        temp = extend_one(temp, arguments[i]);
    }
    return extend_one(to, temp);
};

module.exports = extend;
