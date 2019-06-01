/*global angular*/

angular.module("TrabajoFinGrado", ["ngRoute"]).config(function($routeProvider) {
    
    $routeProvider
    
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/tennis", {
            templateUrl: "/tennis/tennis.html",
            controller: "TennisCtrl"
        })
        .when("/players", {
            templateUrl: "/players/players.html",
            controller: "PlayersCtrl"
        });
    console.log("App initialized and configured");
});