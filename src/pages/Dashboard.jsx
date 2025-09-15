import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-backgroundLight dark:bg-backgroundDark">
      {/* Navbar is now global, not inside Dashboard */}
      <motion.div 
        className="max-w-7xl mx-auto pt-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Dashboard;
