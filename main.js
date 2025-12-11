/* ========== THREE.JS - animación debajo del botón ========== */
/* Este script crea una esfera simple (como ejemplo) y la dibuja dentro
   del contenedor #heroCanvas. El renderer se adapta al tamaño real del contenedor. */

const container = document.getElementById('heroCanvas');

/* escena y cámara */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.z = 6;

/* renderer: alfa true para integrar con fondo del contenedor */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

/* objeto: esfera */
const geometry = new THREE.SphereGeometry(1.6, 48, 48);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6600,
  roughness: 0.2,
  metalness: 0.7
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

/* luz ambiental + puntual */
const ambient = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambient);

const point = new THREE.PointLight(0xffffff, 1.25);
point.position.set(3, 3, 5);
scene.add(point);

/* función para redimensionar renderer al tamaño del contenedor */
function resizeRendererToContainer() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

/* animación */
function animate() {
  resizeRendererToContainer();

  sphere.rotation.y += 0.006;
  sphere.rotation.x += 0.003;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

/* ajustar al cambiar tamaño de ventana */
window.addEventListener('resize', resizeRendererToContainer);
