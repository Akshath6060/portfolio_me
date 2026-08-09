import { motion } from "framer-motion";
import { EASE, HORIZONTAL_VARIANTS, NARROW_QUERY } from "./Reveal.jsx";
import { useScrollDirection } from "./ScrollDirection.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";

export function StaggerContainer({
  children,
  as: Component = motion.div,
  className,
  stagger = 0.08,
  delay = 0,
  once = false,
  amount = 0.2,
  ...rest
}) {
  const direction = useScrollDirection();
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={direction}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const ITEM_VARIANTS = {
  up: {
    hidden: (direction) => ({ opacity: 0, y: direction === "down" ? 20 : -20 }),
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
  scale: {
    hidden: (direction) => ({ opacity: 0, scale: direction === "down" ? 0.96 : 1.025, y: direction === "down" ? 8 : -8 }),
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  },
  alternate: {
    hidden: (direction) => ({ opacity: 0, x: direction === "down" ? -22 : 22, y: direction === "down" ? 8 : -8 }),
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
  right: {
    hidden: { opacity: 0, x: 26 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

export function StaggerItem({ children, as: Component = motion.div, className, variant = "up", ...rest }) {
  const narrow = useMediaQuery(NARROW_QUERY);
  const resolved = narrow && HORIZONTAL_VARIANTS.has(variant) ? "up" : variant;
  return (
    <Component className={className} variants={ITEM_VARIANTS[resolved]} {...rest}>
      {children}
    </Component>
  );
}

export { ITEM_VARIANTS };
