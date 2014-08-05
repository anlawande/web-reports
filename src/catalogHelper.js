var CATALOG_PATH = "./catalog";
var fs = require("fs");

function writeFile(path, content, callback) {
    path = CATALOG_PATH + path;
    createDirectoryHeirarchy(path);
    fs.writeFile(path, content, {encoding: 'utf-8'}, callback);
}

function createDirectoryHeirarchy(path) {
    var directories = path.split("/");
    var currPath = "";
    for(var i = 0; i < directories.length - 1; i++) {
        currPath += directories[i];
        if(i > 1 && !fs.existsSync(currPath)) {
            fs.mkdirSync(currPath);
        }
        currPath += "/";
    }
}

function getFileExtension(contentType) {
    var ext = ".";
    
    if(/text\/html/.test(contentType)) {
        ext += "html";
    }
    else if (/text\/css/.test(contentType)) {
        ext += "css";
    }
    else if (/text\/javascript/.test(contentType)) {
        ext += "js";
    }
    else {
        ext += "response";
    }
    
    return ext;
}

function updateDocs() {
    
}

exports.writeFile = writeFile;
exports.getFileExtension = getFileExtension;