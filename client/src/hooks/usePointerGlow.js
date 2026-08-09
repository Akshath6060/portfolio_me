import { useEffect } from "react";

export default function usePointerGlow(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    let frame = null;
    let point = null;

    const handleMove = (e) => {
      point = { x: e.clientX, y: e.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--glow-x", `${point.x - rect.left}px`);
        el.style.setProperty("--glow-y", `${point.y - rect.top}px`);
        el.style.setProperty("--glow-opacity", "1");
        frame = null;
      });
    };
    const handleLeave = () => el.style.setProperty("--glow-opacity", "0");

    el.addEventListener("pointermove", handleMove, { passive: true });
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
