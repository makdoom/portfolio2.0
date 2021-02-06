import styles from "../styles/Main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <section id="intro" className={styles.section__one}>
        <h1>Intro</h1>
      </section>
      <section id="about" className={styles.section__two}>
        <h1>About</h1>
      </section>
      <section id="skills" className={styles.section__three}>
        <h1>Skills</h1>
      </section>
      <section id="projects" className={styles.section__four}>
        <h1>Projects</h1>
      </section>
      <section id="contact" className={styles.section__five}>
        <h1>Contact</h1>
      </section>
    </div>
  );
};

export default Main;
