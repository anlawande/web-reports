var SRC_DIR = "./src/";

var requester = require(SRC_DIR + "requester.js");
var eventManager = require(SRC_DIR + "eventManager.js");
var catalogCtrl = require(SRC_DIR + "catalogCtrl.js");
var logger = require(SRC_DIR + "logger.js");
var db = require(SRC_DIR + "db.js");
var server = require(SRC_DIR + "server.js");

eventManager.onInit([logger]).then(appInit);

function appInit() {
    eventManager.onInit([db, requester, catalogCtrl/*, server*/]).done(function(){
        console.log("Application initialized");
        logger.log("Application initialized");
        catalogCtrl.refreshCatalog().done(function() {
            console.log("Catalog refreshed");
            logger.log("Catalog refreshed");
        });
    });
}