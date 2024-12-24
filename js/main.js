////////// DOM ELEMENTS //////////
const imageHeader = document.querySelector(".image");
const mainSection = document.querySelector("main");
const footerSection = document.querySelector("footer");
const openMenuButton = document.querySelector(".open-menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link")
const overlay = document.querySelector(".overlay");
const sections = document.querySelectorAll('section')
const scrollToTopLink = document.querySelector(".scroll-to-top-link");


////////// MENU //////////
let cleanupTrapFocus;
let isMenuOpen = false;

// Disable the scroll on the body and adds padding to prevent layout shift when the scrollbar is removed
function disableScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
}

// Restore body scrolling and remove padding
function enableScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// Trap focus within an element, ensuring focus cycles only among its focusable items
function trapFocus(element) {
  const focusableElements = element.querySelectorAll("a, button");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeydown(event) {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  element.addEventListener("keydown", handleKeydown);

  return () => {
    element.removeEventListener("keydown", handleKeydown);
  };
}

// Open the menu, show the overlay, disable scrolling, and trap focus within the menu
function openMenu() {
  if (isMenuOpen) return;

  navbar.classList.add("active");
  overlay.classList.add("active");
  openMenuButton.setAttribute("aria-expanded", "true");
  openMenuButton.setAttribute("aria-hidden", "true");
  imageHeader.setAttribute("aria-hidden", "true");
  mainSection.setAttribute("aria-hidden", "true");
  footerSection.setAttribute("aria-hidden", "true");
  navbar.setAttribute("aria-hidden", "false");

  disableScroll();
  cleanupTrapFocus = trapFocus(navbar);
  isMenuOpen = true;

  document.body.addEventListener("keydown", handleEscapeKey);

  setTimeout(() => {
    closeMenuButton.focus();
  }, 100);
}

// Close the menu, hide the overlay, enable scrolling, and clean up focus trapping
function closeMenu() {
  if (!isMenuOpen) return;

  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.setAttribute("aria-hidden", "false");
  imageHeader.setAttribute("aria-hidden", "false");
  mainSection.setAttribute("aria-hidden", "false");
  footerSection.setAttribute("aria-hidden", "false");
  navbar.setAttribute("aria-hidden", "true");

  enableScroll();
  cleanupTrapFocus();
  isMenuOpen = false;

  document.body.removeEventListener("keydown", handleEscapeKey);

  setTimeout(() => {
    openMenuButton.focus();
  }, 100);
}

// Smoothly scroll to a target section and close the menu afterward
function navigateToSection(event, sectionId) {
  event.preventDefault();
  const targetSection = document.querySelector(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }

  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.setAttribute("aria-hidden", "false");
  imageHeader.setAttribute("aria-hidden", "false");
  mainSection.setAttribute("aria-hidden", "false");
  footerSection.setAttribute("aria-hidden", "false");
  navbar.setAttribute("aria-hidden", "true");
  enableScroll()
  isMenuOpen = false;
}

// Close the menu when the 'Escape' key is pressed
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
}

// Listeners
openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href");
    navigateToSection(event, sectionId);
  });
});


////////// ACTIVE LINK WITH SCROLL //////////
function activeNavLinks() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
  navLinks.forEach(link => link.classList.remove("active"));
  navLinks[len].classList.add("active");
}

activeNavLinks();
window.addEventListener("scroll", activeNavLinks);


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
const darkThemeClass = "dark-theme";
const moonIcon = document.querySelector(".moon-icon");
const sunIcon = document.querySelector(".sun-icon");
const sound = new Audio("assets/audio/sonido.mp3");

// Retrieve previously selected theme and icon from localStorage
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Get the current theme based on body class
const getCurrentTheme = () => body.classList.contains(darkThemeClass) ? "dark" : "light";

// Update icons and `aria-label` based on the theme
const updateIconsAndAriaLabel = (theme) => {
  if (theme === "dark") {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    themeButton.setAttribute("aria-label", "Cambiar a modo claro");
  } else {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    themeButton.setAttribute("aria-label", "Cambiar a modo oscuro");
  }
};

// If a theme was previously selected, apply it
if (selectedTheme) {
  body.classList[selectedTheme === "dark" ? "add" : "remove"](darkThemeClass);
  updateIconsAndAriaLabel(selectedTheme);
} else {
  body.classList.remove(darkThemeClass);
  updateIconsAndAriaLabel("light");
}

// Event listener for theme button click
themeButton.addEventListener("click", () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Apply the new theme by toggling the class
  body.classList.toggle(darkThemeClass);

  // Update the icons and aria-label based on the new theme
  updateIconsAndAriaLabel(newTheme);

  // Play theme change sound
  sound.play();

  // Store the selected theme and icon in localStorage
  localStorage.setItem("selected-theme", newTheme);
  localStorage.setItem("selected-icon", newTheme === "dark" ? "moon" : "sun");
});