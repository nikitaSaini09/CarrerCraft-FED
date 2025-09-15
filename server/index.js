require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Mock database
let users = [];
let chatHistory = [];

// Helper functions
const generateToken = () => 'mock_jwt_token_' + Date.now();
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock validation - accept any email/password for demo
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Find or create user
  let user = users.find(u => u.email === email);
  if (!user) {
    user = {
      id: generateId(),
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=ec4899&color=fff`,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
  }

  const token = generateToken();
  
  res.json({
    success: true,
    token,
    user
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and password are required'
    });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  const user = {
    id: generateId(),
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ec4899&color=fff`,
    createdAt: new Date().toISOString(),
  };
  
  users.push(user);
  const token = generateToken();
  
  res.json({
    success: true,
    token,
    user
  });
});

app.post('/api/auth/logout', (req, res) => {
  // In a real app, you'd invalidate the token
  res.json({ success: true, message: 'Logged out successfully' });
});

app.post('/api/auth/refresh', (req, res) => {
  // Mock token refresh
  const token = generateToken();
  res.json({ success: true, token });
});

// Chat endpoint
app.post('/api/chat', (req, res) => {
  const { message, context = {} } = req.body;
  
  if (!message) {
    return res.status(400).json({
      success: false,
      message: 'Message is required'
    });
  }

  // Mock AI responses based on message content
  const responses = {
    skills: [
      "Great question about skills! I'd recommend focusing on both technical and soft skills. What specific area are you looking to develop?",
      "Skill development is crucial for career growth. Consider creating a learning plan with measurable goals and deadlines.",
      "Based on current market trends, I'd suggest focusing on digital literacy, communication, and adaptability skills."
    ],
    career: [
      "Career planning is a journey, not a destination. What are your short-term and long-term career goals?",
      "I'd recommend conducting a skills gap analysis to identify areas for improvement in your desired career path.",
      "Networking and continuous learning are key factors in career advancement. Have you considered joining professional communities?"
    ],
    roadmap: [
      "Creating a career roadmap helps you stay focused and motivated. Let's break down your goals into actionable steps.",
      "A good roadmap should include milestones, timelines, and regular review points. What's your target timeline?",
      "Consider both vertical growth (promotions) and horizontal growth (new skills) in your roadmap planning."
    ],
    portfolio: [
      "A strong portfolio showcases your best work and demonstrates your capabilities. What projects would you like to highlight?",
      "Make sure your portfolio tells a story about your professional journey and growth over time.",
      "Include diverse projects that show different skills and approaches. Quality over quantity is key."
    ],
    default: [
      "That's an interesting point! Career development is multifaceted. What specific aspect would you like to explore further?",
      "I'm here to help you navigate your career journey. Could you provide more context about your current situation?",
      "Every career path is unique. Let's work together to create a personalized strategy that aligns with your goals.",
      "Professional growth requires continuous learning and adaptation. What challenges are you currently facing?",
      "Building a successful career involves strategic planning, skill development, and networking. Which area interests you most?"
    ]
  };

  // Determine response category based on message content
  let category = 'default';
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('skill')) category = 'skills';
  else if (lowerMessage.includes('career')) category = 'career';
  else if (lowerMessage.includes('roadmap') || lowerMessage.includes('plan')) category = 'roadmap';
  else if (lowerMessage.includes('portfolio')) category = 'portfolio';

  const categoryResponses = responses[category];
  const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

  // Store chat history
  const chatEntry = {
    id: generateId(),
    message,
    response,
    context,
    timestamp: new Date().toISOString()
  };
  chatHistory.push(chatEntry);

  res.json({
    success: true,
    message: response,
    timestamp: chatEntry.timestamp,
    id: chatEntry.id
  });
});

// Get chat history
app.get('/api/chat/history', (req, res) => {
  res.json({
    success: true,
    history: chatHistory.slice(-50) // Return last 50 messages
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'CareerCraft API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 CareerCraft API server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: /api/auth/login, /api/auth/signup`);
  console.log(`💬 Chat endpoint: /api/chat`);
});

module.exports = app;
