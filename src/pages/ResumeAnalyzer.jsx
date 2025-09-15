import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentArrowUpIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChartBarIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Mock analysis results
  const mockAnalysis = {
    score: 85,
    strengths: [
      'Strong technical skills section with relevant technologies',
      'Clear work experience with quantified achievements',
      'Professional formatting and layout',
      'Relevant education and certifications',
      'Good use of action verbs in descriptions'
    ],
    improvements: [
      'Add more specific metrics and numbers to achievements',
      'Include keywords relevant to target job descriptions',
      'Consider adding a professional summary section',
      'Expand on leadership and teamwork experiences'
    ],
    suggestions: [
      'Tailor resume for specific job applications',
      'Use industry-specific terminology',
      'Keep resume to 1-2 pages maximum',
      'Ensure consistent formatting throughout'
    ],
    keywords: {
      present: ['JavaScript', 'React', 'Node.js', 'Project Management', 'Team Leadership'],
      missing: ['Python', 'AWS', 'Docker', 'Agile', 'Scrum']
    },
    sections: {
      contact: { score: 95, feedback: 'Complete and professional contact information' },
      summary: { score: 70, feedback: 'Consider adding a compelling professional summary' },
      experience: { score: 90, feedback: 'Strong work experience with good details' },
      education: { score: 85, feedback: 'Relevant education background' },
      skills: { score: 80, feedback: 'Good technical skills, consider soft skills' }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.type === 'application/pdf' || selectedFile.type.includes('document')) {
      setFile(selectedFile);
      analyzeResume(selectedFile);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const analyzeResume = async (file) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          AI Resume Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get AI-powered insights to optimize your resume for better job opportunities
        </p>
      </div>

      {/* Upload Section */}
      {!analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Analyzing Your Resume...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI is reviewing your resume and generating insights
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <DocumentArrowUpIcon className="w-16 h-16 text-primary-500 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 inline-block"
                  >
                    Choose File
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Supports PDF, DOC, and DOCX files
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Resume Analysis Results
              </h2>
              <button
                onClick={() => {
                  setFile(null);
                  setAnalysis(null);
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Analyze Another Resume
              </button>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className={getScoreColor(analysis.score)}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${analysis.score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Overall Resume Score
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {analysis.score >= 80 ? 'Excellent resume!' : 
                 analysis.score >= 60 ? 'Good resume with room for improvement' : 
                 'Needs significant improvements'}
              </p>
            </div>
          </motion.div>

          {/* Section Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2 text-primary-500" />
              Section Analysis
            </h3>
            
            <div className="space-y-4">
              {Object.entries(analysis.sections).map(([section, data]) => (
                <div key={section} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                        {section}
                      </h4>
                      <span className={`font-semibold ${getScoreColor(data.score)}`}>
                        {data.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${getScoreBg(data.score)}`}
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {data.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strengths and Improvements */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircleIcon className="w-6 h-6 mr-2 text-green-500" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Improvements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ExclamationTriangleIcon className="w-6 h-6 mr-2 text-yellow-500" />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Keywords Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BoltIcon className="w-6 h-6 mr-2 text-primary-500" />
              Keyword Analysis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                  Present Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.present.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-yellow-500" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.missing.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <InformationCircleIcon className="w-6 h-6 mr-2 text-blue-500" />
              Suggestions
            </h3>
            <ul className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
