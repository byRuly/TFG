var express = require("express");
var path = require("path");

var tennisAPI = require("./api/v1/tennis.js");
var soccerAPI = require("./api/v1/soccer.js");
var basketballAPI = require("./api/v1/basketball.js");

var app = express();
var port = (process.env.PORT || 10000);

var BASE_API_PATH = "/api/v12";

var MongoClient = require("mongodb").MongoClient;
var mdbURL = "";

var dbTennis;
var dbSoccer;
var dbBasketball;

MongoClient.connect(mdbURL,{native_parser:true}, function(err,database){
    
    if(err){
        console.log("CAN NOT CONNECT TO DB: " +err);
        process.exit(1);
    }
    
    dbTennis = database.collection("results");
    dbSoccer = database.collection("earlyleavers");
    dbBasketball = database.collection("investmentseducation");
    
    tennisAPI.register(app, dbTennis, BASE_API_PATH);
    
    soccerAPI.register(app, dbSoccer, BASE_API_PATH);

    basketballAPI.register(app, dbBasketball, BASE_API_PATH);

    app.listen(port, () => {
       console.log("Server running in port: " + port);
    
    }).on("error",(e)=>{
        console.log("Server cannot be started: "+e);
        process.exit(1);
    });
});

var publicFolder = path.join(__dirname, "public");

app.use("/", express.static(publicFolder));