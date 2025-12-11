/* ============================================================
   ===============  FONDO 3D CON THREE.JS  =====================
   ============================================================ */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0d0d0f);
document.getElementById("heroCanvas").appendChild(renderer.domElement);

// Objeto 3D (esfera)
const geometry = new THREE.SphereGeometry(2.5, 32, 32);
const material = new THREE.MeshStandardMaterial({
    color: 0xff6600,
    roughness: 0.3,
    metalness: 0.8
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Luces
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 6;

// Animación
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.002;
    sphere.rotation.y += 0.003;
    renderer.render(scene, camera);
}
animate();

// Ajuste en tamaño
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ============================================================
   ===============  ANIMACIONES GSAP / SVG  ====================
   ============================================================ */

gsap.from(".hero-title", { opacity: 0, y: -40, duration: 1 });
gsap.from(".hero-subtitle", { opacity: 0, y: -20, duration: 1.2, delay: 0.3 });
gsap.from(".btn-hero", { opacity: 0, duration: 1.2, delay: 0.6 });

gsap.from("#svgLine path", {
    strokeDasharray: 300,
    strokeDashoffset: 300,
    duration: 2,
    scrollTrigger: "#svgLine"
});


