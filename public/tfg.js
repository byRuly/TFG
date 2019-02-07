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
        .when("/soccer", {
            templateUrl: "/soccer/soccer.html",
            controller: "SoccerCtrl"
        })
        .when("/basketball", {
            templateUrl: "/basketball/basketball.html",
            controller: "BasketballCtrl"
        });
    console.log("App initialized and configured");
});