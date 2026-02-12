import React, { useState, useRef, useEffect, memo } from "react";
import "../index.css";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Play,
  Loader2,
  CheckCircle,
  ChevronDown,
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

// Context import (Sizning tizimingiz)
import { useLanguage } from "../context/LanguageContext";

// --- 1. YORDAMCHI FUNKSIYALAR ---
const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// --- 2. KOMPONENTLAR ---

// --- 1. HYPER-SMOOTH & SLOW MARQUEE ---
const DraggableMarquee = memo(({ items = [], baseVelocity = -0.02 }) => {
  const baseX = useMotionValue(0);
  
  // Juda yuqori damping va past stiffness silliqlikni ta'minlaydi
  const smoothX = useSpring(baseX, {
    damping: 100, 
    stiffness: 100,
    restDelta: 0.001
  });

  const x = useTransform(smoothX, (v) => `${wrap(-25, -50, v)}%`);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      // Delta vaqtiga bog'liq o'ta sekin harakat
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
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(e, info) => {
          const currentX = baseX.get();
          // Drag paytida sezgirlikni yanada yumshoq qilish
          baseX.set(currentX + info.delta.x * 0.03);
        }}
      >
        {[...Array(4)].map((_, outerIdx) => (
          <div key={outerIdx} className="flex gap-4 md:gap-12">
            {items.map((img, i) => (
              <div key={`${outerIdx}-${i}`} className="flex-shrink-0">
                <div className="w-[260px] h-[180px] md:w-[450px] md:h-[320px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white dark:border-zinc-900 shadow-2xl pointer-events-none">
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

const PremiumInfiniteSlider = ({
  items,
  baseVelocity = -0.5, 
  isText = false,
}) => {
  const baseX = useMotionValue(0);
  // MANTIQ O'ZGARDi: -25 dan -50 gacha wrap qilish sakrashni yo'qotadi
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      let moveBy = baseVelocity * (delta / 1000);
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-2 w-full cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className="flex gap-6 md:gap-16 items-center will-change-transform"
        style={{ x }} 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(e, info) => {
          const currentX = baseX.get();
          baseX.set(currentX + (info.delta.x / window.innerWidth) * 20);
        }}
      >
        {[...Array(4)].map((_, outerIdx) => (
          <React.Fragment key={outerIdx}>
            {items.map((item, i) => (
              <div key={`${outerIdx}-${i}`} className="flex-shrink-0">
                {isText ? (
                  <span className="text-3xl md:text-7xl font-black uppercase italic text-zinc-600 dark:text-zinc-900 hover:text-[#39B54A] transition-all duration-500 px-8">
                    {item}
                  </span>
                ) : (
                  <img
                    src={item}
                    draggable="false"
                    className="w-[240px] md:w-[480px] h-[160px] md:h-[320px] object-cover rounded-[2.5rem] shadow-sm pointer-events-none grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                    alt="Muhit"
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const VideoFeedbackCard = ({ feedback, isPlaying, onPlay }) => {
  return (
    <div className="flex-shrink-0 lg:shrink w-[82vw] sm:w-[45vw] lg:w-full snap-center px-2 lg:px-0 h-full">
      <div className="relative h-[450px] md:h-[520px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-black shadow-xl group">
        {!isPlaying ? (
          <>
            <img
              src={feedback.thumbnail}
              alt={feedback.name}
              className="w-full h-full object-cover opacity-50 grayscale-0 transition-all duration-700"
            />
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={onPlay}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border border-white/20 group-hover:border-[#39B54A]/50 transition-colors"
              >
                <Play
                  className="text-white fill-white group-hover:text-[#39B54A] group-hover:fill-[#39B54A] transition-all"
                  size={24}
                />
              </motion.div>
            </div>
            <div className="absolute bottom-8 left-8 text-white text-left z-10">
              <p className="font-black text-xl uppercase tracking-tighter leading-none mb-1">
                {feedback.name}
              </p>
              <p className="text-[#39B54A] font-bold text-[10px] uppercase tracking-[0.2em]">
                {feedback.role}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </>
        ) : (
          <video
            src={feedback.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

const TextFeedbackCard = ({ feedback }) => (
  <div className="flex-shrink-0 lg:shrink w-[82vw] sm:w-[45vw] lg:w-full snap-center px-2 lg:px-0 h-full">
    <div className="h-full min-h-[250px] p-7 md:p-9 rounded-[2.5rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-800 transition-all hover:border-[#39B54A]/30 flex flex-col justify-between shadow-sm">
      <p className="text-zinc-600 dark:text-zinc-400 italic text-sm md:text-base lg:text-lg mb-8 leading-relaxed">
        "{feedback.message}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#39B54A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#39B54A]/20">
          {feedback.name[0]}
        </div>
        <div className="text-left">
          <p className="font-black text-xs md:text-sm uppercase tracking-tight dark:text-white">
            {feedback.name}
          </p>
          <p className="text-[#39B54A] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
            {feedback.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
      const suffix = value.replace(/[0-9]/g, "");
      const controls = animate(0, numericValue, {
        duration: 2.5,
        onUpdate: (latest) => setDisplayValue(Math.floor(latest) + suffix),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);
  return <span ref={ref}>{displayValue}</span>;
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5 dark:border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left transition-all group"
      >
        <span className="text-base md:text-xl font-bold dark:text-white uppercase tracking-tight group-hover:text-[#39B54A] transition-colors">
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#39B54A] flex items-center justify-center transition-all duration-500 ${
            isOpen
              ? "bg-[#39B54A] text-white rotate-180"
              : "text-[#39B54A] bg-transparent"
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="pb-8 text-zinc-600 dark:text-zinc-400 font-medium text-sm md:text-base leading-relaxed max-w-4xl italic">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ASOSIY HOME KOMPONENTI ---

export default function Home() {
  const { t } = useLanguage(); 
  const consultRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (!input.startsWith("998")) input = "998" + input;
    if (input.length > 12) input = input.substring(0, 12);
    let formatted = "+998";
    if (input.length > 3) formatted += " (" + input.substring(3, 5);
    if (input.length > 5) formatted += ") " + input.substring(5, 8);
    if (input.length > 8) formatted += "-" + input.substring(8, 10);
    if (input.length > 10) formatted += "-" + input.substring(10, 12);
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length < 19) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting.");
      return;
    }
    setStatus("loading");
    const botToken = "7893849239:AAEalenahp_ar51YDUBYu5Fr6SazLgGu7dI";
    const chatIds = ["8389397224", "894403107"]; // Multiple chat IDs
    const message = `🎯 <b>Yangi ariza!</b>\n\n👤 <b>Ism:</b> ${name}\n📞 <b>Telefon:</b> ${phone}`;
    try {
      // Send message to all chat IDs
      const promises = chatIds.map(chatId =>
        fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
            }),
          },
        )
      );
      
      const responses = await Promise.all(promises);
      
      // Check if at least one message was sent successfully
      if (responses.some(response => response.ok)) {
        setStatus("success");
        setName("");
        setPhone("+998");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("idle");
      }
    } catch (error) {
      setStatus("idle");
    }
  };

  if (!t.home_page) return null;

  return (
    <div className="w-full bg-white dark:bg-[#050505] font-sans overflow-x-hidden transition-colors duration-500">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={t.home_page.hero_bg} 
            alt="School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-3 tracking-[0.4em] font-bold text-[10px] md:text-xs text-[#39B54A] uppercase"
          >
            <span className="w-8 h-[1px] bg-[#39B54A] block"></span>
            {t.home_page.hero_label}
            <span className="w-8 h-[1px] bg-[#39B54A] block"></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl sm:text-8xl md:text-[130px] font-[900] leading-[0.85] tracking-[-0.05em] uppercase">
              <span className="text-white">{t.home_page.hero_title1}</span>
              <br />
              <span className="text-[#39B54A]">{t.home_page.hero_title2}</span>
            </h1>

            <div className="mt-8 md:mt-10 max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-gray-300 leading-relaxed">
                {t.home_page.hero_desc.split("—")[0]} —
                <span className="text-white font-medium italic">
                  {" "}
                  {t.home_page.hero_desc.split("—")[1]?.split("shu")[0]}{" "}
                </span>
                {t.home_page.hero_desc.split("yetakchilari")[1]}
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center w-full mt-12 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                onClick={() =>
                  consultRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0px 0px 20px rgba(57, 181, 74, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-10 py-4 md:px-14 md:py-5 rounded-full border border-[#39B54A] bg-transparent transition-all duration-300 cursor-pointer"
              >
                <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white transition-colors group-hover:text-[#39B54A]">
                  {t.home_page.hero_cta}
                </span>
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[#39B54A] flex items-center justify-center"
                >
                  <ArrowRight size={22} strokeWidth={2.5} />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ADVANTAGES SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <div>
              <h2 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                {t.home_page.adv_subtitle}
              </h2>
              <p className="text-2xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter">
                {t.home_page.adv_title}
              </p>
            </div>
            <p className="max-w-xs text-zinc-500 dark:text-zinc-400 border-l-2 border-[#39B54A] pl-5 italic font-medium text-[11px] md:text-base leading-relaxed text-left">
              {t.home_page.adv_desc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {t.home_page.advantages.map((adv, idx) => (
              <div
                key={idx}
                className={`p-5 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-transparent hover:border-[#39B54A]/30 transition-all group text-left flex flex-col justify-between ${idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"}`}
              >
                <div>
                  <span className="text-3xl md:text-6xl font-black italic opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-[#39B54A]">
                    {adv.id}
                  </span>
                  <h3 className="text-sm md:text-2xl font-bold mt-4 md:mt-8 mb-2 md:mb-4 dark:text-white leading-tight uppercase italic tracking-tight">
                    {adv.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[10px] md:text-lg italic leading-snug">
                    {adv.desc}
                  </p>
                </div>
                <div className="w-6 h-1 bg-[#39B54A] mt-4 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] border-y border-zinc-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12 md:mb-24">
            <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
              {t.home_page.stats_subtitle}
            </h4>
            <h2 className="text-2xl md:text-6xl font-black dark:text-white tracking-tighter uppercase leading-none">
              {t.home_page.stats_title1}{" "}
              <span className="text-[#39B54A]">{t.home_page.stats_title2}</span>
            </h2>
            <div className="w-16 h-1 bg-[#39B54A] mx-auto mt-6 opacity-20"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-10">
            {t.home_page.stats.map((s, i) => (
              <div
                key={i}
                className={`group text-center flex flex-col items-center ${i === 2 ? "col-span-2 md:col-span-1" : "col-span-1"}`}
              >
                <h4 className="text-[9px] md:text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-widest">
                  {s.label}
                </h4>
                <div className="text-4xl md:text-7xl font-black text-black dark:text-white mb-2 group-hover:text-[#39B54A] transition-colors duration-500">
                  <Counter value={s.value} />
                </div>
                <div className="w-6 h-0.5 bg-[#39B54A] opacity-20 group-hover:w-12 group-hover:opacity-100 transition-all duration-500 mb-3"></div>
                <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 italic px-2 max-w-[180px] leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors">
        <div className="w-full text-left">
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none shrink-0">
                {t.home_page.life_title1}{" "}
                <span className="text-[#39B54A]">
                  {t.home_page.life_title2}
                </span>
              </h2>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  {t.home_page.life_desc}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-8">
            <DraggableMarquee
              baseVelocity={-0.005}
              items={t.life_page.galleryRow1}
            />
            <DraggableMarquee
              baseVelocity={0.005}
              items={t.life_page.galleryRow2}
            />
          </div>
        </div>
      </section>

      {/* 5. FEEDBACK SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors">
        <div className="w-full text-left">
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <div>
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  {t.home_page.feed_subtitle}
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                  {t.home_page.feed_title1}{" "}
                  <span className="text-[#39B54A]">
                    {t.home_page.feed_title2}
                  </span>
                </h2>
              </div>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  {t.home_page.feed_desc}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto lg:px-6">
            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar px-4 lg:px-0 pb-8 md:pb-12 gap-4 md:gap-8">
              {t.home_page.studentFeedbacks.map((f, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 lg:shrink w-[85vw] sm:w-[45vw] lg:w-auto"
                >
                  <VideoFeedbackCard 
                    feedback={f}
                    isPlaying={playingVideoIndex === i}
                    onPlay={() => setPlayingVideoIndex(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto lg:px-6">
            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar px-4 lg:px-0 gap-4 md:gap-8">
              {t.home_page.textFeedbacks.map((tf, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 lg:shrink w-[85vw] sm:w-[45vw] lg:w-auto"
                >
                  <TextFeedbackCard feedback={tf} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITIES SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors border-y border-zinc-50 dark:border-zinc-900">
        <div className="w-full text-left">
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <div>
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  {t.home_page.uni_subtitle}
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                  {t.home_page.uni_title1} <br className="hidden md:block" />
                  <span className="text-[#39B54A]">
                    {t.home_page.uni_title2}
                  </span>
                </h2>
              </div>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  {t.home_page.uni_desc}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-12">
            <PremiumInfiniteSlider
              items={t.home_page.universities}
              baseVelocity={-0.3}
              isText={true}
            />
            <PremiumInfiniteSlider
              items={[...t.home_page.universities].reverse()}
              baseVelocity={0.3}
              isText={true}
            />
          </div>
        </div>
      </section>

      {/* 7. KONSULTATSIYA SECTION */}
      <section
        ref={consultRef}
        className="py-16 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-start text-left"
      >
        <div className="bg-[#e2dfdf] dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden border border-transparent dark:border-zinc-800 shadow-sm h-full">
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 bg-[#39B54A] flex flex-col items-center justify-center text-white text-center p-6"
              >
                <CheckCircle size={60} className="mb-4" />
                <h3 className="text-2xl font-black uppercase italic tracking-tight">
                  {t.home_page.form_success_title}
                </h3>
                <p className="text-sm mt-2 opacity-90 text-center">
                  {t.home_page.form_success_desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase leading-[0.9] mb-8 tracking-tighter">
            {t.home_page.form_title1} <span className="text-[#39B54A]">{t.home_page.form_title2}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">
                {t.home_page.form_name_label}
              </label>
              <input
                required
                type="text"
                placeholder={t.home_page.form_name_placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] outline-none transition-all font-bold text-sm shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">
                {t.home_page.form_phone_label}
              </label>
              <input
                required
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 (__) ___-__-__"
                className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] outline-none transition-all font-bold text-sm shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 md:py-5 bg-black dark:bg-[#39B54A] text-white font-black uppercase rounded-2xl text-xs md:text-sm tracking-[0.2em] transition-all flex justify-center items-center gap-2 mt-4"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <>
                  {t.home_page.form_submit} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* XARITA QISMI */}
        <div className="h-[400px] md:h-[580px] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative w-full group/map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s"
            className="w-full h-full dark:invert transition-all grayscale-0 duration-1000"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-5 md:p-7 rounded-[2rem] flex items-center gap-4 md:gap-6 shadow-2xl text-left">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#39B54A] rounded-full flex items-center justify-center text-white shrink-0">
              <MapPin size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="text-xs md:text-sm font-black dark:text-white uppercase leading-none tracking-tight">
                {t.home_page.map_branch}
              </h3>
              <p className="text-[10px] md:text-[11px] text-zinc-500 font-bold uppercase mt-1 tracking-wider text-left">
                {t.home_page.map_address}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Istiqbol+luck+xususiy+maktabi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[9px] md:text-[10px] font-black text-[#39B54A] uppercase tracking-widest hover:text-black dark:hover:text-white transition-all"
              >
                <span>{t.home_page.map_find}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors text-left">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div>
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                {t.home_page.faq_subtitle}
              </h4>
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                {t.home_page.faq_title1} <br className="hidden md:block" />
                <span className="dark:text-white">{t.home_page.faq_title2}</span>
              </h2>
            </div>
            <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
              <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                {t.home_page.faq_desc}
              </p>
            </div>
          </div>
          <div className="bg-[#e2dfdf] dark:bg-[#0c0c0c] rounded-[2.5rem] p-6 md:p-12 border border-transparent dark:border-zinc-800 shadow-sm">
            {t.home_page.faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}