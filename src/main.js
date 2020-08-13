// Toggling Humburger
const menuBtn = document.querySelector(".burger");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  document.querySelector(".nav__list").classList.toggle("open");
});
