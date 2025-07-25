import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SkeletonText } from './Skeleton';
import { apiCall, API_CONFIG } from '../config/api';
import avatarImage from '../assets/avatar.png';
import './About.css';

interface AboutData {
  message: string;
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiCall<AboutData>(API_CONFIG.ENDPOINTS.INTRODUCTION);
        setAboutData(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setAboutData(null);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">👨‍💻 About Me</h2>
            <div className="about-layout">
              <div className="profile-photo">
                <div className="profile-image skeleton-profile-image">
                </div>
              </div>
              <div className="about-text">
                <SkeletonText lines={4} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="about" ref={ref}>
        <div className="container">
          <div className={`about-content ${isVisible ? 'fade-in' : ''}`}>
            <h2 className="section-title">👨‍💻 About Me</h2>
            <div className="about-layout">
              <div className="profile-photo">
                <div className="profile-image">
                  <img src={avatarImage} alt="Professional Avatar" />
                </div>
              </div>
              <div className="about-text">
                <p className="intro-text">
                  I'm a passionate software engineer with expertise in building robust, scalable applications. 
                  With a strong foundation in Java and Spring Boot, I specialize in creating efficient backend systems 
                  and RESTful APIs. My experience spans across fintech and cross-border payment solutions, where I've 
                  contributed to building secure and reliable financial systems. I'm always eager to learn new 
                  technologies and tackle challenging problems that make a real impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className={`about-content ${isVisible ? 'fade-in' : ''}`}>
          <h2 className="section-title">👨‍💻 About Me</h2>
          <div className="about-layout">
            <div className="profile-photo">
              <div className="profile-image">
                <img src={avatarImage} alt="Professional Avatar" />
              </div>
            </div>
            <div className="about-text">
              <p className="intro-text">{aboutData?.message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;