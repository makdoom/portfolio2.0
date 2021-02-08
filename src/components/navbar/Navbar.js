import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO</div>
      <div className="navbar__links">
        <ul>
          <li className="link">
            <a href="#intro">Intro</a>
          </li>
          <li className="link">
            <a href="#about">About</a>
          </li>
          <li className="link">
            <a href="#skills">Skills</a>
          </li>
          <li className="link">
            <a href="#projects">Projects</a>
          </li>
          <li className="link">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navigation__top">TOP</div>
    </div>
  );
};

export default Navbar;
