var SRC_DIR = "./src/";

var requester = require(SRC_DIR + "requester.js");
var eventManager = require(SRC_DIR + "eventManager.js");
var logger = require(SRC_DIR + "logger.js");
var db = require(SRC_DIR + "db.js");

eventManager.onInit([logger]).then(appInit);

function appInit() {
    eventManager.onInit([db, requester]).then(function(){
        console.log("Application initialized");
        logger.log("Application initialized");
    });
}