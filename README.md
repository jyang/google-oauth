# Client Side

See `oauth-2legged-test.js` for how to make a [2-legged OAuth](http://sites.google.com/site/oauthgoog/2leggedoauth/2opensocialrestapi) request to a [Google Data API](http://code.google.com/apis/gdata/docs/directory.html).

# Server Side

See `oauth-signed-fetch-test.js` for how to verify a signed fetch from Google.  See `oauth-signed-fetch-test-gadget.xml` for a test gadget you can add to a Google Sites page (see below for how to do that).

# How to Create a Private Gadget on Google Sites to Test Signed Fetch

## Install Private Gadget Editor

* On a Google Sites page for your domain, add the gadget [http://google-feedserver.googlecode.com/svn/trunk/resources/gadgets/private-gadget-editor/spec.xml](http://google-feedserver.googlecode.com/svn/trunk/resources/gadgets/private-gadget-editor/spec.xml) by URL.

## Create Signed Fetch Test Private Gadget

* In the Private Gadget Editor, press `New` to create a gadget private to your domain
* Copy the content of [http://github.com/jyang/google-oauth/raw/master/oauth-signed-fetch-test-gadget.xml](http://github.com/jyang/google-oauth/raw/master/oauth-signed-fetch-test-gadget.xml)) to the editor to overwrite its content
* Press `Save` and enter gadget name `signed-fetch-text.xml` to save it
* On another Google Sites page for the same domain, add gadget `http://feedserver-enterprise.googleusercontent.com/a/<mydomain>/g/PrivateGadgetSpec/signed-fetch-test.xml` by URL
* In the test gadget, enter public URL to the server that runs oauth-signed-fetch-test.js and press `Send a Signed Fetch` to send a signed fetch from Google Sites to the test server, which will echo back the email address of the user
