import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const PATTERNS = {
  depth: { y: [20, 0, 0, -40], scale: [0.99, 1, 1, 0.97], opacity: [0.55, 1, 1, 0.6] },
  split: { y: [30, 0, 0, -28], scale: [0.985, 1, 1, 0.982], opacity: [0.58, 1, 1, 0.68] },
  lift: { y: [42, 0, 0, -34], scale: [0.99, 1, 1, 0.985], opacity: [0.5, 1, 1, 0.66] },
  scale: { y: [22, 0, 0, -22], scale: [0.965, 1, 1, 0.975], opacity: [0.55, 1, 1, 0.68] },
  soft: { y: [32, 0, 0, -26], scale: [0.99, 1, 1, 0.99], opacity: [0.58, 1, 1, 0.7] },
};

export default function ScrollSection({ children, className, id, pattern = "soft", sectionRef, ...rest }) {
  const localRef = useRef(null);
  const ref = sectionRef || localRef;
  const reduced = useReducedMotion();
  const values = PATTERNS[pattern] || PATTERNS.soft;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 8%"] });
  const input = [0, 0.16, 0.82, 1];
  const y = useTransform(scrollYProgress, input, values.y);
  const scale = useTransform(scrollYProgress, input, values.scale);
  const opacity = useTransform(scrollYProgress, input, values.opacity);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={reduced ? undefined : { y, scale, opacity }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
