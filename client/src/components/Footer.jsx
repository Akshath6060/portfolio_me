import Reveal from "./motion/Reveal.jsx";
import MagneticButton from "./motion/MagneticButton.jsx";

export default function Footer() {
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
    </footer>
  );
}
