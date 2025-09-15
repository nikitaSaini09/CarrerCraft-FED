import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPlay,
  FaClock,
  FaGraduationCap,
  FaRocket,
  FaCheckCircle,
  FaCircle,
  FaCode
} from 'react-icons/fa';
import demoUser from '../data/demoUser.json';

// Convert demo user roadmap data to component format with appropriate icons
const getStageIcon = (stageName) => {
  const stage = stageName.toLowerCase();
  if (stage.includes('frontend basics') || stage.includes('html') || stage.includes('css')) {
    return FaHtml5;
  } else if (stage.includes('frontend advanced') || stage.includes('react')) {
    return FaReact;
  } else if (stage.includes('backend') || stage.includes('node')) {
    return FaNodeJs;
  } else if (stage.includes('javascript') || stage.includes('js')) {
    return FaJs;
  } else if (stage.includes('css') || stage.includes('styling')) {
    return FaCss3Alt;
  }
  return FaCode; // Default fallback
};

// Get specific icon for individual tasks/steps
const getStepIcon = (stepName) => {
  const step = stepName.toLowerCase();
  if (step.includes('html')) {
    return FaHtml5;
  } else if (step.includes('css')) {
    return FaCss3Alt;
  } else if (step.includes('tailwind')) {
    return FaCss3Alt; // Use CSS icon for TailwindCSS
  } else if (step.includes('javascript') || step.includes('js')) {
    return FaJs;
  } else if (step.includes('react')) {
    return FaReact;
  } else if (step.includes('node')) {
    return FaNodeJs;
  } else if (step.includes('express')) {
    return FaNodeJs; // Use Node icon for Express
  }
  return FaCheckCircle; // Generic fallback for steps
};

const roadmapData = demoUser.roadmap.map((stage, index) => ({
  id: index + 1,
  title: stage.stage,
  icon: getStageIcon(stage.stage),
  color: index === 0 ? 'teal' : index === 1 ? 'emerald' : 'primary',
  duration: '4-6 weeks',
  difficulty: 'Beginner',
  progress: stage.progress,
  steps: stage.tasks.map(task => ({
    name: task.name,
    duration: '1-2 weeks',
    status: task.done ? 'completed' : 'pending'
  })),
  description: `Master ${stage.stage.toLowerCase()} skills for ${demoUser.career.selectedPath}`
}));

const Roadmap = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-300 dark:bg-gray-600';
      default: return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <motion.div 
      className="p-4 md:p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 bg-clip-text text-transparent mb-4">
          Career Roadmaps
        </h2>
        <p className="text-text-secondary text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
          Choose your path and follow our structured learning roadmaps to accelerate your career growth
        </p>
      </motion.div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-emerald-300 to-primary-400"></div>
          
          {roadmapData.map((roadmap, index) => {
            const Icon = roadmap.icon;
            const completedSteps = roadmap.steps.filter(s => s.status === 'completed').length;
            const totalSteps = roadmap.steps.length;
            const progressPercentage = roadmap.progress || Math.round((completedSteps / totalSteps) * 100);
            
            return (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className="relative mb-8 md:mb-12 last:mb-0"
              >
                {/* Timeline Icon - Responsive positioning */}
                <div className={`absolute left-0 md:left-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-teal-glow z-10 ${
                  roadmap.color === 'teal' ? 'bg-gradient-to-r from-primary-400 to-primary-500' :
                  roadmap.color === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                  'bg-gradient-to-r from-primary-500 to-emerald-500'
                }`}>
                  <Icon className="text-white text-lg md:text-xl" />
                </div>
                
                {/* Timeline Card - Responsive margin */}
                <div className="ml-16 md:ml-24 backdrop-blur-xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-glass border border-border-light dark:border-border-dark overflow-hidden hover:shadow-teal-glow transition-all duration-500">
                  {/* Card Header */}
                  <div className="p-4 md:p-6 border-b border-border-light dark:border-border-dark">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-display font-bold text-text-primary dark:text-text-primary-dark">
                        {roadmap.title}
                      </h3>
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {progressPercentage === 100 ? (
                          <FaCheckCircle className="text-green-500 text-lg md:text-xl flex-shrink-0" />
                        ) : (
                          <div className="relative flex-shrink-0">
                            <FaCircle className="text-gray-300 text-lg md:text-xl" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-600">
                                {progressPercentage}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-text-secondary mb-4 text-sm md:text-base">
                      {roadmap.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-text-secondary">Overall Progress</span>
                        <span className="text-text-secondary">{completedSteps}/{totalSteps} completed</span>
                      </div>
                      <div className="w-full bg-border-light dark:bg-border-dark rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            roadmap.color === 'teal' ? 'bg-gradient-to-r from-primary-400 to-primary-500' :
                            roadmap.color === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                            'bg-gradient-to-r from-primary-500 to-emerald-500'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{roadmap.duration}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(roadmap.difficulty)}`}>
                        {roadmap.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* Steps List */}
                  <div className="p-6">
                    <h4 className="text-lg font-display font-semibold text-text-primary dark:text-text-primary-dark mb-4">
                      Learning Steps
                    </h4>
                    <div className="space-y-3">
                      {roadmap.steps.map((step, stepIndex) => (
                        <motion.div
                          key={stepIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + stepIndex * 0.1 }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-50/50 dark:hover:bg-emerald-900/20 transition-colors duration-300"
                        >
                          {/* Step Icon */}
                          <div className="flex-shrink-0">
                            {step.status === 'completed' ? (
                              <FaCheckCircle className="text-green-500 text-lg" />
                            ) : step.status === 'in-progress' ? (
                              <div className="relative">
                                <FaCircle className="text-yellow-400 text-lg" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
                                </div>
                              </div>
                            ) : (
                              <FaCircle className="text-gray-300 text-lg" />
                            )}
                          </div>
                          
                          {/* Step Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${
                                step.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' :
                                step.status === 'in-progress' ? 'text-primary-600 dark:text-primary-400' :
                                'text-text-primary dark:text-text-primary-dark'
                              }`}>
                                {step.name}
                              </span>
                              <span className="text-xs text-text-secondary">
                                {step.duration}
                              </span>
                            </div>
                            
                            {/* Progress bar for in-progress steps */}
                            {step.status === 'in-progress' && (
                              <div className="w-full bg-border-light dark:bg-border-dark rounded-full h-1.5 mt-2">
                                <div className="bg-primary-500 h-1.5 rounded-full w-3/5 transition-all duration-300"></div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-border-light dark:border-border-dark">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 font-medium ${
                          roadmap.color === 'teal' ? 'bg-teal-500 hover:bg-teal-600' :
                          roadmap.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
                          'bg-emerald-500 hover:bg-emerald-600'
                        }`}
                      >
                        <FaPlay className="text-sm" />
                        {progressPercentage === 100 ? 'Review Path' : progressPercentage > 0 ? 'Continue Learning' : 'Start Learning'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div 
        className="mt-12 text-center p-8 backdrop-blur-xl bg-gradient-to-r from-primary-50/50 to-emerald-50/50 dark:from-primary-900/20 dark:to-emerald-900/20 rounded-2xl border border-border-light dark:border-border-dark shadow-glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <FaRocket className="text-4xl text-primary-500 dark:text-primary-400 mx-auto mb-4" />
        <h3 className="text-2xl font-display font-bold text-text-primary dark:text-text-primary-dark mb-2">
          Ready to Start Your Journey?
        </h3>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Choose a roadmap that matches your interests and start building your dream career today. 
          Each path is designed to take you from beginner to job-ready in just a few months.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-lg"
        >
          Explore All Paths
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Roadmap;
