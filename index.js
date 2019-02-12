var express = require("express");
var path = require("path");
var cors = require("cors");
var helmet = require("helmet");
var bodyParser = require("body-parser");

var tennisAPI = require("./api/v1/tennis.js");
//var soccerAPI = require("./api/v1/soccer.js");
//var basketballAPI = require("./api/v1/basketball.js");

var app = express();
var port = (process.env.PORT || 10000);

var BASE_API_PATH = "/api/v1";

var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://raul:raul1234@ds223605.mlab.com:23605/tfg1";

var dbTennis;
var dbSoccer;
var dbBasketball;

app.use(bodyParser.json()); 
app.use(helmet());
app.use(cors());

MongoClient.connect(mdbURL,{useNewUrlParser:true}, function(err,mlabs){
    
    if(err){
        console.log("CAN NOT CONNECT TO DB: " +err);
        process.exit(1);
    }
    
    var database = mlabs.db("tfg1");
    dbTennis = database.collection("tennis");
    //dbSoccer = database.collection("soccer");
    //dbBasketball = database.collection("basketball");
    
    tennisAPI.register(app, dbTennis, BASE_API_PATH);
    
    //soccerAPI.register(app, dbSoccer, BASE_API_PATH);

    //basketballAPI.register(app, dbBasketball, BASE_API_PATH);

    app.listen(port, () => {
       console.log("Server running in port: " + port);
    
    }).on("error",(e)=>{
        console.log("Server cannot be started: "+e);
        process.exit(1);
    });
});

var publicFolder = path.join(__dirname, "public");

app.use("/", express.static(publicFolder));