'use strict';
var gamesApp = angular.module('gamesApp',['ngRoute','ngSanitize']);


gamesApp.directive("gamesList",function(){
	return{

		templateUrl: 'templates/GamesList.html'
	}
});
gamesApp.directive("gamesHeader",function(){
	return{

		templateUrl: 'templates/header.html'
	}
});
gamesApp.directive("gamesFooter",function(){
	return{

		templateUrl: 'templates/footer.html'
	}
});


gamesApp.controller("gamesControllerCtrl", ['$scope', '$http',
	function gamesController($scope,$http){
		$http.get('assets/api/games.json', {cache: false})
			.success(function (data) {
				$scope.games = data;
			}
		);
		//rest function to all filters
		$scope.rest=function (){
			$scope.searchKey='';
			$scope.CategoryKey='';
		}
	}]

);

gamesApp.controller('gameInfoCtrl', ['$scope','$http', '$routeParams',
	function($scope,$http, $routeParams) {
		var gameId = $routeParams.gameId;
			$scope.game = $scope.games[--gameId];
	}


]);

gamesApp.controller('GameVideoCtrl', function($scope, $sce) {
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
});

gamesApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});


gamesApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'templates/GamesList.html',
				controller: 'gamesControllerCtrl'
			}).
			when('/:gameId', {
				templateUrl: 'templates/gameInfo.html',
				controller: 'gameInfoCtrl'
			}).
			otherwise({
				templateUrl: 'templates/404.html'
			});
	}]);

