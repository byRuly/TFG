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
                        //M.toast({html: '<i class="material-icons">error_outline</i> No hay variables definidas'},4000);
                        break;
                    default:
                        //M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo variables'},4000);
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
                        //M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo variables'},4000);
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
                        //M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo variables'},4000);
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
                            //M.toast({html: '<i class="material-icons">error_outline</i> No hay variables definidas'},4000);
                            break;
                            default:
                            //M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo variables'},4000);
                            break;
                }
                //aux=0;
            });
        }
    };


    $scope.addData = function() {
        $http
            .post("../api/v1/tennis", $scope.newData)
            .then(function(response) {
                console.log("Data added!");
                M.toast({html: '<i class="material-icons">done</i> ' + $scope.newData.variable + ' ha sido añadida correctamente'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + $scope.newData.variable + ' has been added succesfully!', 4000);
                refresh();
            }, function(response) {
                switch (response.status) {
                    case 409:
                        M.toast({html: '<i class="material-icons">error_outline</i> Esta variable ya existe'},4000);
                        //Materialize.toast('<i class="material-icons">error_outline</i> This element already exist!', 4000);
                        break;
                    default:
                        M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo variables'},4000);
                        //Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                        break;
                }
            });
    };

    
    $scope.deleteData = function(data) {
        $http
            .delete("../api/v1/tennis/" + data.variable)
            .then(function(response) {
                console.log("Data " + data.variable + " deleted!");
                M.toast({html: '<i class="material-icons">done</i> ' + data.variable + ' ha sido borrada correctamente'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + data.variable + ' has been deleted succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando la variable'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error deleting data!', 4000);
            });
    };

    $scope.deleteAllData = function() {
        $http
            .delete("../api/v1/tennis")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todas las variables se han borrado con éxito'},4000);
                //Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando las variables'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);
            });
    };

    
    var loadDefault = $scope.loadDefault = function() {
        //refresh();
        if (//$scope.data.length == -1
                aux==0) {
            $http
                .get("../api/v1/tennis/loadDefault")
                .then(function(response) {
                    console.log("Initial data loaded");
                    M.toast({html: '<i class="material-icons">done</i> Variables por defecto cargadas correctamente'},4000);
                    //Materialize.toast('<i class="material-icons">done</i> Loaded inital data succesfully!', 4000);
                    refresh();
                }, function(response) {
                    M.toast({html: '<i class="material-icons">error_outline</i> Error cargando las variables por defecto'},4000);
                    //Materialize.toast('<i class="material-icons">error_outline</i> Error adding initial data!', 4000);
                });
        }
        else {
            M.toast({html: '<i class="material-icons">error_outline</i> Ya hay variables en la base de datos'},4000);
            //Materialize.toast('<i class="material-icons">error_outline</i> There are already data in the DB', 4000);
            console.log("La lista de variables debe estar vacia");
        }
    };
    
    
    var loadEmpty = $scope.loadEmpty = function() {
        //refresh();
        if (//$scope.data.length == -1
                aux==0) {
            $http
                .get("../api/v1/tennis/loadEmpty")
                .then(function(response) {
                    console.log("Initial data loaded");
                    M.toast({html: '<i class="material-icons">done</i> Variables por defecto cargadas correctamente'},4000);
                    //Materialize.toast('<i class="material-icons">done</i> Loaded inital data succesfully!', 4000);
                    refresh();
                }, function(response) {
                    M.toast({html: '<i class="material-icons">error_outline</i> Error cargando las variables por defecto'},4000);
                    //Materialize.toast('<i class="material-icons">error_outline</i> Error adding initial data!', 4000);
                });
        }
        else {
            M.toast({html: '<i class="material-icons">error_outline</i> Ya hay variables en la base de datos'},4000);
            //Materialize.toast('<i class="material-icons">error_outline</i> There are already data in the DB', 4000);
            console.log("La lista de variables debe estar vacia");
        }
    };
    
    
    $scope.editDataAdd = function(data) {

        var oldVariable = data.variable;
        data.recommendedweight = $scope.dataToAdd[0].recommendedweight;
        data.include = "1";
        delete data._id;
        delete data.oldVariable;

        $http
            .put("../api/v1/tennis/" + data.variable, data)
            .then(function(response) {
                console.log("Data " + data.variable + " edited!");
                M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' ha sido añadida correctamente'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error añadiendo la variable'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                refresh();
            });
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
                //Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando la variable'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                refresh();
            });
    };
    
    
    $scope.reset = function(){
        $http
            .delete("../api/v1/tennis")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todas las variables se han borrado con éxito'},4000);
                //Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!', 4000);
                aux = 0;
                loadDefault();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando las variables'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);
            });
    };
    
    
    $scope.clear = function(){
        $http
            .delete("../api/v1/tennis")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todas las variables se han borrado con éxito'},4000);
                //Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!', 4000);
                aux = 0;
                loadEmpty();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando las variables'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);
            });
    };
    
    
    $scope.predict = function(){
        
        var pesos = 0;
        angular.forEach($scope.data, function (value, key) {
            
            pesos += parseInt(value.weight, 10);
        });
        
        if(pesos==100){
            console.log("Bien");
            
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
            var gameswon;
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
            var gameswon2;
            var upsetswon2;
            var upsetsagainst2;
            
            angular.forEach($scope.data, function (value, key) {
            
                switch(value.variable){
                    case "aces":
                        ace = parseInt(value.weight, 10) * parseInt($scope.player1.ace, 10) * parseInt(value.include, 10);
                        ace2 = parseInt(value.weight, 10) * parseInt($scope.player2.ace, 10) * parseInt(value.include, 10);
                        break;
                    case "dobles faltas":
                        doublefault = parseInt(value.weight, 10) * parseInt($scope.player1.doublefault, 10) * parseInt(value.include, 10);
                        doublefault2 = parseInt(value.weight, 10) * parseInt($scope.player2.doublefault, 10) * parseInt(value.include, 10);
                        console.log("Player1" + $scope.player1.doublefault);
                        console.log(doublefault);
                        console.log(doublefault2);
                        break;
                    case "primer servicio":
                        firstserve = parseInt(value.weight, 10) * parseInt($scope.player1.firstserve, 10) * parseInt(value.include, 10);
                        firstserve2 = parseInt(value.weight, 10) * parseInt($scope.player2.firstserve, 10) * parseInt(value.include, 10);
                        break;
                    case "puntos ganados primer servicio":
                        firstservewon = parseInt(value.weight, 10) * parseInt($scope.player1.firstservewon, 10) * parseInt(value.include, 10);
                        firstservewon2 = parseInt(value.weight, 10) * parseInt($scope.player2.firstservewon, 10) * parseInt(value.include, 10);
                        break;
                    case "puntos ganados al segundo servicio":
                        secondservewon = parseInt(value.weight, 10) * parseInt($scope.player1.secondservewon, 10) * parseInt(value.include, 10);
                        secondservewon2 = parseInt(value.weight, 10) * parseInt($scope.player2.secondservewon, 10) * parseInt(value.include, 10);
                        break;
                    case "puntos de break salvados":
                        breaksaved = parseInt(value.weight, 10) * parseInt($scope.player1.breaksaved, 10) * parseInt(value.include, 10);
                        breaksaved2 = parseInt(value.weight, 10) * parseInt($scope.player2.breaksaved, 10) * parseInt(value.include, 10);
                        break;
                    case "puntos ganados al servicio":
                        serveptswon = parseInt(value.weight, 10) * parseInt($scope.player1.serveptswon, 10) * parseInt(value.include, 10);
                        serveptswon2 = parseInt(value.weight, 10) * parseInt($scope.player2.serveptswon, 10) * parseInt(value.include, 10);
                        break;
                    case "juegos ganados al servicio":
                        servegameswon = parseInt(value.weight, 10) * parseInt($scope.player1.servegameswon, 10) * parseInt(value.include, 10);
                        servegameswon2 = parseInt(value.weight, 10) * parseInt($scope.player2.servegameswon, 10) * parseInt(value.include, 10);
                        break;
                    case "tie-breaks ganados":
                        tiebreakswon = parseInt(value.weight, 10) * parseInt($scope.player1.tiebreakswon, 10) * parseInt(value.include, 10);
                        tiebreakswon2 = parseInt(value.weight, 10) * parseInt($scope.player2.tiebreakswon, 10) * parseInt(value.include, 10);
                        break;
                    case "sets ganados":
                        setswon = parseInt(value.weight, 10) * parseInt($scope.player1.setswon, 10) * parseInt(value.include, 10);
                        setswon2 = parseInt(value.weight, 10) * parseInt($scope.player2.setswon, 10) * parseInt(value.include, 10);
                        break;
                    case "partidos ganados":
                        gameswon = parseInt(value.weight, 10) * parseInt($scope.player1.gameswon, 10) * parseInt(value.include, 10);
                        gameswon2 = parseInt(value.weight, 10) * parseInt($scope.player2.gameswon, 10) * parseInt(value.include, 10);
                        break;
                    case "victorias rival superior":
                        upsetswon = parseInt(value.weight, 10) * parseInt($scope.player1.upsetswon, 10) * parseInt(value.include, 10);
                        upsetswon2 = parseInt(value.weight, 10) * parseInt($scope.player2.upsetswon, 10) * parseInt(value.include, 10);
                        break;
                    case "derrotas rival inferior":
                        upsetsagainst = parseInt(value.weight, 10) * parseInt($scope.player1.upsetsagainst, 10) * parseInt(value.include, 10);
                        upsetsagainst2 = parseInt(value.weight, 10) * parseInt($scope.player2.upsetsagainst, 10) * parseInt(value.include, 10);
                        break;
                }
            });
            
            console.log(ace);
            
            var puntuacion1 = ace + doublefault + firstserve + firstservewon + secondservewon + breaksaved + serveptswon + servegameswon + tiebreakswon + setswon + gameswon + upsetswon + upsetsagainst;
            var puntuacion2 = ace2 + doublefault2 + firstserve2 + firstservewon2 + secondservewon2 + breaksaved2 + serveptswon2 + servegameswon2 + tiebreakswon2 + setswon2 + gameswon2 + upsetswon2 + upsetsagainst2;
            
            if (puntuacion1 > puntuacion2){
                console.log(puntuacion1 + "mayor" + puntuacion2);
            }else{
                console.log(puntuacion1 + "menor" + puntuacion2);
            }
            
        }else{
            M.toast({html: '<i class="material-icons">error_outline</i> Los pesos de las variables deben sumar 100'},4000);
        }
    };
    
    
    $scope.editData = function(data){
        
        var oldVariable = data.variable;
        delete data._id;
        delete data.oldVariable;
        
        $http
            .put("../api/v1/tennis/" + data.variable, data)
            .then(function(response) {
                console.log("Data " + data.variable + " edited!");
                M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' ha sido editada correctamente'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando la variable'},4000);
                //Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                refresh();
            });
    };
    
    $scope.return = function(){
        
        $location.path("/");
    };
    
    
    //c07666bd5b
    $scope.editDataModal = function(data) {
        data["oldVariable"] = data.variable;
        $scope.editDataUnit = data;
        $('#editModal2').modal('open');
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
        //$(".button-collapse").sideNav();
    });
}]);