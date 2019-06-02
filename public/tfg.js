/*global angular*/

angular.module("TrabajoFinGrado", ["ngRoute"]).config(function($routeProvider) {
    
    $routeProvider
    
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/players", {
            templateUrl: "/players/players.html",
            controller: "PlayersCtrl"
        })
        .when("/tennis/:name1/:name2", {
            templateUrl: "/tennis/tennis.html",
            controller: "TennisCtrl"
        });
    console.log("App initialized and configured");
});