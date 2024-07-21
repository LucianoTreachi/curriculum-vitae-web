////////// MENU //////////
const openMenu = document.querySelector(".open-menu");
const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar a")
const closeMenu = document.querySelector(".close-menu");

openMenu.addEventListener("click", () => {
  navbar.classList.add("active");
})

closeMenu.addEventListener("click", () => {
  navbar.classList.remove("active");
})

links.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  })
})

window.addEventListener("scroll", () => {
  navbar.classList.remove('active');
})


////////// SCROLL TO TOP //////////
const scrollTopBtn = document.querySelector(".scrollToTop-Btn");

window.addEventListener("scroll", function () {
  scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});


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
const themeButton = document.querySelector(".ri-moon-fill");
const body = document.body;
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-fill";
const sound = new Audio("assets/audio/sonido.mp3");

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "moon" : "sun";

if (selectedTheme) {
  body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {

  body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  navbar.classList.remove("active");
  sound.play();

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});