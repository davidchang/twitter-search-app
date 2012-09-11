
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , Twitter = require('node-twitter');

/* EXPRESS */
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.configure(function() {
	io.set('close timeout', 60 * 10);
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.get('/', routes.index);
app.get('/:stream', function(req, res) {
  res.render('stream', { title: 'Search Twitter | ' + req.params.stream });
  io.sockets.on('connection', function(socket) {
  
	var publishFlag = true;
	setInterval(function() {
		publishFlag = true;
	}, 1500);
  
	/* TWITTER API */
	var twitterStreamClient = new Twitter.StreamClient(
		'DbCwANKEP9tiT3r0Eeg',
		'NrvIoAHtkiIsBINDgXwSCZFFeozhMbBFQDU5GwLBLk',
		'229849894-V799oSBnGKm3nrwPMFerIbEsPiGTWr3uqO2DpfzI',
		'bbZdwtqpwseThw54iVCi45xtC5e96VFNP5nTi6apI'
	);

	twitterStreamClient.on('close', function() {
		console.log('Connection closed.');
	});
	twitterStreamClient.on('end', function() {
		console.log('End of Line.');
	});
	twitterStreamClient.on('error', function(error) {
		console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
	});
	twitterStreamClient.on('tweet', function(tweet) {
		if(publishFlag) {
			socket.emit('tweet', tweet);
			publishFlag = false;
		}
	});
	/* End of TWITTER API */
	
	twitterStreamClient.start([req.params.stream]);
  });
});
/* End of EXPRESS */