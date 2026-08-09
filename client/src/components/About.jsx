import Reveal from "./motion/Reveal.jsx";
import { StaggerContainer, StaggerItem } from "./motion/Stagger.jsx";
import ScrollSection from "./motion/ScrollSection.jsx";

const FACTS = [
  { label: "Currently", value: "MCA, St. Joseph's College (Autonomous), Devagiri" },
  { label: "Background", value: "BSc Computer Science" },
  { label: "Focus areas", value: "Software development, AI/ML, cloud computing, IoT" },
  { label: "Looking ahead", value: "AI research, advanced software systems, product development" },
];

export default function About() {
  return (
    <ScrollSection className="about" id="about" pattern="split">
      <Reveal className="section-title" variant="up">
        <h2>About</h2>
        <p>MCA STUDENT AT ST. JOSEPH'S COLLEGE (AUTONOMOUS), DEVAGIRI — BUILDING ACROSS SOFTWARE, AI, CLOUD, AND HARDWARE.</p>
      </Reveal>

      <div className="about__text">
        <Reveal variant="left" delay={0.05}>
          <p>
            I'm Akshath O K, currently pursuing my Master of Computer Applications at St. Joseph's College (Autonomous),
            Devagiri, Kozhikode, after finishing a BSc in Computer Science. I like understanding how a system actually works,
            then building it, breaking it, and making it better.
          </p>
          <p>
            My work moves between web applications, machine learning, cloud infrastructure, and hardware prototypes — usually
            because I wanted to solve a real problem or test whether an idea would actually work, not just add another line to
            a portfolio.
          </p>
        </Reveal>
        <StaggerContainer className="about__facts" stagger={0.08}>
          {FACTS.map((fact) => (
            <StaggerItem key={fact.label} variant="right">
              <strong>{fact.label}</strong>
              {fact.value}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </ScrollSection>
  );
}
