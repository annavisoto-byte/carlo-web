const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const loader = document.getElementById("loader");
const hero = document.querySelector(".hero");
const cursorDot = document.querySelector(".cursor-dot");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 900);
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  if (hero && window.innerWidth > 900) hero.style.backgroundPositionY = `${window.pageYOffset * 0.35}px`;
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
  document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }));
}

if (cursorDot) {
  window.addEventListener("mousemove", event => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll("a, button, .gallery-card, .service-card").forEach(item => {
    item.addEventListener("mouseenter", () => { cursorDot.style.width = "34px"; cursorDot.style.height = "34px"; cursorDot.style.background = "#F7C719"; });
    item.addEventListener("mouseleave", () => { cursorDot.style.width = "18px"; cursorDot.style.height = "18px"; cursorDot.style.background = "#E90D86"; });
  });
}

if (typeof ScrollReveal !== "undefined") {
  ScrollReveal().reveal(".hero-content", { distance: "40px", duration: 1000, origin: "left", easing: "ease" });
  ScrollReveal().reveal(".about-text, .section-heading", { distance: "40px", duration: 900, origin: "bottom", interval: 120 });
  ScrollReveal().reveal(".about-image, .service-card, .gallery-card, .process-step, .contact-card, .stats article", { distance: "35px", duration: 850, origin: "bottom", interval: 100 });
}

function addTiltEffect(selector, intensity) {
  document.querySelectorAll(selector).forEach(element => {
    element.addEventListener("mousemove", event => {
      if (window.innerWidth < 900) return;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * intensity;
      const rotateX = ((y / rect.height) - 0.5) * -intensity;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    element.addEventListener("mouseleave", () => element.style.transform = "");
  });
}
addTiltEffect(".service-card", 10);
addTiltEffect(".gallery-card", 8);

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const inputs = contactForm.querySelectorAll("input, textarea");
    const nombre = inputs[0].value.trim();
    const telefono = inputs[1].value.trim();
    const tipoEvento = inputs[2].value.trim();
    const fecha = inputs[3].value;
    const mensaje = inputs[4].value.trim();
    const texto = `Hola Carlo, me gustaría cotizar un evento.%0A%0ANombre: ${nombre}%0ATeléfono: ${telefono}%0ATipo de evento: ${tipoEvento}%0AFecha: ${fecha}%0AIdea: ${mensaje}`;
    window.open(`https://wa.me/526181747715?text=${texto}`, "_blank");
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const galleryImages = [...document.querySelectorAll(".gallery-card img")];
let currentImageIndex = 0;
function openLightbox(index) { currentImageIndex = index; lightboxImg.src = galleryImages[currentImageIndex].src; lightboxImg.alt = galleryImages[currentImageIndex].alt; lightbox.classList.add("active"); document.body.style.overflow = "hidden"; }
function closeLightbox() { lightbox.classList.remove("active"); document.body.style.overflow = ""; }
function showNextImage() { currentImageIndex = (currentImageIndex + 1) % galleryImages.length; lightboxImg.src = galleryImages[currentImageIndex].src; lightboxImg.alt = galleryImages[currentImageIndex].alt; }
function showPrevImage() { currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length; lightboxImg.src = galleryImages[currentImageIndex].src; lightboxImg.alt = galleryImages[currentImageIndex].alt; }
galleryImages.forEach((img, index) => img.addEventListener("click", () => openLightbox(index)));
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxNext) lightboxNext.addEventListener("click", showNextImage);
if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);
if (lightbox) lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (!lightbox || !lightbox.classList.contains("active")) return; if (event.key === "Escape") closeLightbox(); if (event.key === "ArrowRight") showNextImage(); if (event.key === "ArrowLeft") showPrevImage(); });

const counters = document.querySelectorAll(".counter");
let countersStarted = false;
function startCounters() {
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.ceil(target / 80);
    const updateCounter = () => {
      current += increment;
      if (current >= target) counter.textContent = target === 100 ? "100%" : `+${target}`;
      else { counter.textContent = target === 100 ? `${current}%` : `+${current}`; requestAnimationFrame(updateCounter); }
    };
    updateCounter();
  });
}
const statsSection = document.querySelector(".stats");
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersStarted) { countersStarted = true; startCounters(); }
  }, { threshold: 0.35 });
  observer.observe(statsSection);
}

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 140) current = section.getAttribute("id"); });
  navItems.forEach(link => { link.classList.remove("active"); if (link.getAttribute("href") === `#${current}`) link.classList.add("active"); });
});
