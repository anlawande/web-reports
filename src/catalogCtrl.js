var db = require("./db.js");

db.Catalog.getAllSites().then(function(results){
    console.log(results);
}, function(error) {
    console.log(error);
});