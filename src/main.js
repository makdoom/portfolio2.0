import Typed from "../node_modules/typed.js";
// Toggling Humburger
const menuBtn = document.querySelector(".burger");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  document.querySelector(".nav__list").classList.toggle("open");
});

// Typing effect
let typed = new Typed(".type", {
  strings: ["Makdoom Shaikh", "Frontend Developer", "Programmer", "Developer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});
