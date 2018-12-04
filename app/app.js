'use strict';

angular.module('cardCrafter', [
  'ngRoute',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/'});
  $routeProvider.when('/', {
    templateUrl: 'crafter.html',
    controller: 'CardCrafterController'
  });
}]);

angular.module('cardCrafter')
.directive('contentItem', ['$compile', '$templateRequest', function ($compile, $templateRequest) {
	
	return {
		scope: {
			content: "="
		},
		restrict: "E",
		replace: true,
		link: function(scope, element){
			console.log("linking")
			$templateRequest("/templates/test_template.html").then(function(html){
				console.log("got template")
				var template = angular.element(html);
				// var updatedTemplate = modifyTemplate(template, scope.content)
				element.append(template);
				$compile(template)(scope);
		   });
		}
		// templateUrl: "/templates/test_template.html"
	};
}]);

angular.module('cardCrafter')
.controller('CardCrafterController', ['$scope', function($scope) {
	$scope.cards = []
	$scope.cardsJson = JSON.stringify(
	[{
		"title": {
			"color": "red",
			"text": "dums"
		},
		"description": {
			"text": "Use this card to win the game with handily"
		},
		"banner": {
			"color": "red"
		}
	},
	{
		"title": {
			"color": "blue",
			"text": "dims"
		},
		"image": "https://ih0.redbubble.net/image.112321671.2248/flat,1000x1000,075,f.jpg",
	}])
	
	$scope.generateCards = function() {
		var list = JSON.parse($scope.cardsJson)
		$scope.json = list
	};
}]);