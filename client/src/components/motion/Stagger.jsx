import { motion } from "framer-motion";
import { EASE } from "./Reveal.jsx";

export function StaggerContainer({
  children,
  as: Component = motion.div,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
  ...rest
}) {
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const ITEM_VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  },
};

export function StaggerItem({ children, as: Component = motion.div, className, variant = "up", ...rest }) {
  return (
    <Component className={className} variants={ITEM_VARIANTS[variant]} {...rest}>
      {children}
    </Component>
  );
}

export { ITEM_VARIANTS };
