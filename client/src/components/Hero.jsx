import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import usePointerGlow from "../hooks/usePointerGlow.js";

export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  usePointerGlow(sectionRef);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section className="hero pointer-glow" id="home" ref={sectionRef}>
      <motion.img
        className="hero__image"
        style={{ scale: prefersReduced ? 1 : imageScale }}
        src="/assets/hero.webp"
        alt="Akshath O K"
        width="1672"
        height="941"
        fetchPriority="high"
        decoding="async"
      />
      <div className="pointer-glow__layer" aria-hidden="true" />
      <motion.div
        className="hero__content"
        style={{ y: prefersReduced ? 0 : contentY, opacity: prefersReduced ? 1 : contentOpacity }}
      >
        <div className="topline">
          <span>@ Akshath O K</span>
          <span>MCA student exploring software engineering, artificial intelligence, cloud computing, IoT, and product development.</span>
        </div>
        <div className="hero__socials" aria-label="Social profiles">
          <a href="https://github.com/Akshath6060" target="_blank" rel="noopener noreferrer" aria-label="Akshath O K on GitHub" data-cursor="hover">GitHub</a>
          <a href="https://www.linkedin.com/in/akshath-ok" target="_blank" rel="noopener noreferrer" aria-label="Akshath O K on LinkedIn" data-cursor="hover">LinkedIn</a>
        </div>
        <div className="marquee">
          <span>Building Ideas Into Systems</span>
        </div>
        <span className="hero__arrow" data-cursor="hover" aria-hidden="true">
          ↗
        </span>
      </motion.div>
    </section>
  );
}
