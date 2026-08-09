import Reveal from "./motion/Reveal.jsx";
import { StaggerContainer, StaggerItem } from "./motion/Stagger.jsx";

const EXPERIENCE = [
  {
    role: "Campus Lead → Operations & Quality Assurance Lead",
    org: "IEDC Devagiri",
    desc: "Coordinated technical initiatives, workshops, and startup/innovation activities at the campus incubation cell. Moved from leading the campus chapter to focusing on event execution and quality, working closely with faculty and student teams.",
  },
  {
    role: "Student Coordinator",
    org: "ENVI 8 — National-Level Technical Fest, St. Joseph's College Devagiri",
    desc: "Coordinated a national-level fest covering a 24-hour hackathon, tech quiz, debate, ideathon, capture the flag, vibe coding, and robotics events — working across student teams, faculty, participants, and external organizations to run the event.",
  },
  {
    role: "Robotics Mentor",
    org: "Robotics Workshops",
    desc: "Mentored students through the basics of Arduino, sensors, servo motors, and RC car development in hands-on workshops.",
  },
  {
    role: "Founding Member — Marketing & Finance",
    org: "Evolvates",
    desc: "Founding member handling marketing and finance for the initiative, alongside involvement with the TinkerHub and MuLearn campus communities.",
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <Reveal className="section-title" variant="up">
        <h2>Experience</h2>
        <p>TECHNOLOGY ISN'T MY ONLY EXPERIENCE — I'VE ALSO COORDINATED STUDENT COMMUNITIES AND TECHNICAL EVENTS.</p>
      </Reveal>

      <StaggerContainer className="experience__list" stagger={0.1} amount={0.15}>
        {EXPERIENCE.map((item) => (
          <StaggerItem className="experience__item" key={item.role}>
            <div>
              <div className="experience__role">{item.role}</div>
              <div className="experience__org">{item.org}</div>
            </div>
            <p className="experience__desc">{item.desc}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
