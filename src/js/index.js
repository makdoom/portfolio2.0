import "../sass/main.scss";
import Typed from "typed.js/src/typed";
let EasyPieChart = require("./easypiechart");

// Scroll Indicator
let element = document.querySelector(".chart");
let chart = new EasyPieChart(element, {
  barColor: "#00fff2",
  scaleColor: false,
  trackColor: "transparent",
  size: 55,
  animate: { duration: 10000, enabled: true },
});

let percentage = null;
const outerContainer = document.querySelector(".outer__container");
outerContainer.addEventListener("scroll", () => {
  const scrollable = outerContainer.scrollHeight - outerContainer.offsetHeight;
  const scrolled = outerContainer.scrollTop;

  percentage = Math.ceil((scrolled / scrollable) * 100);
  chart.update(percentage);
});

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
