var koa = require('koa');
var route = require('koa-route');
var thunkify = require('thunkify');
var fs = require('fs');
var readFileThunkified = thunkify(fs.readFile);

var app = koa();

var port = 3000;

// logger
app.use(function *(next){
	console.log("midd antes")
	var start = new Date;
	yield next;
	console.log("midd después")
	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
});

// file reader (to test thunks)
app.use(function *(next){
	var file1 = yield readFileThunkified('.gitignore');
	console.log("file1 "+file1);
  	var file2 = yield readFileThunkified('README.md');
  	console.log("file2 "+file2);
	yield next;
	console.log("files upstream");
	
});

app.use(route.get('/', index));

function *index() {
	console.log("route")
 	this.body = "Hello World!";
}

app.listen(port, function(){
  console.log('Koa server listening on port ' + port)
});