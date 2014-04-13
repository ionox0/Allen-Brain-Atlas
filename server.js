var express = require('express');
var port = process.env.PORT || 3000;




var pg = require('pg');
var conString = "postgres://postgres:1234@localhost/ian";

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM samples', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[1]);
    //output: 1
  });
});
