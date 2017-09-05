(function(){
    'use strict'
    angular
    .module('main.view', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/main', {
          templateUrl: 'views/main.view/main.view.html',
	  controller: 'MainController',
	  controllerAs: 'mainCtrl'
      });
    }])
    .controller('MainController', [function(){
	
    }]);
})()
