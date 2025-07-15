import React, { useState, useEffect } from 'react';
import './Education.css';

interface EducationData {
  collegeName: string;
  degree: string;
  location: string;
  fromDate: string;
  toDate: string;
}

const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch('http://localhost:8080/education');
        if (!response.ok) {
          throw new Error('Failed to fetch education data');
        }
        const data: EducationData[] = await response.json();
        setEducationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  if (loading) {
    return (
      <section id="education" className="education">
        <div className="container">
          <div className="spinner"></div>
          <p>Loading education information...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="education" className="education">
        <div className="container">
          <div className="error">
            <h2>Error loading education information</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">🎓 Education</h2>
        <div className="education-list">
          {educationData.map((education, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h3 className="college-name">{education.collegeName}</h3>
                <span className="education-period">
                  {education.fromDate} - {education.toDate}
                </span>
              </div>
              <div className="education-details">
                <p className="degree">{education.degree}</p>
                <p className="location">{education.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;