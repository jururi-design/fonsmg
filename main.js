// Escena, cámara y render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg-animation").appendChild(renderer.domElement);

// Partículas
const particles = new THREE.BufferGeometry();
const count = 2000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0xff7300,
    size: 0.05
});

const points = new THREE.Points(particles, material);
scene.add(points);

camera.position.z = 5;

// Animación
function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0009;
    renderer.render(scene, camera);
}
animate();

// Ajustar cuando cambia tamaño
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

