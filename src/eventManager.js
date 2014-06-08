var EventEmitter = require("events").EventEmitter;
var Promise = require("promise");

eventEmitter = new EventEmitter();
var modulesArr = [];

function getModule(module) {
    for(var i = 0; i < modulesArr.length; i++) {
        if(modulesArr[i].module === module) {
            return modulesArr[i];
        }
    }
    
    return null;
}

function newModule(module) {
    modulesArr.push({
        "module" : module
    });
    
    return modulesArr[modulesArr.length-1];
}

exports.on = function(event, callback) {
    eventEmitter.on(event, callback);
};

exports.emit = function(event, data) {
    eventEmitter.emit(event);
}

exports.onInit = function(module) {
    
    if(!module.length)
        module = [module];
    
    var promiseAll = [];
    for(var i = 0; i < module.length; i++) {
        
        var moduleT = getModule(module[i]);
        
        if(moduleT === null) {
            promise = new Promise(module[i].init);
            newModule(module[i]).promise = promise;
        }
        else
            promise = moduleT.promise;
        
        promiseAll.push(promise);
    }
    
    return Promise.all(promiseAll);
}