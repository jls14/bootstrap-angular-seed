var name = process.argv[process.argv.indexOf("--name")+1]
var serviceName= process.argv[process.argv.indexOf("--name")+1]+".service";

var scName = "";
var abbrevName = "";

name.split('.').forEach(function(line){
    abbrevName += line.substring(0,1);
    scName += line.substring(0,1).toUpperCase() + name.substring(1);
});

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var index  = path.join(__dirname, '../src/index.html');
var index2 = path.join(__dirname, '../src/index2.html');
var serviceDir = path.join(__dirname, '../src/services');
var serviceJs  = serviceDir+'/'+serviceName+'.js';

fs.mkdirSync(serviceDir);
fs.writeFile(serviceJs, `
(function(){
    'use strict'
    angular
    .module('${serviceName}', [])
    .service('${scName}Service', [function(){
        var $svc=this;
    }]);
})();
`, encoding='utf-8');

var isAdded=false
fs.writeFile(index2, '', encoding='utf8');
fs.readFileSync(index).toString().split('\n').forEach(function(line){
    if(/--services--/.test(line) && !isAdded){ 
        isAdded=true;
        fs.appendFileSync(index2, line+"\n");
        fs.appendFileSync(index2,"<script src=\"services/"+serviceName+".js\"></script>\n");
    }
    else if(/\/head/.test(line) && !isAdded){
        isAdded=true;
        fs.appendFileSync(index2,"<script src=\"services/"+serviceName+".js\"></script>\n");
        fs.appendFileSync(index2, line+"\n");
    }
    else{
        fs.appendFileSync(index2, line+"\n");
    }
});

execSync('mv -f '+index2+' '+index);

console.log("dont forget to add ${serviceName} to app.js modules");
