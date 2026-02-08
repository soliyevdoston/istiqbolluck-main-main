import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  School as SchoolIcon,
  Zap,
  Clock,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SchoolDtm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] min-h-screen w-full text-slate-900 dark:text-white transition-colors flex flex-col font-sans">
      
      {/* 1. HEADER & NAVIGATION */}
      <div className="pt-24 sm:pt-32 pb-12 flex flex-col items-center gap-8 px-6">
         {/* Title */}
        <div className="flex items-center gap-3 mb-4">
            <Zap className="text-[#39B54A] w-6 h-6" fill="#39B54A" />
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">
              DTM <span className="text-[#39B54A]">CORE</span>
            </h1>
        </div>

        {/* Navigation Switcher */}
        <div className="p-1.5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-1">
            <button
            onClick={() => navigate("/dtm")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === "/dtm"
                ? "bg-[#39B54A] text-white shadow-lg shadow-green-500/20"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
            >
            <User size={14} />
            {t.student_btn}
            </button>
            <button
            onClick={() => navigate("/schooldtm")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === "/schooldtm"
                ? "bg-[#39B54A] text-white shadow-lg shadow-green-500/20"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
            >
            <SchoolIcon size={14} />
            {t.school_btn}
            </button>
        </div>
      </div>

      {/* 2. MAIN CARD */}
      <main className="flex-1 flex flex-col items-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white dark:bg-[#0c0c0c] p-8 sm:p-16 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#39B54A]/5 rounded-full -mr-20 -mt-20 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-20 -mb-20 blur-[80px]"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] flex items-center justify-center text-[#39B54A] shadow-inner">
                <Clock size={32} className="animate-[spin_10s_linear_infinity] opacity-80" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-3 -right-3 bg-[#39B54A] text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-[#0c0c0c]"
              >
                <Sparkles size={16} fill="currentColor" />
              </motion.div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-6 dark:text-white">
              {t.school_title.split(" ")[0]}{" "}
              <span className="text-[#39B54A]">{t.school_title.split(" ")[1]}</span>
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm max-w-md leading-relaxed mb-10">
              {t.school_desc}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-full text-[10px] font-black uppercase text-zinc-400 border border-zinc-100 dark:border-zinc-800 tracking-wider">
                <Settings2 size={12} /> {t.system_analysis}
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-[#39B54A]/5 rounded-full text-[10px] font-black uppercase text-[#39B54A] border border-[#39B54A]/10 tracking-wider">
                <Sparkles size={12} /> {t.new_dashboard}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 text-center">
         <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700 select-none">
            {t.developed} | v2.2
         </p>
      </footer>
    </div>
  );
}
