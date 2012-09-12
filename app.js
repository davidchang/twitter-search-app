
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , twitter = require('ntwitter');

/* TWITTER API */
var twit = new twitter({
	consumer_key: 'DbCwANKEP9tiT3r0Eeg',
	consumer_secret: 'NrvIoAHtkiIsBINDgXwSCZFFeozhMbBFQDU5GwLBLk',
	access_token_key: '229849894-V799oSBnGKm3nrwPMFerIbEsPiGTWr3uqO2DpfzI',
	access_token_secret: 'bbZdwtqpwseThw54iVCi45xtC5e96VFNP5nTi6apI'
});

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
io.set('log level', 1);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.get('/', routes.index);
app.get('/:stream', routes.stream);

io.sockets.on('connection', function(socket) {

	socket.on('stream', function(searchTerm) {
		runStream(socket, searchTerm);
	});
});

/* End of EXPRESS */

function runStream(socket, searchTerm) {
	console.log('started up with ' + searchTerm);
	twit.stream('statuses/filter', { track: [ searchTerm ] },
		function(stream) {
			//throttle every second
			var publishFlag = true;
			setInterval(function() {
				publishFlag = true;
			}, 1000);
		
			stream.on('data', function(tweet) {
				if(publishFlag) {
					socket.emit('tweet', tweet.text);
					publishFlag = false;
				}
			});
			
			stream.on('error', function(d) { console.log("ERROR: " + d); stream.destroy(); runStream(socket, searchTerm); });
		}
	);
}