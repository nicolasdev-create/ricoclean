/* ============================================
   RICO CLEAN – SCRIPT.JS
============================================ */

const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2400);
}

const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");

function setMenuOpen(isOpen) {
  if (!hamburger || !navLinks) return;
  navLinks.classList.toggle("open", isOpen);
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("open"));
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      setMenuOpen(false);
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

const header = document.querySelector(".site-header");
const sections = document.querySelectorAll("header[id], section[id], footer[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function onPageScroll() {
  if (header) {
    header.style.boxShadow = window.scrollY > 12
      ? "0 4px 28px rgba(0,0,0,0.10)"
      : "0 2px 8px rgba(0,0,0,0.06)";
  }
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", onPageScroll, { passive: true });
onPageScroll();

const revealTargets = document.querySelectorAll(
  ".service-card, .service-tile, .ba-card, .testimonial-card, .step, .benefit-item, " +
  ".video-feature, .video-card, .anuncio-card, .trust-seal, .produto-highlight, " +
  ".produtos-benefits, .produtos-visual, .oxi-flow-step, .oxi-intro"
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });
  revealTargets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.55s ease ${Math.min(i * 0.06, 0.36)}s, transform 0.55s ease ${Math.min(i * 0.06, 0.36)}s`;
    revealObserver.observe(el);
  });
} else {
  revealTargets.forEach(el => el.classList.add("revealed"));
}

document.querySelectorAll("video[autoplay]").forEach(video => {
  video.muted = true;
  video.play().catch(() => { video.controls = true; });
});

const clockTimeEl = document.getElementById("clock-time");
const clockDayEl  = document.getElementById("clock-day");
const clockDateEl = document.getElementById("clock-date");

function pad2(n) { return String(n).padStart(2, "0"); }

function updateLiveClock() {
  if (!clockTimeEl || !clockDayEl || !clockDateEl) return;
  const now = new Date();
  clockTimeEl.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  clockDayEl.textContent = now.toLocaleDateString("pt-BR", { weekday: "long" });
  clockDateEl.textContent = now.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}
updateLiveClock();
setInterval(updateLiveClock, 1000);