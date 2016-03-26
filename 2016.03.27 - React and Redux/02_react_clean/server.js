var express = require('express');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = new express();

var config = require('./webpack.config');
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/stylesheets/app.css', function(req, res) {
  res.sendFile(__dirname + '/stylesheets/app.css');
});

var port = 3000;
app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening on port %s", port);
  }
})
