var http = require('http');
var oauth = require('./oauth-signed-fetch');

var verifySignedFetch = oauth.verifySignedFetch('http://<public-host-of-this-server>:8081', './igoogle.pem');

http.createServer(function (request, response) {
  verifySignedFetch(req, res, function() {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('signed fetch verified\n');
  });
}).listen(8081);
console.log('Server running at http://0.0.0.0:8081/');
