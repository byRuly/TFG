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
                "doublefault":"2.9",
                "firstserve":"65.9",
                "firstservewon":"75.7",
                "secondservewon":"58.2",
                "breaksaved":"66.4",
                "serveptswon":"69.8",
                "servegameswon":"88.9",
                "tiebreakswon":"77.3",
                "setswon":"80.1",
                "gameswon":"60.4",
                "upsetswon":"10.4",
                "upsetsagainst":"11.7",
                "surface":"Rapida",
                "h2h":"RogerFederer AlexanderZverev KeiNishikori KevinAnderson JuanMartinDelPotro JohnIsner"
            },
            {
                "name": "Rafael Nadal",
                "nationality": "ES",
                "ace": "4.5",
                "doublefault":"2.7",
                "firstserve":"66.4",
                "firstservewon":"72.4",
                "secondservewon":"60.1",
                "breaksaved":"68.6",
                "serveptswon":"68.2",
                "servegameswon":"87.2",
                "tiebreakswon":"55.6",
                "setswon":"81.5",
                "gameswon":"61.6",
                "upsetswon":"1.9",
                "upsetsagainst":"11.1",
                "surface":"TierraBatida",
                "h2h":"NovakDjokovic DominicThiem AlexanderZverev StefanosTsitsipas KeiNishikori KevinAnderson JuanMartinDelPotro JohnIsner"
            },
            {
                "name": "Roger Federer",
                "nationality": "CH",
                "ace": "11.1",
                "doublefault":"2.6",
                "firstserve":"62.3",
                "firstservewon":"79.9",
                "secondservewon":"58.1",
                "breaksaved":"70.6",
                "serveptswon":"71.7",
                "servegameswon":"91.0",
                "tiebreakswon":"63.3",
                "setswon":"76.5",
                "gameswon":"57.4",
                "upsetswon":"0",
                "upsetsagainst":"15.2",
                "surface":"Hierba",
                "h2h":"RafaelNadal KeiNishikori KevinAnderson JuanMartinDelPotro JohnIsner"
            },
            {
                "name": "Dominic Thiem",
                "nationality": "AT",
                "ace": "7.3",
                "doublefault":"3.6",
                "firstserve":"61.1",
                "firstservewon":"73.6",
                "secondservewon":"53.9",
                "breaksaved":"64.5",
                "serveptswon":"65.9",
                "servegameswon":"83.6",
                "tiebreakswon":"44.0",
                "setswon":"62.8",
                "gameswon":"54.3",
                "upsetswon":"8.1",
                "upsetsagainst":"24.2",
                "surface":"TierraBatida",
                "h2h":"NovakDjokovic RogerFederer AlexanderZverev StefanosTsitsipas JohnIsner"
            },
            {
                "name": "Alexander Zverev",
                "nationality": "DE",
                "ace": "11.7",
                "doublefault":"5.8",
                "firstserve":"64.1",
                "firstservewon":"76.1",
                "secondservewon":"48.7",
                "breaksaved":"56.1",
                "serveptswon":"66.2",
                "servegameswon":"81.8",
                "tiebreakswon":"54.2",
                "setswon":"65.1",
                "gameswon":"54.4",
                "upsetswon":"3.0",
                "upsetsagainst":"27.3",
                "surface":"TierraBatida",
                "h2h":"RogerFederer KeiNishikori KevinAnderson JohnIsner"
            },
            {
                "name": "Stefanos Tsitsipas",
                "nationality": "GR",
                "ace": "8.7",
                "doublefault":"3.0",
                "firstserve":"61.2",
                "firstservewon":"75.5",
                "secondservewon":"53.9",
                "breaksaved":"62.7",
                "serveptswon":"67.1",
                "servegameswon":"85.0",
                "tiebreakswon":"62.8",
                "setswon":"63.8",
                "gameswon":"53.5",
                "upsetswon":"13.9",
                "upsetsagainst":"17.7",
                "surface":"TierraBatida",
                "h2h":"AlexanderZverev KevinAnderson"
            },
            {
                "name": "Kei Nishikori",
                "nationality": "JP",
                "ace": "5.0",
                "doublefault":"2.9",
                "firstserve":"62.5",
                "firstservewon":"71.4",
                "secondservewon":"54.6",
                "breaksaved":"60.4",
                "serveptswon":"65.1",
                "servegameswon":"82.0",
                "tiebreakswon":"71.4",
                "setswon":"63.3",
                "gameswon":"53.5",
                "upsetswon":"8.1",
                "upsetsagainst":"17.6",
                "surface":"TierraBatida",
                "h2h":"DominicThiem StefanosTsitsipas JohnIsner"
            },
            {
                "name": "Kevin Anderson",
                "nationality": "ZA",
                "ace": "17.9",
                "doublefault":"3.1",
                "firstserve":"64.9",
                "firstservewon":"79.4",
                "secondservewon":"53.5",
                "breaksaved":"65.8",
                "serveptswon":"70.3",
                "servegameswon":"90.2",
                "tiebreakswon":"60.0",
                "setswon":"62.3",
                "gameswon":"52.7",
                "upsetswon":"4.5",
                "upsetsagainst":"18.2",
                "surface":"Rapida",
                "h2h":"DominicThiem KeiNishikori"
            },
            {
                "name": "Juan Martin Del Potro",
                "nationality": "AR",
                "ace": "14.9",
                "doublefault":"2.8",
                "firstserve":"65.3",
                "firstservewon":"79.0",
                "secondservewon":"51.6",
                "breaksaved":"60.7",
                "serveptswon":"69.5",
                "servegameswon":"88.5",
                "tiebreakswon":"61.9",
                "setswon":"71.4",
                "gameswon":"56.9",
                "upsetswon":"2.8",
                "upsetsagainst":"22.2",
                "surface":"Rapida",
                "h2h":"DominicThiem AlexanderZverev StefanosTsitsipas KeiNishikori KevinAnderson JohnIsner"
            },
            {
                "name": "John Isner",
                "nationality": "US",
                "ace": "25.4",
                "doublefault":"2.5",
                "firstserve":"70.9",
                "firstservewon":"81.4",
                "secondservewon":"57.7",
                "breaksaved":"70.1",
                "serveptswon":"74.5",
                "servegameswon":"93.8",
                "tiebreakswon":"56.3",
                "setswon":"60.6",
                "gameswon":"52.3",
                "upsetswon":"0",
                "upsetsagainst":"23.5",
                "surface":"Hierba",
                "h2h":"StefanosTsitsipas KevinAnderson"
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


// GET Items by name

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