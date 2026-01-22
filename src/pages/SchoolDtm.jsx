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

export default function SchoolDtm() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f0f2f5] dark:bg-[#050505] h-screen w-full text-slate-900 dark:text-white transition-all overflow-hidden flex flex-col">
      {/* Asosiy konteyner */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col px-4 sm:px-10">
        {/* 1. HEADER & NAVIGATION (Oldingi sahifa bilan bir xil) */}
        <div className="pt-24 sm:pt-28 flex flex-col items-center gap-8">
          {/* Sahifalararo o'tkazgich */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white dark:border-zinc-800 shadow-xl">
              <button
                onClick={() => navigate("/dtm")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all ${
                  location.pathname === "/dtm"
                    ? "bg-[#39B54A] text-black shadow-md"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                <User size={16} />
                O'quvchi DTM ko'rsatkichi
              </button>
              <button
                onClick={() => navigate("/schooldtm")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all ${
                  location.pathname === "/schooldtm"
                    ? "bg-[#39B54A] text-black shadow-md"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                <SchoolIcon size={16} />
                Maktab DTM ko'rsatkichi
              </button>
            </div>
          </div>

          {/* Logo qismi */}
          <div className="flex items-center gap-3">
            <Zap className="text-[#39B54A] w-7 h-7" fill="#39B54A" />
            <h1 className="text-xl font-black uppercase italic tracking-tighter">
              DTM <span className="text-[#39B54A]">CORE</span>
            </h1>
          </div>
        </div>

        {/* 2. TEZ ORADA CARD (Markazlashtirilgan) */}
        <main className="flex-1 flex items-center justify-center pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white dark:bg-zinc-900/50 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-white dark:border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
          >
            {/* Dizayn uchun fon elementlari */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#39B54A] opacity-[0.03] rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2E3192] opacity-[0.03] rounded-full -ml-16 -mb-16 blur-3xl"></div>

            <div className="relative z-10">
              {/* Animatsiyali Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#39B54A]/10 rounded-[2rem] flex items-center justify-center text-[#39B54A]">
                    <Clock
                      size={36}
                      className="animate-[spin_10s_linear_infinity]"
                    />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-lg text-black"
                  >
                    <Sparkles size={14} fill="currentColor" />
                  </motion.div>
                </div>
              </div>

              {/* Matnlar */}
              <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter mb-4">
                TEZ <span className="text-[#39B54A]">ORADA!</span>
              </h2>

              <p className="text-slate-500 dark:text-zinc-400 font-bold text-xs sm:text-sm max-w-sm mx-auto leading-relaxed mb-8 uppercase tracking-widest">
                Maktab ko'rsatkichlari va umumiy tahlillar bo'limi
                loyihalashtirilmoqda.
              </p>

              {/* Status belgilari */}
              <div className="flex justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-xl text-[9px] font-black uppercase text-slate-500 border border-slate-200 dark:border-zinc-700">
                  <Settings2 size={12} /> Tizim tahlili
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#39B54A]/5 rounded-xl text-[9px] font-black uppercase text-[#39B54A] border border-[#39B54A]/10">
                  <Sparkles size={12} /> Yangi Dashboard
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Footer (Eng pastda) */}
      <footer className="absolute bottom-6 w-full text-center opacity-10 text-[9px] font-black uppercase tracking-[1em] select-none">
        Istiqbolluck.uz v2.0
      </footer>
    </div>
  );
}
