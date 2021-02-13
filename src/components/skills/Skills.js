import React, { useEffect } from "react";
import SVG3DTagCloud from "3d-word-cloud";
import "./skills.css";

const Skills = () => {
  useEffect(() => {
    //  Creating entries
    let entries = [
      { label: "HTML5" },
      { label: "CSS3" },
      { label: "JavaScript" },
      { label: "TypeScript" },
      { label: "Bootstrap" },
      { label: "TailwindCSS" },
      { label: "JQuery" },
      { label: "React" },
      { label: "Redux" },
      { label: "NextJS" },
      { label: "SASS" },
      { label: "NodeJS" },
      { label: "Mongodb" },
      { label: "Express" },
      { label: "Mongoose" },
      { label: "Mongoose" },
      { label: "Git" },
      { label: "GitHub" },
      { label: "npm" },
      { label: "REST" },
      { label: "Firebase" },
      { label: "BEM" },
      { label: "JSON" },
      { label: "Python" },
      { label: "C" },
      { label: "C++" },
      { label: "JAVA" },
    ];

    //Settings
    let settings = {
      entries: entries,
      width: "95%",
      height: "95%",
      radius: "100%",
      radiusMin: 100,
      bgDraw: true,
      bgColor: "#0f0f0f",
      opacityOver: 2.0,
      opacityOut: 0.05,
      opacitySpeed: 1,
      fov: 800,
      speed: 0.9,
      fontFamily: "Roboto Mono, monospace",
      fontSize: "1.3em",
      fontColor: "#bbb",
      fontStretch: "normal",
    };
    new SVG3DTagCloud(document.querySelector("#globe__canvas"), settings);
  }, []);

  return (
    <section id="skills" className="skills__page">
      <div className="skills__content">
        <header>
          <h1 className="heading">Skills</h1>
        </header>
        <p className="text">
          I have strong knowledge in HTML5, CSS3, SASS, JavaScript. I can work
          with <span>React, Redux, Nodejs </span>etc. I am also good with{" "}
          <span>Monogodb, Express, Bootstrap & Version Control (git).</span> I
          am a quick learner and hard worker. New technologies and frameworks
          are not an issue for me. I will learn and start working with that when
          I need to.
        </p>
      </div>
      <div className="skills__globe">
        <div id="globe__canvas" className="globe__canvas"></div>
      </div>
    </section>
  );
};

export default Skills;
