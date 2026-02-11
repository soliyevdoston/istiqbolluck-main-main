import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Phone,
  Globe,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext"; // Context'ni chaqiramiz

export default function Header() {
  const { lang, changeLanguage, t } = useLanguage(); // Til tizimi
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  // Tillar ro'yxati
  const languages = [
    { code: "UZ", label: "O'zbekcha", flag: "🇺🇿" },
    { code: "UZ_KR", label: "Ўзбекча", flag: "🇺🇿" },
    { code: "RU", label: "Русский", flag: "🇷🇺" },
    { code: "EN", label: "English", flag: "🇬🇧" },
  ];

  if (!t) return null;

  // Navigatsiya linklari tarjimalar bilan
  const navLinks = [
    { to: "/", label: t.about },
    { to: "/dtm", label: t.dtm },
    { to: "/life", label: t.life },
    { to: "/team", label: t.team },
    { to: "/blog", label: t.blog },
  ];

  // Current language flag finder
  const currentFlag = languages.find(l => l.code === lang)?.flag || "🇺🇿";

  // Tashqarini bossa til menyusini yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-[101] h-14 md:h-16 flex items-center justify-between px-4 md:px-10 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-all">
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <div className="flex font-bold text-[11px] gap-1 md:text-sm uppercase tracking-tighter">
            <span className="text-[#E43E1C]">ISTIQBOL</span>
            <span className="text-[#2E3192]">LUCK</span>
          </div>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                relative py-1 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300
                ${isActive ? "text-[#39B54A]" : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"}
                group
              `}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`
                    absolute bottom-0 left-0 h-[1.5px] bg-[#39B54A] transition-all duration-300 ease-in-out
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* 1. TIL SELECT (CUSTOM DROPDOWN) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
            >
              <span className="text-lg leading-none">{currentFlag}</span>
              <span className="text-[10px] md:text-[11px] font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                {lang === "UZ_KR" ? "ЎЗ" : lang}
              </span>
              <ChevronDown
                size={10}
                className={`text-zinc-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-[110]"
                >
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        changeLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase transition-colors flex items-center gap-2
                        ${lang === item.code ? "text-[#39B54A] bg-[#39B54A]/5" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"}
                      `}
                    >
                      <span className="text-base">{item.flag}</span>
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TELEFON */}
          <a
            href={`tel:${t.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#39B54A] text-white transition-transform group-hover:scale-110 shadow-lg shadow-[#39B54A]/20">
              <Phone size={14} fill="currentColor" />
            </div>
            <span className="hidden md:inline text-[13px] font-bold text-black dark:text-white group-hover:text-[#39B54A] transition-colors">
              {t.phone}
            </span>
          </a>
        </div>
      </header>
    </>
  );
}
