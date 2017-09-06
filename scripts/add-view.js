var name = process.argv[process.argv.indexOf("--name")+1]
var viewName= process.argv[process.argv.indexOf("--name")+1]+".view";

var ucName = "";
var abbrevName = "";

name.split('.').forEach(function(line){
    abbrevName += line.substring(0,1);
    ucName += line.substring(0,1).toUpperCase() + name.substring(1);
});

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var index = path.join(__dirname, '../src/index.html');
var index2 = path.join(__dirname, '../src/index.2.html');

var viewDir = path.join(__dirname, '../src/views/'+viewName);
var viewCss = viewDir+'/'+viewName+'.css';
var viewJs = viewDir+'/'+viewName+'.js';
var viewHtml = viewDir+'/'+viewName+'.html';

fs.mkdirSync(viewDir);
fs.writeFile(viewCss, '', encoding='utf-8');
fs.writeFile(viewHtml, `
<div class="${viewName.replace('.', '-')}">
    <h1>${ucName}</h1>
</div>
`, encoding='utf-8');
fs.writeFile(viewJs, `
(function(){
    'use strict'
    angular
    .module('main.view', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'config.service'])i
    .config(['$routeProvider', 'ConfigService', function($routeProvider, ConfigService) {
      $routeProvider.when('/${viewName}', {
          templateUrl: "views/${viewName}/${viewName}.html?_v="+ConfigService.getVersion(),
	  controller: "${ucName}Controller",
	  controllerAs: "${abbrevName}Ctrl"
      });
    }])
    .controller('${ucName}Controller', [function(){
        var $ctrl=this;    
    }]);
})();
`, encoding='utf-8');

var isAdded=false
fs.writeFile(index2, '', encoding='utf8');
fs.readFileSync(index).toString().split('\n').forEach(function(line){
    if(/--views--/.test(line) && !isAdded){ 
        fs.appendFileSync(index2, line+"\n");
        isAdded=true;
        fs.appendFileSync(index2,"<script src=\""+viewName+".js\"></script>\n");
        fs.appendFileSync(index2,"<link  href=\""+viewName+".css\" rel=\"stylesheet\" />\n");
    }
    else if(/\/head/.test(line) && !isAdded){
        isAdded=true;
        fs.appendFileSync(index2,"<script src=\""+viewName+".js\"></script>\n");
        fs.appendFileSync(index2,"<link  href=\""+viewName+".css\" rel=\"stylesheet\" />\n");
        fs.appendFileSync(index2, line+"\n");
    }
    else{
        fs.appendFileSync(index2, line+"\n");
    }
});

execSync('mv -f '+index2+' '+index);

console.log("dont forget to add ${viewName} to app.js modules);
