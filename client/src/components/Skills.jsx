import Reveal from "./motion/Reveal.jsx";
import { StaggerContainer, StaggerItem } from "./motion/Stagger.jsx";
import ScrollSection from "./motion/ScrollSection.jsx";

const SKILLS = [
  { category: "Programming", items: ["Python", "Java", "C", "JavaScript", "SQL"] },
  { category: "Web & Backend", items: ["Django", "FastAPI", "Node.js", "Express", "REST APIs"] },
  { category: "Frontend / Mobile", items: ["React", "Flutter", "HTML", "CSS", "JavaScript"] },
  { category: "AI / Machine Learning", items: ["Scikit-learn", "TensorFlow / Keras", "XGBoost", "Pandas", "NumPy", "OpenCV"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "Supabase"] },
  { category: "Cloud & Infrastructure", items: ["AWS EC2", "S3", "RDS", "VPC", "IAM"] },
  { category: "Hardware / IoT", items: ["Arduino", "ESP8266 / NodeMCU", "Sensors", "Servo motors", "Serial communication"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "MySQL Workbench", "Docker"] },
];

export default function Skills() {
  return (
    <ScrollSection className="skills" id="skills" pattern="scale">
      <Reveal className="section-title" variant="up">
        <h2>Skills</h2>
        <p>TECHNOLOGIES I REACH FOR ACROSS SOFTWARE, AI/ML, CLOUD, AND HARDWARE PROJECTS.</p>
      </Reveal>

      <StaggerContainer className="skills__grid" stagger={0.07} amount={0.15}>
        {SKILLS.map((group) => (
          <StaggerItem className="skills__category" key={group.category} variant="scale">
            <h3>{group.category}</h3>
            <div className="skills__tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </ScrollSection>
  );
}
