'use strict';
//jshint unused:false

var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../server').app;

describe('api tests', function(){

  it('can get a sample\'s details', function(done){
    superagent.get('localhost:3000/api/v1/4077').end(function(e, res){
        console.log(res.body.rows);
        expect(e).to.eql(null);
        expect(res.body.rows[0].structure_id).to.eql(4077);
        done();
    });
  });

});
