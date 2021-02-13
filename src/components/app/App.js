import Intro from "../intro/Intro";
import Navbar from "../navbar/Navbar";
import About from "../about/About";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".link");

    // Listening scroll event
    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      // Removing active class
      links.forEach((link) => {
        link.classList.remove("active");

        if (link.classList.contains(current)) {
          link.classList.add("active");
        }
      });
    });
  });

  return (
    <div className="app" id="#smoothScrolling">
      <div className="fixed__navbar">
        <Navbar />
      </div>
      <div className="main__body">
        <Intro />
        <About />
      </div>
    </div>
  );
};

export default App;
