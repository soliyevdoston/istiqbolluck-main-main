import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sun, Moon, Menu, X, Sparkles } from "lucide-react";
import AIChat from "./AIChat";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to light regardless of system preference
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Close menu when clicking chat
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setIsOpen(false);
  };

  return (
    <>
      {/* Container for Floating Button */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-[990] flex items-center">
        
        {/* Actions Container */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Theme Toggle Button (Top-Left) */}
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: 1, x: -60, y: -45, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute z-[980]"
                >
                  <button
                    onClick={toggleTheme}
                    className="w-10 h-10 bg-white/20 dark:bg-zinc-800/20 backdrop-blur-md text-zinc-900 dark:text-white rounded-full 
                               shadow-xl border border-zinc-100/30 dark:border-zinc-700/30 flex items-center justify-center
                               hover:scale-110 transition-transform"
                    title="Toggle Theme"
                  >
                    {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </motion.div>

                {/* Chat Trigger Button (Bottom-Left) */}
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: 1, x: -60, y: 45, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
                  className="absolute z-[980]"
                >
                  <button
                    onClick={handleChatToggle}
                    className="w-10 h-10 bg-[#39B54A] text-white rounded-full 
                               shadow-xl flex items-center justify-center
                               hover:scale-110 transition-transform"
                    title="Open Chat"
                  >
                    <Bot size={20} />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`
              relative z-[990]
              w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-md border-2 
              ${isOpen ? "border-[#39B54A]" : "border-zinc-100/30 dark:border-zinc-800/30"}
              text-zinc-800 dark:text-white rounded-l-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] 
              flex items-center justify-center transition-colors rounded-r-none mr-[-2px]
            `}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Sparkles size={20} className="text-[#39B54A]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Render Chat Window (Controlled) */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
