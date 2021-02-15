import React from "react";
import ProjectCard from "./cards/ProjectCard";
import projectData from "./projectData";
import "./projects.css";

const Projects = () => {
  console.log(projectData);
  return (
    <section id="projects" className="projects__page">
      <header>
        <h1 className="heading">My work</h1>
      </header>
      <div className="project__cards">
        {projectData.map((project) => (
          <ProjectCard project={project} key={project.projectId} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
