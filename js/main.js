////////// MENU //////////
const openMenuButton = document.querySelector(".open-menu-button");
const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar a")
const closeMenuButton = document.querySelector(".close-menu-button");

openMenuButton.addEventListener("click", () => {
  navbar.classList.add("active");
  openMenuButton.setAttribute("aria-expanded", "true");
})

closeMenuButton.addEventListener("click", () => {
  navbar.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
})

links.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    openMenuButton.setAttribute("aria-expanded", "false");
  })
})

window.addEventListener("scroll", () => {
  navbar.classList.remove('active');
  openMenuButton.setAttribute("aria-expanded", "false");
})


////////// SCROLL TO TOP LINK //////////
const scrollToTopLink = document.querySelector(".scroll-to-top-link");

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


////////// ACTIVE LINK WITH SCROLL //////////
const navlinks = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('section')

function activeLinks() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
  navlinks.forEach(link => link.classList.remove("active"));
  navlinks[len].classList.add("active");
}

activeLinks();
window.addEventListener("scroll", activeLinks);


//////// THEME ////////// 
const themeButton = document.querySelector(".theme-button");
const body = document.body;
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-fill";
const moonIcon = "ri-moon-fill";
const sound = new Audio("assets/audio/sonido.mp3");

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.querySelector('i').classList.contains(iconTheme) ? "sun" : "moon";

if (selectedTheme) {
  body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);

  if (selectedTheme === "dark") {
    themeButton.querySelector('i').classList.add(moonIcon);
    themeButton.querySelector('i').classList.remove(iconTheme);
  } else {
    themeButton.querySelector('i').classList.add(iconTheme);
    themeButton.querySelector('i').classList.remove(moonIcon);
  }
} else {
  body.classList.remove(darkTheme);
  themeButton.querySelector('i').classList.add(iconTheme);
}

themeButton.addEventListener("click", () => {
  body.classList.toggle(darkTheme);

  if (body.classList.contains(darkTheme)) {
    themeButton.querySelector('i').classList.remove(iconTheme);
    themeButton.querySelector('i').classList.add(moonIcon);
  } else {
    themeButton.querySelector('i').classList.remove(moonIcon);
    themeButton.querySelector('i').classList.add(iconTheme);
  }

  sound.play();

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});