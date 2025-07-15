import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = ''
}) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <Skeleton height="24px" width="70%" className="skeleton-title" />
      <Skeleton height="16px" width="100%" className="skeleton-text" />
      <Skeleton height="16px" width="90%" className="skeleton-text" />
      <div className="skeleton-tags">
        <Skeleton height="24px" width="60px" borderRadius="12px" />
        <Skeleton height="24px" width="80px" borderRadius="12px" />
        <Skeleton height="24px" width="70px" borderRadius="12px" />
      </div>
      <Skeleton height="40px" width="120px" borderRadius="20px" className="skeleton-button" />
    </div>
  );
};

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="skeleton-text-block">
      {[...Array(lines)].map((_, index) => (
        <Skeleton 
          key={index}
          height="16px" 
          width={index === lines - 1 ? '75%' : '100%'}
          className="skeleton-text-line"
        />
      ))}
    </div>
  );
};

export const SkeletonSkillCategory: React.FC = () => {
  return (
    <div className="skeleton-skill-category">
      <Skeleton height="24px" width="60%" className="skeleton-category-title" />
      <div className="skeleton-skill-tags">
        <Skeleton height="28px" width="60px" borderRadius="14px" />
        <Skeleton height="28px" width="80px" borderRadius="14px" />
        <Skeleton height="28px" width="70px" borderRadius="14px" />
        <Skeleton height="28px" width="90px" borderRadius="14px" />
      </div>
    </div>
  );
};