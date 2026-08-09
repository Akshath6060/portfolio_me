import Reveal from "./motion/Reveal.jsx";
import MagneticButton from "./motion/MagneticButton.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer__top">
        <p>curious builder, always experimenting</p>
        <MagneticButton href="#home" aria-label="Back to top" max={8}>
          ↗
        </MagneticButton>
      </div>
      <Reveal variant="up" className="footer__name">
        Akshath O K
      </Reveal>
      <div className="footer__bottom">
        <small>© {year} Akshath O K. All rights reserved.</small>
        <div><a href="https://github.com/Akshath6060" target="_blank" rel="noopener noreferrer" aria-label="Akshath O K on GitHub">GitHub</a><a href="https://www.linkedin.com/in/akshath-ok" target="_blank" rel="noopener noreferrer" aria-label="Akshath O K on LinkedIn">LinkedIn</a></div>
      </div>
    </footer>
  );
}
