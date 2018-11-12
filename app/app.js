'use strict';

// Declare app level module which depends on views, and core components
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

/*
	[
		{
			'template-title': {
				'style': {
					'color': 'red'
				},
				'content': {}
			}
		},
		{
			'template-title': {
				'style': {
					'color': 'red'
				},
				'content': {}
			}
		}
	]	
*/

angular.module('cardCrafter')
.directive('contentItem', ['$compile', '$templateRequest', function ($compile, $templateRequest) {
	
	// var setStyles = function(tag, styleObject) {
	// 	console.log("tag: "+tag)
	// 	console.log("styles: "+styleObject)
	// 	tag.css("color", "red")
	// }
	
	// var modifyTemplate = function(template, content) {
	// 	console.log("Modifying template: " + template)
	// 	console.log("With content: " + content)
	// 	var classes = Object.keys(content)
	// 	var i;
	// 	for (i = 0; i < classes.length; i++) {
	// 		var format = /[ !@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
	// 		console.log("looking up '."+classes[i]+"'")
	// 		console.log("has special chars: "+format.test(classes[i]))
	// 		if (!format.test(classes[i])) {
	// 			// var tag = template.find(classes[i])
	// 			// setStyles(tag, content[classes[i]].style)
	// 			template.find(classes[i]).css("color", "red")
	// 		}
	// 	}
	// 	console.log(template)
	// 	return template
	// }
	
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
	
	$scope.generateCards = function() {
		var list = JSON.parse($scope.cardsJson)
		$scope.json = list
	};

	$scope.exportPdf = function(){
		html2canvas(document.getElementById('pdfcontents'), {
			onrendered: function (canvas) {
				var data = canvas.toDataURL();
				var docDefinition = {
					content: [{
						image: data,
						width: 500,
					}]
				};
				pdfMake.createPdf(docDefinition).download("test.pdf");
			}
		});
	}
}]);