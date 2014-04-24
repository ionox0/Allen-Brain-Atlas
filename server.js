var express = require('express');
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/build'));

var geneRouter = require('./api/routers/geneRouter')
app.get('/api/v1/probes/:gene_symbol', geneRouter.getProbe);
app.get('/api/v1/exprVals/:probe_ids', geneRouter.getExprVals);
app.get('/api/v1/samples/:structure_id', geneRouter.getSample);
app.get('/api/v1/allSamples', geneRouter.getAllSampleCoordinates);

app.listen(port, function() {
  console.log('Listening on:', port, '\n');
});
