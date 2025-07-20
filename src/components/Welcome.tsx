import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Skeleton } from './Skeleton';
import { apiCall, API_CONFIG } from '../config/api';
import './Welcome.css';

interface WelcomeData {
  message: string;
}

const Welcome: React.FC = () => {
  const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.1, true);

  useEffect(() => {
    const fetchWelcomeData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiCall<WelcomeData>(API_CONFIG.ENDPOINTS.HOME);
        setWelcomeData(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setWelcomeData(null);
        setLoading(false);
      }
    };

    fetchWelcomeData();
  }, []);

  if (loading) {
    return (
      <section id="welcome" className="welcome">
        <div className="container">
          <div className="hero">
            <Skeleton height="3.5rem" width="70%" className="hero-title-skeleton" />
            <Skeleton height="1.5rem" width="90%" className="hero-subtitle-skeleton" />
            <div className="hero-buttons-skeleton">
              <Skeleton height="50px" width="150px" borderRadius="25px" />
              <Skeleton height="50px" width="180px" borderRadius="25px" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="welcome" className="welcome" ref={ref}>
        <div className="container">
          <div className={`hero ${isVisible ? 'fade-in' : ''}`}>
            <h1 className="hero-title">Welcome to My Digital Portfolio</h1>
            <p className="hero-subtitle">☕ Java | 🚀 Spring Boot | 🔗 REST APIs | 💰 Fintech | 🌍 Cross-Border Payments</p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Say Hi 👋
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🔍 Peek My Journey
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="welcome" className="welcome" ref={ref}>
      <div className="container">
        <div className={`hero ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="hero-title">{welcomeData?.message}</h1>
          <p className="hero-subtitle">☕ Java | 🚀 Spring Boot | 🔗 REST APIs | ⚙️ Microservices</p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Say Hi 👋
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🔍 Peek My Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;