import axios from 'axios';
import { APP_CONFIG, STORAGE_KEYS } from './constants';
import { storage } from './storage';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.USER_DATA);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      // Fallback to mock response for demo
      if (error.code === 'ERR_NETWORK') {
        return mockAuthResponse(email);
      }
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      // Fallback to mock response for demo
      if (error.code === 'ERR_NETWORK') {
        return mockAuthResponse(userData.email, userData);
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.log('Logout error (using local logout):', error.message);
    }
    // Always clear local storage
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_DATA);
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Chat API calls
export const chatAPI = {
  sendMessage: async (message, context = {}) => {
    try {
      const response = await api.post('/chat', { message, context });
      return response.data;
    } catch (error) {
      // Fallback to mock response for demo
      if (error.code === 'ERR_NETWORK') {
        return mockChatResponse(message);
      }
      throw error;
    }
  },
};

// Mock responses for demo purposes
const mockAuthResponse = (email, userData = {}) => {
  return {
    success: true,
    token: 'mock_jwt_token_' + Date.now(),
    user: {
      id: 'user_' + Date.now(),
      email,
      name: userData.name || email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || email)}&background=ec4899&color=fff`,
      createdAt: new Date().toISOString(),
    },
  };
};

const mockChatResponse = (message) => {
  const responses = [
    "That's a great question! Based on your career goals, I'd recommend focusing on developing both technical and soft skills. What specific area would you like to explore further?",
    "I understand you're looking for career guidance. Let me help you create a personalized roadmap based on your interests and current skill level.",
    "Career development is a journey, not a destination. It's important to set both short-term and long-term goals. What's your current biggest career challenge?",
    "Building a strong professional network is crucial for career growth. Have you considered joining industry-specific communities or attending networking events?",
    "Continuous learning is key in today's rapidly changing job market. I can help you identify relevant courses and resources for your field.",
  ];
  
  return {
    success: true,
    message: responses[Math.floor(Math.random() * responses.length)],
    timestamp: new Date().toISOString(),
  };
};

export default api;
