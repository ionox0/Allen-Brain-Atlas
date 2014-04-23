var pg = require('pg');
var conString = "postgres://postgres:1234@localhost/aba";
var client = new pg.Client(conString);
client.connect();

exports.getProbe = function(req, res){
  var id = req.params.gene_id;
  client.query('SELECT * FROM probes WHERE gene_id=' + id, function(err, probes) {
    //call `done()` to release the client back to the pool
    //done(); --not defined...
    if(err) {
      return console.error('error running query', err);
    }
    res.send(probes);
  })
}

exports.getExprVals = function(req, res){
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

exports.getSample = function(req, res){
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

exports.getAllSampleCoordinates = function(req, res){
  client.query('SELECT mri_voxel_x, mri_voxel_y, mri_voxel_z FROM samples', function(err, samples) {
    //call `done()` to release the client back to the pool
    //done(); --not defined...
    if(err) {
      return console.error('error running query', err);
    }
    res.send(samples);
  });
}
