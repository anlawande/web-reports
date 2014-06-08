var SRC_DIR = "./src/";

var requester = require(SRC_DIR + "requester.js");
var eventManager = require(SRC_DIR + "eventManager.js");
var logger = require(SRC_DIR + "logger.js");

eventManager.onInit([logger]).then(appInit);

function appInit() {
    eventManager.onInit([requester]).then(function(){
        logger.log("Application initialized");
    });
}