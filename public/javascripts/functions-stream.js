/* t.js */
(function(){function f(a){this.t=a}function j(a,b){for(var c=b.split(".");c.length;){if(!(c[0]in a))return!1;a=a[c.shift()]}return a}function d(a,b){return a.replace(h,function(c,a,e,f,k,h,i,l){var c=j(b,f),a="",g;if(!c)return"!"==e?d(k,b):i?d(l,b):"";if(!e)return d(h,b);if("@"==e){for(g in c)c.hasOwnProperty(g)&&(b._key=g,b._val=c[g],a+=d(k,b));delete b._key;delete b._val;return a}}).replace(i,function(a,d,e){return(a=j(b,e))||0===a?"%"==d?(new Option(a)).innerHTML.replace(/"/g,"&quot;"):a:""})}
var h=/\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,i=/\{\{([=%])(.+?)\}\}/g;f.prototype.render=function(a){return d(this.t,a)};window.t=f})();

var template = new t("<div class='tweet'>{{=text}}</div>");
var $firstTweet = $('#firstTweet');

var socket = io.connect(window.location.origin);
socket.on('tweet', function (data) {
	$(template.render({ text: data })).insertAfter($firstTweet);
});

//connect to socket
//cut off first 17 characters of the title
socket.emit('stream', $('#title').text().slice(17));