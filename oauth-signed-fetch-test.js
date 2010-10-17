var http = require('http');
var oauth = require('./oauth-signed-fetch');
var querystring = require('querystring');
var url = require('url');

var verifySignedFetch = oauth.verifySignedFetch('http://<public-host-of-this-server>:8081', './igoogle.pem');

http.createServer(function(request, response) {
  verifySignedFetch(request, response, function() {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('signed fetch verified: ' +
        querystring.parse(url.parse(request.url).query).opensocial_viewer_email + '\n');
  });
}).listen(8081);
console.log('Server running at http://0.0.0.0:8081/');
