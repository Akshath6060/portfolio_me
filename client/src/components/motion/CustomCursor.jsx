import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const moveDot = (x, y) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };
    const moveRing = (x, y) => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      moveDot(e.clientX, e.clientY);
      if (reduced) moveRing(e.clientX, e.clientY);
      const target = e.target.closest?.("[data-cursor]");
      setHover(target ? target.getAttribute("data-cursor") : null);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    if (!reduced) {
      const tick = () => {
        ring.current.x += (pos.current.x - ring.current.x) * 0.16;
        ring.current.y += (pos.current.y - ring.current.y) * 0.16;
        moveRing(ring.current.x, ring.current.y);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="cursor" data-hover={hover || undefined} aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__ring-inner" />
        {hover === "view" && <span className="cursor__label">View</span>}
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  );
}
