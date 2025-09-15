# CareerCraft - MERN Stack Career Development Platform

A comprehensive career development platform built with React (Vite), Express.js, and modern web technologies.

## 🚀 Features

- **Skill Tracker**: Track and manage your professional skills with drag-and-drop functionality
- **Career Advisor**: AI-powered chat interface for career guidance
- **Portfolio Builder**: Create and export professional portfolios as PDFs
- **Roadmap Planner**: Visualize your career journey with interactive roadmaps
- **Mood Tracker**: Monitor your professional well-being with charts and analytics
- **Resource Vault**: Curated collection of career development resources
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Recharts** for data visualization
- **jsPDF + html2canvas** for PDF export
- **@dnd-kit** for drag & drop functionality

### Backend
- **Node.js** with Express.js
- **CORS** for cross-origin requests
- **Mock database** for development
- **RESTful API** endpoints

### Development Tools
- **ESLint** and **Prettier** for code quality
- **Vitest** for testing
- **Concurrently** for running frontend and backend together

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd CareerCraft-main
```

### 2. Install All Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

**OR use the combined command:**
```bash
npm run install:all
```

### 3. Set Up Environment Variables

**Frontend (.env in root directory):**
```env
# Firebase Configuration (Optional - fallback auth available)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gemini AI Configuration (Optional)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**Backend (server/.env):**
```env
PORT=3001
NODE_ENV=development
```

### 4. Start the Application

**Option 1: Start Both Frontend and Backend Together (Recommended)**
```bash
npm start
```

**Option 2: Start Separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## 📜 Available Scripts

### Root Directory (Frontend)
```bash
npm run dev          # Start frontend development server
npm run build        # Build frontend for production
npm run preview      # Preview production build
npm run test         # Run frontend tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Combined Scripts
npm start            # Start both frontend and backend
npm run server       # Start backend only
npm run install:all  # Install all dependencies (frontend + backend)
```

### Server Directory (Backend)
```bash
cd server
npm start            # Start backend in production mode
npm run dev          # Start backend with nodemon (development)
```

## 📁 Project Structure

```
CareerCraft-main/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── services/          # API services and utilities
│   ├── config/            # Configuration files
│   └── assets/            # Static assets
├── server/                # Backend source code
│   ├── index.js           # Express server entry point
│   ├── package.json       # Backend dependencies
│   └── .env               # Backend environment variables
├── public/                # Static assets
├── dist/                  # Production build output
├── package.json           # Frontend dependencies and scripts
└── README.md              # This file
```

## 🔐 Authentication

The application supports multiple authentication methods:

### 1. Dummy Authentication (Default - No Setup Required)
- **Email**: `test@test.com`
- **Password**: `123456`
- Perfect for development and testing

### 2. Firebase Authentication (Optional)
- Configure Firebase credentials in `.env`
- Supports email/password authentication
- Automatic fallback to dummy auth if Firebase fails

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Chat/Career Advisor
- `POST /api/chat` - Send message to AI advisor
- `GET /api/chat/history` - Get chat history

### System
- `GET /api/health` - Health check endpoint

## 🧪 Testing

```bash
# Run frontend tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test -- --watch
```

## 🚀 Deployment

### Frontend (Static Hosting)
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend (Node.js Hosting)
```bash
cd server
npm start
# Deploy to services like Heroku, Railway, or DigitalOcean
```

### Full Stack Deployment
The backend serves the frontend in production. Build the frontend first:
```bash
npm run build
cd server
npm start
```

## 🔧 Troubleshooting

### Common Issues

**1. "Cannot find module" errors**
```bash
# Clean install all dependencies
rm -rf node_modules package-lock.json
rm -rf server/node_modules server/package-lock.json
npm run install:all
```

**2. Port already in use**
```bash
# Kill processes on ports 3001 and 5173
npx kill-port 3001
npx kill-port 5173
```

**3. Frontend can't connect to backend**
- Ensure backend is running on port 3001
- Check CORS configuration in server/index.js
- Verify API URLs in frontend code

**4. Build fails**
```bash
# Clear Vite cache
npx vite --force
npm run build
```

**5. Environment variables not loading**
- Ensure `.env` files are in correct locations
- Restart development servers after changing env vars
- Check that env vars start with `VITE_` for frontend

### Development Tips

1. **Use the combined start command**: `npm start` runs both frontend and backend
2. **Hot reload**: Both frontend (Vite) and backend (nodemon) support hot reload
3. **API testing**: Use the health check endpoint to verify backend connectivity
4. **Dummy auth**: No external setup required - use test@test.com / 123456
5. **Responsive design**: Test on different screen sizes using browser dev tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support and questions:
1. Check the troubleshooting section above
2. Open an issue in the GitHub repository
3. Verify both frontend and backend are running correctly

## Design System

CareerCraft uses a custom pastel color palette:

- **Primary**: Pink shades (#fdf2f8 to #831843)
- **Secondary**: Purple shades (#f5f3ff to #4c1d95)
- **Accent**: Peach/Orange shades (#fef7ed to #7a2e10)

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (content)

## Demo & Testing

### Demo Credentials
- **Email**: Any valid email format
- **Password**: Any password (demo mode)

### Testing Checklist

#### Authentication
- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Logout functionality
- [ ] Protected route access
- [ ] Token persistence

#### Core Features
- [ ] **Skills**: Add, edit, delete, drag-reorder skills
- [ ] **AI Chat**: Send messages, receive responses
- [ ] **Roadmap**: Create and manage career milestones
- [ ] **Portfolio**: Build and export PDF
- [ ] **Mood**: Log emotions, view charts
- [ ] **Resources**: Add, search, filter resources
- [ ] **Resume AI**: Upload and analyze resume

#### UI/UX
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark/light mode toggle
- [ ] Smooth animations and transitions
- [ ] Loading states and error handling
- [ ] Consistent theming

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
```

### Backend API

The project includes a Node.js/Express backend stub with the following endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/chat` - AI chat interface
- `GET /api/health` - Health check

To switch to a real backend:
1. Update `VITE_API_BASE_URL` in `.env`
2. Replace mock responses in `src/utils/api.js`
3. Implement proper JWT validation

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001/api` |
| `VITE_APP_NAME` | Application name | `CareerCraft` |
| `VITE_FIREBASE_API_KEY` | Firebase API key | - |
| `VITE_OPENAI_API_KEY` | OpenAI API key | - |

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Backend Deployment

Deploy the `server/` directory to your preferred platform (Heroku, Railway, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern career platforms
- Icons by Heroicons
- Animations powered by Framer Motion
- Charts by Recharts

---
**CareerCraft** - Crafting careers, one step at a time. 
