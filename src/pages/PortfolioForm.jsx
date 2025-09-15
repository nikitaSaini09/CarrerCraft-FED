import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  TrashIcon, 
  DocumentArrowDownIcon,
  EyeIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Clean Template Component
const CleanTemplate = ({ data }) => (
  <div className="bg-white p-8 min-h-[800px]">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.name || 'Your Name'}
        </h1>
        <p className="text-xl text-primary-600 mb-2">
          {data.email || 'your.email@example.com'}
        </p>
        <p className="text-gray-600">
          {data.phone || 'Phone Number'} | {data.location || 'Location'}
        </p>
      </div>

      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <CodeBracketIcon className="w-6 h-6 mr-2 text-primary-600" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BriefcaseIcon className="w-6 h-6 mr-2 text-primary-600" />
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">{exp}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <AcademicCapIcon className="w-6 h-6 mr-2 text-primary-600" />
            Projects
          </h2>
          <div className="grid gap-4">
            {data.projects.map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">{project}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Creative Template Component
const CreativeTemplate = ({ data }) => (
  <div className="bg-gradient-to-br from-primary-50 via-emerald-50 to-primary-100 p-8 min-h-[800px]">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-emerald-400 rounded-3xl opacity-10"></div>
        <div className="relative px-12 py-8 flex flex-col items-center justify-center min-h-[200px]">
          <h1 className="text-3xl font-bold text-center mb-4 leading-tight" style={{ 
            background: 'linear-gradient(to right, #14B8A6, #10B981)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: '#7c3aed',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            maxWidth: '100%',
            width: '100%'
          }}>
            {data.name || 'Your Name'}
          </h1>
          <p className="text-lg text-center mb-3 leading-relaxed" style={{ 
            color: '#065f46',
            maxWidth: '100%',
            wordWrap: 'break-word'
          }}>
            {data.email || 'your.email@example.com'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-center text-base leading-relaxed" style={{ 
            color: '#14B8A6',
            maxWidth: '100%'
          }}>
            <span style={{ wordWrap: 'break-word' }}>{data.phone || 'Phone Number'}</span>
            <span>|</span>
            <span style={{ wordWrap: 'break-word' }}>{data.location || 'Location'}</span>
          </div>
        </div>
      </div>

      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-6 text-center">
            ✨ Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-emerald-500 text-white rounded-2xl text-sm font-medium shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-6 text-center">
            💼 Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-primary-200">
                <h3 className="text-xl font-semibold text-primary-900">{exp}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-6 text-center">
            🚀 Projects
          </h2>
          <div className="grid gap-6">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-primary-100 to-emerald-100 p-6 rounded-2xl shadow-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-primary-900">{project}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Corporate Template Component
const CorporateTemplate = ({ data }) => (
  <div className="bg-slate-50 p-8 min-h-[800px]">
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800 text-white p-8 rounded-t-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {data.name || 'Your Name'}
        </h1>
        <p className="text-xl text-slate-300 mb-2">
          {data.email || 'your.email@example.com'}
        </p>
        <p className="text-slate-400">
          {data.phone || 'Phone Number'} | {data.location || 'Location'}
        </p>
      </div>

      {data.skills && data.skills.length > 0 && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="p-3 bg-slate-100 text-slate-800 rounded text-sm font-medium text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-slate-600 pl-4 py-2">
                <h3 className="text-lg font-semibold text-slate-900">{exp}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            KEY PROJECTS
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded border-l-4 border-slate-400">
                <h3 className="text-lg font-semibold text-slate-900">{project}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Live Preview Component
const LivePreview = React.forwardRef(({ data, selectedTemplate }, ref) => {
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'corporate':
        return <CorporateTemplate data={data} />;
      default:
        return <CleanTemplate data={data} />;
    }
  };

  return (
    <motion.div className="w-full h-full" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <div ref={ref} className="w-full">
        {renderTemplate()}
      </div>
    </motion.div>
  );
});

// Enhanced PDF Export Function
const exportToPDF = async (previewRef, portfolioData, templateName) => {
  try {
    const element = previewRef.current;
    if (!element) {
      alert('Preview not found. Please try again.');
      return;
    }

    // Validate portfolio data before export
    console.log('Portfolio data before export:', portfolioData);
    
    // Ensure all text is rendered and fonts are loaded
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure all styles are applied to cloned document
        const clonedElement = clonedDoc.querySelector('[data-html2canvas-ignore]');
        if (clonedElement) {
          clonedElement.removeAttribute('data-html2canvas-ignore');
        }
        
        // Force text rendering by ensuring all text nodes are visible
        const textElements = clonedDoc.querySelectorAll('h1, h2, h3, p, span, div');
        textElements.forEach(el => {
          if (el.textContent && el.textContent.trim()) {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.color = el.style.color || 'inherit';
          }
        });
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `portfolio-${templateName}-${portfolioData.name?.replace(/\s+/g, '-').toLowerCase() || 'untitled'}.pdf`;
    pdf.save(fileName);
    
    console.log('PDF exported successfully with data:', portfolioData);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

// Main Portfolio Form Component
const PortfolioForm = () => {
  const previewRef = useRef();
  const [selectedTemplate, setSelectedTemplate] = useState('clean');
  const [isExporting, setIsExporting] = useState(false);
  
  const [portfolio, setPortfolio] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: [],
    projects: [],
    experience: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newExperience, setNewExperience] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setPortfolio(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const addProject = () => {
    if (newProject.trim()) {
      setPortfolio(prev => ({ ...prev, projects: [...prev.projects, newProject.trim()] }));
      setNewProject('');
    }
  };

  const addExperience = () => {
    if (newExperience.trim()) {
      setPortfolio(prev => ({ ...prev, experience: [...prev.experience, newExperience.trim()] }));
      setNewExperience('');
    }
  };

  const removeSkill = (index) => {
    setPortfolio(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const removeProject = (index) => {
    setPortfolio(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const removeExperience = (index) => {
    setPortfolio(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const handleExportPDF = async () => {
    // Validate data before export
    if (!portfolio.name || !portfolio.name.trim()) {
      alert('Please enter your name before exporting the portfolio.');
      return;
    }
    
    setIsExporting(true);
    
    // Log current portfolio state for debugging
    console.log('Exporting portfolio with data:', portfolio);
    console.log('Selected template:', selectedTemplate);
    
    await exportToPDF(previewRef, portfolio, selectedTemplate);
    setIsExporting(false);
  };

  const templateOptions = [
    { id: 'clean', name: 'Clean', icon: '📄', description: 'Minimal and professional' },
    { id: 'creative', name: 'Creative', icon: '🎨', description: 'Colorful and artistic' },
    { id: 'corporate', name: 'Corporate', icon: '💼', description: 'Traditional business style' }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-bg-light via-primary-50 to-emerald-50 dark:from-bg-dark dark:via-emerald-900/20 dark:to-primary-900/20 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 bg-clip-text text-transparent mb-4">
            Portfolio Builder
          </h1>
          <p className="text-text-secondary text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Create a stunning portfolio that showcases your skills and achievements
          </p>
        </motion.div>

        {/* Template Selection */}
        <motion.div 
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary dark:text-text-primary-dark mb-4 text-center">Choose Your Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {templateOptions.map((template) => (
              <motion.button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedTemplate === template.id ? 'border-primary-400 bg-primary-50 shadow-teal-glow' : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{template.icon}</div>
                <div className="font-semibold">{template.name}</div>
                <div className="text-sm text-text-secondary">{template.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 min-h-[calc(100vh-200px)]">
          <motion.div className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-glass border border-border-light dark:border-border-dark p-6 flex flex-col" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-primary-500" />
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={portfolio.name}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={portfolio.email}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={portfolio.phone}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={portfolio.location}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CodeBracketIcon className="w-5 h-5 mr-2 text-emerald-500" />
                  Skills
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button onClick={addSkill} className="px-4 py-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all duration-300">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {portfolio.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        layout
                      >
                        {skill}
                        <button onClick={() => removeSkill(index)} className="ml-2 text-emerald-600 hover:text-emerald-800">
                          <TrashIcon className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AcademicCapIcon className="w-5 h-5 mr-2 text-primary-500" />
                  Projects
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a project"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="flex-1 p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                    onKeyPress={(e) => e.key === 'Enter' && addProject()}
                  />
                  <button onClick={addProject} className="px-4 py-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all duration-300">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {portfolio.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                      >
                        <span className="text-primary-800 dark:text-primary-200">{project}</span>
                        <button onClick={() => removeProject(index)} className="text-primary-600 hover:text-primary-800">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BriefcaseIcon className="w-5 h-5 mr-2 text-emerald-500" />
                  Experience
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add experience"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    className="flex-1 p-3 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-primary-dark"
                    onKeyPress={(e) => e.key === 'Enter' && addExperience()}
                  />
                  <button onClick={addExperience} className="px-4 py-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all duration-300">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {portfolio.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                      >
                        <span className="text-emerald-800 dark:text-emerald-200">{exp}</span>
                        <button onClick={() => removeExperience(index)} className="text-emerald-600 hover:text-emerald-800">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <motion.button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:from-primary-600 hover:to-emerald-600 hover:shadow-teal-glow transition-all duration-300 flex items-center justify-center disabled:opacity-50 mt-6 shadow-pill"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                    Export as PDF
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-glass border border-border-light dark:border-border-dark overflow-hidden flex flex-col" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <div className="p-4 bg-primary-50/50 dark:bg-emerald-900/20 border-b border-border-light dark:border-border-dark flex items-center justify-between flex-shrink-0">
              <h3 className="text-lg font-semibold flex items-center">
                <EyeIcon className="w-5 h-5 mr-2 text-primary-500" />
                Live Preview - {templateOptions.find(t => t.id === selectedTemplate)?.name}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto bg-primary-50/30 dark:bg-emerald-900/10">
              <LivePreview data={portfolio} selectedTemplate={selectedTemplate} ref={previewRef} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioForm;
