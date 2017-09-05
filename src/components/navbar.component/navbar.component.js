(function(){
    'use strict'
    angular
    .module('navbar.component', [])
    .directive('navbarComponent', [function(){
    	return {
	    templateUrl: "components/navbar.component/navbar.component.html",
	    controller: "NavbarController",
	    controllerAs: "navbarCtrl"
	};
    }])
    .controller('NavbarController', [function(){
    }])
})()
