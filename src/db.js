var Promise = require("promise");

//TODO Move to config
var dbName = "web_reports";

var connection_string = '127.0.0.1:27017/' + dbName;
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var mongojs = require('mongojs');
var db = mongojs(connection_string, ['catalog']);
//db.on("error", function() {
//    
//});

function errorObj() {
    this.message = "";
    this.isError = true;
}

function handleFindResults(results, callback){

    return function(err, doc){
        if(err) {
            var error = new errorObj();
            error.message = err.message;
            callback(error);
            return;
        }

        //TODO WTF is with the extra null
        if(doc !== null) {
            results.push(doc);
        }
        else
            callback(results);
    }
}

function handleDistinctResults(results, callback){

    return function(err, list){
        if(err) {
            var error = new errorObj();
            error.message = err.message;
            callback(error);
            return;
        }

        results = results.concat(list);
        callback(results);
    }
}

function handleInsert(callback) {

    return function(err) {
        if(err) {
            var error = new errorObj();
            error.message = err.message;
            callback(false);
            //callback(error)
            return;
        }
        else
            callback(true);
    }
}

function getAllSites() {
    var results = [];

    var promise = new Promise(function(resolve, reject) {
        db.catalog.find({}, function(err, docs){
            if(!err)
                resolve(docs);
            else {
                console.log(err);
            }
        })
    });
    
    return promise;
}

function getAllVideos(callback) {
    var results = [];

    db.video.find()
    .forEach(handleFindResults(results, callback));
}

function getAllCategories(callback){
    var results = [];

    db.video.distinct('category', handleDistinctResults(results, callback));
}

function getCategoryVideos(category, callback) {
    var results = [];

    db.video.find({"category" : category})
    .limit(10)
    .forEach(handleFindResults(results, callback));
}

function insertVideo(video, callback) {

    db.video.insert(video, handleInsert(callback));
}

var Catalog = {
    'getAllSites' : getAllSites,
};

exports.Catalog = Catalog;