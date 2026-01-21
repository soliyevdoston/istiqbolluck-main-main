import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Phone,
  Menu,
  X,
  Globe,
  ChevronDown,
  Instagram,
  Send,
  Youtube,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; // ThemeToggle komponentingiz

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState("UZ");
  const langRef = useRef(null);
  const location = useLocation();

  const languages = [
    { code: "UZ", label: "O'zbekcha" },
    { code: "RU", label: "Русский" },
    { code: "EN", label: "English" },
  ];

  const navLinks = [
    { to: "/", label: "Biz haqimizda" },
    { to: "/dtm", label: "DTM" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <>
      <header className="fixed top-0 w-full z-[100] h-14 md:h-16 flex items-center justify-between px-4 md:px-10 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-all">
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <div className="flex font-bold text-[11px] gap-1 md:text-sm uppercase tracking-tighter">
            <span className="text-[#E43E1C]  ">ISTIQBOL</span>
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
          {/* 1. TIL SELECT */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center   py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
            >
              <Globe size={14} className="text-zinc-500" />
              <span className="text-[10px] md:text-[11px] font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                {lang}
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
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                >
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase transition-colors
                        ${lang === item.code ? "text-[#39B54A] bg-[#39B54A]/5" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"}
                      `}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. DESKTOP THEME TOGGLE (Yangi qo'shildi) */}
          <div className="hidden lg:block border-l border-zinc-100 dark:border-zinc-800 pl-2">
            <ThemeToggle />
          </div>

          {/* 3. TELEFON */}
          <a href="tel:+998901234567" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#39B54A] text-white transition-transform group-hover:scale-110 shadow-lg shadow-[#39B54A]/20">
              <Phone size={14} fill="currentColor" />
            </div>
            <span className="hidden md:inline text-[13px] font-bold text-black dark:text-white group-hover:text-[#39B54A] transition-colors">
              +998 90 123 45 67
            </span>
          </a>

          {/* 4. BURGER MENU (Mobil uchun) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* --- MOBILE MENU (Drawer) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-[260px] bg-white dark:bg-[#0a0a0a] z-[2001] p-5 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Menyu
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full dark:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) => `
                        py-2.5 text-base font-bold tracking-tight transition-all border-b border-zinc-50 dark:border-zinc-900
                        ${isActive ? "text-[#39B54A]" : "text-zinc-800 dark:text-zinc-200 opacity-70"}
                      `}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Footer Section Mobile */}
              <div className="space-y-3">
                <a
                  href="tel:+998901234567"
                  className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 group active:scale-95 transition-all"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#39B54A] text-white shrink-0">
                    <Phone size={16} fill="currentColor" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase">
                      Aloqa
                    </span>
                    <span className="text-xs font-bold dark:text-white group-hover:text-[#39B54A]">
                      +998 90 123 45 67
                    </span>
                  </div>
                </a>

                <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">
                    Mavzu
                  </span>
                  <ThemeToggle />
                </div>

                <div className="flex justify-center gap-5 pt-1">
                  {[Instagram, Send, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-[#39B54A] border border-zinc-100 dark:border-zinc-800 transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
