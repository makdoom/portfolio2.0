import React from "react";
import ProjectCard from "./cards/ProjectCard";
import "./projects.css";

const Projects = () => {
  return (
    <section id="projects" className="projects__page">
      <header>
        <h1 className="heading">My work</h1>
      </header>
      <div className="project__cards">
        <ProjectCard />
        <ProjectCard number="even" />
        <ProjectCard />
        <ProjectCard number="even" />
      </div>
    </section>
  );
};

export default Projects;
