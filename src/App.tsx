import React from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import BackToTopButton from './components/BackToTopButton';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Welcome />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <BackToTopButton />
    </div>
  );
};

export default App
