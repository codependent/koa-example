var koa = require('koa');
var route = require('koa-route');
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

app.use(route.get('/', index));

function *index() {
	console.log("route")
 	this.body = "Hello World!";
}

app.listen(port, function(){
  console.log('Koa server listening on port ' + port)
});