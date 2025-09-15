import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import demoUser from '../data/demoUser.json';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Skill Card Component
const SortableSkillCard = ({ skill, column, onMove, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-4 rounded-2xl shadow-glass cursor-grab active:cursor-grabbing hover:shadow-teal-glow transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-text-primary dark:text-text-primary-dark">{skill.name}</h4>
        <button
          onClick={() => onDelete(skill.id, column)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
      <p className="text-text-secondary text-sm mb-3">{skill.description}</p>
      
      <div className="flex gap-2">
        {column !== 'todo' && (
          <button
            onClick={() => onMove(skill.id, column, column === 'inProgress' ? 'todo' : 'inProgress')}
            className="flex items-center gap-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-full text-xs transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </button>
        )}
        {column !== 'done' && (
          <button
            onClick={() => onMove(skill.id, column, column === 'todo' ? 'inProgress' : 'done')}
            className="flex items-center gap-1 px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {column === 'todo' ? 'Start' : 'Complete'}
            <FaArrowRight className="text-xs" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const SkillTracker = () => {
  // Initialize skills from demo data
  const initializeSkills = () => {
    const skillsData = {
      todo: demoUser.skills.current.map((skill, index) => ({
        id: `current-${index}`,
        name: skill,
        description: `Master ${skill} fundamentals`
      })),
      inProgress: demoUser.skills.learning.map((skill, index) => ({
        id: `learning-${index}`,
        name: skill,
        description: `Currently learning ${skill}`
      })),
      done: demoUser.skills.completed.map((skill, index) => ({
        id: `completed-${index}`,
        name: skill,
        description: `Successfully completed ${skill}`
      }))
    };
    return skillsData;
  };

  const [skills, setSkills] = useState(initializeSkills());

  const [newSkill, setNewSkill] = useState({ name: '', description: '', column: 'todo' });
  const [showAddForm, setShowAddForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const skill = {
      id: `skill-${Date.now()}`,
      name: newSkill.name,
      description: newSkill.description
    };

    setSkills(prev => ({
      ...prev,
      [newSkill.column]: [...prev[newSkill.column], skill]
    }));

    setNewSkill({ name: '', description: '', column: 'todo' });
    setShowAddForm(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    // Find which column the active item is in
    let activeColumn = null;
    let activeIndex = -1;
    
    Object.keys(skills).forEach(column => {
      const index = skills[column].findIndex(skill => skill.id === activeId);
      if (index !== -1) {
        activeColumn = column;
        activeIndex = index;
      }
    });
    
    if (!activeColumn) return;
    
    // Find which column the over item is in or if it's a droppable column
    let overColumn = null;
    let overIndex = -1;
    
    // Check if over is a column droppable
    if (['todo', 'inProgress', 'done'].includes(overId)) {
      overColumn = overId;
      overIndex = skills[overId].length; // Add to end of column
    } else {
      // Find the column of the over item
      Object.keys(skills).forEach(column => {
        const index = skills[column].findIndex(skill => skill.id === overId);
        if (index !== -1) {
          overColumn = column;
          overIndex = index;
        }
      });
    }
    
    if (!overColumn) return;
    
    const activeSkill = skills[activeColumn][activeIndex];
    
    if (activeColumn === overColumn) {
      // Reordering within the same column
      if (activeIndex !== overIndex) {
        setSkills(prev => ({
          ...prev,
          [activeColumn]: arrayMove(prev[activeColumn], activeIndex, overIndex)
        }));
      }
    } else {
      // Moving between columns
      setSkills(prev => {
        const newSkills = { ...prev };
        
        // Remove from active column
        newSkills[activeColumn] = prev[activeColumn].filter(skill => skill.id !== activeId);
        
        // Add to over column
        const newOverColumn = [...prev[overColumn]];
        newOverColumn.splice(overIndex, 0, activeSkill);
        newSkills[overColumn] = newOverColumn;
        
        return newSkills;
      });
    }
  };

  const moveSkill = (skillId, fromColumn, toColumn) => {
    const skill = skills[fromColumn].find(s => s.id === skillId);
    if (!skill) return;

    setSkills(prev => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter(s => s.id !== skillId),
      [toColumn]: [...prev[toColumn], skill]
    }));
  };

  const deleteSkill = (skillId, column) => {
    setSkills(prev => ({
      ...prev,
      [column]: prev[column].filter(s => s.id !== skillId)
    }));
  };

  const getAllSkillIds = () => {
    return [...skills.todo, ...skills.inProgress, ...skills.done].map(skill => skill.id);
  };

  const columns = [
    { key: 'todo', title: 'To Learn', color: 'pink', icon: '📚' },
    { key: 'inProgress', title: 'Learning', color: 'purple', icon: '🔥' },
    { key: 'done', title: 'Done', color: 'green', icon: '✅' }
  ];

  return (
    <motion.div 
      className="p-4 md:p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Skill Tracker
        </motion.h2>
        
        <motion.button
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaPlus className="text-sm" />
          Add Skill
        </motion.button>
      </div>

      {/* Add Skill Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-6 backdrop-blur-xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-glass border border-border-light dark:border-border-dark"
          >
            <form onSubmit={addSkill} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Skill name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="p-3 border border-border-light dark:border-border-dark rounded-xl bg-primary-50/50 dark:bg-emerald-900/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newSkill.description}
                  onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  className="p-3 border border-border-light dark:border-border-dark rounded-xl bg-primary-50/50 dark:bg-emerald-900/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
                <select
                  value={newSkill.column}
                  onChange={(e) => setNewSkill({ ...newSkill, column: e.target.value })}
                  className="p-3 border border-border-light dark:border-border-dark rounded-xl bg-primary-50/50 dark:bg-emerald-900/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="todo">To Learn</option>
                  <option value="inProgress">Learning</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Add Skill
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-border-light dark:border-border-dark text-text-secondary rounded-full hover:bg-primary-50/50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board with Drag & Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <motion.div
              key={column.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + columns.indexOf(column) * 0.1 }}
              className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-glass border border-border-light dark:border-border-dark p-6 hover:shadow-teal-glow transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{column.icon}</span>
                <h3 className="text-lg font-display font-semibold text-text-primary dark:text-text-primary-dark">
                  {column.title}
                </h3>
                <span className="bg-primary-100 dark:bg-emerald-900/30 text-primary-700 dark:text-emerald-300 text-sm px-3 py-1 rounded-full font-medium">
                  {skills[column.key].length}
                </span>
              </div>

              <SortableContext
                items={skills[column.key].map(skill => skill.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 min-h-[200px]">
                  <AnimatePresence>
                    {skills[column.key].map((skill) => (
                      <SortableSkillCard
                        key={skill.id}
                        skill={skill}
                        column={column.key}
                        onMove={moveSkill}
                        onDelete={deleteSkill}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </SortableContext>
            </motion.div>
          ))}
        </div>
      </DndContext>
    </motion.div>
  );
};
export default SkillTracker;
