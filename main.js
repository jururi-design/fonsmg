/* ============================================================
   FONDO ANIMADO CON THREE.JS (PARTÍCULAS)
============================================================ */
let scene, camera, renderer, particles;

function initBackground() {
    const container = document.getElementById("hero-bg");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Crear partículas
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 1600;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        color: 0x24d2fe,
        opacity: 0.8,
        transparent: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

initBackground();


/* ============================================================
   ANIMACIÓN SVG CON GSAP
============================================================ */
gsap.from("#svgLine", {
    duration: 2,
    strokeDasharray: 300,
    strokeDashoffset: 300,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".svg-section",
        start: "top 80%",
    }
});


/* ============================================================
   APARICIÓN DE ELEMENTOS CON SCROLLTRIGGER
============================================================ */
gsap.utils.toArray(".item").forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
            trigger: item,
            start: "top 85%"
        }
    });
});

gsap.from(".narrativa-text", {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
        trigger: ".narrativa",
        start: "top 80%",
    }
});
