import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SkeletonSkillCategory } from './Skeleton';
import { TechIcon } from './TechIcon';
import { apiCall, API_CONFIG } from '../config/api';
import './Skills.css';

interface SkillData {
  tech: string;
  type: string;
}

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchSkillsData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiCall<SkillData[]>(API_CONFIG.ENDPOINTS.SKILLS);
        setSkillsData(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setSkillsData([]);
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">🛠️ Technologies</h2>
          <div className="skills-grid">
            {[...Array(6)].map((_, index) => (
              <SkeletonSkillCategory key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    const fallbackSkills = {
      'Programming Languages': ['Java', 'JavaScript', 'TypeScript', 'Python'],
      'Frameworks': ['Spring Boot', 'React', 'Node.js', 'Express'],
      'Databases': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
      'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      'Tools': ['Git', 'Maven', 'Gradle', 'Jira'],
      'APIs': ['REST', 'GraphQL', 'Microservices']
    };

    return (
      <section id="skills" className="skills" ref={ref}>
        <div className="container">
          <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>🛠️ Technologies</h2>
          <div className={`skills-grid ${isVisible ? 'fade-in-stagger' : ''}`}>
            {Object.entries(fallbackSkills).map(([type, techs], index) => (
              <div key={type} className="skill-category" style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}>
                <h3 className="category-title">{type}</h3>
                <div className="skill-tags">
                  {techs.map((tech, index) => (
                    <TechIcon key={index} tech={tech} className="skill-tag" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill.tech);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>🛠️ Technologies</h2>
        <div className={`skills-grid ${isVisible ? 'fade-in-stagger' : ''}`}>
          {Object.entries(groupedSkills).map(([type, techs], index) => (
            <div key={type} className="skill-category" style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}>
              <h3 className="category-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <div className="skill-tags">
                {techs.map((tech, index) => (
                  <TechIcon key={index} tech={tech} className="skill-tag" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;