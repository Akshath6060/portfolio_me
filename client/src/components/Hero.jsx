export default function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero__image" src="/assets/hero.png" alt="Akshath O K" />
      <div className="topline">
        <span>@ Akshath O K</span>
        <span>MCA student exploring software engineering, artificial intelligence, cloud computing, IoT, and product development.</span>
      </div>
      <div className="marquee">
        <span>Building Ideas Into Systems</span>
      </div>
      <span className="hero__arrow" aria-hidden="true">↗</span>
    </section>
  );
}
