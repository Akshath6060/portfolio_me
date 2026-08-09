import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import Project from "./models/Project.js";

const projects = [
  {
    title: "MCA Entrance Examination System",
    image: "assets/project-mca-entrance.svg",
    alt: "MCA Entrance Examination System — exam platform built for our college's MCA entrance exam, handling the candidate workflow, a secure exam interface, and same-day result processing for about 129 candidates.",
    link: "#",
    dark: false,
    order: 1,
  },
  {
    title: "PathMind AI",
    image: "assets/project-pathmind-ai.svg",
    alt: "PathMind AI — an evolving concept for a platform that analyses a student's profile, resume, and skills to score job-readiness and recommend career and learning paths.",
    link: "#",
    dark: false,
    order: 2,
  },
  {
    title: "Stock Market Prediction App",
    image: "assets/project-stock-prediction.svg",
    alt: "Stock Market Prediction App — a Django and Flutter application that uses machine learning on historical market data to predict figures like the next trading day's opening price.",
    link: "#",
    dark: false,
    order: 3,
  },
  {
    title: "Smart Inventory System",
    image: "assets/project-smart-inventory.svg",
    alt: "Smart Inventory System — an inventory management platform for retailers with authentication, role management, orders, supplier management, and ML-based demand forecasting.",
    link: "#",
    dark: false,
    order: 4,
  },
  {
    title: "IEDC Interactive Robot",
    image: "assets/project-iedc-robot.svg",
    alt: "IEDC Interactive Robot — an Arduino-based animatronic with ultrasonic sensors and servo motors that detects people and responds with hand-waving and ear movement, driven by a FastAPI/Python backend.",
    link: "#",
    dark: false,
    order: 5,
  },
  {
    title: "Air Quality Monitoring System",
    image: "assets/project-air-quality.svg",
    alt: "Air Quality Monitoring System — a NodeMCU ESP8266 prototype using an MQ135 gas sensor and a DHT sensor to measure and display air quality on an LCD.",
    link: "#",
    dark: false,
    order: 6,
  },
  {
    title: "Secure Online Examination Platform",
    image: "assets/project-secure-exam.svg",
    alt: "Secure Online Examination Platform — a React and Node.js exam system prototype with JWT authentication and admin controls, inspired by large-scale entrance exam platforms.",
    link: "#",
    dark: false,
    order: 7,
  },
  {
    title: "University Timetable System",
    image: "assets/project-timetable.svg",
    alt: "University Timetable System — a database-driven system for course, faculty, and scheduling data with automated timetable generation.",
    link: "#",
    dark: false,
    order: 8,
  },
  {
    title: "Curlometer",
    image: "assets/project-curlometer.svg",
    alt: "Curlometer — an experimental computer vision project using Python and OpenCV to estimate visible curl clusters from a photo of hair.",
    link: "#",
    dark: false,
    order: 9,
  },
];

async function seed() {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
