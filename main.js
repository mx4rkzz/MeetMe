const body = document.querySelector(".page");
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

const setLoaded = () => {
  window.requestAnimationFrame(() => {
    body?.classList.add("is-loaded");
  });
};

const handleScroll = () => {
  if (!navbar) return;
  if (window.scrollY > 12) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

const toggleMenu = () => {
  if (!navLinks) return;
  navLinks.classList.toggle("open");
};

const closeMenuOnClick = (event) => {
  if (!navLinks || !menuToggle) return;
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);
  if (!clickedInsideMenu && !clickedToggle) {
    navLinks.classList.remove("open");
  }
};

const setupReveal = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

menuToggle?.addEventListener("click", toggleMenu);
document.addEventListener("click", closeMenuOnClick);
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", () => {
  setLoaded();
  setupReveal();
  handleScroll();
});
