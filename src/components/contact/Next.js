import React from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { SiTwitter } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import "./next.css";

const Next = () => {
  return (
    <section id="next" className="next__page">
      <header>
        <h1 className="heading">What's next ?</h1>
      </header>
      <div className="next__body">
        <div
          className="touch__container"
          data-aos="zoom-in-down"
          data-aos-easing="ease"
          data-aos-duration="1000"
        >
          <h2>Get in touch</h2>
          <p>
            My inbox is always open. Whether you have a question or just want to
            say hello, I'll try my best to get back to you! Feel free to mail me
            about any relevant job updates.
          </p>
          <a href="mailto:makshaikh99@gmail.com" className="mail__me btn">
            Mail me
          </a>
        </div>
      </div>
      <div className="social__links">
        <span
          className="btn"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-easing="ease"
        >
          <VscGithubInverted className="react-icons" />
        </span>
        <span
          className="btn"
          data-aos="zoom-in"
          data-aos-delay="500"
          data-aos-easing="ease"
          data-aos-duration="1000"
        >
          <SiTwitter className="react-icons" />
        </span>
        <span
          className="btn"
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-easing="ease"
          data-aos-duration="1000"
        >
          <FaLinkedinIn className="react-icons" />
        </span>
      </div>
      <footer>
        <p>
          Designed & Created by <span>Makdoom Shaikh</span> &copy;{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
};

export default Next;
