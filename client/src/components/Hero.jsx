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
        fetchpriority="high"
        decoding="async"
      />
      <div className="pointer-glow__layer" aria-hidden="true" />
      <motion.div
        className="hero__content"
        style={{ y: prefersReduced ? 0 : contentY, opacity: prefersReduced ? 1 : contentOpacity }}
      >
        <div className="hero__copy">
          <p className="hero__eyebrow">Hey <span aria-hidden="true">👋</span>, I’m Akshath</p>
          <h1>Software engineer &amp;<br />AI enthusiast</h1>
          <p className="hero__lede">I build thoughtful digital products across web, artificial intelligence, cloud, and connected hardware.</p>
          <div className="hero__actions">
            <a className="button button--primary" href="mailto:okakshath123@gmail.com" data-cursor="hover">Contact</a>
            <a className="button button--ghost" href="#work" data-cursor="hover">View my work <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="hero__portrait">
          <img src="/assets/hero.webp" alt="Akshath O K" width="1672" height="941" decoding="async" />
          <span aria-hidden="true">&lt;/&gt;</span>
        </div>
      </motion.div>
    </section>
  );
}
