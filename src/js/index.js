const navBtn = document.querySelector(".nav__open");
const nav = document.querySelector(".nav");

navBtn.addEventListener("click", () => {
  console.log("button clicked");
  nav.style["translateX"] = "0%";
});
