'use strict';
//jshint unused:false

var superagent = require('superagent'),
chai = require('chai'),
expect = chai.expect,
should = chai.should(),
app = require('../server').app;

describe('API TESTS \n', function(){

  it('can get a gene\'s probes', function(done){
    superagent.get('localhost:3000/api/v1/probes/186').end(function(e, res){
      expect(e).to.eql(null);
      expect(res.body.rows[0].gene_symbol).to.eql('AGXT');
      for (var i = 0; i < res.body.rows.length; i++)
        console.log(res.body.rows[i].probe_id, res.body.rows[i].gene_symbol);
      done();
    });
  });

  it('can get a probes\'s expression values', function(done){
    superagent.get('localhost:3000/api/v1/exprVals/1058685').end(function(e, res){
      expect(e).to.eql(null);
      expect(res.body.rows[0].probe_id).to.eql(1058685);
      for (var i = 0; i < res.body.rows.length; i++)
        console.log(res.body.rows[i].probe_id, res.body.rows[i].h1, res.body.rows[i].h2);
      done();
    });
  });

  it('can get a sample\'s details', function(done){
    superagent.get('localhost:3000/api/v1/samples/4077').end(function(e, res){
      expect(e).to.eql(null);
      expect(res.body.rows[0].structure_id).to.eql(4077);
      console.log(
        res.body.rows[0].structure_id,
        res.body.rows[0].structure_acronym,
        res.body.rows[0].mri_voxel_x,
        res.body.rows[0].mri_voxel_y,
        res.body.rows[0].mri_voxel_z
        );
      done();
    });
  });
});
