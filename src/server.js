var express = require("express");
var logger = require("./logger.js");

var app = express();

function init(resolve, reject) {
    setRoutes();
    setupServer();
    resolve();
}

function setRoutes() {
    app.get('/hello', function(req, res){
        res.send('Hello World');
    });
}

function setupServer() {
    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
        logger.log("Server up at port " + server.address().port);
    });
}

exports.init = init;