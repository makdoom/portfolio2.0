import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { ImGithub } from "react-icons/im";
import "./projectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div
      className={`card ${project.sequence && "even"}`}
      data-aos="zoom-in-down"
      data-aos-easing="ease"
      data-aos-duration="1000"
    >
      <div className="card__left">
        <div className="card__container">
          <div className="image__box">
            <img src={project.imgurl} alt="testimage" />
          </div>
          <div className="card__circle"></div>
          <div className="text__wrapper">
            <h2>
              {project.projectName} &mdash; {project.projectName} &mdash;{" "}
              {project.projectName} &mdash; {project.projectName} &mdash;
            </h2>
          </div>
        </div>
      </div>
      <div className="card__right">
        <span>{project.projectId}</span>
        <h2>{project.projectName}</h2>
        <p>{project.description}</p>
        <div className="code__links">
          <a
            href={project.code}
            className="btn"
            target="_blank"
            rel="noreferrer"
          >
            <ImGithub className="react-icons" />
          </a>

          <a
            href={project.link}
            className="btn"
            target="_blank"
            rel="noreferrer"
          >
            <FiExternalLink className="react-icons" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
