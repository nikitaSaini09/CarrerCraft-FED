import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  BookOpenIcon 
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Skill Tracker',
      description: 'Track and visualize your skill development journey with interactive charts and progress indicators.',
    },
    {
      icon: SparklesIcon,
      title: 'AI Career Advisor',
      description: 'Get personalized career guidance and recommendations powered by advanced AI technology.',
    },
    {
      icon: AcademicCapIcon,
      title: 'Learning Roadmap',
      description: 'Create and follow customized learning paths tailored to your career goals.',
    },
    {
      icon: BriefcaseIcon,
      title: 'Portfolio Builder',
      description: 'Build stunning portfolios and export them as professional PDFs.',
    },
    {
      icon: HeartIcon,
      title: 'Mood Tracker',
      description: 'Monitor your career journey emotions and maintain work-life balance.',
    },
    {
      icon: BookOpenIcon,
      title: 'Resource Vault',
      description: 'Curate and organize learning resources, articles, and tools in one place.',
    },
  ];

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-gray-900">CareerCraft</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6"
            >
              Craft Your Dream{' '}
              <span className="text-teal-600">
                Career
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Empower your professional journey with AI-driven insights, personalized learning paths, 
              and comprehensive career management tools designed for the modern professional.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/signup"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="border-2 border-primary-300 text-primary-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-60 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-60 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent-200 rounded-full opacity-60 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to accelerate your career growth and achieve your professional goals.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-teal-500 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who are already crafting their dream careers with CareerCraft.
            </p>
            <Link
              to="/signup"
              className="bg-white text-teal-600 px-8 py-4 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">CareerCraft</span>
            </div>
            <p className="text-gray-400">
              © 2024 CareerCraft. Crafting careers, one step at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
