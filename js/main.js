////////// DOM ELEMENTS //////////
const openMenuButton = document.querySelector(".open-menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar a")
const overlay = document.querySelector(".overlay");
const sections = document.querySelectorAll('section')
const scrollToTopLink = document.querySelector(".scroll-to-top-link");


////////// MENU //////////
function trapFocus(element) {
  const focusableElements = element.querySelectorAll("a, button");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  });
}

function openMenu() {
  navbar.classList.add("active");
  overlay.classList.add("active");
  openMenuButton.setAttribute("aria-expanded", "true");
  trapFocus(navbar);

  setTimeout(() => {
    closeMenuButton.focus();
  }, 100);
}

function closeMenu() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");

  setTimeout(() => {
    openMenuButton.focus();
  }, 100);
}

function navigateToSection(event, sectionId) {
  event.preventDefault();
  const targetSection = document.querySelector(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }

  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
}

// Listeners
openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Close menu with Escape key
document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Navigation links
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href");
    navigateToSection(event, sectionId);
  });
});


////////// ACTIVE LINK WITH SCROLL //////////
function activeLinks() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
  links.forEach(link => link.classList.remove("active"));
  links[len].classList.add("active");
}

activeLinks();
window.addEventListener("scroll", activeLinks);


////////// SCROLL TO TOP LINK //////////
window.addEventListener("scroll", function () {
  scrollToTopLink.classList.toggle("active", window.scrollY > 500);
});

scrollToTopLink.addEventListener("click", (event) => {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})

//////// THEME ////////// 
const themeButton = document.querySelector(".theme-button");
const body = document.body;
const darkTheme = "dark-theme";
const sunIcon = "ri-sun-fill";
const moonIcon = "ri-moon-fill";
const sound = new Audio("assets/audio/sonido.mp3");

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.querySelector('i').classList.contains(sunIcon) ? "sun" : "moon";

if (selectedTheme) {
  body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);

  if (selectedTheme === "dark") {
    themeButton.querySelector('i').classList.add(moonIcon);
    themeButton.querySelector('i').classList.remove(sunIcon);
    themeButton.setAttribute("aria-label", "Cambiar a modo claro");
  } else {
    themeButton.querySelector('i').classList.add(sunIcon);
    themeButton.querySelector('i').classList.remove(moonIcon);
    themeButton.setAttribute("aria-label", "Cambiar a modo oscuro");
  }
} else {
  body.classList.remove(darkTheme);
  themeButton.querySelector('i').classList.add(sunIcon);
  themeButton.setAttribute("aria-label", "Cambiar a modo oscuro");
}

themeButton.addEventListener("click", () => {
  body.classList.toggle(darkTheme);

  if (body.classList.contains(darkTheme)) {
    themeButton.querySelector('i').classList.remove(sunIcon);
    themeButton.querySelector('i').classList.add(moonIcon);
    themeButton.setAttribute("aria-label", "Cambiar a modo claro");
  } else {
    themeButton.querySelector('i').classList.remove(moonIcon);
    themeButton.querySelector('i').classList.add(sunIcon);
    themeButton.setAttribute("aria-label", "Cambiar a modo oscuro");
  }

  sound.play();

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});