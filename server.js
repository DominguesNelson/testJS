var rss1 	= require('rssee').create({'interval':15}),
	rss2 	= require('rssee').create({'interval':15}),
	rss3 	= require('rssee').create({'interval':15}),
	sys  	= require('sys'),
	express = require('express');
	http	= require('http');
	
	app = express();
	server = http.createServer(app);
	
	app.use(express.static(__dirname + '/rss'));

app.get('/', function(req, res, next){
  res.render('/rss/index.html');
});

app.listen(8000);

console.log('Server running at http://localhost:8000/');

var socket  = require('socket.io').listen(app);
	socket.set('log level', 1);

rss1.on('article', function(a) {
    socket.sockets.emit("numerama");
    console.log(sys.inspect(a)+"\n");
});
rss2.on('article', function(a) {
    socket.sockets.emit("ycombinator");
    console.log(sys.inspect(a)+"\n");
});
rss3.on('article', function(a) {
    socket.sockets.emit("jeuxvideo");
    console.log(sys.inspect(a)+"\n");
});
rss1.start('http://www.numerama.com/feed');
rss2.start('https://news.ycombinator.com/rss');
rss3.start('http://www.jeuxvideo.com/rss/rss.xml');