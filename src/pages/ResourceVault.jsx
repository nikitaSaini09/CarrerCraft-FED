import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  MicrophoneIcon,
  AcademicCapIcon,
  FunnelIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { storage, generateId, formatDate } from '../utils/storage';
import { STORAGE_KEYS, RESOURCE_CATEGORIES } from '../utils/constants';
import demoUser from '../data/demoUser.json';

const ResourceVault = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    url: '',
    description: '',
    category: RESOURCE_CATEGORIES.ARTICLE,
    tags: '',
  });

  const categoryOptions = [
    { value: 'all', label: 'All Resources', icon: BookOpenIcon, color: 'text-gray-500' },
    { value: RESOURCE_CATEGORIES.ARTICLE, label: 'Articles', icon: DocumentTextIcon, color: 'text-blue-500' },
    { value: RESOURCE_CATEGORIES.VIDEO, label: 'Videos', icon: VideoCameraIcon, color: 'text-red-500' },
    { value: RESOURCE_CATEGORIES.COURSE, label: 'Courses', icon: AcademicCapIcon, color: 'text-green-500' },
    { value: RESOURCE_CATEGORIES.BOOK, label: 'Books', icon: BookOpenIcon, color: 'text-purple-500' },
    { value: RESOURCE_CATEGORIES.TOOL, label: 'Tools', icon: WrenchScrewdriverIcon, color: 'text-orange-500' },
    { value: RESOURCE_CATEGORIES.PODCAST, label: 'Podcasts', icon: MicrophoneIcon, color: 'text-pink-500' },
  ];

  // Convert demo user resources to component format
  const sampleResources = demoUser.resources.map((resource, index) => ({
    id: `demo-${index}`,
    title: resource.title,
    url: resource.link,
    description: `Essential resource for ${demoUser.career.selectedPath} development`,
    category: RESOURCE_CATEGORIES.ARTICLE,
    tags: ['career', 'development', demoUser.career.selectedPath.toLowerCase().replace(' ', '-')],
    dateAdded: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(),
    isSample: true,
  }));

  // Load resources on component mount
  useEffect(() => {
    const savedResources = storage.get(STORAGE_KEYS.RESOURCES, []);
    if (savedResources.length === 0) {
      // Add sample resources if none exist
      setResources(sampleResources);
      storage.set(STORAGE_KEYS.RESOURCES, sampleResources);
    } else {
      setResources(savedResources);
    }
  }, []);

  // Save resources to localStorage
  const saveResources = (updatedResources) => {
    storage.set(STORAGE_KEYS.RESOURCES, updatedResources);
    setResources(updatedResources);
  };

  const addResource = () => {
    if (!newResource.title.trim() || !newResource.url.trim()) return;

    const resource = {
      id: generateId(),
      ...newResource,
      tags: newResource.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      dateAdded: new Date().toISOString(),
    };

    const updatedResources = [resource, ...resources];
    saveResources(updatedResources);
    
    // Reset form
    setNewResource({
      title: '',
      url: '',
      description: '',
      category: RESOURCE_CATEGORIES.ARTICLE,
      tags: '',
    });
    setShowAddForm(false);
  };

  const deleteResource = (id) => {
    const updatedResources = resources.filter(resource => resource.id !== id);
    saveResources(updatedResources);
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    const option = categoryOptions.find(opt => opt.value === category);
    return option ? option.icon : DocumentTextIcon;
  };

  const getCategoryColor = (category) => {
    const option = categoryOptions.find(opt => opt.value === category);
    return option ? option.color : 'text-gray-500';
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
            Resource Vault
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
            Curate and organize learning resources, articles, and tools in one place
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm md:text-base"
        >
          <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Resource</span>
        </motion.button>
      </div>

      {/* Add Resource Form */}
      {showAddForm && (
        <motion.div 
          className="p-4 md:p-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Resource
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Resource title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL *
              </label>
              <input
                type="url"
                value={newResource.url}
                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows="3"
              placeholder="Brief description of the resource"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newResource.category}
                onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categoryOptions.slice(1).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={newResource.tags}
                onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="career, development, skills"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addResource}
              disabled={!newResource.title.trim() || !newResource.url.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Add Resource
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Search resources..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchTerm || selectedCategory !== 'all' 
              ? 'No resources found matching your criteria'
              : 'No resources yet. Start building your vault!'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredResources.map((resource) => {
            const CategoryIcon = getCategoryIcon(resource.category);
            
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                    <CategoryIcon className={`w-6 h-6 ${getCategoryColor(resource.category)}`} />
                  </div>
                  {!resource.isSample && (
                    <button
                      onClick={() => deleteResource(resource.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                
                {resource.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                )}
                
                {resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{resource.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Added {formatDate(resource.dateAdded)}
                  </span>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View Resource
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourceVault;
