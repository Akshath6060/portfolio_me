import Reveal from "./motion/Reveal.jsx";
import { StaggerContainer, StaggerItem } from "./motion/Stagger.jsx";

export default function Education() {
  return (
    <section className="education" id="education">
      <Reveal className="section-title" variant="up">
        <h2>Education</h2>
        <p>MCA, ONGOING — AFTER A BSC IN COMPUTER SCIENCE.</p>
      </Reveal>

      <StaggerContainer className="education__list" stagger={0.1} amount={0.15}>
        <StaggerItem className="education__item">
          <div className="education__degree">Master of Computer Applications (MCA)</div>
          <div className="education__school">St. Joseph's College (Autonomous), Devagiri, Kozhikode — Ongoing</div>
          <p className="education__details">
            Coursework spans software engineering, database systems, artificial intelligence, machine learning, data
            analytics, computer networks, cloud computing, algorithms, and full-stack application development.
          </p>
        </StaggerItem>
        <StaggerItem className="education__item">
          <div className="education__degree">Bachelor of Science, Computer Science</div>
          <div className="education__school">Completed prior to MCA</div>
          <p className="education__details">
            Built the programming and computer science fundamentals I've since carried into full-stack, AI/ML, and cloud
            work during the MCA.
          </p>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
