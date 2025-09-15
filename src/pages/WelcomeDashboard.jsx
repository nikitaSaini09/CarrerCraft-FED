import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  BriefcaseIcon,
  SparklesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ArrowRightIcon,
  StarIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
  TrophyIcon,
  FireIcon,
  BeakerIcon,
  LockClosedIcon,
  LockOpenIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import demoUser from "../data/demoUser.json";

// --- data (kept your theme tokens) ---
const stats = [
  {
    label: "Skills Completed",
    value: 17,
    icon: TrophyIcon,
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-glow",
  },
  {
    label: "Active Roadmaps",
    value: demoUser?.roadmap?.length ?? 0,
    icon: RocketLaunchIcon,
    color: "from-primary-400 to-primary-600",
    glow: "shadow-teal-glow",
  },
  {
    label: "Streak Days",
    value: 23,
    icon: FireIcon,
    color: "from-emerald-500 to-emerald-700",
    glow: "shadow-emerald-glow",
  },
  {
    label: "Skills Learning",
    value: demoUser?.skills?.learning?.length ?? 0,
    icon: BeakerIcon,
    color: "from-aqua-from to-aqua-to",
    glow: "shadow-teal-glow",
  },
];

const quickActions = [
  {
    title: "Career Advisor",
    description: "Get personalized career guidance",
    icon: UserCircleIcon,
    path: "/dashboard/advisor",
  },
  {
    title: "Skill Tracker",
    description: "Track your learning progress",
    icon: ChartBarIcon,
    path: "/dashboard/skills",
  },
  {
    title: "Roadmaps",
    description: "Follow structured learning paths",
    icon: BriefcaseIcon,
    path: "/dashboard/roadmap",
  },
  {
    title: "Portfolio Builder",
    description: "Create your professional portfolio",
    icon: SparklesIcon,
    path: "/dashboard/portfolio",
  },
];

const recentActivities = [
  { action: "Completed React.js module", time: "2 hours ago", type: "success" },
  { action: "Started UI/UX Design roadmap", time: "1 day ago", type: "info" },
  { action: "Added 3 new skills to tracker", time: "2 days ago", type: "success" },
  { action: "Updated portfolio with new project", time: "3 days ago", type: "info" },
];

const WelcomeDashboard = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [isDark] = useState(false);

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const scrollToStats = () => {
    document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-bg-light dark:bg-bg-dark">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-emerald-500 to-aqua-to z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Animated Background */}
      <motion.div className="fixed inset-0 -z-10" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-bg-light via-primary-50/30 to-emerald-50/20 dark:from-bg-dark dark:via-emerald-900/10 dark:to-primary-900/10" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </motion.div>

      {/* Hero */}
      <motion.section
        className="relative h-screen flex items-center px-0"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Split Layout Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          
          {/* Left Side - Student Image */}
          <div className="relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/student-bg.jpg")' }}
            />
            {/* Soft teal-to-transparent gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/25 via-teal-400/15 to-transparent" />
            {/* Right edge fade to blend with text section */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent" />
          </div>

          {/* Right Side - Text Content */}
          <div className="relative flex items-center justify-start lg:justify-center bg-white dark:bg-gray-900 px-6 lg:px-12">
            <div className="text-left lg:text-right max-w-xl">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, x: 50, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                Hi <span className="text-teal-600 dark:text-teal-400">{demoUser?.user?.name ?? "Nikita"}</span>,
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 mb-12 font-light"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Ready to <span className="text-teal-600 dark:text-teal-400 font-medium">craft your career</span>?
              </motion.p>

              <motion.div
                className="flex justify-start lg:justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  onClick={scrollToStats}
                  className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Let's Begin <RocketLaunchIcon className="h-5 w-5" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24 space-y-12">
        {/* Stats */}
        <section id="stats-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className={`relative backdrop-blur-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-glass p-6 flex items-center gap-4 hover:shadow-teal-glow hover:scale-[1.02] transition-all duration-500 ${stat.glow}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.05 }}
              >
                {/* subtle card particles */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{ y: [0, -12, 0], opacity: [0.15, 0.5, 0.15] }}
                      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                  ))}
                </div>

                <Icon className="h-8 w-8 text-primary-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-2xl font-mono font-bold text-text-primary dark:text-text-primary-dark">{stat.value}</p>
                  <p className="text-sm text-text-secondary truncate">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-primary dark:text-text-primary-dark mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link to={action.path} key={action.title}>
                  <motion.div
                    className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-glass p-6 flex flex-col items-start hover:shadow-teal-glow hover:scale-[1.02] transition-all duration-500 min-h-[160px] group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Icon className="h-8 w-8 text-primary-500 mb-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-display font-semibold text-text-primary dark:text-text-primary-dark mb-2">{action.title}</h3>
                    <p className="text-text-secondary text-sm mb-4 flex-grow">{action.description}</p>
                    <span className="flex items-center gap-2 text-primary-500 text-sm font-medium mt-auto group-hover:gap-3 transition-all duration-300">
                      Get Started <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent & Advisor */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-glass p-6 hover:shadow-teal-glow transition-all duration-500">
            <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-primary-dark mb-6 flex items-center gap-3">
              <CalendarDaysIcon className="h-6 w-6 text-primary-500" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl bg-primary-50/50 dark:bg-emerald-900/20 hover:bg-primary-100/50 dark:hover:bg-emerald-800/30 transition-colors duration-300"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "success" ? "bg-emerald-500" : "bg-primary-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{activity.action}</p>
                    <p className="text-xs text-text-secondary">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advisor Notes */}
          <div className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-glass p-6 hover:shadow-teal-glow transition-all duration-500">
            <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-primary-dark mb-6 flex items-center gap-3">
              <StarIcon className="h-6 w-6 text-emerald-500" />
              Career Advisor Notes
            </h3>
            <div className="space-y-3">
              {(demoUser?.career?.advisorNotes ?? []).map((note, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl p-4 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 transition-colors duration-300"
                >
                  <p className="text-sm text-text-primary dark:text-text-primary-dark">💡 {note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WelcomeDashboard;
