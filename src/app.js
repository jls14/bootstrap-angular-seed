(function(){
   'use strict'
   angular
   .module('app', [
   	'ngRoute',
	'ngAnimate',
	'api.service',
	'navbar.component',
	'main.view'
   ])
   .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.otherwise({redirectTo: '/main'});
   }]);

})();
