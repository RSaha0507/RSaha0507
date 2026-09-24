import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Awards } from './components/Awards';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Background3D } from './components/Background3D';
import { CosmicFloatingEntities } from './components/CosmicFloatingEntities';
import { initScrollAnimations } from './utils/scrollAnimations';

export function App() {
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-300 relative selection:bg-amber-500 selection:text-slate-950">
      <Background3D />
      <CosmicFloatingEntities />
      <Navbar />
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
