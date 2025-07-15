import React from 'react';

interface TechIconProps {
  tech: string;
  className?: string;
}

const techIcons: Record<string, string> = {
  // Programming Languages
  'java': '☕',
  'javascript': '🟨',
  'typescript': '🔷',
  'python': '🐍',
  'go': '🐹',
  'rust': '🦀',
  'c++': '⚡',
  'c#': '🔵',
  'php': '🐘',
  'kotlin': '🟢',
  'scala': '🔺',

  // Frontend
  'react': '⚛️',
  'angular': '🅰️',
  'vue': '💚',
  'html': '🌐',
  'css': '🎨',
  'sass': '💄',
  'tailwind': '💨',
  'bootstrap': '🅱️',

  // Backend & Frameworks
  'spring': '🌱',
  'spring boot': '🚀',
  'node.js': '💚',
  'express': '🚂',
  'django': '🐍',
  'flask': '🌶️',
  'fastapi': '⚡',
  'nest.js': '🪺',

  // Databases
  'mysql': '🐬',
  'postgresql': '🐘',
  'mongodb': '🍃',
  'redis': '🔴',
  'sqlite': '💎',
  'oracle': '🔶',
  'cassandra': '🏛️',
  'elasticsearch': '🔍',

  // Cloud & DevOps
  'aws': '☁️',
  'azure': '☁️',
  'gcp': '☁️',
  'docker': '🐳',
  'kubernetes': '⚓',
  'jenkins': '👷',
  'terraform': '🏗️',
  'ansible': '📋',

  // Tools & Others
  'git': '📦',
  'github': '🐙',
  'gitlab': '🦊',
  'jira': '📋',
  'confluence': '📖',
  'maven': '📦',
  'gradle': '🐘',
  'npm': '📦',
  'yarn': '🧶',
  'webpack': '📦',
  'vite': '⚡',

  // Testing
  'junit': '🧪',
  'mockito': '🎭',
  'jest': '🃏',
  'cypress': '🌲',
  'selenium': '🔍',

  // Message Queues
  'rabbitmq': '🐰',
  'kafka': '📨',
  'activemq': '📬',

  // Monitoring
  'prometheus': '📊',
  'grafana': '📈',
  'elk stack': '🦌',

  // API
  'rest': '🔗',
  'graphql': '📊',
  'grpc': '⚡',
  'soap': '🧼',

  // Other
  'linux': '🐧',
  'nginx': '🌊',
  'apache': '🪶',
  'microservices': '🏗️',
  'fintech': '💰',
  'payments': '💳',
  'blockchain': '⛓️',
};

export const TechIcon: React.FC<TechIconProps> = ({ tech, className = '' }) => {
  const normalizedTech = tech.toLowerCase().trim();
  const icon = techIcons[normalizedTech] || '🔧';

  return (
    <span className={`tech-icon ${className}`} title={tech}>
      <span className="tech-emoji">{icon}</span>
      <span className="tech-name">{tech}</span>
    </span>
  );
};