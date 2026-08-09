import useActiveSection from "../hooks/useActiveSection.js";

export default function Nav() {
  const activeId = useActiveSection();

  const linkClass = (hash) => (hash === `#${activeId}` ? "active" : undefined);

  return (
    <nav aria-label="Portfolio navigation">
      <a className={linkClass("#home")} href="#home" aria-label="Home">
        ⌂
      </a>
      <a className={linkClass("#skills")} href="#skills" aria-label="Skills">
        ⌘
      </a>
      <a className={linkClass("#work")} href="#work" aria-label="Projects">
        ◇
      </a>
      <a className={`avatar ${linkClass("#about") ?? ""}`.trim()} href="#about" aria-label="About">
        <img src="/assets/avatar.png" alt="" />
      </a>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
        ▤
      </a>
      <a className={linkClass("#experience")} href="#experience" aria-label="Experience">
        ●
      </a>
      <a className={linkClass("#contact")} href="#contact" aria-label="Contact">
        ↗
      </a>
    </nav>
  );
}
