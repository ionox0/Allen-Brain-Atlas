var express = require('express');
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/build'));

var pg = require('pg');
var conString = "postgres://postgres:1234@localhost/ian";
var client = new pg.Client(conString);
client.connect();


var geneRouter = require('./api/routers/geneRouter')
app.get('/api/v1/:structure_id', getSample);




function getSample(req, res){

  var id = req.params.structure_id;
  var that = this;

  client.query('SELECT * FROM samples WHERE structure_id=' + id, function(err, samples) {
    //call `done()` to release the client back to the pool
    //done(); --not defined...
    if(err) {
      return console.error('error running query', err);
    }
    //console.log(sample.rows);
    res.send(samples);
  });

}





app.listen(port, function() {
  console.log('Listening on:', port);
});
