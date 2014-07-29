var db = require("./db.js");
var Promise = require("promise");
var PCQueue = require("promise-pc").PCQueue;
var requester = require("./requester.js");
var logger = require("./logger.js");
var helper = require("./catalogHelper.js");
var cheerio = require("cheerio");
var fs = require("fs");
var eventManager = require("./eventManager.js");
var sites, num_sites_total, num_sites_loaded = 0;
var RequestQueue;

function init(resolve, reject) {
    RequestQueue = new PCQueue({
        maxParallel : 5
    });
    eventManager.onInit(db).then(function() {
        getAllSites().then(function() {
            resolve();
        }, function(err) {
            reject(err);
        });
    });
}

function getAllSites() {
    return db.Catalog.getAllSites().then(function(results){
        sites = results;
        num_sites_total = sites.length;
    }, function(error) {
        console.log(error);
    });
}

function getRelevantFields(obj) {

    return {
        "body" : obj.body,
        "headers" : obj.headers
    }
}

function refreshCatalog() {
    console.log("Refreshing Catalog");

    return new Promise(function(resolve, reject) {
        for(var i = 0; i < sites.length; i++) {
            var site = sites[i];
            var site_url = sites[i].url;
            var promise = RequestQueue.produce(function() {
                return requester.makeRequest(site_url);
            });

            promise.done(function(response) {
                logger.dumpObj(response);
                logger.log("Catalog item - " + site_url +" : " + response.statusCode);

                processResponse(response, site);
                
                if(++num_sites_loaded === num_sites_total)
                    resolve();
            }, function(err) {
                console.log(err);
                logger.error(err);
                
                if(++num_sites_loaded === num_sites_total)
                    resolve();
            });
        }
    });
}

function processResponse(response, requestSite) {
    
    var contentType = response.headers["content-type"];
    var ext = helper.getFileExtension(contentType);
    var filename = "/" + requestSite.name + "/" + requestSite.name + ext;
    
    helper.writeFile(filename, JSON.stringify(response.body));
}

function runJsInCatalog() {
    var $ = cheerio.load(response.body);
    
    var vm = require("vm");
    
    var result = vm.runInNewContext("$('script')", {$ : $});
    console.log(result.length);
}

function cleanCatalog() {

    throw "Not Implemented";
}

exports.init = init;
exports.refreshCatalog = refreshCatalog;
exports.cleanCatalog = cleanCatalog;