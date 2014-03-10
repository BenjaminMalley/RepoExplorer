var http = require('http'),
    httpProxy = require('http-proxy'),
    express = require('express'),
    api = {
      host: "api.github.com",
      port: 443,
      https: true,
    },
    proxy = new httpProxy.RoutingProxy({ target: api }),
    app = express(),
    listeningPort = 8000;

app.use(express.logger('dev'));

// serve static resources
['/app', '/vendor', '/lib'].forEach(function(route) {
  app.use(route, express.static(__dirname + route));
});

// proxy GitHub API calls
// Resource requests from the app are prepended with api/ so that the server can proxy them
app.get('/api/*', function(req, res) {
  delete req.headers.host;
  delete req.headers.cookie;
  delete req.headers.referer;
  req.url = req.url.replace('api/', '');
  proxy.proxyRequest(req, res, api);
});

// serve index.html for all other requests, let angular handle routing
app.get('/*', function(req, res, next) {
  res.sendfile('app/views/index.html');
});

app.listen(listeningPort);

console.log('Server now listening at port ' + listeningPort);
