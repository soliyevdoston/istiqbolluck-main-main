import { Link, NavLink } from "react-router-dom";
import {
  Instagram,
  Send,
  Youtube,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { to: "/", label: "Biz haqimizda" },
    { to: "/dtm", label: "DTM" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  const primaryGreen = "#39B54A";

  return (
    <footer className="relative mt-10 border-t border-gray-400 dark:border-zinc-900 bg-[#e2dfdf] dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-5 md:px-10">
        {/* ASOSIY GRID: Mobilda 2 ustun, Desktopda 4 ustun */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* 1. LOGO VA TA'RIF (Mobilda 2 ustunni egallaydi) */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start space-y-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-2"
            >
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="text-base md:text-lg font-bold uppercase tracking-tighter">
                <span className="text-[#E43E1C]  ">ISTIQBOL</span>
                <span className="text-[#2E3192]">LUCK</span>
              </div>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed max-w-[240px]">
              Muvaffaqiyatli kelajak poydevorini biz bilan quring. Toza ta'lim,
              minimalist yondashuv.
            </p>
          </div>

          {/* 2. BO'LIMLAR */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-zinc-400 mb-4">
              Bo'limlar
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={scrollToTop}
                  className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-[#39B54A] transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* 3. ALOQA */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-zinc-400 mb-4">
              Aloqa
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+998901234567"
                className="flex items-center gap-2 group"
              >
                <Phone size={14} className="text-[#39B54A]" />
                <span className="text-[13px] font-bold dark:text-white group-hover:text-[#39B54A] transition-colors">
                  +998 90 123 45 67
                </span>
              </a>
              <a
                href="mailto:info@istiqbol.uz"
                className="flex items-center gap-2 group"
              >
                <Mail size={14} className="text-[#39B54A]" />
                <span className="text-[13px] font-bold dark:text-white group-hover:text-[#39B54A] transition-colors">
                  info@istiqbol.uz
                </span>
              </a>
            </div>
          </div>

          {/* 4. IJTIMOIY TARMOQLAR */}
          <div className="flex flex-col items-start lg:items-end">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-zinc-400 mb-4">
              Tarmoqlar
            </h4>
            <div className="flex gap-3 mb-6">
              {[Instagram, Send, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-white hover:border-[#39B54A] hover:text-[#39B54A] transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#39B54A] hover:text-black dark:hover:text-white transition-colors"
            >
              Tepaga
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* FOOTER PASTKI QISMI */}
        <div className="mt-10 pt-6 border-t border-zinc-50 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-400 font-medium tracking-wider text-center md:text-left">
            © 2026 ISTIQBOL LUCK. BARCHA HUQUQLAR HIMOYALANGAN.
          </p>

          <a
            href="https://soliyev.uz"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] text-zinc-400 hover:text-black dark:hover:text-white transition-colors font-bold tracking-widest"
          >
            DEVELOPED BY SOLIYEV.UZ
          </a>
        </div>
      </div>
    </footer>
  );
}
