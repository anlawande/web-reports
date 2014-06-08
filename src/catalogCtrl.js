var db = require("./db.js");

db.Catalog.getAllSites().then(function(data){
    console.log(data);
});