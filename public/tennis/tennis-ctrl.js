/*global angular*/
/*global M*/
/*global $*/

var aux;

angular.module("TrabajoFinGrado").
    controller("TennisCtrl", ["$scope", "$http", "$routeParams", "$location",function($scope, $http, $routeParams, $location) {
        console.log("Controller initialized");


    $scope.data = {};
    
    var refresh = $scope.refresh = function(){
        
        $http
            .get("../api/v1/tennis?include=1")
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.data = response.data;
                aux =1;
            }, function(response) {
                switch (response.status) {
                    case 404:
                        $scope.data = {};
                        M.toast({html: '<i class="material-icons">error_outline</i> No hay variables definidas'},4000);
                        break;
                    default:
                        M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo variables'},4000);
                        break;
                }
                aux=0;
            });
            refresh2();
    };
    
    
    var refresh2 = $scope.refresh2 = function(){
        
        $http
            .get("../api/v1/tennis")
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.allData = response.data;
                
            }, function(response) {
                switch (response.status) {
                    case 404:
                        $scope.allData = {};
                        break;
                    default:
                        break;
                }
            });
            
            refresh3();
    };
    
    var refresh3 = $scope.refresh3 = function(){
        
        $http
            .get("../api/v1/players/" + $routeParams.name1)
            .then(function(response){
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.player1 = response.data;
            }, function(response){
                switch (response.status) {
                    case 404:
                        $scope.player1 = {};
                        M.toast({html: '<i class="material-icons">error_outline</i> No se han encontrado datos para el jugador 1'},4000);
                        break;
                    default:
                        break;
                }
            });
            
        $http
            .get("../api/v1/players/" + $routeParams.name2)
            .then(function(response){
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.player2 = response.data;
            }, function(response){
                switch (response.status) {
                    case 404:
                        $scope.player2 = {};
                        M.toast({html: '<i class="material-icons">error_outline</i> No se han encontrado datos para el jugador 2'},4000);
                        break;
                    default:
                        break;
                }
            });
    };
    
    
    $scope.updateNewRecWeight = function(query){
        
        if (query!=""){
            $http
                .get("../api/v1/tennis/" + query)
                .then(function(response) {
                    console.log("Data received:" + JSON.stringify(response.data, null, 2));
                    $scope.dataToAdd = response.data;
                    //aux =1;
                }, function(response) {
                    switch (response.status) {
                        case 404:
                            $scope.dataToAdd = {};
                            break;
                            default:
                            break;
                }
            });
        }
    };
    

    $scope.deleteAllData = function() {
        $http
            .delete("../api/v1/tennis")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todas las variables se han borrado con éxito'},4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando las variables'},4000);
            });
    };

    
    var loadDefault = $scope.loadDefault = function() {
        if (aux==0) {
            $http
                .get("../api/v1/tennis/loadDefault")
                .then(function(response) {
                    console.log("Initial data loaded");
                    M.toast({html: '<i class="material-icons">done</i> Variables por defecto cargadas correctamente'},4000);
                    refresh();
                }, function(response) {
                    M.toast({html: '<i class="material-icons">error_outline</i> Error cargando las variables por defecto'},4000);
                });
        }
        else {
            M.toast({html: '<i class="material-icons">error_outline</i> Ya hay variables en la base de datos'},4000);
            console.log("La lista de variables debe estar vacia");
        }
    };
    
    
    var loadEmpty = $scope.loadEmpty = function() {
        if (aux==0) {
            $http
                .get("../api/v1/tennis/loadEmpty")
                .then(function(response) {
                    console.log("Initial data (empty) loaded");
                    //M.toast({html: '<i class="material-icons">done</i> Variables por defecto cargadas correctamente'},4000);
                    refresh();
                }, function(response) {
                    //M.toast({html: '<i class="material-icons">error_outline</i> Error cargando las variables por defecto'},4000);
                });
        }
        else {
            //M.toast({html: '<i class="material-icons">error_outline</i> Ya hay variables en la base de datos'},4000);
            console.log("La lista de variables debe estar vacia");
        }
    };
    
    
    $scope.editDataAdd = function(data) {

        var oldVariable = data.variable;
        data.recommendedweight = $scope.dataToAdd[0].recommendedweight;
        data.include = "1";
        delete data._id;
        delete data.oldVariable;
        
        if(isNaN(data.weight)){
            M.toast({html: '<i class="material-icons">error_outline</i> El peso debe ser un número'},4000);
        } else {
            $http
            .put("../api/v1/tennis/" + data.variable, data)
            .then(function(response) {
                console.log("Data " + data.variable + " edited!");
                M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' ha sido añadida correctamente'},4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error añadiendo la variable'},4000);
                refresh();
            });
        }
    };
    
    
    $scope.editDataDelete = function(data) {

        var oldVariable = data.variable;
        data.include = "0";
        delete data._id;
        delete data.oldVariable;

        $http
            .put("../api/v1/tennis/" + data.variable, data)
            .then(function(response) {
                console.log("Data " + data.variable + " edited!");
                M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' ha sido borrada correctamente'},4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando la variable'},4000);
                refresh();
            });
    };
    
    
    $scope.reset = function(){
        $http
            .delete("../api/v1/tennis")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todas las variables se han borrado con éxito'},4000);
                aux = 0;
                loadDefault();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando las variables'},4000);
            });
    };
    
    
    $scope.clear = function(){
        $http
            .delete("../api/v1/tennis")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todas las variables se han borrado con éxito'},4000);
                aux = 0;
                loadEmpty();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando las variables'},4000);
            });
    };
    
    
    $scope.predict = function(){
        
        var pesos = 0;
        var jugador1 = $scope.player1[0];
        var jugador2 = $scope.player2[0];
        var superficie = $routeParams.surface;
        var bonosuperficie = 0.08;
        var bonorival = 0.12;
        
        console.log("Player1: " + jugador1.name);
        console.log("Player2: " + jugador2.name);
        
        angular.forEach($scope.data, function (value, key) {
            
            pesos += parseFloat(value.weight, 10);
        });
        
        if(pesos==100){
            console.log("Weights=100, predicting...");
            
            var ace;
            var doublefault;
            var firstserve;
            var firstservewon;
            var secondservewon;
            var breaksaved;
            var serveptswon;
            var servegameswon;
            var tiebreakswon;
            var setswon;
            var matcheswon;
            var upsetswon;
            var upsetsagainst;
            var ace2;
            var doublefault2;
            var firstserve2;
            var firstservewon2;
            var secondservewon2;
            var breaksaved2;
            var serveptswon2;
            var servegameswon2;
            var tiebreakswon2;
            var setswon2;
            var matcheswon2;
            var upsetswon2;
            var upsetsagainst2;
            
            angular.forEach($scope.allData, function (value, key) {
            
                switch(value.variable){
                    case "aces":
                        ace = parseFloat(value.weight, 10) * parseFloat(jugador1.ace, 10) * parseFloat(value.include, 10) / 100;
                        ace2 = parseFloat(value.weight, 10) * parseFloat(jugador2.ace, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "dobles faltas":
                        doublefault = parseFloat(value.weight, 10) * parseFloat(jugador1.doublefault, 10) * parseFloat(value.include, 10) / 100;
                        doublefault2 = parseFloat(value.weight, 10) * parseFloat(jugador2.doublefault, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "primer servicio":
                        firstserve = parseFloat(value.weight, 10) * parseFloat(jugador1.firstserve, 10) * parseFloat(value.include, 10) / 100;
                        firstserve2 = parseFloat(value.weight, 10) * parseFloat(jugador2.firstserve, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "puntos ganados primer servicio":
                        firstservewon = parseFloat(value.weight, 10) * parseFloat(jugador1.firstservewon, 10) * parseFloat(value.include, 10) / 100;
                        firstservewon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.firstservewon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "puntos ganados al segundo servicio":
                        secondservewon = parseFloat(value.weight, 10) * parseFloat(jugador1.secondservewon, 10) * parseFloat(value.include, 10) / 100;
                        secondservewon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.secondservewon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "puntos de break salvados":
                        breaksaved = parseFloat(value.weight, 10) * parseFloat(jugador1.breaksaved, 10) * parseFloat(value.include, 10) / 100;
                        breaksaved2 = parseFloat(value.weight, 10) * parseFloat(jugador2.breaksaved, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "puntos ganados al servicio":
                        serveptswon = parseFloat(value.weight, 10) * parseFloat(jugador1.serveptswon, 10) * parseFloat(value.include, 10) / 100;
                        serveptswon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.serveptswon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "juegos ganados al servicio":
                        servegameswon = parseFloat(value.weight, 10) * parseFloat(jugador1.servegameswon, 10) * parseFloat(value.include, 10) / 100;
                        servegameswon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.servegameswon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "tie-breaks ganados":
                        tiebreakswon = parseFloat(value.weight, 10) * parseFloat(jugador1.tiebreakswon, 10) * parseFloat(value.include, 10) / 100;
                        tiebreakswon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.tiebreakswon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "sets ganados":
                        setswon = parseFloat(value.weight, 10) * parseFloat(jugador1.setswon, 10) * parseFloat(value.include, 10) / 100;
                        setswon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.setswon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "partidos ganados":
                        matcheswon = parseFloat(value.weight, 10) * parseFloat(jugador1.matcheswon, 10) * parseFloat(value.include, 10) / 100;
                        matcheswon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.matcheswon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "victorias rival superior":
                        upsetswon = parseFloat(value.weight, 10) * parseFloat(jugador1.upsetswon, 10) * parseFloat(value.include, 10) / 100;
                        upsetswon2 = parseFloat(value.weight, 10) * parseFloat(jugador2.upsetswon, 10) * parseFloat(value.include, 10) / 100;
                        break;
                    case "derrotas rival inferior":
                        upsetsagainst = parseFloat(value.weight, 10) * parseFloat(jugador1.upsetsagainst, 10) * parseFloat(value.include, 10) / 100;
                        upsetsagainst2 = parseFloat(value.weight, 10) * parseFloat(jugador2.upsetsagainst, 10) * parseFloat(value.include, 10) / 100;
                        break;
                }
            });
                
            var score1 = ace + doublefault + firstserve + firstservewon + secondservewon + breaksaved + serveptswon 
                    + servegameswon + tiebreakswon + setswon + matcheswon + upsetswon + upsetsagainst;
            var score2 = ace2 + doublefault2 + firstserve2 + firstservewon2 + secondservewon2 + breaksaved2 + serveptswon2 +
                    servegameswon2 + tiebreakswon2 + setswon2 + matcheswon2 + upsetswon2 + upsetsagainst2;
            
            var puntuacion1;
            var puntuacion2;
            var total1;
            var total2;
                
            console.log("Score Player1: " + score1);
            console.log("Score Player2: " + score2);
            
            if (jugador1.surface == superficie.replace(/ /g,'')){
                console.log(score1);
                console.log("The player " + jugador1.name + " has received favourite surface bonus.");
                puntuacion1 = score1 + (score1 * bonosuperficie);
                
            }else{
                puntuacion1 = score1;
            }
            
            console.log("Score (with surface) Player 1: " + puntuacion1);
            
            if (jugador2.surface == superficie.replace(/ /g,'')){
                console.log(score2);
                console.log("The player " + jugador2.name + " has received favourite surface bonus.");
                puntuacion2 = score2 + (score2 * bonosuperficie); 
            }else{
                puntuacion2 = score2;
            }
            
            console.log("Score (with surface) Player 2: " + puntuacion2);
            
            if (jugador1.h2h.includes(jugador2.name.replace(/ /g,''))){
                console.log("El jugador " + jugador1.name + " recibe bonificación de enfrentamiento directo favorable");
                total1 = puntuacion1 + (score1 * bonorival);
                total2 = puntuacion2;
                
            } else if (jugador2.h2h.includes(jugador1.name.replace(/ /g,''))){
                console.log("El jugador " + jugador2.name + " recibe bonificación de enfrentamiento directo favorable");
                total2 = puntuacion2 + (score2 * bonorival);
                total1 = puntuacion1;
            }else{
                total1 = puntuacion1;
                total2 = puntuacion2;
            }
            
            console.log("Total Player1: " + total1);
            console.log("Total Player2: " + total2);
            
            if (total1 > total2){
                $scope.ganador = jugador1;
                $scope.ganadorNS = jugador1.name.replace(/ /g,'');
                $scope.diferencia = ((total1 - total2) * 100 / total2).toFixed(3);
                $scope.puntuacionmayor = total1.toFixed(3);
                $scope.puntuacionmenor = total2.toFixed(3);
                $('#winnerModal').modal('open');
            }else{
                $scope.ganador = jugador2;
                $scope.ganadorNS = jugador2.name.replace(/ /g,'');
                $scope.diferencia = ((total2 - total1) * 100 / total1).toFixed(3);
                $scope.puntuacionmenor = total1.toFixed(3);
                $scope.puntuacionmayor = total2.toFixed(3);
                $('#winnerModal').modal('open');
            }
            
        }else{
            M.toast({html: '<i class="material-icons">error_outline</i> Los pesos de las variables deben sumar 100'},4000);
        }
    };
    
    
    $scope.editData = function(data){
        
        var oldVariable = data.variable;
        delete data._id;
        delete data.oldVariable;
        
        if(isNaN(data.weight)){
            M.toast({html: '<i class="material-icons">error_outline</i> El peso debe ser un número'},4000);
            data.weight = $scope.oldWeight;
        } else {
            $http
                .put("../api/v1/tennis/" + data.variable, data)
                .then(function(response) {
                    console.log("Data " + data.variable + " edited!");
                    M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' ha sido editada correctamente'},4000);
                    refresh();
                }, function(response) {
                    M.toast({html: '<i class="material-icons">error_outline</i> Error editando la variable'},4000);
                    refresh();
                });
        }
        
    };
    
    $scope.editData2 = function(data){
        
        var oldVariable = data.variable;
        delete data._id;
        delete data.oldVariable;
        data.weight = $scope.oldWeight;
        
        $http
            .put("../api/v1/tennis/" + data.variable, data)
            .then(function(response) {
                console.log("Data " + data.variable + " edited!");
                M.toast({html: '<i class="material-icons">done</i> ' + 'se ha cancelado la edición de la variable ' + oldVariable },4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error no controlado'},4000);
                refresh();
            });
    };
    
    $scope.return = function(){
        
        $location.path("/");
    };
    
    
    //c07666bd5b
    $scope.editDataModal = function(data) {
        $scope.oldWeight = data.weight;
        data["oldVariable"] = data.variable;
        $scope.editDataUnit = data;
        $('#editModal').modal('open');
    };
    
    refresh();
    
    $(document).ready(function() {
        $('.modal').modal({
            ready: function(modal, trigger) {
                M.updateTextFields();
            },
            complete: function() {
                refresh();
            }
        });
    });
}]);