import { createContext, useContext, useEffect, useRef, useState } from "react";

const ScrollDirectionContext = createContext("down");

export function ScrollDirectionProvider({ children }) {
  const previousY = useRef(0);
  const frame = useRef(null);
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    previousY.current = window.scrollY;

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - previousY.current;
        if (Math.abs(delta) > 2) {
          const next = delta > 0 ? "down" : "up";
          setDirection((current) => (current === next ? current : next));
          document.documentElement.dataset.scrollDirection = next;
        }
        previousY.current = currentY;
        frame.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
      delete document.documentElement.dataset.scrollDirection;
    };
  }, []);

  return <ScrollDirectionContext.Provider value={direction}>{children}</ScrollDirectionContext.Provider>;
}

export function useScrollDirection() {
  return useContext(ScrollDirectionContext);
}
