var assert = require("assert");
var SRC_DIR = "../src";
var fs = require("fs");
var db = require(SRC_DIR + "/db.js");
var eventManager = require(SRC_DIR + "/eventManager.js");
var helper = require(SRC_DIR + "/catalogHelper.js");
var logger = require(SRC_DIR + "/logger.js");
logger.log = function(msg) {
    return;
}


describe("Catalog Helper tests", function() {
    it("should return proper extension based on content-type", function() {
        assert.equal(helper.getFileExtension("text/html; charset=ISO-8859-1"), ".html");
        assert.equal(helper.getFileExtension("text/css; charset=ISO-8859-1"), ".css");
        assert.equal(helper.getFileExtension("text/javascript; charset=ISO-8859-1"), ".js");
    });
    
    it("sould create a file with heirarchy at path", function(done) {
        if(fs.existsSync("./catalog/test/test2/testFile.txt"))
            deleteFolderRecursive("./catalog/test");
        
        helper.writeFile("/test/test2/testFile.txt", "Some content", function() {
            assert.equal(fs.existsSync("./catalog/test/test2/testFile.txt"), true);
            
            if(fs.existsSync("./catalog/test/test2/testFile.txt"))
                deleteFolderRecursive("./catalog/test");
            
            done();
        });
    });
});

describe("DB tests", function() {
    it("should return all sites", function(done) {
        eventManager.onInit(db).done(function() {
            db.Catalog.getAllSites().done(function(results) {
                var googleSite = results.filter(function(elem) {
                    return elem.name === "Google home";
                });
                if(googleSite.length === 1)
                    done();
                else
                    done("There was some problem");
            });
        });
    });
});

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};