

import { Suspense, lazy } from 'react'
import { MoroccanBackground } from './components/MoroccanBackground';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';

// Lazy load below-the-fold components
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 relative">
      <MoroccanBackground />
      <Nav />
      {/* Main content raised above background canvas */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Suspense fallback={<div className="py-20 text-center text-gray-500 dark:text-gray-400">Loading content...</div>}>
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
