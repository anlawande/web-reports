var request = require('request');
var eventManager = require("./eventManager.js");
var logger = require("./logger.js");

var FIDDLER_PROXY_URL = "http://127.0.0.1:8888";

function init(resolve, reject) {
    request({
        url: 'http://www.google.com',
        proxy: FIDDLER_PROXY_URL
    }, function (error, response, body) {
        if (!error){
            console.log("Using fiddler proxy @ " + FIDDLER_PROXY_URL);
            logger.log("Using fiddler proxy @ " + FIDDLER_PROXY_URL);
            request = request.defaults({
                proxy: FIDDLER_PROXY_URL
            });
        }
        else {
            console.log("Fiddler not running, using system proxy");
            logger.log("Fiddler not running, using system proxy");
        }
        
        resolve();
    });
}

function makeRequest(url, opts) {
    request({
        url: 'http://www.google.com',
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Done");
        }
    });
}

exports.init = init;