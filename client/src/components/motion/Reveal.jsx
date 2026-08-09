import { motion } from "framer-motion";
import { useScrollDirection } from "./ScrollDirection.jsx";

const EASE = [0.16, 1, 0.3, 1];

const directionalY = (distance) => (direction) => (direction === "down" ? distance : -distance);
const VARIANTS = {
  up: { hidden: (direction) => ({ opacity: 0, y: directionalY(24)(direction) }), visible: { opacity: 1, y: 0 } },
  down: { hidden: (direction) => ({ opacity: 0, y: directionalY(-24)(direction) }), visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export default function Reveal({
  children,
  as: Component = motion.div,
  variant = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = false,
  amount = 0.25,
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
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export { EASE };
