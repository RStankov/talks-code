var express = require('express');
var bodyParser = require('body-parser');
var graphql = require('graphql').graphql;
var schema = require('./src/schema.js');

var app  = express();

// just needed to serve the "public/index.html" for running queries
app.use(express.static('public'));

// set GraphQL server
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', function(req, res) {
  graphql(schema, req.body).then(function(result) {
    res.send(JSON.stringify(result, null, 2));
  });
});

// start app server
app.listen(3000, function () {
  console.log('Sever started at localhost:3000');
});
