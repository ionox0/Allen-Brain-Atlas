'use strict';
//jshint unused:false

var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../server').app;

describe('api tests', function(){

  it('can get a sample\'s details', function(done){
    superagent.get('/api/v1/getSample').end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.question).to.not.be.eql(null || undefined);
        done();
    });
  });

});
