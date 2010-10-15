var crypto = require('crypto');
var fs = require('fs');
var OAuth = require('./oauth').OAuth;
var querystring = require('querystring');
var sys = require('sys');
var url = require('url');

exports.verifySignedFetch = function verifySignedFetch(externalUrlHost, certFilePath) {
  var cert = fs.readFileSync(certFilePath);

  function isSignatureValid(message, signature) {
    var verify = new crypto.Verify();
    verify.init('RSA-SHA1');
    verify.update(message);
    return verify.verify(cert, signature, 'base64');
  };

  return function verifySignedFetch(request, response, next) {
    var fullUrl = externalUrlHost + request.url;
    var noParamsUrl = fullUrl.indexOf('?') > 0 ? fullUrl.substring(0, fullUrl.indexOf('?')) : fullUrl;
    var parsedUrl = url.parse(fullUrl);
    var requestParams = querystring.parse(parsedUrl.query);
    var baseString = OAuth.SignatureMethod.getBaseString(
        {method: request.method, action: noParamsUrl, parameters: requestParams});
    var signature = requestParams['oauth_signature'];
    if (isSignatureValid(baseString, signature)) {
      request.params = requestParams;
      if (next) {
        next();
      }
    } else {
      response.writeHead(401, { 'Content-Type': 'text/plain' });
      response.end('signed fetch signature invalid');
    }
  };
};
