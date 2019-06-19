var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbTennis, BASE_API_PATH, checkApiKeyFunction) {


//Load Initial Data

app.get(BASE_API_PATH + "/tennis/loadDefault",function(request, response) {
    
    dbTennis.find({}).toArray(function(err,tennisvariables){
        
        if (err) {
            console.error('WARNING: Error while getting default values from DB');
            return 0;
        }
    
        if (tennisvariables.length === 0) {
            console.log('INFO: Empty DB, loading default values');

            var tennisvariables = [{
                "variable": "aces",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "dobles faltas",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"1",
                "positive":"-1"
            },
            {
                "variable": "primer servicio",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "puntos ganados primer servicio",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"1",
                "positive":"1"
            },
            {
                "variable": "puntos ganados al segundo servicio",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "puntos de break salvados",
                "weight": "40",
                "recommendedweight": "Alto",
                "include":"1",
                "positive":"1"
            },
            {
                "variable": "puntos ganados al servicio",
                "weight": "25",
                "recommendedweight": "Bajo",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "juegos ganados al servicio",
                "weight": "25",
                "recommendedweight": "Bajo",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "tie-breaks ganados",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "sets ganados",
                "weight": "10",
                "recommendedweight": "Bajo",
                "include":"1",
                "positive":"1"
            },
            {
                "variable": "partidos ganados",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "victorias rival superior",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "derrotas rival inferior",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"-1"
            }
            ];
        
            dbTennis.insert(tennisvariables);
            response.sendStatus(200); //Ok
        } else {
            console.log('INFO: DB has ' + tennisvariables.length + ' objects ');
            response.sendStatus(200); //Ok
        }
    });
});


//Load Empty Data

app.get(BASE_API_PATH + "/tennis/loadEmpty",function(request, response) {
    
    dbTennis.find({}).toArray(function(err,tennisvariables){
        
        if (err) {
            console.error('WARNING: Error while getting default values (empty) from DB');
            return 0;
        }
    
        if (tennisvariables.length === 0) {
            console.log('INFO: Empty DB, loading default values (empty)');

            var tennisvariables = [{
                "variable": "aces",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "dobles faltas",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"0",
                "positive":"-1"
            },
            {
                "variable": "primer servicio",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "puntos ganados primer servicio",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "puntos ganados al segundo servicio",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "puntos de break salvados",
                "weight": "40",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "puntos ganados al servicio",
                "weight": "25",
                "recommendedweight": "Bajo",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "juegos ganados al servicio",
                "weight": "25",
                "recommendedweight": "Bajo",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "tie-breaks ganados",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "sets ganados",
                "weight": "10",
                "recommendedweight": "Bajo",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "partidos ganados",
                "weight": "25",
                "recommendedweight": "Medio",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "victorias rival superior",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"1"
            },
            {
                "variable": "derrotas rival inferior",
                "weight": "25",
                "recommendedweight": "Alto",
                "include":"0",
                "positive":"-1"
            }
            ];
        
            dbTennis.insert(tennisvariables);
            response.sendStatus(200); //Ok
        } else {
            console.log('INFO: DB has ' + tennisvariables.length + ' objects ');
            response.sendStatus(200); //Ok
        }
    });
});

/*
// GET Collection [OLD]

app.get(BASE_API_PATH + "/tennis", function (request, response) {
    
    console.log("INFO: New GET request to /tennis");
    
    dbTennis.find({}).toArray(function(err, tennisvariables) {
        if (err) {
            console.error('ERROR from database');
            response.sendStatus(500); // internal server error
            
        } else {
            if (tennisvariables.length === 0) {
                response.sendStatus(404);
                return;
            }
            
            response.send(tennisvariables);
            console.log("INFO: Sending tennis variables: " + JSON.stringify(tennisvariables, 2, null));
            }
    });
});
*/


// GET Collection [WITH INCLUDE]

app.get(BASE_API_PATH + "/tennis", function (request, response) {
    
    console.log("INFO: New GET request to /tennis");
    var include = request.query.include;

    if (include) {
        dbTennis.find({include:include}).toArray(function(err, tennisvariables) {    // .skip(offset).limit(limit)
            if (err) {
                console.error('ERROR from database');
                response.sendStatus(500); // internal server error
            }else {
                if (tennisvariables.length === 0) {
                response.sendStatus(404);
                return;
            }
            
            response.send(tennisvariables);
            console.log("INFO: Sending tennis variables: " + JSON.stringify(tennisvariables, 2, null));
            }
        });
        
    } else {
        dbTennis.find({}).toArray(function(err, tennisvariables) {
        if (err) {
            console.error('ERROR from database');
            response.sendStatus(500); // internal server error
            
        } else {
            if (tennisvariables.length === 0) {
                response.sendStatus(404);
                return;
            }
            
            response.send(tennisvariables);
            console.log("INFO: Sending tennis variables: " + JSON.stringify(tennisvariables, 2, null));
            }
        });
    }
});


// GET Items by variable

app.get(BASE_API_PATH + "/tennis/:variable", function (request, response) {
    
    var variable = request.params.variable;
    
    if(isNaN(request.params.variable.charAt(0))){
        if (!variable) {
            console.log("WARNING: New GET request to /tennis/:variable without variable name, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            console.log("INFO: New GET request to /tennis/" + variable);
            
            dbTennis.find({variable:variable}).toArray(function (err, tennisvariables) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                
                } else if (tennisvariables.length > 0) { 
                    var tennis = tennisvariables; //we expect only one result
                    console.log("INFO: Sending variable: " + JSON.stringify(tennis, 2, null));
                    response.send(tennis);
                
                } else {
                    console.log("WARNING: There are not any variable with name " + variable);
                    response.sendStatus(404); // not found
                }
        });
}
    
}});


//POST Collection

app.post(BASE_API_PATH + "/tennis", function (request, response) {
    
    var newTennisVariable = request.body;
    if (!newTennisVariable) {
        console.log("WARNING: New POST request to /tennis/ without variable, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /tennis with body: " + JSON.stringify(newTennisVariable, 2, null));
        if (!newTennisVariable.variable || !newTennisVariable.weight || !newTennisVariable.recommendedweight) {
            console.log("WARNING: The variable " + JSON.stringify(newTennisVariable, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            dbTennis.find({country:newTennisVariable.variable}).toArray(function (err, tennisvariables) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var tennisVariableBeforeInsertion = tennisvariables.filter((tennisvariable) => {
                        return (tennisvariable.variable.localeCompare(tennisvariable.variable, "en", {'sensitivity': 'base'}) === 0);
                    });

                    if (tennisVariableBeforeInsertion.length > 0) {
                        console.log("WARNING: The variable " + JSON.stringify(newTennisVariable, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding variable " + JSON.stringify(newTennisVariable, 2, null));
                        dbTennis.insert(newTennisVariable);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});



//POST Item (FORBIDDEN)

app.post(BASE_API_PATH + "/tennis/:variable", function (request, response) {
    
    var variable = request.params.variable;
    console.log("WARNING: New POST request to /tennis/" + variable + ", sending 405...");
    response.sendStatus(405); // method not allowed
});



//PUT Collection (FORBIDDEN)

app.put(BASE_API_PATH + "/tennis", function (request, response) {
    console.log("WARNING: New PUT request to /tennis, sending 405...");
    response.sendStatus(405); // method not allowed
});



//DELETE Item

app.delete(BASE_API_PATH + "/tennis/:variable", function (request, response) {
    
    var variable = request.params.variable;
    if (!variable) {
        console.log("WARNING: New DELETE request to /tennis/:variable without variable, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /tennis/" + variable);
        dbTennis.remove({variable:variable}, {}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Variables removed: " + numRemoved.n);
                if (numRemoved.n === 1) {
                    console.log("INFO: The variable " + variable + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no variables to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});



//PUT Item

app.put(BASE_API_PATH + "/tennis/:variable", function (request, response) {
    
    var updatedVariable = request.body;
    var variable = request.params.variable;
    
    if (!updatedVariable) {
        console.log("WARNING: New PUT request to /tennis/ without variable, sending 400...");
        response.sendStatus(400); // bad request
    
    } else {
        console.log("INFO: New PUT request to /tennis/" + variable + " with data " + JSON.stringify(updatedVariable, 2, null));
        
        if (!updatedVariable.variable || !updatedVariable.weight || !updatedVariable.recommendedweight || !updatedVariable.include 
                || updatedVariable.variable !== variable) { //keep an eye on this
            console.log("WARNING: The variable " + JSON.stringify(updatedVariable, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        
        } else {
            dbTennis.find({variable:updatedVariable.variable}).toArray(function (err, tennisvariables) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                
                } else if (tennisvariables.length > 0) {
                    dbTennis.update({variable: updatedVariable.variable}, updatedVariable);
                    console.log("INFO: Modifying variable " + variable + " with data " + JSON.stringify(updatedVariable, 2, null));
                    response.send(updatedVariable); // return the updated contact
                    
                } else {
                    console.log("WARNING: Variable " + variable + "does not exist");
                    response.sendStatus(404); // not found
                }
            }
        )}
    }
});



//DELETE Collection

app.delete(BASE_API_PATH + "/tennis", function (request, response) {
    
    console.log("INFO: New DELETE request to /tennis");
    dbTennis.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All the variables (" + numRemoved.n + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no variables to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});

/*
// Proxy

app.get("/proxyRaul", (req, res) => {
    var http = require('http');
    
    var options = {
        host:'sos1617-06.herokuapp.com',   
        path:'/api/v1/education?apikey=secret' 
    };
    
    callback = function(response){
        var str = '';
        
        response.on('data', function(chunk){
           str += chunk; 
        });
        
        response.on('end', function(){
           res.send(str); 
        });
    };
    
    http.request(options, callback).end();
});
*/
};