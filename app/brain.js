renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene = new THREE.Scene();

var material = new THREE.LineBasicMaterial({
  color: 0x0000ff
});

var particle = new THREE.Vertex(
  new THREE.Vector3(0, 0, 0)
  );

var brain = new THREE.Geometry();

brain.vertices.push( new THREE.Vector3( -20,  10, 0 ) );
brain.vertices.push( new THREE.Vector3( -10, -10, 0 ) );
brain.vertices.push( new THREE.Vector3(  10, -10, 0 ) );
brain.faces.push( new THREE.Face3( 0, 1, 2 ) );
brain.computeBoundingSphere();

var object = new THREE.Mesh(brain, material);


scene.add(object);


renderer.render(scene, camera);
