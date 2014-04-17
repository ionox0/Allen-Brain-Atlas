var express = require('express');
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/build'));

var pg = require('pg');
var conString = "postgres://postgres:1234@localhost/aba";
var client = new pg.Client(conString);
client.connect();


var geneRouter = require('./api/routers/geneRouter')
app.get('/api/v1/probes/:gene_id', getProbe);
app.get('/api/v1/exprVals/:probe_id', getExprVals);
app.get('/api/v1/samples/:structure_id', getSample);


function getProbe(req, res){
  var id = req.params.gene_id;
  client.query('SELECT * FROM probes WHERE gene_id=' + id, function(err, probes) {
    //call `done()` to release the client back to the pool
    //done(); --not defined...
    if(err) {
      return console.error('error running query', err);
    }
    res.send(probes);
  })
;}


function getExprVals(req, res){
  var id = req.params.probe_id;
  client.query('SELECT * FROM exprvals WHERE probe_id=' + id, function(err, exprVals) {
    //call `done()` to release the client back to the pool
    //done(); --not defined...
    if(err) {
      return console.error('error running query', err);
    }
    res.send(exprVals);
  });
}


function getSample(req, res){
  var id = req.params.structure_id;
  client.query('SELECT * FROM samples WHERE structure_id=' + id, function(err, samples) {
    //call `done()` to release the client back to the pool
    //done(); --not defined...
    if(err) {
      return console.error('error running query', err);
    }
    res.send(samples);
  });
}


app.listen(port, function() {
  console.log('Listening on:', port, '\n');
});
