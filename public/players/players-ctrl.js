/*global angular*/
/*global M*/
/*global $*/

angular.module("TrabajoFinGrado").
    controller("PlayersCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
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
    
    
    $scope.updatePicture = function(name,number){
        
        if (name!=""){
            
            if(number==1){

                document.getElementById('player1').src = "/resources/pics/"+name.replace(/ /g,'')+".png";
            
            } else if(number==2){
                
                document.getElementById('player2').src = "/resources/pics/"+name.replace(/ /g,'')+".png";
            }
        }
    };
    
    $scope.validatePlayers = function(name1,name2,surface){
        
        if (name1==null || name2==null){
            
            M.toast({html: '<i class="material-icons">error_outline</i> Debes definir ambos jugadores para continuar'},4000);
        
        } else if(name1==name2) {
            
            M.toast({html: '<i class="material-icons">error_outline</i> Los jugadores deben ser diferentes'},4000);
            
        } else {
            
            if(surface==undefined){
                $location.path("/tennis/" + name1 + "/" + name2 + "/none");
            } else {
                $location.path("/tennis/" + name1 + "/" + name2 + "/" + surface);
            }
        }
    };
    
    $scope.deletePlayers = function(){
        $http
            .delete("../api/v1/players")
            .then(function(response) {
                console.log("All data deleted!");
                M.toast({html: '<i class="material-icons">done</i> Todos los jugadores se han borrado con éxito'},4000);
            }, function(response) {
                M.toast({html: '<i class="material-icons">error_outline</i> Error borrando los jugadores'},4000);
            });
    };
    
    refresh();
    
}]);