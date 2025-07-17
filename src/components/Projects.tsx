import React, { useState, useEffect } from 'react';
import { SkeletonCard } from './Skeleton';
import { TechIcon } from './TechIcon';
import './Projects.css';
import { apiCall, API_CONFIG } from '../config/api';

interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  projectLink: string;
}

const Projects: React.FC = () => {
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const data = await apiCall<ProjectData[]>(API_CONFIG.ENDPOINTS.PROJECTS);
        setProjectsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">💻 Projects</h2>
          <div className="projects-grid">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    const fallbackProjects = [
      {
        name: "Payment Gateway System",
        description: "A robust payment processing system built with Spring Boot, handling secure transactions and multiple payment methods with real-time fraud detection.",
        technologies: ["Java", "Spring Boot", "MySQL", "Redis", "REST"],
        projectLink: "#"
      },
      {
        name: "Cross-Border Transfer API",
        description: "RESTful API for international money transfers with currency conversion, compliance checks, and real-time exchange rates integration.",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Microservices"],
        projectLink: "#"
      },
      {
        name: "Financial Dashboard",
        description: "React-based dashboard for financial analytics with real-time data visualization, transaction monitoring, and reporting capabilities.",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
        projectLink: "#"
      },
      {
        name: "Banking Microservices",
        description: "Scalable microservices architecture for banking operations including account management, transactions, and customer services.",
        technologies: ["Java", "Spring Boot", "Kubernetes", "AWS", "Jenkins"],
        projectLink: "#"
      }
    ];

    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">💻 Projects</h2>
          <div className="projects-grid">
            {fallbackProjects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <TechIcon key={techIndex} tech={tech} className="tech-tag" />
                    ))}
                  </div>
                </div>
                <div className="project-footer">
                  <a 
                    href={project.projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">💻 Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <TechIcon key={techIndex} tech={tech} className="tech-tag" />
                  ))}
                </div>
              </div>
              <div className="project-footer">
                <a 
                  href={project.projectLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;