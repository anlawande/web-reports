var fs = require("fs");
var stringify = require("json-stringify-safe");

var APP_LOG = "./app.log";
var DUMP_LOG = "./dump.log";

function init(resolve, reject) {
    fs.writeFileSync(DUMP_LOG, "");
    fs.appendFileSync(APP_LOG, "-------------------------------------------------\r\n");
    resolve();
}

function log(str) {
    
    var d = new Date();
    str = d.toTimeString() + "\tINFO : " + str + "\r\n";
    
    fs.appendFile(APP_LOG, str);
}

function error(str) {
    var d = new Date();
    str = d.toTimeString() + "\tERROR : " + str + "\r\n";
    
    fs.appendFile(APP_LOG, str);
}

function dumpObj(obj) {
    fs.writeFile(DUMP_LOG, stringify(obj));
}

exports.init = init;
exports.log = log;
exports.error = error;
exports.dumpObj = dumpObj;