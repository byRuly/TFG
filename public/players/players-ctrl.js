/*global angular*/
/*global M*/
/*global $*/

angular.module("TrabajoFinGrado").
    controller("PlayersCtrl", ["$scope", "$http", "$location", "$rootScope", function($scope, $http, $location, $rootScope) {
        console.log("Controller initialized");


    $scope.data = {};
    
    var refresh = $scope.refresh = function(){
        
        $http
            .get("../api/v1/players")
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.data = response.data;
            }, function(response) {
                switch (response.status) {
                    case 404:
                        $scope.data = {};
                        M.toast({html: '<i class="material-icons">error_outline</i> No hay jugadores definidos'},4000);
                        break;
                    default:
                        M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo jugadores'},4000);
                        break;
                }
            });
    };
    

    //c07666bd5b
    $scope.editDataModal = function(data) {
        data["oldVariable"] = data.variable;
        $scope.editDataUnit = data;
        $('#editModal2').modal('open');
    };
    
    $scope.updatePicture = function(name,number){
        
        if (name!=""){
            
            if(number==1){

                document.getElementById('player1').src = "/resources/pics/"+name.replace(/ /g,'')+".png";
            
            } else if(number==2){
                
                document.getElementById('player2').src = "/resources/pics/"+name.replace(/ /g,'')+".png";
            }
        }
    };
    
    $scope.validatePlayers = function(name1,name2){
        
        if (name1==null || name2==null){
            
            M.toast({html: '<i class="material-icons">error_outline</i> Debes definir ambos jugadores para continuar'},4000);
        } else {
            
            $http
            .get("../api/v1/players/" + name1)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.player1 = response.data;
            }, function(response) {
                switch (response.status) {
                    case 404:
                        M.toast({html: '<i class="material-icons">error_outline</i> No se han encontrado los datos del jugador 1'},4000);
                        break;
                    default:
                        M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo jugadores'},4000);
                        break;
                }
            });
            
            $http
            .get("../api/v1/players/" + name2)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.player2 = response.data;
            }, function(response) {
                switch (response.status) {
                    case 404:
                        M.toast({html: '<i class="material-icons">error_outline</i> No se han encontrado los datos del jugador 2'},4000);
                        break;
                    default:
                        M.toast({html: '<i class="material-icons">error_outline</i> Error obteniendo jugadores'},4000);
                        break;
                }
            });
            
            //$location.path("/tennis");
        }
    };
    
    refresh();
    
}]);