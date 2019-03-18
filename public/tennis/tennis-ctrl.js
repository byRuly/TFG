/*global angular*/
/*global M*/

var aux;

angular.module("TrabajoFinGrado").
    controller("TennisCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Controller initialized");


    $scope.data = {};


    /*
    var refresh = $scope.refresh = function() {

        $http
            .get("../api/v1/tennis")
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
    };*/
    
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
                //aux =1;
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
                //aux=0;
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
                M.toast({html: '<i class="material-icons">done</i> ' + $scope.newData.variable + ' has been added succesfully!'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + $scope.newData.variable + ' has been added succesfully!', 4000);
                refresh();
            }, function(response) {
                switch (response.status) {
                    case 409:
                        M.toast({html: '<i class="material-icons">error_outline</i> This element already exist!'},4000);
                        //Materialize.toast('<i class="material-icons">error_outline</i> This element already exist!', 4000);
                        break;
                    default:
                        M.toast({html: '<i class="material-icons">error_outline</i> Error getting data!'},4000);
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
                M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' has been added succesfully!'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error adding data!'},4000);
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
                M.toast({html: '<i class="material-icons">done</i> ' + oldVariable + ' has been deleted succesfully!'},4000);
                //Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                refresh();
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error deleting data!'},4000);
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
    
    refresh();

/*
    $(document).ready(function() {
        $('.modal').modal({
            ready: function(modal, trigger) {
                Materialize.updateTextFields();
            },
            complete: function() {
                refresh();
            }
        });
        $(".button-collapse").sideNav();
    });*/
}]);