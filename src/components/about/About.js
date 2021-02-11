import React, { useEffect } from "react";
import ScrollOut from "scroll-out";
import Typed from "typed.js";
import { IoIosArrowForward } from "react-icons/io";
import "./about.css";

const About = () => {
  useEffect(() => {
    const options = {
      strings: ["Front End Developer", "Programmer", "Web Developer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    };
    new Typed(".type", options);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ScrollOut({
        targets: ".heading",
      });
    }, 1000);
  }, []);

  return (
    <div id="about" className="about">
      <header>
        <h1 className="heading">About</h1>
      </header>
      <div className="about__body">
        <div className="content">
          <p>
            I'm Makdoom Shaikh. I am a self taught{" "}
            <span className="type"></span> <br /> based in Mumbai. Currently i
            am doing BSC-IT second year from R.D National College Bandra. <br />{" "}
            <br /> I have often find myself looking for inspiration from coders
            who don't have any Computer Science degree such as people that have
            either taught themselves or have gone to bootcamps, to know more
            about me feel free to download my Resume. <br />
            <a href="#" className="resume">
              <span>Resume</span>
              <IoIosArrowForward />
            </a>
          </p>
        </div>
        <div className="image">image</div>
      </div>
    </div>
  );
};

export default About;