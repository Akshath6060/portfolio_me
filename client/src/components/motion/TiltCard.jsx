import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export default function TiltCard({
  as: Tag = "a",
  className,
  children,
  variants,
  cursorLabel = "view",
  ...rest
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [2, -2]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-3, 3]), { stiffness: 300, damping: 30 });
  const MotionTag = motion[Tag] || motion.a;

  const handleMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={cursorLabel}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
