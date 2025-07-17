import React, { useState, useEffect } from 'react';
import './Experience.css';
import { apiCall, API_CONFIG } from '../config/api';

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  fromDate: string;
  toDate: string;
  descriptionBullets: string[];
}

const Experience: React.FC = () => {
  const [experienceData, setExperienceData] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const data = await apiCall<ExperienceItem[] | ExperienceItem>(API_CONFIG.ENDPOINTS.EXPERIENCE);
        console.log('Experience API Response:', data);
        
        // Handle different response structures
        if (Array.isArray(data)) {
          setExperienceData(data);
        } else if (data && typeof data === 'object') {
          // If it's a single object, wrap it in an array
          setExperienceData([data]);
        } else {
          setExperienceData([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="experience">
        <div className="container">
          <div className="spinner"></div>
          <p>Loading experience information...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="experience">
        <div className="container">
          <div className="error">
            <h2>Error loading experience information</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">💼 Professional Experience</h2>
        <div className="timeline">
          {experienceData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <h3 className="role">{item.role}</h3>
                  <h4 className="company">{item.company}</h4>
                  <div className="meta">
                    <span className="location">{item.location}</span>
                    <span className="dates">{item.fromDate} - {item.toDate}</span>
                  </div>
                </div>
                <ul className="description">
                  {item.descriptionBullets && item.descriptionBullets.length > 0 ? (
                    item.descriptionBullets.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))
                  ) : (
                    <li>No description available</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;