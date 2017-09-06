console.log("start build");
var fs = require('fs');
var path = require('path');
var copy = require('recursive-copy');
var uglify = require("uglify-js");
var execSync = require('child_process').execSync;
var cleanCss = new (require('clean-css'))({});
var filePath = path.join(__dirname, '../src/index.html');

if(fs.existsSync(path.join(__dirname, '../dist'))){
    execSync('rm -rf ' + path.join(__dirname, '../dist'));
}
fs.mkdirSync(path.join(__dirname, '../dist'));

var bundleJs  = path.join(__dirname, '../dist/bundle.js');
var bundleCss = path.join(__dirname, '../dist/bundle.css');
var index = path.join(__dirname, '../dist/index.html');
fs.writeFile(index, '', encoding='utf8');
fs.writeFile(bundleJs, '', encoding='utf8');
fs.writeFile(bundleCss, '', encoding='utf8');
fs.readFileSync(filePath).toString().split('\n').forEach(function(line){
    if(/script\s*src="\.\.\/(.*?)"/.test(line)){
        var exec = /script\s*src="\.\.\/(.*?)"/.exec(line);
	var minJs = uglify.minify(fs.readFileSync(""+exec[1]).toString()).code;
	fs.appendFileSync(bundleJs, minJs);
    } else if(/script\s*src="(.*?)"/.test(line)) {
        var exec = /script\s*src="(.*?)"/.exec(line);
	var minJs = uglify.minify(fs.readFileSync("src/"+exec[1]).toString()).code;			        
	fs.appendFileSync(bundleJs, minJs); 
    } else if(/link\s*href="\.\.\/(.*?)"/.test(line)){
        var exec = /link\s*href="\.\.\/(.*?)"/.exec(line);
	var minCss = cleanCss.minify(fs.readFileSync(exec[1]).toString()).styles;
	fs.appendFileSync(bundleCss, minCss);
    } else if(/link\s*href="(.*?)"/.test(line)) {
        var exec = /link\s*href="(.*?)"/.exec(line);
	var minCss = cleanCss.minify(fs.readFileSync("src/"+exec[1]).toString()).styles;			        
	fs.appendFileSync(bundleCss, minCss); 
    } else {
        fs.appendFileSync(index, line);
    }

    if(/<head>/.test(line)){
        fs.appendFileSync(index,"<script src=\"bundle.js\"></script>");
        fs.appendFileSync(index,"<link  href=\"bundle.css\" rel=\"stylesheet\" />");
    }
});

copy('src', 'dist', {filter: ['**/**.html', '!**/index.html']}, function(error, results) {
    if (error) {
        console.error('Copy failed: ' + error); 
    } else {
        console.info(results);
	console.log("It's Alive!");
    }
});
