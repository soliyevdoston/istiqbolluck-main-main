import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  director,
  administration,
  teachers,
  categories,
} from "../data/teamData.js";
import {
  X,
  GraduationCap,
  Briefcase,
  Plus,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

// --- 1. REUSABLE SECTION TITLE ---
const SectionTitle = ({ subtitle, title, desc }) => (
  <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-left">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
      <div className="shrink-0 text-left">
        <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
          {subtitle}
        </h4>
        <h2 className="text-3xl md:text-6xl font-[900] dark:text-white uppercase tracking-tighter leading-none italic">
          {title}
        </h2>
      </div>
      <div className="flex items-stretch gap-4 md:gap-6 max-w-md text-left">
        <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
        <p className="text-zinc-400 dark:text-zinc-500 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default function Team() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFullAdmin, setShowFullAdmin] = useState(false);
  const [showFullTeachers, setShowFullTeachers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredTeachers =
    activeTab === "all"
      ? teachers
      : teachers.filter((t) => t.category === activeTab);

  const teacherLimit = isMobile ? 6 : 8;

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      {/* --- 1. PREMIUM HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#080808] px-6 overflow-hidden">
        {/* Orqa fon sarlavhasi (Faded Title) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.07] select-none">
          <h1 className="text-[25vw] font-black leading-none">TEAM</h1>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center z-10">
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-[#39B54A]/10 text-[#39B54A] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Professionalizm va Tajriba
              </span>
              <h1 className="text-6xl md:text-9xl font-[900] dark:text-white tracking-tighter uppercase leading-[0.8] italic mb-10">
                BIZNING <br /> <span className="text-[#39B54A]">JAMOA</span>
              </h1>
              <div className="max-w-md border-l-4 border-black dark:border-white pl-6">
                <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium italic">
                  "{director.quote}"
                </p>
                <div className="mt-4">
                  <p className="text-sm font-black dark:text-white uppercase">
                    {director.name}
                  </p>
                  <p className="text-[10px] font-bold text-[#39B54A] uppercase tracking-widest">
                    School Founder | {director.experience} Yil Tajriba
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-[450px] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white dark:border-zinc-900">
              <img
                src={director.img}
                className="w-full h-full object-cover"
                alt="Director"
              />
              <button
                onClick={() => setSelected(director)}
                className="absolute bottom-6 right-6 bg-[#39B54A] text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all"
              >
                Batafsil
              </button>
            </div>
            {/* Dekorativ aylana */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-[#39B54A]/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. RAHBARIYAT --- */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Management"
          title="Rahbariyat"
          desc="Tizimli boshqaruv va sifat nazorati bo'yicha professional jamoa."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {(showFullAdmin ? administration : administration.slice(0, 4)).map(
            (p) => (
              <TeamMemberCard key={p.id} person={p} onClick={setSelected} />
            ),
          )}
        </div>
        {administration.length > 4 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowFullAdmin(!showFullAdmin)}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#39B54A] border-b-2 border-[#39B54A] pb-1 hover:gap-6 transition-all"
            >
              {showFullAdmin ? (
                <>
                  Yashirish <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Barchasi <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* --- 3. O'QITUVCHILAR (FILTR + GRID) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t dark:border-zinc-900">
        <SectionTitle
          subtitle="Teachers"
          title={
            <>
              Pedagogik <span className="text-[#39B54A]">Jamoa</span>
            </>
          }
          desc="O'z fanining ustasi bo'lgan oliy toifali mutaxassislarimiz."
        />

        <div className="flex flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowFullTeachers(false);
              }}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat.id ? "bg-[#39B54A] text-white" : "bg-[#e2dfdf] dark:bg-zinc-900 text-zinc-500"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {(showFullTeachers
            ? filteredTeachers
            : filteredTeachers.slice(0, teacherLimit)
          ).map((p, idx) => (
            <div
              key={p.id}
              className={
                activeTab !== "all" && idx === 0
                  ? "col-span-2 md:col-span-2 md:row-span-2"
                  : "col-span-1"
              }
            >
              <TeamMemberCard
                person={p}
                onClick={setSelected}
                isLead={activeTab !== "all" && idx === 0}
              />
            </div>
          ))}
        </div>

        {filteredTeachers.length > teacherLimit && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowFullTeachers(!showFullTeachers)}
              className="bg-black dark:bg-[#39B54A] text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
            >
              {showFullTeachers ? "Yashirish" : "Barchasini ko'rish"}
            </button>
          </div>
        )}
      </section>

      {/* --- PREMIUM MODAL (NO SCROLL, COMPACT INFO) --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-white/10 dark:bg-black/10"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:rotate-90 transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Modal Rasm (3:4 Ratio) */}
                <div className="md:w-2/5 bg-[#f0f0f0] dark:bg-zinc-900 p-8 flex items-center justify-center">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                    <img
                      src={selected.img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>

                {/* Modal Ma'lumot (Hamma narsa bir ekranda) */}
                <div className="md:w-3/5 p-8 md:p-12 text-left flex flex-col justify-center">
                  <span className="text-[#39B54A] font-black uppercase text-[10px] tracking-[0.4em] mb-2 block italic">
                    {selected.role || selected.subject}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-6 italic leading-none">
                    {selected.name}
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-2xl">
                      <Briefcase className="text-[#39B54A]" size={20} />
                      <p className="text-sm font-bold dark:text-white">
                        Ish tajribasi: {selected.experience} Yil
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-2xl">
                      <GraduationCap className="text-[#39B54A]" size={20} />
                      <p className="text-sm font-bold dark:text-white line-clamp-1">
                        {selected.education}
                      </p>
                    </div>
                  </div>

                  {selected.id === director.id && selected.achievements && (
                    <div className="mb-6">
                      <h4 className="text-[#39B54A] font-black text-[10px] uppercase mb-3 flex items-center gap-2">
                        <Award size={14} /> Yutuqlar
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.achievements.map((a, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold bg-[#39B54A]/5 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full border border-[#39B54A]/10"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-zinc-500 italic text-sm md:text-base leading-relaxed border-t dark:border-zinc-800 pt-6">
                    "{selected.bio}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- CARD KOMPONENTI ---
const TeamMemberCard = ({ person, onClick, isLead = false }) => (
  <motion.div
    layout
    onClick={() => onClick(person)}
    className="group cursor-pointer flex flex-col w-full h-full relative"
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] dark:bg-zinc-900 border border-transparent group-hover:border-[#39B54A]/40 transition-all duration-500 shadow-sm">
      <img
        src={person.img}
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
        alt={person.name}
      />

      {/* "Batafsil" Yozuvi (O'ng pastda) */}
      <div className="absolute bottom-0 right-0 bg-[#39B54A] text-white px-4 py-2 rounded-tl-2xl font-black text-[10px] uppercase tracking-widest bottom-2 opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        Batafsil
      </div>

      {/* Kattalashgan Lead Overlay */}
      {isLead && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
          <p className="text-white font-black text-2xl uppercase italic">
            {person.name}
          </p>
          <p className="text-[#39B54A] font-bold text-[10px] uppercase tracking-widest mt-2">
            {person.role || person.subject}
          </p>
        </div>
      )}
    </div>

    {!isLead && (
      <div className="mt-4 px-1 text-left">
        <h4 className="text-sm md:text-lg font-black dark:text-white uppercase tracking-tight italic group-hover:text-[#39B54A] transition-colors">
          {person.name}
        </h4>
        <p className="text-zinc-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-1">
          {person.role || person.subject}
        </p>
      </div>
    )}
  </motion.div>
);
