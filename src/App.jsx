import InteractiveBackground from './components/InteractiveBackground';
import F1Cursor from './components/F1Cursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Track from './components/sections/Track';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-beige cursor-none">
      <InteractiveBackground />
      <F1Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Track />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
