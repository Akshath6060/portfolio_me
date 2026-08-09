import { useCallback, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import ScrollProgress from "./components/motion/ScrollProgress.jsx";
import CustomCursor from "./components/motion/CustomCursor.jsx";
import { EASE } from "./components/motion/Reveal.jsx";
import { ScrollDirectionProvider } from "./components/motion/ScrollDirection.jsx";
import LoadingIntro from "./components/LoadingIntro.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>That page doesn't exist.</h1>
      <a href="/">Return home <span aria-hidden="true">↗</span></a>
    </main>
  );
}

export default function App() {
  if (window.location.pathname !== "/") return <ThemeProvider><NotFound /></ThemeProvider>;
  const [introComplete, setIntroComplete] = useState(false);
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
        <ScrollDirectionProvider>
          <LoadingIntro onComplete={completeIntro} />
          {introComplete && <ScrollProgress />}
          {introComplete && <CustomCursor />}
          <motion.main
            initial={{ opacity: 0.72, scale: 1.008 }}
            animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0.72, scale: 1.008 }}
            transition={{ duration: introComplete ? 0.7 : 0, ease: EASE }}
            aria-hidden={!introComplete}
          >
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <Footer />
          {introComplete && <Nav />}
          </motion.main>
        </ScrollDirectionProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
