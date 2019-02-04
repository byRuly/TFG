var express = require("express");
var port = (process.env.PORT || 16778);
var app = express();
var path = require('path');
var publicFolder = path.join(__dirname, 'public');

app.listen(port,(err) => {
    if(!err)
        console.log("Server initialized on port " + port);
    else
        console.log("ERROR initializing server on port " + port + ": " + err);
});

app.get("/",(req,res)=>{
    res.send("<html><body><h1>HOLA</h1></body></html>");
});