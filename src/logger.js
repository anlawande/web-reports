var fs = require("fs");

var APP_LOG = "./app.log";
var DUMP_LOG = "./dump.log";

function init(resolve, reject) {
    fs.writeFileSync(DUMP_LOG, "");
    fs.appendFileSync(APP_LOG, "-------------------------------------------------\r\n");
    resolve();
}

function log(str) {
    
    var d = new Date();
    str = d.toTimeString() + ": " + str + "\r\n";
    
    fs.appendFile(APP_LOG, str);
}

exports.init = init;
exports.log = log;