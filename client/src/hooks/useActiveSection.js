import { useEffect, useState } from "react";

export default function useActiveSection() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = [...document.querySelectorAll("section[id]")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55%" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
