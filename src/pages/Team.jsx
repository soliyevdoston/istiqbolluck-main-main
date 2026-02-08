import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const SectionTitle = ({ subtitle, title, desc }) => (
  <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20 text-center md:text-left">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
      <div className="shrink-0">
        <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
          {subtitle}
        </h4>
        <h2 className="text-3xl md:text-6xl font-[900] dark:text-white uppercase tracking-tighter leading-none italic">
          {title}
        </h2>
      </div>
      <div className="flex items-stretch gap-4 md:gap-6 max-w-md mx-auto md:mx-0 text-left">
        <div className="w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
        <p className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default function Team() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFullTeachers, setShowFullTeachers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!t.team_page) return null;

  const getOrderedTeachers = () => {
    let list =
      activeTab === "all"
        ? [...t.team_page.teachers]
        : t.team_page.teachers.filter((t) => t.category === activeTab);
    return list.sort((a, b) => (b.isLead ? 1 : 0) - (a.isLead ? 1 : 0));
  };

  const currentTeachers = getOrderedTeachers();
  const teacherLimit = isMobile ? 6 : 8;

  return (
    <div className="bg-[#fbfcff] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden pt-20">
      
      {/* --- 1. HERO / DIRECTOR SPOTLIGHT --- */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39B54A]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#39B54A]/5 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-5/12 max-w-[500px]"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white dark:border-zinc-900 group">
                <img
                  src={t.team_page.director.img}
                  alt="Director"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                
                 {/* Badge on Image */}
                 <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                      <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold mb-1">{t.team_page.dir_label}</p>
                      <h3 className="text-white text-2xl font-black uppercase italic leading-none">{t.team_page.director.name}</h3>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-7/12 text-left"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-[#39B54A]"></span>
                <span className="text-[#39B54A] font-black uppercase tracking-[0.2em] text-xs">
                  {t.team_page.director.badge}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black dark:text-white uppercase leading-[0.9] mb-8 tracking-tight">
                {t.team_page.director.name}
              </h1>

              <blockquote className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium italic mb-10 leading-relaxed border-l-4 border-[#39B54A] pl-6 py-2">
                "{t.team_page.director.quote}"
              </blockquote>

              <button
                onClick={() => setSelected(t.team_page.director)}
                className="group flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#39B54A] dark:hover:bg-[#39B54A] hover:text-white transition-all shadow-lg hover:shadow-green-500/30"
              >
                {t.team_page.more_info} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ADMIN SECTION (Refined Layout) --- */}
      <section className="py-24 bg-white dark:bg-[#080808] border-y border-zinc-100 dark:border-zinc-900">
        <SectionTitle
          subtitle={t.team_page.admin_section.subtitle}
          title={t.team_page.admin_section.title}
          desc={t.team_page.admin_section.desc}
        />
        <div className="max-w-7xl mx-auto px-6">
          {/* 
            Desktop: Flex row centered with large cards.
            Mobile: Grid cols-2 (side-by-side) as requested.
          */}
          <div className="grid grid-cols-2 lg:flex lg:justify-center gap-4 md:gap-12">
            {t.team_page.administration.map((p) => (
              <motion.div
                layout
                key={p.id}
                onClick={() => setSelected(p)}
                whileHover={{ y: -10 }}
                className="group cursor-pointer relative col-span-1 lg:w-[400px]" // Fixed width for desktop consistency
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#fbfbf9] dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all border border-zinc-100 dark:border-zinc-800">
                  <img
                    src={p.img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                    alt={p.name}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-[#39B54A] text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg shadow-green-500/20">
                      Rahbariyat
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic leading-none mb-1">
                      {p.name}
                    </h3>
                    <p className="text-zinc-300 font-bold text-[10px] uppercase tracking-widest opacity-80">
                      {p.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STAFF SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle={t.team_page.staff_section.subtitle}
          title={
            <>
              {t.team_page.staff_section.title1}{" "}
              <span className="text-[#39B54A]">
                {t.team_page.staff_section.title2}
              </span>
            </>
          }
          desc={t.team_page.staff_section.desc}
        />

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {t.team_page.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowFullTeachers(false);
              }}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeTab === cat.id
                  ? "bg-[#39B54A] text-white border-[#39B54A] shadow-lg shadow-green-500/30"
                  : "bg-[#fafaf5] dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-[#39B54A]/50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {(showFullTeachers
              ? currentTeachers
              : currentTeachers.slice(0, teacherLimit)
            ).map((p) => (
              <TeamMemberCard
                key={p.id}
                person={p}
                onClick={setSelected}
                isLarge={activeTab !== "all" && p.isLead}
                detailText={t.team_page.details_btn}
              />
            ))}
          </AnimatePresence>
        </div>

        {currentTeachers.length > teacherLimit && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowFullTeachers(!showFullTeachers)}
              className="px-10 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#39B54A] hover:text-white hover:border-[#39B54A] transition-all"
            >
              {showFullTeachers ? t.team_page.hide : t.team_page.view_all}
            </button>
          </div>
        )}
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#101010] w-full md:max-w-4xl h-[95vh] md:h-auto md:max-h-[85vh] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row absolute md:relative bottom-0 md:inset-auto rounded-t-[2.5rem]"
            >
              {/* Image Section (Improved Visibility) */}
              <div className="w-full md:w-2/5 h-[40vh] md:h-auto relative shrink-0 bg-zinc-100 dark:bg-black/50 overflow-hidden">
                 {/* Blurred background for fill */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
                    style={{ backgroundImage: `url(${selected.img})` }}
                 />
                <img
                    src={selected.img}
                    className="relative w-full h-full object-contain md:object-cover transform-gpu"
                    alt={selected.name}
                  />
                   <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-[#39B54A] transition-colors md:hidden z-20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto relative bg-white dark:bg-[#101010] flex flex-col h-full">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-[#39B54A] hover:text-white transition-colors hidden md:block"
                >
                  <X size={20} />
                </button>
                
                {/* Desktop Name Header (Hidden on mobile to save space?) No, let's show it but compact */}
                <div className="mb-6">
                    <span className="text-[#39B54A] font-black uppercase text-[10px] tracking-[0.3em] mb-2 block">
                    {selected.role || selected.subject}
                    </span>
                    <h2 className="text-2xl md:text-5xl font-black dark:text-white uppercase tracking-tight leading-none italic">
                    {selected.name}
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 shrink-0">
                  <div className="p-3 bg-[#fafaf5] dark:bg-zinc-900 rounded-xl flex flex-col justify-center border border-zinc-100 dark:border-zinc-800">
                     <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-[#39B54A]"/>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">{t.team_page.exp_label}</span>
                     </div>
                     <p className="text-sm font-black dark:text-white">{selected.experience} yil</p>
                  </div>
                   <div className="p-3 bg-[#fafaf5] dark:bg-zinc-900 rounded-xl flex flex-col justify-center border border-zinc-100 dark:border-zinc-800">
                     <div className="flex items-center gap-2 mb-1">
                        <GraduationCap size={14} className="text-[#39B54A]" />
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Ma'lumoti</span>
                     </div>
                     <p className="text-sm font-black dark:text-white truncate">{selected.education}</p>
                  </div>
                </div>

                {selected.achievements && (
                  <div className="mb-6 shrink-0">
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-3">
                       {t.team_page.achievements_label}
                    </h4>
                    <ul className="space-y-2">
                       {/* Show all on mobile too if possible, allow scroll which is native flex-col behavior */}
                      {selected.achievements.map((a, i) => (
                        <li key={i} className="flex gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium items-start">
                          <CheckCircle2 size={14} className="text-[#39B54A] shrink-0 mt-0.5" />
                          <span className="leading-tight">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selected.bio && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-auto">
                         <p className="text-zinc-500 dark:text-zinc-400 italic text-xs md:text-sm leading-relaxed">
                            "{selected.bio}"
                         </p>
                    </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TeamMemberCard = ({ person, onClick, isLarge = false, detailText }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    onClick={() => onClick(person)}
    className={`group cursor-pointer flex flex-col w-full h-full relative ${
      isLarge ? "col-span-2 md:col-span-2 md:row-span-2" : "col-span-1"
    }`}
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#fafaf5] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:shadow-lg transition-all duration-500">
      <img
        src={person.img}
        className="w-full h-full object-cover transition-transform duration-700 grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105"
        alt={person.name}
      />
      
      {/* Overlay info for large card */}
      {isLarge && (
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <span className="inline-block px-3 py-1 bg-[#39B54A] text-white text-[9px] font-black uppercase tracking-widest rounded-full w-fit mb-2">
                Leader
            </span>
            <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-1">{person.name}</h3>
            <p className="text-zinc-300 text-xs font-bold uppercase tracking-wider">{person.role || person.subject}</p>
           </div>
      )}
      
      {/* Floating button */}
      {!isLarge && (
         <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} />
         </div>
      )}

    </div>
    
    {!isLarge && (
      <div className="mt-4 px-2 text-center">
        <h4 className="text-sm md:text-lg font-black dark:text-white uppercase tracking-tight leading-none mb-1 group-hover:text-[#39B54A] transition-colors line-clamp-1">
          {person.name}
        </h4>
        <p className="text-zinc-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest truncate">
          {person.role || person.subject}
        </p>
      </div>
    )}
  </motion.div>
);
