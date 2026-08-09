import { motion } from "framer-motion";
import { useScrollDirection } from "./ScrollDirection.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const EASE = [0.16, 1, 0.3, 1];
// Narrow layouts have a gutter smaller than the horizontal reveal distance, so
// a sideways entrance would push content past the viewport edge.
export const NARROW_QUERY = "(max-width: 900px)";
export const HORIZONTAL_VARIANTS = new Set(["left", "right", "alternate"]);

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
  const narrow = useMediaQuery(NARROW_QUERY);
  const resolved = narrow && HORIZONTAL_VARIANTS.has(variant) ? "up" : variant;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={direction}
      variants={VARIANTS[resolved]}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export { EASE };
