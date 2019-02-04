var express = require("express");
var path = require('path');

var app = express();
var port = (process.env.PORT || 16778);

var publicFolder = path.join(__dirname, "public");

app.use("/", express.static(publicFolder));

app.get("/hello",(req,res)=>{
    res.send("Hello");
});

app.listen(port,()=>{
   console.log("Server running in port " + port); 
}).on("error",(e)=>{
    console.log("Server cannot be started: "+e);
    process.exit(1);
});