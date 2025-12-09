// main.js - Reemplaza todo el archivo con este contenido
// -----------------------------------------------------
// Versión integrada: Three.js (fondo), GSAP+ScrollTrigger
// SVG draw, gallery reveal, hero entrance.
// -----------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
  // ---------- Helpers ----------
  const safeLog = (...args) => {
    if (window.console && console.info) console.info("[main.js]", ...args);
  };

  // ---------- 1) Three.js - Fondo de partículas ----------
  (function initThreeBackground() {
    if (typeof THREE === "undefined") {
      safeLog("Three.js no está cargado — se omite fondo 3D.");
      return;
    }

    const container = document.getElementById("heroCanvas");
    if (!container) {
      safeLog("No existe #heroCanvas en el HTML — omitiendo fondo 3D.");
      return;
    }

    // Scene / camera / renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparente (fondo CSS sigue visible)
    container.appendChild(renderer.domElement);

    // Partículas
    const COUNT = 1200;
    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 1600; // x
      positions[i3 + 1] = (Math.random() - 0.5) * 900;  // y
      positions[i3 + 2] = (Math.random() - 0.5) * 800;  // z
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 2.0,
      color: 0x24d2fe,
      opacity: 0.85,
      transparent: true,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Slight ambient light (not required for PointsMaterial but ok to keep scene consistent)
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    // Animación
    let rafId = null;
    let lastMouse = { x: 0, y: 0 };
    let targetRot = { x: 0, y: 0 };

    function onMouseMove(e) {
      // suave parallax ligado a cursor - pequeño efecto
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      targetRot.y = nx * 0.08;
      targetRot.x = -ny * 0.04;
    }
    window.addEventListener("pointermove", onMouseMove, { passive: true });

    function animate() {
      // rotación base
      points.rotation.y += 0.0009;
      points.rotation.x += 0.00045;

      // blend hacia target (suavizado)
      points.rotation.x += (targetRot.x - points.rotation.x) * 0.02;
      points.rotation.y += (targetRot.y - points.rotation.y) * 0.02;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // Resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Guardar cleanup por si se necesita
    container._threeCleanup = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      // remover canvas del DOM
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };

    safeLog("Fondo 3D inicializado en #heroCanvas.");
  })();



  // ---------- 2) GSAP: registrar ScrollTrigger si existe ----------
  if (typeof gsap !== "undefined") {
    try {
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }
    } catch (e) {
      safeLog("No se pudo registrar ScrollTrigger:", e);
    }
  } else {
    safeLog("GSAP no está cargado — se omiten animaciones de GSAP.");
  }



  // ---------- 3) Hero entrance (GSAP o fallback) ----------
  (function heroEntrance() {
    const heroContent = document.querySelector(".hero-content");
    const heroTitle = document.querySelector(".hero-title");
    const heroBtn = document.querySelector(".btn-hero");

    if (!heroContent && !heroTitle) return;

    // If GSAP available - use smooth animation
    if (typeof gsap !== "undefined") {
      // set initial state
      gsap.set([heroContent, heroTitle, heroBtn].filter(Boolean), { opacity: 0, y: 30 });

      // timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (heroTitle) tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.9 });
      if (heroContent && heroContent !== heroTitle) tl.to(heroContent, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");
      if (heroBtn) tl.fromTo(heroBtn, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.35");
    } else {
      // Fallback: add .show to .hero-content or .hero-text (si existe)
      const heroTextEl = document.querySelector(".hero-text") || heroContent;
      if (heroTextEl) {
        setTimeout(() => heroTextEl.classList.add("show"), 350);
      }
    }
  })();



  // ---------- 4) SVG drawing (GSAP+ScrollTrigger or fallback) ----------
  (function svgDraw() {
    const svgPath = document.querySelector("#svgLine path");
    const triggerEl = document.querySelector(".svg-section");

    if (!svgPath || !triggerEl) return;

    const length = (typeof svgPath.getTotalLength === "function") ? svgPath.getTotalLength() : 300;
    svgPath.style.strokeDasharray = length;
    svgPath.style.strokeDashoffset = length;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.to(svgPath, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    } else {
      // Fallback simple: draw when element is in view (IntersectionObserver)
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            svgPath.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.2,.9,.2,1)";
            svgPath.style.strokeDashoffset = "0";
            obs.disconnect();
          }
        });
      }, { threshold: 0.25 });
      io.observe(triggerEl);
    }
  })();



  // ---------- 5) Galería: fade-in en cadena ----------
  (function galleryReveal() {
    const items = Array.from(document.querySelectorAll(".grid-galeria .item"));
    if (!items.length) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    } else {
      // Fallback with IntersectionObserver
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // optional: unobserve to avoid repeated triggers
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });

      items.forEach(i => {
        // ensure initial hidden state if CSS doesn't
        i.classList.add("hidden");
        io.observe(i);
      });
    }
  })();



  // ---------- 6) Narrativa: aparición suave ----------
  (function narrativaReveal() {
    const node = document.querySelector(".narrativa .narrativa-text");
    if (!node) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.from(node, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".narrativa",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });
      io.observe(node);
    }
  })();



  // ---------- 7) Smooth anchor scroll adjustment (compensar header) ----------
  (function smoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        // ajustar por posible header fijo
        const headerOffset = document.querySelector("header") ? document.querySelector("header").offsetHeight : 60;
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect.top + scrollTop - headerOffset - 12; // pequeño margen
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  })();



  // ---------- 8) Final log ----------
  safeLog("main.js cargado: animaciones y fondo 3D inicializados (si las librerías están presentes).");
});




