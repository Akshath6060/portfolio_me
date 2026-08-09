import { useEffect, useRef, useState } from "react";
import useActiveSection from "../hooks/useActiveSection.js";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider.jsx";

const LINKS = [
  { hash: "#home", label: "Home", icon: "⌂" },
  { hash: "#work", label: "Projects", icon: "◇" },
  { hash: "#about", label: "About", icon: "○" },
  { hash: "#experience", label: "Experience", icon: "●" },
  { hash: "#skills", label: "Skills", icon: "⌘" },
  { hash: "#education", label: "Education", icon: "▤" },
  { hash: "#contact", label: "Contact", icon: "↗" },
];

export default function Nav() {
  const activeId = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const menuRef = useRef(null);
  const isActive = (hash) => hash === `#${activeId}`;

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    // html is the scrolling element here (it sets overflow-x), so lock it there.
    const root = document.documentElement;
    const scrollbarGap = window.innerWidth - root.clientWidth;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (scrollbarGap > 0) root.style.paddingRight = `${scrollbarGap}px`;

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
      }
      if (event.key === "Tab") {
        // The close button sits outside the panel but belongs to the same dialog.
        const focusable = [...(menuRef.current?.querySelectorAll("a, button") || []), toggleRef.current].filter(Boolean);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button ref={toggleRef} className="mobile-nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>

      <nav className="desktop-nav" aria-label="Portfolio navigation">
        {LINKS.map((link) => (
          <a className={isActive(link.hash) ? "active" : undefined} href={link.hash} aria-label={link.label} data-cursor="hover" key={link.hash}>
            {isActive(link.hash) && <motion.span className="nav__indicator" layoutId="nav-active" transition={{ type: "spring", stiffness: 360, damping: 30 }} />}
            <span className="nav__icon">{link.icon}</span>
          </a>
        ))}
        <button className="nav__theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} data-cursor="hover"><span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span></button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div ref={menuRef} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Portfolio navigation" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
            <div className="mobile-menu__links">
              {LINKS.map((link, index) => <a ref={index === 0 ? firstLinkRef : undefined} className={isActive(link.hash) ? "active" : undefined} href={link.hash} onClick={closeMenu} key={link.hash}>{link.label}<span aria-hidden="true">↗</span></a>)}
            </div>
            <div className="mobile-menu__actions">
              <button type="button" onClick={toggleTheme}>Use {theme === "dark" ? "light" : "dark"} theme</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
