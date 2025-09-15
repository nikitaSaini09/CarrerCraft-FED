// Application constants
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'CareerCraft',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  SKILLS: '/dashboard/skills',
  ADVISOR: '/dashboard/advisor',
  ROADMAP: '/dashboard/roadmap',
  PORTFOLIO: '/dashboard/portfolio',
  MOOD: '/dashboard/mood',
  RESOURCES: '/dashboard/resources',
  RESUME_ANALYZER: '/dashboard/resume-analyzer',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'careercraft_auth_token',
  USER_DATA: 'careercraft_user_data',
  THEME: 'careercraft_theme',
  SKILLS: 'careercraft_skills',
  MOOD_ENTRIES: 'careercraft_mood_entries',
  RESOURCES: 'careercraft_resources',
  ROADMAP_ITEMS: 'careercraft_roadmap_items',
  PORTFOLIO_DATA: 'careercraft_portfolio_data',
};

export const SKILL_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
};

export const MOOD_TYPES = {
  EXCITED: 'excited',
  CONFIDENT: 'confident',
  MOTIVATED: 'motivated',
  NEUTRAL: 'neutral',
  ANXIOUS: 'anxious',
  OVERWHELMED: 'overwhelmed',
  FRUSTRATED: 'frustrated',
};

export const RESOURCE_CATEGORIES = {
  ARTICLE: 'article',
  VIDEO: 'video',
  COURSE: 'course',
  BOOK: 'book',
  TOOL: 'tool',
  PODCAST: 'podcast',
};
