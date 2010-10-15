var sys = require('sys');
var httpClient = require('./http-client');

httpClient.send('GET', 'http://www.google.com/', {}, function(response) {
  sys.puts(response.data);
});
