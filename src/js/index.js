import "../sass/main.scss";
import Typed from "typed.js/src/typed";

// Custom cursor
let mouseCursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
  // console.log(list);
});

let linksGrow = [];
linksGrow.push(document.querySelector(".burger"));
let projectLinks = document.querySelectorAll(".view abbr");
projectLinks.forEach((link) => {
  linksGrow.push(link);
});
let skills = document.querySelectorAll(".box");
skills.forEach((link) => {
  linksGrow.push(link);
});
let socialLinks = document.querySelectorAll(".social__links a");
socialLinks.forEach((link) => {
  linksGrow.push(link);
});
// linksGrow.push("akdjf");
let navLinks = document.querySelectorAll(".list__item");
navLinks.forEach((link) => {
  linksGrow.push(link);
});

// console.log(linksGrow);
linksGrow.forEach((list) => {
  list.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("grow");
  });
  list.addEventListener("mouseover", () => {
    mouseCursor.classList.add("grow");
  });
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
