import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Activity, Users, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomNav() {
  const { t } = useLanguage();

  if (!t) return null;

  const navLinks = [
    { to: "/", label: t.about, Icon: Home },
    { to: "/dtm", label: t.dtm, Icon: BarChart2 },
    { to: "/life", label: t.life, Icon: Activity },
    { to: "/team", label: t.team, Icon: Users },
    { to: "/blog", label: t.blog, Icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/20 dark:bg-black/20 backdrop-blur-md border-t border-zinc-200/30 dark:border-zinc-800/30 z-[100] lg:hidden safe-area-bottom rounded-[50px]">
      <div className="flex justify-around items-center h-16">
        {navLinks.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full space-y-1
              transition-colors duration-200
              ${
                isActive
                  ? "text-[#39B54A]"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }
            `}
          >
            <Icon size={20} strokeWidth={2} />
            <span className="text-[9px] font-bold uppercase tracking-wide">
              {label.length > 8 ? label.substring(0, 8) + '..' : label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
