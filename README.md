twitter-search-app
==================

Twitter Search Streaming API on Node

This was a simple, but limited concept, to provide an interface to the Twitter Streaming Search API. You could type in a search term and view Tweets fitting that search term as they are Tweeted in real time. So it uses the Twitter search API and WebSockets to communicate new Tweets back to the browser as soon as they happen.

The problem, though, is that Twitter's Search API only allows one instance of the Search API at a time. This means that if someone is on the site, searching Obama, and another enters the site and searches Romney, the first user's Tweet stream will either shut off completely or turn into a Romney stream.

You can enter in multiple search terms, then re-filter them back and try to pass them to the right client, but I didn't do that. There's also a limit of 20 on search terms, so the site would only be able to cater to 20 different searches at any given time, which, needless to say, can't scale.
