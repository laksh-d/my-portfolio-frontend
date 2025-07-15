import React from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import './Header.css';

const Header: React.FC = () => {
  const activeSection = useActiveSection();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Greetings, Fellow Traveler!</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <button 
                onClick={() => scrollToSection('welcome')}
                className={activeSection === 'welcome' ? 'active' : ''}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className={activeSection === 'about' ? 'active' : ''}
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('skills')}
                className={activeSection === 'skills' ? 'active' : ''}
              >
                Skills
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('education')}
                className={activeSection === 'education' ? 'active' : ''}
              >
                Education
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects')}
                className={activeSection === 'projects' ? 'active' : ''}
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('experience')}
                className={activeSection === 'experience' ? 'active' : ''}
              >
                Experience
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className={activeSection === 'contact' ? 'active' : ''}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;