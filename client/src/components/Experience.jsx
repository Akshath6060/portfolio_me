import Reveal from "./motion/Reveal.jsx";
import { StaggerContainer, StaggerItem } from "./motion/Stagger.jsx";
import ScrollSection from "./motion/ScrollSection.jsx";

const EXPERIENCE = [
  {
    role: "Co-Founder",
    org: "Technoate Solutions LLP",
    meta: "2026 — Present",
    active: true,
    desc: "Co-founded an early-stage technology startup focused on software solutions and AI-driven products. Working across product ideation, technical development, R&D, prototyping, technical decisions, and early-stage startup operations.",
    areas: "AI · Software · Web Applications · Automation · Product Development",
    initiative: "Current product R&D explores an AI-assisted education → skills → career → employment platform, including skill-gap, job-readiness, resume, and learning guidance concepts.",
  },
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
    <ScrollSection className="experience" id="experience" pattern="soft">
      <Reveal className="section-title" variant="up">
        <h2>Experience</h2>
        <p>BUILDING PRODUCTS, TECHNICAL INITIATIVES, STUDENT COMMUNITIES, AND HANDS-ON LEARNING EXPERIENCES.</p>
      </Reveal>

      <StaggerContainer className="experience__list" stagger={0.1} amount={0.15}>
        {EXPERIENCE.map((item) => (
          <StaggerItem className="experience__item" key={item.role} variant="alternate">
            <div>
              <div className="experience__role">{item.role}</div>
              <div className="experience__org">{item.org}</div>
              {item.meta && <div className="experience__meta">{item.meta} {item.active && <span className="experience__status"><i /> Active</span>}</div>}
            </div>
            <div>
              <p className="experience__desc">{item.desc}</p>
              {item.areas && <p className="experience__areas">{item.areas}</p>}
              {item.initiative && <p className="experience__initiative"><strong>Product / R&amp;D initiative</strong>{item.initiative}</p>}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </ScrollSection>
  );
}
