import React, { useEffect } from "react";
import ScrollOut from "scroll-out";
import Typed from "typed.js";
import { IoIosArrowForward } from "react-icons/io";
import profile from "../../assets/profile.png";
import resume from "./Resume.pdf";
import "./about.css";

const About = () => {
  // Custo

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
    <section id="about" className="about__page">
      <img
        className="profile"
        src={profile}
        alt="profile__image"
        data-aos="fade-up"
        data-aos-easing="ease"
        data-aos-delay="400"
        data-aos-duration="1000"
      />
      <header>
        <h1 className="heading">About me</h1>
      </header>
      <div className="about__body">
        <div
          className="content"
          data-aos="zoom-in"
          data-aos-easing="ease"
          data-aos-duration="1000"
        >
          <p>
            I'm Makdoom Shaikh. I am a self taught{" "}
            <span className="type"></span> <br /> based in Mumbai. Currently i
            am doing BSC-IT second year from R.D National College Bandra. <br />{" "}
            <br /> I have often find myself looking for inspiration from coders
            who don't have any Computer Science degree such as people that have
            either taught themselves or have gone to bootcamps, to know more
            about me feel free to download my Resume. <br />
            <a
              href={resume}
              target="_blank"
              className="resume btn"
              rel="noreferrer"
            >
              <span>Resume</span>
              <IoIosArrowForward />
            </a>
          </p>
        </div>
        {/* <div
          className="image"
          data-aos="fade-up"
          data-aos-easing="ease"
          data-aos-duration="1000"
        > */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default About;
