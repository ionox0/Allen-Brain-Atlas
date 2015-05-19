var probes, exprVals, samples;
var thiz = this;

//Get data from api
$('#find').on( "click", function () {
  $('canvas').remove();
  var geneName = $('#gene').val();
  thiz.getProbes(geneName);
});

function getProbes(geneName){
  $.get('/api/v1/probes/' + geneName, function(data){
    var probe_id = data.rows[0].probe_id;
    // for (var i = 1; i < data.rows.length; i++){
    //   probe_id += " OR probe_id = " + data.rows[i].probe_id;
    // }
    thiz.getExprVals(probe_id);
  });
}

function getExprVals(probe_id){
  $.get('/api/v1/exprVals/' + probe_id, function(data2){
      exprVals = data2;
      thiz.getSamples(exprVals);
  });
}

function getSamples(){
  $.get('/api/v1/allSamples', function(data3){
    samples = data3;
    thiz.buildBrain();    
  });
};

function buildBrain(samples){
  //threejs
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(0, 0, 200);
  scene = new THREE.Scene();

  var object;
  var brain = new THREE.Geometry();
  var pMaterial = new THREE.ParticleBasicMaterial({
    color: 0x2255FF,
    size: 1,
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  var numProbes = exprVals.rows.length;

  for (var i = 1; i < exprVals.fields.length - 1; i++){
    for (var j = 0; j < numProbes; j++){
      if (exprVals.rows[j]['h' + i] == true){
        brain.vertices.push( new THREE.Vector3(
          samples.rows[i].mni_y,
          samples.rows[i].mni_z,
          samples.rows[i].mni_x
          ));
        break;
      }
    }
  }

  object = new THREE.ParticleSystem(brain, pMaterial);
  scene.add(object);
  var render = function () {
    requestAnimationFrame(render);
    object.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  render();
}