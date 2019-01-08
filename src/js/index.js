const nav = document.querySelector(".nav");
const openNav = document.querySelector(".nav__open");
const closeNav = document.querySelector(".nav__close");

openNav.addEventListener("click", function() {
  nav.classList.toggle("nav--active");
});

closeNav.addEventListener("click", function() {
  nav.classList.toggle("nav--active");
});
