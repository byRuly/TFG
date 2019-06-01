var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbPlayers, BASE_API_PATH, checkApiKeyFunction) {


//Load Initial Data

app.get(BASE_API_PATH + "/players/loadDefault",function(request, response) {
    
    dbPlayers.find({}).toArray(function(err,tennisvariables){
        
        if (err) {
            console.error('WARNING: Error while getting default values from DB');
            return 0;
        }
    
        if (tennisvariables.length === 0) {
            console.log('INFO: Empty DB, loading default values');

            var tennisplayers = [{
                "name": "Novak Djokovic",
                "nationality": "RS",
                "ace": "7.3",
                "double-fault":"2.9",
                "break-points-saved":"66.4",
                "break-points-won":"41.4",
                "first-serve-percentage":"65.9"
            },
            {
                "name": "Rafael Nadal",
                "nationality": "ES",
                "ace": "4.5",
                "double-fault":"2.7",
                "break-points-saved":"68.6",
                "break-points-won":"44.9",
                "first-serve-percentage":"66.4"
            },
            {
                "name": "Roger Federer",
                "nationality": "CH",
                "ace": "11",
                "double-fault":"2.5",
                "break-points-saved":"70.9",
                "break-points-won":"39.4",
                "first-serve-percentage":"62.4"
            },
            {
                "name": "Dominic Thiem",
                "nationality": "AT",
                "ace": "7.3",
                "double-fault":"3.6",
                "break-points-saved":"64.5",
                "break-points-won":"41.3",
                "first-serve-percentage":"61.1"
            },
            {
                "name": "Alexander Zverev",
                "nationality": "DE",
                "ace": "11.5",
                "double-fault":"5.8",
                "break-points-saved":"55",
                "break-points-won":"42.2",
                "first-serve-percentage":"63.9"
            },
            {
                "name": "Stefanos Tsitsipas",
                "nationality": "GR",
                "ace": "8.7",
                "double-fault":"3.1",
                "break-points-saved":"62.8",
                "break-points-won":"40.8",
                "first-serve-percentage":"61.3"
            },
            {
                "name": "Kei Nishikori",
                "nationality": "JP",
                "ace": "5",
                "double-fault":"2.9",
                "break-points-saved":"60.4",
                "break-points-won":"42.9",
                "first-serve-percentage":"62.5"
            },
            {
                "name": "Kevin Anderson",
                "nationality": "ZA",
                "ace": "17.9",
                "double-fault":"3.1",
                "break-points-saved":"65.8",
                "break-points-won":"35.3",
                "first-serve-percentage":"64.9"
            },
            {
                "name": "Juan Martin Del Potro",
                "nationality": "AR",
                "ace": "14.9",
                "double-fault":"2.8",
                "break-points-saved":"60.7",
                "break-points-won":"39.2",
                "first-serve-percentage":"65.3"
            },
            {
                "name": "John Isner",
                "nationality": "US",
                "ace": "25.4",
                "double-fault":"2.5",
                "break-points-saved":"70.1",
                "break-points-won":"32.1",
                "first-serve-percentage":"70.9"
            }
            ];
        
            dbPlayers.insert(tennisplayers);
            response.sendStatus(200); //Ok
        } else {
            console.log('INFO: DB has ' + tennisplayers.length + ' objects ');
            response.sendStatus(200); //Ok
        }
    });
});


// GET Collection [WITH INCLUDE]

app.get(BASE_API_PATH + "/players", function (request, response) {
    
    console.log("INFO: New GET request to /players");
    var include = request.query.include;

    if (include) {
        dbPlayers.find({include:include}).toArray(function(err, tennisplayers) {    // .skip(offset).limit(limit)
            if (err) {
                console.error('ERROR from database');
                response.sendStatus(500); // internal server error
            }else {
                if (tennisplayers.length === 0) {
                response.sendStatus(404);
                return;
            }
            
            response.send(tennisplayers);
            console.log("INFO: Sending tennis players: " + JSON.stringify(tennisplayers, 2, null));
            }
        });
        
    } else {
        dbPlayers.find({}).toArray(function(err, tennisplayers) {
        if (err) {
            console.error('ERROR from database');
            response.sendStatus(500); // internal server error
            
        } else {
            if (tennisplayers.length === 0) {
                response.sendStatus(404);
                return;
            }
            
            response.send(tennisplayers);
            console.log("INFO: Sending tennis players: " + JSON.stringify(tennisplayers, 2, null));
            }
        });
    }
});


// GET Items by variable

app.get(BASE_API_PATH + "/players/:name", function (request, response) {
    
    var name = request.params.name;
    
    if(isNaN(request.params.name.charAt(0))){
        if (!name) {
            console.log("WARNING: New GET request to /players/:name without name, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            console.log("INFO: New GET request to /players/" + name);
            
            dbPlayers.find({name:name}).toArray(function (err, tennisplayers) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                
                } else if (tennisplayers.length > 0) { 
                    var tennis = tennisplayers; //we expect only one result
                    console.log("INFO: Sending player: " + JSON.stringify(tennis, 2, null));
                    response.send(tennis);
                
                } else {
                    console.log("WARNING: There are no players with name " + name);
                    response.sendStatus(404); // not found
                }
        });
}
    
}});


//POST Collection

app.post(BASE_API_PATH + "/players", function (request, response) {
    
    var newTennisPlayer = request.body;
    if (!newTennisPlayer) {
        console.log("WARNING: New POST request to /players/ without variable, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /players with body: " + JSON.stringify(newTennisPlayer, 2, null));
        if (!newTennisPlayer.name || !newTennisPlayer.nationality) {
            console.log("WARNING: The player " + JSON.stringify(newTennisPlayer, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            dbPlayers.find({name:newTennisPlayer.name}).toArray(function (err, tennisplayers) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var tennisPlayerBeforeInsertion = tennisplayers.filter((tennisplayer) => {
                        return (tennisplayer.name.localeCompare(tennisplayer.name, "en", {'sensitivity': 'base'}) === 0);
                    });

                    if (tennisPlayerBeforeInsertion.length > 0) {
                        console.log("WARNING: The player " + JSON.stringify(newTennisPlayer, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding player " + JSON.stringify(newTennisPlayer, 2, null));
                        dbPlayers.insert(newTennisPlayer);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});



//POST Item (FORBIDDEN)

app.post(BASE_API_PATH + "/players/:player", function (request, response) {
    
    var player = request.params.player;
    console.log("WARNING: New POST request to /players/" + player + ", sending 405...");
    response.sendStatus(405); // method not allowed
});



//PUT Collection (FORBIDDEN)

app.put(BASE_API_PATH + "/players", function (request, response) {
    console.log("WARNING: New PUT request to /players, sending 405...");
    response.sendStatus(405); // method not allowed
});



//DELETE Item

app.delete(BASE_API_PATH + "/players/:name", function (request, response) {
    
    var name = request.params.name;
    if (!name) {
        console.log("WARNING: New DELETE request to /players/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /players/" + name);
        dbPlayers.remove({name:name}, {}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Players removed: " + numRemoved.n);
                if (numRemoved.n === 1) {
                    console.log("INFO: The player " + name + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no players to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});



//PUT Item

app.put(BASE_API_PATH + "/players/:name", function (request, response) {
    
    var updatedPlayer = request.body;
    var name = request.params.name;
    
    if (!updatedPlayer) {
        console.log("WARNING: New PUT request to /players/ without name, sending 400...");
        response.sendStatus(400); // bad request
    
    } else {
        console.log("INFO: New PUT request to /players/" + name + " with data " + JSON.stringify(updatedPlayer, 2, null));
        
        if (!updatedPlayer.name || !updatedPlayer.nationality || updatedPlayer.name !== name) { //keep an eye on this
            console.log("WARNING: The player " + JSON.stringify(updatedPlayer, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        
        } else {
            dbPlayers.find({name:updatedPlayer.name}).toArray(function (err, tennisplayers) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                
                } else if (tennisplayers.length > 0) {
                    dbPlayers.update({name: updatedPlayer.name}, updatedPlayer);
                    console.log("INFO: Modifying player " + name + " with data " + JSON.stringify(updatedPlayer, 2, null));
                    response.send(updatedPlayer); // return the updated player
                    
                } else {
                    console.log("WARNING: Player " + name + "does not exist");
                    response.sendStatus(404); // not found
                }
            }
        )}
    }
});



//DELETE Collection

app.delete(BASE_API_PATH + "/players", function (request, response) {
    
    console.log("INFO: New DELETE request to /players");
    dbPlayers.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All the players (" + numRemoved.n + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no players to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});
};