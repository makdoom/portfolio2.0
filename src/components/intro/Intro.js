import React from "react";
import hello from "../../assets/hello.svg";
import signature from "../../assets/signature.svg";
import "./intro.css";

const Intro = () => {
  return (
    <div id="intro" className="intro__page">
      <div className="signature__background"></div>
      <div className="signature">
        <img src={signature} alt="signature" />
      </div>
      <div className="intro__tagline">
        <img className="hello" src={hello} alt="hello world" />
        <h1 className="quote">
          I want to make things <br /> that make a <span>difference</span>
        </h1>
      </div>
    </div>
  );
};

export default Intro;
