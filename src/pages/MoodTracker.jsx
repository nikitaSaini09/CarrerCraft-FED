import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaceSmileIcon, 
  HeartIcon, 
  BoltIcon,
  ExclamationTriangleIcon,
  CloudIcon,
  FireIcon,
  PlusIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { storage, generateId, formatDate } from '../utils/storage';
import { STORAGE_KEYS, MOOD_TYPES } from '../utils/constants';
import demoUser from '../data/demoUser.json';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const moodOptions = [
    { type: MOOD_TYPES.EXCITED, label: 'Excited', icon: BoltIcon, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { type: MOOD_TYPES.CONFIDENT, label: 'Confident', icon: FireIcon, color: 'text-orange-500', bg: 'bg-orange-50' },
    { type: MOOD_TYPES.MOTIVATED, label: 'Motivated', icon: HeartIcon, color: 'text-red-500', bg: 'bg-red-50' },
    { type: MOOD_TYPES.NEUTRAL, label: 'Neutral', icon: FaceSmileIcon, color: 'text-gray-500', bg: 'bg-gray-50' },
    { type: MOOD_TYPES.ANXIOUS, label: 'Anxious', icon: ExclamationTriangleIcon, color: 'text-amber-500', bg: 'bg-amber-50' },
    { type: MOOD_TYPES.OVERWHELMED, label: 'Overwhelmed', icon: CloudIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
    { type: MOOD_TYPES.FRUSTRATED, label: 'Frustrated', icon: ExclamationTriangleIcon, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  // Load mood entries on component mount
  useEffect(() => {
    const savedEntries = storage.get(STORAGE_KEYS.MOOD_ENTRIES, []);
    setMoodEntries(savedEntries);
  }, []);

  // Save mood entries to localStorage
  const saveMoodEntries = (entries) => {
    storage.set(STORAGE_KEYS.MOOD_ENTRIES, entries);
    setMoodEntries(entries);
  };

  const addMoodEntry = () => {
    if (!selectedMood) return;

    const newEntry = {
      id: generateId(),
      mood: selectedMood,
      note: note.trim(),
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    const updatedEntries = [newEntry, ...moodEntries];
    saveMoodEntries(updatedEntries);
    
    // Reset form
    setSelectedMood('');
    setNote('');
    setShowAddForm(false);
  };

  const deleteMoodEntry = (id) => {
    const updatedEntries = moodEntries.filter(entry => entry.id !== id);
    saveMoodEntries(updatedEntries);
  };

  // Prepare chart data
  const chartData = moodEntries
    .slice(0, 30) // Last 30 entries
    .reverse()
    .map((entry, index) => ({
      date: formatDate(entry.date),
      mood: entry.mood,
      value: getMoodValue(entry.mood),
      index: index + 1,
    }));

  function getMoodValue(mood) {
    const values = {
      [MOOD_TYPES.EXCITED]: 5,
      [MOOD_TYPES.CONFIDENT]: 4,
      [MOOD_TYPES.MOTIVATED]: 4,
      [MOOD_TYPES.NEUTRAL]: 3,
      [MOOD_TYPES.ANXIOUS]: 2,
      [MOOD_TYPES.OVERWHELMED]: 1,
      [MOOD_TYPES.FRUSTRATED]: 1,
    };
    return values[mood] || 3;
  }

  // Mood distribution data
  const moodDistribution = moodOptions.map(option => ({
    mood: option.label,
    count: moodEntries.filter(entry => entry.mood === option.type).length,
    color: option.color,
  }));

  const getMoodOption = (type) => moodOptions.find(option => option.type === type);

  return (
    <motion.div 
      className="p-4 md:p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
              Mood Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
              Current mood: {demoUser.user.mood} | Monitor your career journey emotions
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm md:text-base"
          >
            <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span>Log Mood</span>
          </motion.button>
        </div>

        {/* Add Mood Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How are you feeling today, {demoUser.user.name}?
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
              {moodOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(option.type)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedMood === option.type
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {option.label}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about your mood (optional)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows="3"
            />

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMoodEntry}
                disabled={!selectedMood}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Log Mood
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Mood Trend Chart */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5" />
            Mood Trend (Last 7 entries)
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 3]} ticks={[1, 2, 3]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#6366F1" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No data yet. Add moods to see the trend.
            </p>
          )}
        </motion.div>

        {/* Recent Entries */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Entries
          </h3>
          {moodEntries.length === 0 ? (
            <div className="text-center py-12">
              <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No mood entries yet. Start tracking your emotions!
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {moodEntries.slice(0, 10).map((entry) => {
                const moodOption = getMoodOption(entry.mood);
                const Icon = moodOption?.icon || FaceSmileIcon;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${moodOption?.bg || "bg-gray-100"}`}>
                        <Icon className={`w-5 h-5 ${moodOption?.color || "text-gray-500"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {moodOption?.label || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(entry.date)}
                        </p>
                        {entry.note && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteMoodEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoodTracker;
