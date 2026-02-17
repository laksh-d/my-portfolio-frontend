// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://devfolio-backend1.onrender.com',
  ENDPOINTS: {
    HOME: '/home',
    INTRODUCTION: '/introduction',
    SKILLS: '/skills',
    PROJECTS: '/projects',
    EDUCATION: '/education',
    EXPERIENCE: '/experience',
    CONTACT_DETAILS: '/contact-details',
    REACHOUT: '/reachout'
  }
};

// Utility function for API calls
export const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error calling ${url}:`, error);
    throw error;
  }
};