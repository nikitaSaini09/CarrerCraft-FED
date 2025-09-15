import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './Themetoggle';
import Logo from './Logo';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dashboard/skills', label: 'Skills' },
  { to: '/dashboard/advisor', label: 'AI Advisor' },
  { to: '/dashboard/roadmap', label: 'Roadmap' },
  { to: '/dashboard/portfolio', label: 'Portfolio' },
  { to: '/dashboard/mood', label: 'Mood' },
  { to: '/dashboard/resources', label: 'Resources' },
  { to: '/dashboard/resume-analyzer', label: 'Resume AI' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      window.location.href = '/login';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        className="w-full flex items-center justify-between px-6 py-4 bg-nav-light dark:bg-nav-dark backdrop-blur-sm shadow-card sticky top-0 z-50 border-b border-border-light dark:border-border-dark"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Left: Logo/Title */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
        >
          <Logo />
        </motion.div>

        {/* Center: Nav Links - Desktop */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                  isActive
                    ? 'text-muted-gold bg-muted-gold/10'
                    : 'text-text-dark hover:text-muted-gold hover:bg-muted-gold/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right: User Menu & Theme Toggle */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          
          {user && (
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted-gold rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-nav-light" />
                </div>
                <span className="text-sm font-medium text-text-dark">
                  {user.displayName || user.email}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-sm text-text-dark hover:text-red-400 transition-colors duration-300"
              >
                Logout
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl text-text-dark hover:bg-muted-gold/10 transition-all duration-300"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-nav-light dark:bg-nav-dark shadow-2xl z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-xl text-text-dark hover:bg-muted-gold/10 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* User Info - Mobile */}
                {user && (
                  <div className="flex items-center space-x-3 mb-8 p-4 bg-muted-gold/10 rounded-xl">
                    <div className="w-10 h-10 bg-muted-gold rounded-full flex items-center justify-center">
                      <UserCircleIcon className="w-6 h-6 text-nav-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-dark truncate">
                        {user.displayName || user.email}
                      </p>
                      <p className="text-xs text-text-muted">
                        Logged in
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <nav className="space-y-2 mb-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/dashboard'}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-muted-gold text-nav-light shadow-lg'
                            : 'text-text-dark hover:bg-muted-gold/10 hover:text-muted-gold'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile Logout Button */}
                {user && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full px-4 py-3 text-left text-base font-medium text-red-400 hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    Logout
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
