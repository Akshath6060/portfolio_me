import { MotionConfig } from "framer-motion";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import MessageForm from "./components/MessageForm.jsx";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import ScrollProgress from "./components/motion/ScrollProgress.jsx";
import CustomCursor from "./components/motion/CustomCursor.jsx";
import { EASE } from "./components/motion/Reveal.jsx";

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      <ScrollProgress />
      <CustomCursor />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <MessageForm />
        <Footer />
        <Nav />
      </main>
    </MotionConfig>
  );
}
