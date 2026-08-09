import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion/Reveal.jsx";

const NAME = "AKSHATH O K";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export default function LoadingIntro({ onComplete }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState(NAME);
  const frameRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("intro-active");
    const hasPlayed = sessionStorage.getItem("portfolio-intro-played") === "true";
    const simple = reducedMotion || hasPlayed;
    const start = performance.now();
    const scrambleDuration = simple ? 0 : 1150;
    const totalDuration = simple ? 380 : 1900;

    if (!simple) {
      const animate = (now) => {
        const progress = Math.min((now - start) / scrambleDuration, 1);
        const resolved = Math.floor(progress * NAME.length);
        setText(
          [...NAME].map((character, index) => {
            if (character === " ") return " ";
            if (index < resolved || progress === 1) return character;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }).join("")
        );
        if (progress < 1) frameRef.current = requestAnimationFrame(animate);
      };
      frameRef.current = requestAnimationFrame(animate);
    }

    const exitTimer = window.setTimeout(() => setVisible(false), totalDuration);
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem("portfolio-intro-played", "true");
      document.documentElement.classList.remove("intro-active");
      onComplete();
    }, totalDuration + (simple ? 260 : 650));

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.classList.remove("intro-active");
    };
  }, [onComplete, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reducedMotion ? 0.25 : 0.65, ease: EASE }}
          aria-label="Loading portfolio"
          role="status"
        >
          <motion.div
            className="loader__name"
            initial={{ opacity: 0, scale: 0.985, filter: "blur(5px)", letterSpacing: "0.3em" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.08em" }}
            transition={{ duration: reducedMotion ? 0.25 : 1.35, ease: EASE }}
          >
            {text}
          </motion.div>
          <span className="loader__line" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
