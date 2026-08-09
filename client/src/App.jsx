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

// The site is a single page; any other path is served by the SPA rewrite.
const IS_HOME = typeof window === "undefined" || window.location.pathname === "/";

function introAlreadyComplete() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try { return sessionStorage.getItem("portfolio-intro-played") === "true"; } catch { return false; }
}

function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>That page doesn't exist.</h1>
      <a href="/">Return home <span aria-hidden="true">↗</span></a>
    </main>
  );
}

function Portfolio() {
  // Resolve the repeat-visit state before the first paint. Mounting the loader
  // and dismissing it in a zero-delay effect causes a visible flash on reload.
  const [introComplete, setIntroComplete] = useState(introAlreadyComplete);
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      <ScrollDirectionProvider>
        {!introComplete && <LoadingIntro onComplete={completeIntro} />}
        <a className="skip-link" href="#work">Skip to content</a>
        {introComplete && <ScrollProgress />}
        {introComplete && <CustomCursor />}
        {/* Nav stays outside this element: an animated transform on an ancestor
            would turn its fixed positioning into containing-block positioning. */}
        <motion.main
          initial={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0.72, scale: 1.008 }}
          animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0.72, scale: 1.008 }}
          transition={{ duration: introComplete ? 0.7 : 0, ease: EASE }}
          aria-hidden={!introComplete}
          inert={introComplete ? undefined : ""}
        >
          <Hero />
          <Work />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </motion.main>
        <Footer />
        {introComplete && <Nav />}
      </ScrollDirectionProvider>
    </MotionConfig>
  );
}

export default function App() {
  return <ThemeProvider>{IS_HOME ? <Portfolio /> : <NotFound />}</ThemeProvider>;
}
