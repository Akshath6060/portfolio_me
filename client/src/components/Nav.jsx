import useActiveSection from "../hooks/useActiveSection.js";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider.jsx";

export default function Nav() {
  const activeId = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  const isActive = (hash) => hash === `#${activeId}`;
  const indicator = (hash) =>
    isActive(hash) ? <motion.span className="nav__indicator" layoutId="nav-active" transition={{ type: "spring", stiffness: 360, damping: 30 }} /> : null;

  return (
    <nav aria-label="Portfolio navigation">
      <a className={isActive("#home") ? "active" : undefined} href="#home" aria-label="Home" data-cursor="hover">
        {indicator("#home")}<span className="nav__icon">⌂</span>
      </a>
      <a className={isActive("#skills") ? "active" : undefined} href="#skills" aria-label="Skills" data-cursor="hover">
        {indicator("#skills")}<span className="nav__icon">⌘</span>
      </a>
      <a className={isActive("#work") ? "active" : undefined} href="#work" aria-label="Projects" data-cursor="hover">
        {indicator("#work")}<span className="nav__icon">◇</span>
      </a>
      <a
        className={`avatar ${isActive("#about") ? "active" : ""}`.trim()}
        href="#about"
        aria-label="About"
        data-cursor="hover"
      >
        {indicator("#about")}<img src="/assets/avatar.png" alt="" />
      </a>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" data-cursor="hover">
        ▤
      </a>
      <a className={isActive("#experience") ? "active" : undefined} href="#experience" aria-label="Experience" data-cursor="hover">
        {indicator("#experience")}<span className="nav__icon">●</span>
      </a>
      <a className={isActive("#contact") ? "active" : undefined} href="#contact" aria-label="Contact" data-cursor="hover">
        {indicator("#contact")}<span className="nav__icon">↗</span>
      </a>
      <button className="nav__theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} data-cursor="hover">
        <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
      </button>
    </nav>
  );
}
