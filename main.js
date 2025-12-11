/* ANIMACIONES GSAP */

gsap.from(".hero-title", { opacity: 0, y: -40, duration: 1 });
gsap.from(".hero-subtitle", { opacity: 0, y: -20, duration: 1.2, delay: 0.3 });
gsap.from(".btn-hero", { opacity: 0, duration: 1.2, delay: 0.6 });

gsap.from("#svgLine path", {
  strokeDasharray: 300,
  strokeDashoffset: 300,
  duration: 2,
  scrollTrigger: "#svgLine"
});
