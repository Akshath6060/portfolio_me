import { useEffect, useState } from "react";
import { fetchProjects } from "../api.js";

const FALLBACK_PROJECTS = [
  {
    _id: "mca-entrance",
    title: "MCA Entrance Examination System",
    image: "assets/project-mca-entrance.svg",
    link: "#",
    dark: false,
    alt: "MCA Entrance Examination System — exam platform built for our college's MCA entrance exam, handling the candidate workflow, a secure exam interface, and same-day result processing for about 129 candidates.",
  },
  {
    _id: "pathmind-ai",
    title: "PathMind AI",
    image: "assets/project-pathmind-ai.svg",
    link: "#",
    dark: false,
    alt: "PathMind AI — an evolving concept for a platform that analyses a student's profile, resume, and skills to score job-readiness and recommend career and learning paths.",
  },
  {
    _id: "stock-prediction",
    title: "Stock Market Prediction App",
    image: "assets/project-stock-prediction.svg",
    link: "#",
    dark: false,
    alt: "Stock Market Prediction App — a Django and Flutter application that uses machine learning on historical market data to predict figures like the next trading day's opening price.",
  },
  {
    _id: "smart-inventory",
    title: "Smart Inventory System",
    image: "assets/project-smart-inventory.svg",
    link: "#",
    dark: false,
    alt: "Smart Inventory System — an inventory management platform for retailers with authentication, role management, orders, supplier management, and ML-based demand forecasting.",
  },
  {
    _id: "iedc-robot",
    title: "IEDC Interactive Robot",
    image: "assets/project-iedc-robot.svg",
    link: "#",
    dark: false,
    alt: "IEDC Interactive Robot — an Arduino-based animatronic with ultrasonic sensors and servo motors that detects people and responds with hand-waving and ear movement, driven by a FastAPI/Python backend.",
  },
  {
    _id: "air-quality",
    title: "Air Quality Monitoring System",
    image: "assets/project-air-quality.svg",
    link: "#",
    dark: false,
    alt: "Air Quality Monitoring System — a NodeMCU ESP8266 prototype using an MQ135 gas sensor and a DHT sensor to measure and display air quality on an LCD.",
  },
  {
    _id: "secure-exam",
    title: "Secure Online Examination Platform",
    image: "assets/project-secure-exam.svg",
    link: "#",
    dark: false,
    alt: "Secure Online Examination Platform — a React and Node.js exam system prototype with JWT authentication and admin controls, inspired by large-scale entrance exam platforms.",
  },
  {
    _id: "timetable",
    title: "University Timetable System",
    image: "assets/project-timetable.svg",
    link: "#",
    dark: false,
    alt: "University Timetable System — a database-driven system for course, faculty, and scheduling data with automated timetable generation.",
  },
  {
    _id: "curlometer",
    title: "Curlometer",
    image: "assets/project-curlometer.svg",
    link: "#",
    dark: false,
    alt: "Curlometer — an experimental computer vision project using Python and OpenCV to estimate visible curl clusters from a photo of hair.",
  },
];

export default function Work() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => {
        // Backend unavailable — keep showing the fallback project list.
      });
  }, []);

  return (
    <section className="work" id="work">
      <div className="intro">
        <h1>
          Most of what I build starts with a real problem or a question I wanted to test — from an exam platform used for our
          college's actual MCA entrance exam to a robot that waves back at people.
        </h1>
        <div className="intro__aside">
          <p>
            I move across web development, machine learning, cloud infrastructure, and IoT — usually whichever combination
            actually solves the problem in front of me.
          </p>
          <a href="#about">
            More about me <span>↗</span>
          </a>
        </div>
      </div>

      <div className="section-title">
        <h2>Projects</h2>
        <p>A SELECTION ACROSS WEB, AI/ML, CLOUD, AND HARDWARE — FROM A REAL COLLEGE EXAM SYSTEM TO EXPERIMENTS BUILT JUST TO SEE IF THEY'D WORK.</p>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <a className="project" key={project._id} href={project.link || "#"} aria-label={project.title}>
            {project.dark ? (
              <div className="project__dark">
                <img src={`/${project.image}`} alt={project.alt || `${project.title} logo`} />
              </div>
            ) : (
              <img src={`/${project.image}`} alt={project.alt || `${project.title} preview`} />
            )}
            <h3>
              <span>↗</span> {project.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
