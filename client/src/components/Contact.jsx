import { useRef } from "react";
import Reveal from "./motion/Reveal.jsx";
import MagneticButton from "./motion/MagneticButton.jsx";
import usePointerGlow from "../hooks/usePointerGlow.js";

export default function Contact() {
  const sectionRef = useRef(null);
  usePointerGlow(sectionRef);

  return (
    <section className="contact pointer-glow" id="contact" ref={sectionRef}>
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
      </Reveal>
    </section>
  );
}
