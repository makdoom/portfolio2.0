import React from "react";
import logo from "../../assets/logosvg.svg";
import { BsArrowDown } from "react-icons/bs";
import "./navbar.css";

const Navbar = () => {
  // Add .active class on click
  const addActive = (e) => {
    const navbarLinks = document.querySelector(".navbar__links");
    const burger = document.querySelector(".burger");
    e.target.parentElement.parentElement.classList.add("active");

    // hiding navlink
    setTimeout(() => {
      navbarLinks.classList.remove("active");
      burger.classList.remove("toggle");
    }, 300);
  };

  // Show navabr
  const showNav = (e) => {
    const burger = document.querySelector(".burger");
    const navbarLinks = document.querySelector(".navbar__links");

    burger.classList.toggle("toggle");
    navbarLinks.classList.toggle("active");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="navbar__links">
        <ul>
          <li className="intro link active" onClick={addActive}>
            <a href="#intro">
              <span className="link__number">01</span>
              <span className="link__name">Intro</span>
            </a>
          </li>
          <li className="about link" onClick={addActive}>
            <a href="#about">
              <span className="link__number">02</span>
              <span className="link__name">About me</span>
            </a>
          </li>
          <li className="skills link" onClick={addActive}>
            <a href="#skills">
              <span className="link__number">03</span>
              <span className="link__name">Skills</span>
            </a>
          </li>
          <li className="projects link" onClick={addActive}>
            <a href="#projects">
              <span className="link__number">04</span>
              <span className="link__name">Projects</span>
            </a>
          </li>
          <li className="contact link" onClick={addActive}>
            <a href="#contact">
              <span className="link__number">05</span>
              <span className="link__name">What's next ?</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="burger" onClick={showNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="navigation__top">
        {/* <span className="material-icons up">south</span> */}
        <BsArrowDown />
      </div>
    </div>
  );
};

export default Navbar;
