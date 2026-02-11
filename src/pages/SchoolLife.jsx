import React, { useRef, useMemo, memo } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Tv,
  Computer,
  Book,
  ShieldCheck,
  Trophy,
  Zap,
  Compass,
  ArrowUpRight,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const DraggableMarquee = memo(({ items = [], baseVelocity = -0.02 }) => {
  const baseX = useMotionValue(0);
  
  const smoothX = useSpring(baseX, {
    damping: 100, 
    stiffness: 100,
    restDelta: 0.001
  });

  const x = useTransform(smoothX, (v) => `${wrap(-25, -50, v)}%`);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      let moveBy = baseVelocity * (delta / 10); 
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-4 md:py-8 w-full cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className="flex gap-4 md:gap-12 will-change-transform transform-gpu"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(e, info) => {
          const currentX = baseX.get();
          baseX.set(currentX + info.delta.x * 0.03);
        }}
      >
        {[...Array(4)].map((_, outerIdx) => (
          <div key={outerIdx} className="flex gap-4 md:gap-12">
            {items.map((img, i) => (
              <div key={`${outerIdx}-${i}`} className="flex-shrink-0">
                <div className="w-[260px] h-[180px] md:w-[450px] md:h-[320px] overflow-hidden rounded-[2rem] md:rounded-[3rem] border-[4px] md:border-[8px] border-white dark:border-zinc-800 shadow-xl pointer-events-none hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={img}
                    alt="Gallery"
                    loading="lazy"
                    className="w-full h-full object-cover transform-gpu scale-[1.01]"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default function SchoolLife() {
  const { t } = useLanguage();
  const scrollTargetRef = useRef(null);

  const clubIcons = useMemo(() => [
    <Trophy size={32} />, <Tv size={32} />, <Computer size={32} />, <Book size={32} />,
  ], []);

  if (!t.life_page) return null;

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden selection:bg-[#39B54A] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-[100vh] w-full flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#39B54A] rounded-full blur-[140px] opacity-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e2dfdf_1px,transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(#1a1a1a_1px,transparent_1px)]"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 md:w-12 h-[2px] bg-[#39B54A]"></span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#39B54A]">
                {t.life_page.hero_label}
              </span>
            </div>

            <h1 className="text-[40px] sm:text-6xl md:text-7xl lg:text-[90px] font-[900] tracking-tighter dark:text-white leading-[0.9] uppercase italic drop-shadow-sm">
              {t.life_page.hero_title1} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #39B54A" }}>
                {t.life_page.hero_title2}
              </span>
            </h1>

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-5 max-w-xl">
              <div className="hidden lg:block w-[3px] bg-[#39B54A] opacity-40 shrink-0"></div>
              <p className="text-sm md:text-lg font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                {t.life_page.hero_desc}
              </p>
            </div>

            <button
              onClick={() => scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-4 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-[#39B54A] hover:text-black dark:hover:text-white transition-all pt-4"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#39B54A] flex items-center justify-center group-hover:bg-[#39B54A] group-hover:text-white transition-all duration-500 group-hover:rotate-45 shadow-lg shadow-[#39B54A]/10">
                <ArrowUpRight size={20} className="md:w-6 md:h-6" />
              </div>
              {t.life_page.view_gallery}
            </button>
          </motion.div>

          {/* Hero Rasm (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1.4 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="w-full max-w-[440px] aspect-[4/5] rounded-[3rem] overflow-hidden border-[10px] border-white dark:border-zinc-800 shadow-2xl hover:rotate-0 transition-transform duration-1000 transform-gpu">
              <img src={t.life_page.hero_img} alt="School" className="w-full h-full object-cover" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -inset-10 bg-[#39B54A] rounded-full blur-[100px] -z-10"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. GALLERY */}
      <section ref={scrollTargetRef} className="py-12 md:py-16 bg-white dark:bg-[#080808] border-y border-zinc-100 dark:border-zinc-900/50">
        <DraggableMarquee items={t.life_page.galleryRow1} baseVelocity={-0.005} />
        <DraggableMarquee items={t.life_page.galleryRow2} baseVelocity={0.005} />
      </section>

      {/* 3. CLUBS */}
      <section className="py-20 md:py-32 bg-[#fcfcfc] dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 text-center md:text-left">
            <div>
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                {t.life_page.clubs_subtitle}
              </h4>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black dark:text-white uppercase tracking-tight leading-tight">
                {t.life_page.clubs_title1} <span className="text-zinc-300 dark:text-zinc-800">/</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39B54A] to-emerald-600">{t.life_page.clubs_title2}</span>
              </h2>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-xs mx-auto md:mx-0 leading-relaxed border-l-2 border-[#39B54A] pl-4">
              {t.life_page.clubs_desc}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {t.life_page.extraClubs.map((club, idx) => (
              <div 
                key={idx} 
                className={`group relative p-6 md:p-8 rounded-[2rem] bg-[#fafaf5] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                  idx % 4 < 2 ? "col-span-1" : "col-span-2 lg:col-span-1"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#39B54A]/5 rounded-bl-[4rem] transition-all group-hover:bg-[#39B54A]/10"></div>
                
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-white bg-gradient-to-br from-[#39B54A] to-emerald-700 shadow-lg shadow-[#39B54A]/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {React.cloneElement(clubIcons[idx], { size: 20 })}
                </div>
                
                <h4 className="text-sm md:text-xl font-black uppercase italic mb-2 md:mb-3 text-zinc-900 dark:text-white tracking-tight leading-tight">
                  {club.title}
                </h4>
                <p className="text-[10px] md:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION */}
      <section className="py-20 bg-white dark:bg-[#080808] border-y border-zinc-100 dark:border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
              {t.life_page.mission_subtitle}
            </h4>
            <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tight mb-6">
              {t.life_page.mission_title1} <span className="text-[#39B54A]">{t.life_page.mission_title2}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium">
              {t.life_page.mission_desc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {t.life_page.missions.map((m, idx) => (
              <div 
                key={idx} 
                className={`group relative p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-[#fafaf5] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                  idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
                }`}
              >
                 {/* Decorative Background Blob */}
                 <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#39B54A]/5 rounded-full blur-xl group-hover:bg-[#39B54A]/10 transition-colors"></div>

                <div className="relative z-10">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-[#39B54A]/10 dark:bg-[#39B54A]/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#39B54A] group-hover:text-white transition-all duration-500">
                    <Compass size={20} className="text-[#39B54A] group-hover:text-white transition-colors duration-500 md:w-7 md:h-7" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-sm md:text-2xl font-black mb-2 md:mb-4 text-zinc-900 dark:text-white uppercase italic tracking-tight leading-tight">
                    {m.title}
                  </h3>
                  
                  <p className="text-[10px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FACILITIES */}
      <section className="py-24 md:py-32 bg-[#fcfcfc] dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="mb-12 text-center lg:text-left">
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  {t.life_page.fac_subtitle}
                </h4>
                 <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tight mb-6">
                  {t.life_page.fac_title1} <span className="text-[#39B54A]">{t.life_page.fac_title2}</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-md mx-auto lg:mx-0">
                  {t.life_page.fac_desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-5">
                {t.life_page.facilities.map((f, i) => (
                  <div 
                    key={i} 
                    className={`p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-[#fafaf5] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 hover:border-[#39B54A]/20 hover:shadow-lg transition-all duration-500 group ${
                       i % 4 < 2 ? "col-span-1" : "col-span-2 sm:col-span-1"
                    }`}
                  >
                    <ShieldCheck className="text-[#39B54A] mb-3 md:mb-4 group-hover:scale-110 transition-transform w-[20px] h-[20px] md:w-[28px] md:h-[28px]" />
                    <h4 className="font-black italic uppercase text-[10px] md:text-sm mb-1 md:mb-2 dark:text-white tracking-wide leading-tight">
                      {f.title}
                    </h4>
                    <p className="text-[9px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-square rounded-[3rem] md:rounded-[4rem] overflow-hidden border-[8px] md:border-[12px] border-white dark:border-zinc-800 shadow-2xl rotate-3 transform-gpu">
                <img src={t.life_page.fac_main_img} className="w-full h-full object-cover" alt="Facilities" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-6 z-20 bg-[#39B54A] p-8 md:p-12 rounded-full w-28 h-28 md:w-48 md:h-48 flex flex-col items-center justify-center text-center shadow-xl border-4 md:border-8 border-white dark:border-zinc-800"
              >
                <Zap fill="white" className="text-white mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
                <span className="font-black text-[9px] md:text-sm uppercase text-white leading-tight">
                  {t.life_page.safe_badge}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section className="py-24 bg-white dark:bg-[#080808] border-t border-zinc-100 dark:border-zinc-900/50 pb-32">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
              {t.life_page.proc_subtitle}
            </h4>
            <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tight mb-6">
              {t.life_page.proc_title1} <span className="text-[#39B54A]">{t.life_page.proc_title2}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium">
              {t.life_page.proc_desc}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-12 gap-5 md:gap-8 items-start">
            <div className="col-span-2 lg:col-span-7 group relative overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white dark:border-zinc-800">
              <img src={t.life_page.process_images.theory} className="w-full aspect-[16/10] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Theory" />
              <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-black/95 px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm">
                <span className="text-[#39B54A] font-black text-xs md:text-base uppercase tracking-[0.2em]">
                  {t.life_page.theory}
                </span>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-5 group overflow-hidden rounded-[2.5rem] shadow-xl lg:-mt-12 border-4 border-white dark:border-zinc-800">
               <img src={t.life_page.process_images.discipline} className="w-full aspect-square md:aspect-[4/5] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Discipline" />
            </div>
            <div className="col-span-1 lg:col-span-4 group overflow-hidden rounded-[2.5rem] shadow-xl lg:-mt-20 border-4 border-white dark:border-zinc-800">
               <img src={t.life_page.process_images.experience} className="w-full aspect-[3/4] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Experience" />
            </div>
            <div className="col-span-2 lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white dark:border-zinc-800">
               <img src={t.life_page.process_images.creative} className="w-full aspect-[21/9] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Creative" />
               <div className="absolute top-6 right-6 bg-[#39B54A] px-6 py-2 rounded-full text-white font-black text-xs md:text-base uppercase italic shadow-lg">
                  {t.life_page.creative}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}