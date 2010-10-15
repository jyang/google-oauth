// adapted from http://goo.gl/8iSA

var OAuth = require('./oauth').OAuth;

/**
 * Given consumer key and consumer secret, decorates an HTTP request to make a
 * 2-legged OAuth call.
 * @param request {Object} request.method is HTTP method; request.url is URL of
 *     request; request.userId is email of user e.g. user1@example.com
 * @return request {Object} In the same format as input but suitable for a 2LO request
 */
function decorateRequest(request, ck, cks) {
  var accessor = {consumerSecret: cks, tokenSecret: ''};
  var message = {action: request.url, method: request.method.toUpperCase(), parameters: [
    ['oauth_version', '1.0'], ['xoauth_requestor_id', request.userId],
    ['oauth_consumer_key', ck]]
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message);
  var baseStr = OAuth.decodeForm(OAuth.SignatureMethod.getBaseString(message));
  var theSig = '';

  if (parameterMap.parameters) {
    for (var item in parameterMap.parameters) {
      for (var subitem in parameterMap.parameters[item]) {
        if (parameterMap.parameters[item][subitem] == 'oauth_signature') {
          theSig = parameterMap.parameters[item][1];
          break;
        }
      }
    }
  }

  var paramList = baseStr[2][0].split('&');
  paramList.push('oauth_signature=' + theSig);
  paramList.sort(function(a, b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });
  for (var i = 0; i < paramList.length; i++) {
    var nvp = paramList[i].split('=');
    paramList[i] = nvp[0] + '=' + nvp[1];
  }

  request.url =  baseStr[1][0] + '?' + paramList.join('&');
  return request;
};

exports.decorateRequest = decorateRequest;
