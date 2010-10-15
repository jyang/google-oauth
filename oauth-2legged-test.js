var sys = require('sys');
var oauth2legged = require('./oauth-2legged');
var httpClient = require('./http-client');

var request = {
    method: 'GET',
    url: 'http://docs.google.com/feeds/documents/private/full?alt=json',
    userId: 'user@example.com'
};
var oauthRequest = oauth2legged.decorateRequest(
    request, 'example.com', '--example.com-consumer-secret--');
httpClient.send('GET', oauthRequest.url, {}, function(response) {
  var feed = JSON.parse(response.data).feed;
  feed.entry.forEach(function(entry) {
    console.log('>> ' + entry.id.$t);
    console.log('   ' + entry.title.$t);
    console.log('   ' + entry.author[0].email.$t);
  });
});
