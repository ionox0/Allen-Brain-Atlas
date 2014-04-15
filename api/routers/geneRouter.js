

exports.getExpression = function(req, res){

  var sample = req.params.sample;

  client.query('SELECT * FROM samples', function(err, result) {
    //call `done()` to release the client back to the pool
    //done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[sample]);
  });

}
