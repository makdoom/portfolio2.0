import { useState } from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const [linkName, setLinkName] = useState({});

  // FIX ME: show active link
  const showLink = (e) => {
    setLinkName("");
    setLinkName({ [e.target.classList.value]: e.target.classList.value });
    e.target.classList.toggle("active");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.nav__links}>
        <ul>
          <li className={styles.link}>
            <a href="#intro" className="Intro" onClick={showLink}>
              01
              <br />
              <span>{linkName.Intro}</span>
            </a>
          </li>
          <li className={styles.link}>
            <a href="#about" className="About" onClick={showLink}>
              02
              <br />
              <span>{linkName.About}</span>
            </a>
          </li>
          <li className={styles.link}>
            <a href="#skills" className="Skills" onClick={showLink}>
              03
              <br />
              <span>{linkName.Skills}</span>
            </a>
          </li>
          <li className={styles.link}>
            <a href="#projects" className="Projects" onClick={showLink}>
              04
              <br />
              <span>{linkName.Projects}</span>
            </a>
          </li>
          <li className={styles.link}>
            <a href="#contact" className="Next" onClick={showLink}>
              05
              <br />
              <span>{linkName.Next && "What's next ?"}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.navigation__top}>TOP</div>
    </div>
  );
};

export default Sidebar;
