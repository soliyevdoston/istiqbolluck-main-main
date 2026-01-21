import React, { useState, useRef, useEffect } from "react";
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

// --- 1. YORDAMCHI FUNKSIYALAR ---
const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// --- 2. MA'LUMOTLAR ---
const faqs = [
  {
    question: "Maktabga qabul jarayoni qanday amalga oshiriladi?",
    answer:
      "Qabul jarayoni o'quvchi bilan suhbat va aniq fanlardan (matematika, mantiq) test sinovi asosida amalga oshiriladi.",
  },
  {
    question: "O'quv kun tartibi qanday?",
    answer: "Darslar soat 08:30 da boshlanadi va 16:30 gacha davom etadi.",
  },
  {
    question: "O'quvchilar ovqat bilan ta'minlanadimi?",
    answer: "Ha, maktabimizda 3 mahal issiq ovqat tashkil etilgan.",
  },
  {
    question: "Bitiruvchilarga qanday hujjat beriladi?",
    answer:
      "Bitiruvchilarga davlat namunasidagi shahodatnoma (attestat) beriladi.",
  },
];

const advantages = [
  {
    id: "01",
    title: "Hayotiy ko‘nikmalar",
    desc: "O‘z fikrini erkin ifodalash va jamoada ishlash ko‘nikmalari rivojlanadi.",
    color: "#E43E1C",
  },
  {
    id: "02",
    title: "Kuchli ta’lim tizimi",
    desc: "Eng samarali xorijiy ta’lim tajribalari asosida tuzilgan dasturlar.",
    color: "#2E3192",
  },
  {
    id: "03",
    title: "Har bir o‘quvchiga alohida e’tibor",
    desc: "O‘quvchi qaysi darajada bo‘lishidan qat’i nazar, unga mos yondashuv qo‘llaniladi.",
    color: "#39B54A",
  },
];

const stats = [
  {
    label: "O'quvchilar",
    value: "1200+",
    desc: "Bilimga chanqoq yoshlar bir oiladek jamlangan.",
  },
  {
    label: "Bitiruvchilar",
    value: "850+",
    desc: "Nufuzli oliygohlar va hayot yo'lida o'z o'rnini topganlar.",
  },
  {
    label: "O'qishga kirish",
    value: "98%",
    desc: "Bitiruvchilarimizning davlat va xalqaro OTMlardagi ulushi.",
  },
];

const studentFeedbacks = [
  {
    id: 1,
    name: "Lola Abdullayeva",
    role: "11-sinf bitiruvchisi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  },
  {
    id: 2,
    name: "Asadbek Orifov",
    role: "10-sinf o'quvchisi",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
  },
  {
    id: 3,
    name: "Jasur Mirzayev",
    role: "9-sinf o'quvchisi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
  },
];

const textFeedbacks = [
  {
    id: 1,
    name: "Zuhra Karimova",
    role: "9-sinf",
    message:
      "Maktabdagi muhit menga juda yoqadi, ayniqsa mentorlar bilan ishlash tizimi juda foydali.",
  },
  {
    id: 2,
    name: "Bekzod Rahmonov",
    role: "10-sinf",
    message:
      "Xalqaro olimpiadalarga tayyorgarlik ko'rish uchun bu yerdan yaxshiroq joy yo'q.",
  },
  {
    id: 3,
    name: "Omina Ergasheva",
    role: "8-sinf",
    message: "Darslar faqat nazariya emas, amaliyotda ham juda ko'p ishlaymiz.",
  },
];

const universities = [
  "WIUT",
  "INHA",
  "TTPU",
  "AMITY",
  "MDIST",
  "AKFA",
  "WEBSTER",
  "HARVARD",
  "STANFORD",
  "MIT",
];

// --- 3. KOMPONENTLAR ---

const DraggableMarquee = ({ items, baseVelocity = -0.4 }) => {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      let moveBy = baseVelocity * (delta / 1000) * 2;
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-4 w-full cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex gap-4 md:gap-8"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(event, info) => {
          const currentX = baseX.get();
          const deltaInUnits = (info.delta.x / window.innerWidth) * 50;
          baseX.set(currentX + deltaInUnits);
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            <img
              src={item}
              alt="Gallery"
              draggable="false"
              className="h-[200px] md:h-[300px] w-[280px] md:w-[450px] object-cover rounded-[2rem] pointer-events-none shadow-lg select-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
const PremiumInfiniteSlider = ({
  items,
  baseVelocity = -0.05,
  isText = false,
}) => {
  const baseX = useMotionValue(0);

  // Spring parametrlarini yanada yumshoqroq qildik
  const smoothX = useSpring(baseX, {
    damping: 2000, // Qarshilikni oshirdik, harakat og'irroq va silliq bo'ladi
    stiffness: 200,
    restDelta: 0.001,
  });

  const x = useTransform(smoothX, (v) => `${wrap(-20, -45, v)}%`);

  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      // Delta / 200 - bu harakatni maksimal darajada sekinlashtiradi
      let moveBy = baseVelocity * (delta / 200);
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
          // Qo'lda surish sezuvchanligi
          baseX.set(currentX + (info.delta.x / window.innerWidth) * 30);
        }}
      >
        {[...Array(6)].map((_, outerIdx) => (
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
const VideoFeedbackCard = ({ feedback }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    /* 
       Mobile: w-[82vw] (yonga surish uchun), snap-center
       Desktop: lg:w-full (grid ustunini to'liq egallash uchun), lg:shrink (qisilishga ruxsat)
    */
    <div className="flex-shrink-0 lg:shrink w-[82vw] sm:w-[45vw] lg:w-full snap-center px-2 lg:px-0 h-full">
      <div className="relative h-[450px] md:h-[520px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-black shadow-xl group">
        {!isPlaying ? (
          <>
            {/* Rasm - Minimalist ko'rinish uchun biroz grayscale */}
            <img
              src={feedback.thumbnail}
              alt={feedback.name}
              className="w-full h-full object-cover opacity-50 grayscale-0 transition-all duration-700"
            />

            {/* Play Button - Minimalist Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:border-[#39B54A]/50 transition-colors"
              >
                <Play
                  className="text-white fill-white group-hover:text-[#39B54A] group-hover:fill-[#39B54A] transition-all"
                  size={24}
                />
              </motion.div>
            </div>

            {/* Pastki ma'lumotlar */}
            <div className="absolute bottom-8 left-8 text-white text-left z-10">
              <p className="font-black text-xl uppercase tracking-tighter leading-none mb-1">
                {feedback.name}
              </p>
              <p className="text-[#39B54A] font-bold text-[10px] uppercase tracking-[0.2em]">
                {feedback.role}
              </p>
            </div>

            {/* Matn yaxshi o'qilishi uchun pastdan tepaga qora gradient */}
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
  /* 
     Mobile: w-[82vw] (yonga surish uchun qulay o'lcham)
     Desktop: lg:w-full (Grid ustunini to'liq egallaydi)
  */
  <div className="flex-shrink-0 lg:shrink w-[82vw] sm:w-[45vw] lg:w-full snap-center px-2 lg:px-0 h-full">
    <div className="h-full min-h-[250px] p-7 md:p-9 rounded-[2.5rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-800 transition-all hover:border-[#39B54A]/30 flex flex-col justify-between shadow-sm">
      {/* Feedback xabari */}
      <p className="text-zinc-600 dark:text-zinc-400 italic text-sm md:text-base lg:text-lg mb-8 leading-relaxed">
        "{feedback.message}"
      </p>

      {/* Foydalanuvchi ma'lumotlari */}
      <div className="flex items-center gap-4">
        {/* Ismning birinchi harfi yashil doira ichida */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#39B54A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#39B54A]/20">
          {feedback.name[0]}
        </div>

        <div>
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

// --- 4. ASOSIY HOME KOMPONENTI ---

export default function Home() {
  const consultRef = useRef(null);

  // 1. State'larni e'lon qilamiz
  const [status, setStatus] = useState("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");

  // 2. Telefon raqami uchun maska (shablon) funksiyasi
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qoldirish
    if (!input.startsWith("998")) input = "998" + input;
    if (input.length > 12) input = input.substring(0, 12); // Maksimal 12 raqam

    let formatted = "+998";
    if (input.length > 3) formatted += " (" + input.substring(3, 5);
    if (input.length > 5) formatted += ") " + input.substring(5, 8);
    if (input.length > 8) formatted += "-" + input.substring(8, 10);
    if (input.length > 10) formatted += "-" + input.substring(10, 12);

    setPhone(formatted);
  };

  // 3. Haqiqiy yuborish funksiyasi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Raqam to'liq yozilganini tekshirish (+998 (99) 999-99-99 jami 19 belgi)
    if (phone.length < 19) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting.");
      return;
    }

    setStatus("loading");

    const botToken = "7893849239:AAEalenahp_ar51YDUBYu5Fr6SazLgGu7dI";
    const chatId = "8389397224";
    const message = `🎯 <b>Yangi ariza!</b>\n\n👤 <b>Ism:</b> ${name}\n📞 <b>Telefon:</b> ${phone}`;

    try {
      const response = await fetch(
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
      );

      if (response.ok) {
        setStatus("success");
        setName(""); // Ismni tozalash
        setPhone("+998"); // Telefonni qayta tiklash

        // 4 soniyadan keyin muvaffaqiyat oynasini yopish va formani ochish
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        const errData = await response.json();
        alert("Xatolik: " + errData.description);
        setStatus("idle");
      }
    } catch (error) {
      alert("Internet ulanishini tekshiring.");
      setStatus("idle");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#050505] font-sans overflow-x-hidden transition-colors duration-500">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
        {/* BACKGROUND IMAGE & OVERLAY */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.gazeta.uz/media/img/2022/09/HE29hc16640465414375_l.jpg"
            alt="School"
            className="w-full h-full object-cover  "
          />
          {/* Minimalist gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-white">
          {/* TOP LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center justify-center gap-3 tracking-[0.4em] font-bold text-[10px] md:text-xs text-[#39B54A] uppercase"
          >
            <span className="w-8 h-[1px] bg-[#39B54A] block"></span>
            Kelajak yetakchilari akademiyasi
            <span className="w-8 h-[1px] bg-[#39B54A] block"></span>
          </motion.div>

          {/* MAIN TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* ASOSIY SARLAVHA - Ultra Bold & Tight Tracking */}
            <h1 className="text-6xl sm:text-8xl md:text-[130px] font-[900] leading-[0.85] tracking-[-0.05em] uppercase">
              <span className="text-white">ISTIQBOL</span>
              <br />
              <span className="text-[#39B54A]">LUCK</span>
            </h1>

            {/* YORDAMCHI MATN - Minimalist & Elegant */}
            <div className="mt-8 md:mt-10 max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-gray-300 leading-relaxed">
                Istiqbol Luck —
                <span className="text-white font-medium italic">
                  {" "}
                  kelajak yetakchilari{" "}
                </span>
                shu yerda
                <span className="relative inline-block ml-2 text-white font-semibold">
                  kamol topadi.
                  {/* Matn tagidagi minimalist yashil chiziq */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#39B54A]"
                  ></motion.span>
                </span>
              </p>
            </div>
          </motion.div>

          {/* CTA BUTTON */}
          <div className="flex justify-center w-full mt-12 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                onClick={() =>
                  consultRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                // HOVER va ACTIVE effektlari
                whileHover={{
                  scale: 1.08, // Sal kattalashadi
                  boxShadow: "0px 0px 20px rgba(57, 181, 74, 0.2)", // Mayin yashil nur
                }}
                whileTap={{ scale: 0.95 }} // Bosilganda kichrayadi (Active)
                className="group flex items-center justify-center gap-3 px-10 py-4 md:px-14 md:py-5 rounded-full border border-[#39B54A] bg-transparent transition-all duration-300 cursor-pointer"
              >
                <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white transition-colors group-hover:text-[#39B54A]">
                  Bog'lanish
                </span>

                {/* DOIMIY QIMIRLAB TURUVCHI STRELKA */}
                <motion.div
                  animate={{ x: [0, 6, 0] }} // O'ngga-chapga harakat
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

        {/* SCROLL INDICATOR (Minimalism uchun qo'shimcha) */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 "
        >
          <span className="text-[10px] uppercase tracking-widest text-white">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#39B54A] to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. ADVANTAGES SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* --- SARLAVHA QISMI --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 text-left">
            <div>
              <h2 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                Nega aynan biz?
              </h2>
              <p className="text-2xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter">
                Afzalliklarimiz
              </p>
            </div>
            <p className="max-w-xs text-zinc-500 dark:text-zinc-400 border-l-2 border-[#39B54A] pl-5 italic font-medium text-[11px] md:text-base leading-relaxed">
              Har bir bolaning yashirin qobiliyatlarini yuzaga chiqaramiz.
            </p>
          </div>

          {/* --- CARDS GRID --- */}
          {/* grid-cols-2 -> mobileda 2 ta ustun | md:grid-cols-3 -> desktopda 3 ta ustun */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {advantages.map((adv, idx) => (
              <div
                key={adv.id}
                className={`
            p-5 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] 
            border border-transparent hover:border-[#39B54A]/30 transition-all group text-left
            flex flex-col justify-between
            ${
              /* Mobileda 3-kartani 2 ta ustun joyini egallashga majburlaymiz */
              idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
            }
          `}
              >
                <div>
                  <span
                    className="text-3xl md:text-6xl font-black italic opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: "#39B54A" }} // Faqat yashil rang ishlatiladi
                  >
                    {adv.id}
                  </span>
                  <h3 className="text-sm md:text-2xl font-bold mt-4 md:mt-8 mb-2 md:mb-4 dark:text-white leading-tight uppercase italic tracking-tight">
                    {adv.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[10px] md:text-lg italic leading-snug">
                    {adv.desc}
                  </p>
                </div>

                {/* Pastki dekorativ chiziq */}
                <div className="w-6 h-1 bg-[#39B54A] mt-4 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] border-y border-zinc-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* --- SARLAVHA --- */}
          <div className="mb-12 md:mb-24">
            <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
              Muvaffaqiyat ko'zgusi
            </h4>
            <h2 className="text-2xl md:text-6xl font-black dark:text-white tracking-tighter uppercase leading-none">
              ISHONCH <span className="text-[#39B54A]">RAQAMLARDA</span>
            </h2>
            <div className="w-16 h-1 bg-[#39B54A] mx-auto mt-6 opacity-20"></div>
          </div>

          {/* --- STATS GRID --- */}
          {/* Mobileda grid-cols-2, desktopda md:grid-cols-3 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`
            group text-center flex flex-col items-center
            ${
              /* Mobileda 3-elementni 2 ta ustunni egallashga majbur qilamiz (markazlashadi) */
              i === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
            }
          `}
              >
                <h4 className="text-[9px] md:text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-widest">
                  {s.label}
                </h4>

                {/* Raqamlar o'lchami mobileda text-4xl, desktopda text-7xl */}
                <div className="text-4xl md:text-7xl font-black text-black dark:text-white mb-2 group-hover:text-[#39B54A] transition-colors duration-500">
                  <Counter value={s.value} />
                </div>

                {/* Minimalist dekorativ chiziq */}
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
        <div className="w-full">
          {/* --- SARLAVHA VA TAVSIF QISMI --- */}
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              {/* Sarlavha (Chapda) */}
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter shrink-0">
                MAKTAB <span className="text-[#39B54A]">HAYOTI</span>
              </h2>

              {/* Tavsif bloki (O'ngda, Vertikal chiziq bilan) */}
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                {/* VERTIKAL CHIZIQ */}
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>

                {/* MATN */}
                <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  Har bir kunimiz quvonch va yangi bilimlar bilan boyitilgan.
                  Bizning o'quvchilar hayotidan eng yorqin lavhalar to'plami.
                </p>
              </div>
            </div>
          </div>

          {/* --- GALEREYA (MARQUEE) --- */}
          <div className="space-y-4 md:space-y-8">
            {/* 1-qator: Chapga */}
            <DraggableMarquee
              baseVelocity={-1} // Tezlikni yanada sekinlashtirdim (minimalizm uchun)
              items={[
                "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
              ]}
            />

            {/* 2-qator: O'ngga */}
            <DraggableMarquee
              baseVelocity={1}
              items={[
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800",
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
                "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. FEEDBACK SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors">
        <div className="w-full">
          {/* --- SARLAVHA VA TAVSIF QISMI --- */}
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <div className="text-left">
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  Samimiy fikrlar
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter shrink-0 leading-none">
                  O'QUVCHILAR <span className="text-[#39B54A]">OVOZI</span>
                </h2>
              </div>

              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  Bizning eng katta yutug'imiz — o'quvchilarimizning
                  muvaffaqiyati va ularning maktab haqidagi samimiy fikrlari.
                </p>
              </div>
            </div>
          </div>

          {/* --- VIDEO FEEDBACKLAR --- */}
          {/* lg:grid va lg:grid-cols-3 orqali desktopda 3 talik setka qilamiz */}
          <div className="max-w-7xl mx-auto lg:px-6">
            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar px-4 lg:px-0 pb-8 md:pb-12 gap-4 md:gap-8">
              {studentFeedbacks.map((f) => (
                <div
                  key={f.id}
                  className="snap-center shrink-0 lg:shrink w-[85vw] sm:w-[45vw] lg:w-auto"
                >
                  <VideoFeedbackCard feedback={f} />
                </div>
              ))}
            </div>
          </div>

          {/* --- MATNLI FEEDBACKLAR --- */}
          <div className="max-w-7xl mx-auto lg:px-6">
            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar px-4 lg:px-0 gap-4 md:gap-8">
              {textFeedbacks.map((tf) => (
                <div
                  key={tf.id}
                  className="snap-center shrink-0 lg:shrink w-[85vw] sm:w-[45vw] lg:w-auto"
                >
                  <TextFeedbackCard feedback={tf} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITIES SECTION (2 Qatorli Marquee) */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors border-y border-zinc-50 dark:border-zinc-900">
        <div className="w-full">
          {/* --- SARLAVHA QISMI (Editorial Style) --- */}
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <div className="text-left">
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  Muvaffaqiyat yo'li
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter shrink-0 leading-none">
                  BITIRUVCHILARIMIZ <br className="hidden md:block" />
                  <span className="text-[#39B54A]">OLIYGOHLARDA</span>
                </h2>
              </div>

              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  Bizning bitiruvchilarimiz dunyoning va mamlakatimizning eng
                  nufuzli akademik dargohlarida ta'limni davom ettirmoqdalar.
                </p>
              </div>
            </div>
          </div>

          {/* --- UZILIKSIZ AYLANUVCHI MATNLAR --- */}
          <div className="flex flex-col gap-6 md:gap-12">
            {/* 1-qator: Chapga sekin aylanadi */}
            <PremiumInfiniteSlider
              items={universities}
              baseVelocity={-0.2}
              isText={true}
            />

            {/* 2-qator: O'ngga sekin aylanadi */}
            <PremiumInfiniteSlider
              items={[...universities].reverse()}
              baseVelocity={0.2}
              isText={true}
            />
          </div>
        </div>
      </section>

      {/* 7. KONSULTATSIYA SECTION */}
      <section
        ref={consultRef}
        className="py-16 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-start"
      >
        {/* --- FORMA QISMI --- */}
        <div className="bg-[#e2dfdf] dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden border border-transparent dark:border-zinc-800 shadow-sm text-left h-full">
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 bg-[#39B54A] flex flex-col items-center justify-center text-white text-center p-6"
              >
                <CheckCircle size={60} className="mb-4" />
                <h3 className="text-2xl font-black uppercase italic tracking-tight">
                  Murojaat qabul qilindi!
                </h3>
                <p className="text-sm mt-2 opacity-90">
                  Tez orada siz bilan bog'lanamiz.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase leading-[0.9] mb-8 tracking-tighter">
            QO'SHILISH VAQTI <span>KELDI.</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Ism inputi */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">
                Ismingiz
              </label>
              <input
                required
                type="text"
                placeholder="Masalan: Ali Valiev"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] outline-none transition-all font-bold text-sm shadow-sm hover:border-zinc-200 dark:hover:border-zinc-800"
              />
            </div>

            {/* Telefon inputi */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">
                Telefon raqamingiz
              </label>
              <input
                required
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 (__) ___-__-__"
                className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] outline-none transition-all font-bold text-sm shadow-sm hover:border-zinc-200 dark:hover:border-zinc-800"
              />
            </div>

            {/* Tugma (Eslatma sifatida) */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 md:py-5 bg-black dark:bg-[#39B54A] text-white font-black uppercase rounded-2xl text-xs md:text-sm tracking-[0.2em] hover:bg-[#39B54A] dark:hover:bg-white dark:hover:text-black transition-all shadow-lg active:scale-[0.98] flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <>
                  Ariza topshirish <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* --- XARITA QISMI --- */}
        <div className="h-[400px] md:h-[580px] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative w-full group/map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s"
            className="w-full h-full grayscale opacity-80 dark:invert transition-all group-hover/map:grayscale-0 group-hover/map:opacity-100 duration-1000"
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* Xarita ustidagi manzil bloki */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-5 md:p-7 rounded-[2rem] flex items-center gap-4 md:gap-6 shadow-2xl border border-white/20">
            {/* Pin ikonasi */}
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#39B54A] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#39B54A]/30">
              <MapPin size={24} />
            </div>

            <div className="text-left flex-grow">
              <h3 className="text-xs md:text-sm font-black dark:text-white uppercase leading-none tracking-tight">
                Asosiy Filial
              </h3>
              <p className="text-[10px] md:text-[11px] text-zinc-500 font-bold uppercase mt-1 tracking-wider">
                Rishton tumani, Markaziy ko'cha
              </p>

              {/* XARITADAN TOPISH TUGMASI */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Istiqbol+luck+xususiy+maktabi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[9px] md:text-[10px] font-black text-[#39B54A] hover:text-black dark:hover:text-white transition-all group/link uppercase tracking-widest"
              >
                <span>Xaritadan topish</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          {/* --- SARLAVHA VA TAVSIF QISMI --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div className="text-left">
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                Sizni qiziqtirgan savollar
              </h4>
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter shrink-0 leading-none">
                KO'P BERILADIGAN <br className="hidden md:block" />
                <span>SAVOLLAR</span>
              </h2>
            </div>

            {/* Tavsif bloki (Vertikal chiziq bilan) */}
            <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
              {/* VERTIKAL CHIZIQ */}
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>

              {/* MATN */}
              <p className="text-zinc-400 dark:text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                Agar savollaringizga javob topa olmasangiz, bizning
                mutaxassislarimiz bilan bog'laning.
              </p>
            </div>
          </div>

          {/* --- FAQ RO'YXATI (Card foni #e2dfdf) --- */}
          <div className="bg-[#e2dfdf] dark:bg-[#0c0c0c] rounded-[2.5rem] p-6 md:p-12 border border-transparent dark:border-zinc-800 shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
