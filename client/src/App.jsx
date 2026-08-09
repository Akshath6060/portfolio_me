import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import MessageForm from "./components/MessageForm.jsx";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";

export default function App() {
  return (
    <main>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <MessageForm />
      <Footer />
      <Nav />
    </main>
  );
}
