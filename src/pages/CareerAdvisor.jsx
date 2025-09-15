import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  SparklesIcon, 
  LightBulbIcon, 
  HeartIcon, 
  CodeBracketIcon, 
  QuestionMarkCircleIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { askGemini } from '../services/gemini';
import demoUser from '../data/demoUser.json';

const CareerAdvisor = () => {
  const [messages, setMessages] = useState([
    { 
      from: 'ai', 
      text: `Hey ${demoUser.user.name}! I'm your AI Career Advisor. I see you're on the ${demoUser.career.selectedPath} path. Here are some personalized notes for you:\n\n${demoUser.career.advisorNotes.map(note => `• ${note}`).join('\n')}\n\nWhat would you like to discuss about your career journey? 🤖✨`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickReplies = [
    { text: 'I love designing', icon: HeartIcon, color: 'text-emerald-500' },
    { text: 'I hate coding', icon: CodeBracketIcon, color: 'text-red-500' },
    { text: 'I\'m confused about my career', icon: QuestionMarkCircleIcon, color: 'text-primary-500' },
    { text: 'Show me tech career paths', icon: LightBulbIcon, color: 'text-emerald-600' }
  ];

  // Career advisor system prompt for Gemini
  const getCareerPrompt = (userMessage) => {
    return `You are CareerCraft AI, a friendly and knowledgeable career advisor. Your role is to provide personalized career guidance, insights, and actionable advice.

Guidelines:
- Be encouraging and supportive
- Provide specific, actionable advice
- Use emojis appropriately to make responses engaging
- Keep responses concise but informative (2-4 paragraphs max)
- Focus on practical career guidance
- Include relevant skills, resources, or next steps when appropriate

User message: "${userMessage}"

Respond as a helpful career advisor:`;
  };

  const sendMessage = async (messageText) => {
    const userMsg = { from: 'user', text: messageText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Get response from Gemini AI
      const prompt = getCareerPrompt(messageText);
      const aiResponse = await askGemini(prompt);

      const aiMsg = {
        from: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response if Gemini fails
      const fallbackMsg = {
        from: 'ai',
        text: `I apologize, but I'm having trouble connecting to my AI services right now. 😅 

Here are some general career tips while I get back online:
• Focus on developing both technical and soft skills
• Network with professionals in your field of interest
• Consider informational interviews to learn about different roles
• Keep learning and stay curious about industry trends

Please try asking your question again in a moment!`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = async (reply) => {
    await sendMessage(reply);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageText = input;
    setInput('');
    await sendMessage(messageText);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 bg-clip-text text-transparent mb-2">
          AI Career Advisor
        </h2>
        <p className="text-text-secondary text-sm md:text-base">
          Get personalized career guidance and insights
        </p>
      </motion.div>

      {/* Chat Container */}
      <div className="backdrop-blur-xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-glass border border-border-light dark:border-border-dark overflow-hidden hover:shadow-teal-glow transition-all duration-500">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary-500 to-emerald-500 p-3 md:p-4 text-white">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center shadow-teal-glow">
              <SparklesIcon className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">CareerCraft AI</h3>
              <p className="text-xs md:text-sm opacity-90">{isLoading ? 'Typing...' : 'Online • Ready to help'}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-64 md:h-96 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex gap-3 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.from === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-teal-glow">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[70%] ${msg.from === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`p-3 rounded-2xl ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-pill'
                      : 'bg-primary-50/50 dark:bg-emerald-900/20 text-text-primary dark:text-text-primary-dark border border-border-light dark:border-border-dark'
                  }`}>
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className={`text-xs mt-2 ${
                      msg.from === 'user' ? 'text-primary-100' : 'text-text-secondary'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {msg.from === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-teal-glow">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <motion.div 
            className="p-4 border-t border-border-light dark:border-border-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-text-secondary mb-3">Quick replies:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickReplies.map((reply, index) => {
                const Icon = reply.icon;
                return (
                  <motion.button
                    key={reply.text}
                    onClick={() => handleQuickReply(reply.text)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 p-2 md:p-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-primary-50/50 dark:hover:bg-emerald-900/20 hover:shadow-teal-glow transition-all duration-300 text-xs md:text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Icon className={`w-3 h-3 md:w-4 md:h-4 ${reply.color} flex-shrink-0`} />
                    <span className="text-text-primary dark:text-text-primary-dark truncate">{reply.text}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-border-light dark:border-border-dark">
          <div className="flex gap-2 md:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border-light dark:border-border-dark bg-primary-50/50 dark:bg-emerald-900/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full hover:shadow-teal-glow hover:scale-105 transition-all duration-300 text-sm md:text-base shadow-pill"
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CareerAdvisor;
