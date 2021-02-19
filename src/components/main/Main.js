import React, { useEffect } from "react";
import Intro from "../intro/Intro";
import Navbar from "../navbar/Navbar";
import About from "../about/About";
import Skills from "../skills/Skills";
import Projects from "../projects/Projects";
import Next from "../contact/Next";
import "./main.css";

const Main = () => {
  useEffect(() => {
    let cursor = document.querySelector(".cursor");
    let cursor2 = document.querySelector(".cursor2");
    let btns = document.querySelectorAll(".btn");

    document.addEventListener("mousemove", (e) => {
      cursor.style.top = cursor2.style.top = e.clientY + "px";
      cursor.style.left = cursor2.style.left = e.clientX + "px";
    });

    btns.forEach((btn) => {
      btn.addEventListener("mouseover", (e) => {
        cursor.classList.add("grow");
      });
      btn.addEventListener("mouseleave", (e) => {
        cursor.classList.remove("grow");
      });
    });
  }, []);
  // For scroll event
  useEffect(() => {
    const footer = document.querySelector(".next__page");
    console.log(footer.offsetTop);
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".link");
    const scrollToTop = document.querySelector(".scroll__to__top");

    // Listening scroll event
    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }

        // console.log(sectionTop);

        scrollToTop.classList.remove("active");
        if (window.pageYOffset >= 4800) {
          scrollToTop.classList.add("active");
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
    <div className="main">
      <div className="cursor"></div>
      <div className="cursor2"></div>
      <div className="fixed__navbar">
        <Navbar />
      </div>
      <div className="main__body">
        <Intro />
        <About />
        <Skills />
        <Projects />
        <Next />
      </div>
    </div>
  );
};

export default Main;
