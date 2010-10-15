var sys = require('sys');
var urlParser = require('url');
var http = require('http');

function send(method, url, headers, handleResponse) {
  headers = headers || {};

  var parsedUrl = urlParser.parse(url, true);
  headers.host = parsedUrl.hostname;

  var client = http.createClient(
      parsedUrl.port || parsedUrl.protocol == 'http:' ? 80 : 443, parsedUrl.hostname);
  var path = parsedUrl.pathname + (parsedUrl.search || '');
  var clientRequest = client.request(method, path, headers);
  clientRequest.end();

  clientRequest.addListener('response', function (response) {
    var chunks = [];
    response.setEncoding('utf8');
    response.addListener('data', function (chunk) {
      chunks.push(chunk);
    });
    response.addListener('end', function () {
      response.data = chunks.join('');
      handleResponse(response);
    });
  });
};

exports.send = send;
