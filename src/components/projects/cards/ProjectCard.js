import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { ImGithub } from "react-icons/im";
import "./projectCard.css";

const ProjectCard = ({ number }) => {
  return (
    <div className={`card ${number && "even"}`}>
      <div className="card__left">
        <div className="card__container">
          <div className="image__box">
            <img
              src="https://i.pinimg.com/originals/06/5c/1b/065c1b2c51804566e28fa08ffce2efff.png"
              alt="testimage"
            />
          </div>
          <div className="card__circle"></div>
          <div className="text__wrapper">
            <h2>
              Whatsapp Clone &mdash; Whatsapp Clone &mdash; Whatsapp Clone
              &mdash; Whatsapp Clone &mdash;
            </h2>
          </div>
        </div>
      </div>
      <div className="card__right">
        <span>01</span>
        <h2>Whatsapp Clone</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat,
          repellat!
        </p>
        <div className="code__links">
          <ImGithub className="react-icons" />
          <FiExternalLink className="react-icons" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
