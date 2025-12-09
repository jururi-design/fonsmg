/* ------------ RESET GENERAL ------------ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #ffffff;
  overflow-x: hidden;
}

/* ------------ CONTENEDOR DE FONDO 3D ------------ */
#heroCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

/* ------------ NAVBAR ------------ */
header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
}

nav a {
  color: #000000;
  text-decoration: none;
  margin-left: 25px;
  font-size: 18px;
  font-weight: bold;
}

nav a:hover {
  color: #ff6600;
}

/* ------------ HERO SECTION ------------ */
.hero-section {
  width: 100%;
  height: 100vh;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 50px;
}

/* --- TRANSICIÓN DEL TEXTO DEL HERO --- */
.hero-text {
  opacity: 0;
  transform: translateY(40px);
  transition: 1s ease;
}

/* ⭐ ESTA CLASE ERA LA QUE FALTABA */
.hero-text.show {
  opacity: 1;
  transform: translateY(0);
}

.hero-text h1 {
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 15px;
}

.hero-text p {
  font-size: 22px;
  max-width: 500px;
}

/* ------------ BOTÓN PRINCIPAL ------------ */
.btn-primary {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 25px;
  background: #ff6600;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
}

.btn-primary:hover {
  background: #cc5200;
}

/* ------------ GALERÍA DE IMÁGENES ------------ */
#galeria {
  padding: 80px 40px;
  background: #f7f7f7;
}

#galeria h2 {
  text-align: center;
  font-size: 40px;
  margin-bottom: 40px;
}

.galeria-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.galeria-grid img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform .3s ease;
}

.galeria-grid img:hover {
  transform: scale(1.05);
}

/* ------------ FOOTER ------------ */
footer {
  background: #222;
  color: white;
  padding: 40px;
  text-align: center;
  margin-top: 40px;
}

footer p {
  font-size: 16px;
  opacity: 0.8;
}

/* ------------ ANIMACIONES DESDE JS ------------ */
.hidden {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity .8s ease, transform .8s ease;
}

.show {
  opacity: 1;
  transform: translateY(0);
}



