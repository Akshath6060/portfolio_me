import { useRef } from "react";
import Reveal from "./motion/Reveal.jsx";
import MagneticButton from "./motion/MagneticButton.jsx";
import usePointerGlow from "../hooks/usePointerGlow.js";
import ScrollSection from "./motion/ScrollSection.jsx";

export default function Contact() {
  const sectionRef = useRef(null);
  usePointerGlow(sectionRef);

  return (
    <ScrollSection className="contact pointer-glow" id="contact" sectionRef={sectionRef} pattern="lift">
      <div className="pointer-glow__layer" aria-hidden="true" />
      <Reveal className="contact__heading" variant="up">
        <small>That's all for now.</small>
        <h2>
          Got an idea, a project,
          <br />
          or a question? Let's talk
        </h2>
      </Reveal>
      <MagneticButton className="contact__button" href="mailto:okakshath123@gmail.com" max={10}>
        Get in touch
      </MagneticButton>
      <Reveal className="contact__details" variant="up" delay={0.1}>
        <div>
          <small>Email:</small>
          <a href="mailto:okakshath123@gmail.com" data-cursor="hover">
            okakshath123@gmail.com
          </a>
        </div>
        <div>
          <small>Connect:</small>
          <span className="contact__socials"><a href="https://github.com/Akshath6060" target="_blank" rel="noopener noreferrer" aria-label="Akshath O K on GitHub" data-cursor="hover">GitHub</a><a href="https://www.linkedin.com/in/akshath-ok" target="_blank" rel="noopener noreferrer" aria-label="Akshath O K on LinkedIn" data-cursor="hover">LinkedIn</a></span>
        </div>
      </Reveal>
    </ScrollSection>
  );
}
