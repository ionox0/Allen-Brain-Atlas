var express = require('express');
var port = process.env.PORT || 3000;

var app = express();
console.log(__dirname);
app.use(express.static(__dirname + '/build'));

var geneRouter = require('./api/routers/geneRouter')
app.get('/api/v1/probes/:gene_symbol', geneRouter.getProbe);
app.get('/api/v1/exprVals/:probe_ids', geneRouter.getExprVals);
app.get('/api/v1/samples/:structure_id', geneRouter.getSample);
app.get('/api/v1/allSamples', geneRouter.getAllSampleCoordinates);

app.listen(port, function() {
  console.log('Listening on:', port, '\n');
});

process.on('uncaughtException', function (err) {
  console.log(err);
}); 


//Dummy Test Endpoints:
// app.get('/api/v1/probes/:gene_symbol', function(req, res){
// 	res.send({
// 		rows: [
// 				{ probe_id: 1 },
// 				{ probe_id: 2 }
// 			]
// 		});
// });

// app.get('/api/v1/exprVals/:probe_ids', function(req, res){
// 	res.send({
// 		rows: [{'h1': true}],
// 		fields: [{}]
// 	});
// });

// //app.get('/api/v1/samples/:structure_id', function(req, res){ return null; });

// app.get('/api/v1/allSamples', function(req, res){
// 	res.send({
// 		samples: {
// 			rows: [
// 				{mni_x: 7, mni_y: 8, mni_z: 9}
// 			]
// 		}
// 	})
// });
