
(function(){
    'use strict'
    angular
    .module('config.service', [])
    .service('ConfigService', ['$http',function($http){
        var $svc=this;
	
	//default build.json
	$svc.build = {"version": (new Date()).getTime()};
	//default config.json
	$svc.config  = {};

	$svc.getVersion = function(){
	    return $svc.build.version;
	};

	//get config if available
	$http.get("./config.json")
	.then(
	   function(promise){
	      $svc.config = promise.data; 
	      angular.ConfigService=$svc;
	   }
	);
        
	//get build if available
	$http.get("./build.json")
	.then(
	   function(promise){
	      $svc.build = promise.data;
	      angular.ConfigService=$svc;
	   }
	);

	angular.ConfigService=$svc;
    }]);
})();
