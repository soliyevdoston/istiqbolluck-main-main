import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  School,
  Award,
  Calendar,
  History,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
  Trophy,
  XCircle,
  CheckCircle,
  LayoutDashboard,
  User,
  ChevronDown,
  Bell,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext"; // TIL TIZIMINI IMPORT QILISH

// --- 1. RANG VA MAKSIMAL BALLAR KONSTANTALARI ---
const COLORS = {
  main: "#39B54A",
  secondary: "#2E3192",
  block1: "#2E3192",
  block2: "#F97316",
  sub1: "#3b82f6",
  sub2: "#ef4444",
  sub3: "#a855f7",
};

const MAX_SCORES_MAP = {
  "Ona tili": 10,
  Matematika: 10,
  Tarix: 10,
  "1-Blok": 30,
  "2-Blok": 30,
  totalBall: 189,
};

// --- 2. DEFAULT MA'LUMOT ---
const DEFAULT_STUDENT = {
  name: "Dostonbek Solijonov",
  class: "Bitirgan",
  direction: "Aniq fanlar",
  rank: "1",
  percentile: 100,
  history: [
    {
      date: "27.01.2026",
      cert: 4,
      totalBall: 189.0,
      grantChance: 100,
      stats: [
        { name: "Ona tili", score: 10, color: "#39B54A" },
        { name: "Matematika", score: 10, color: "#39B54A" },
        { name: "Tarix", score: 10, color: "#39B54A" },
        { name: "1-Blok", score: 30, color: "#2E3192" },
        { name: "2-Blok", score: 30, color: "#2E3192" },
      ],
    },
  ],
};

export default function Dtm() {
  const { t } = useLanguage(); // TARJIMANI OLISH
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [testIndex, setTestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const navigate = useNavigate();
  const location = useLocation();

  const notify = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        const SHEET_ID = "1maHii6PdtN3aHvDOS3jMvTbQX11_bnEWOWfjyIVfyGU";
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=dtms`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;
        const formatted = {};
        const roundNum = (num) => Math.round(parseFloat(num || 0) * 10) / 10;

        rows.forEach((row) => {
          const c = row.c;
          const id = c[2]?.v ? String(c[2].v) : null;
          if (!id) return;
          if (!formatted[id]) {
            formatted[id] = {
              name: c[1]?.v || "Noma'lum",
              class: c[4]?.v || "N/A",
              direction: c[3]?.v || "Noma'lum",
              rank: "Top 5%",
              percentile: 92,
              history: [],
            };
          }
          formatted[id].history.push({
            date: c[0]?.f || c[0]?.v || "Noma'lum",
            cert: c[16]?.v || 0,
            totalBall: roundNum(c[10]?.v),
            grantChance: Math.round((c[10]?.v / 189) * 100),
            stats: [
              {
                name: "Ona tili",
                score: roundNum(c[11]?.v),
                color: COLORS.main,
              },
              {
                name: "Matematika",
                score: roundNum(c[12]?.v),
                color: COLORS.main,
              },
              { name: "Tarix", score: roundNum(c[13]?.v), color: COLORS.main },
              {
                name: "1-Blok",
                score: roundNum(c[14]?.v),
                color: COLORS.secondary,
              },
              {
                name: "2-Blok",
                score: roundNum(c[15]?.v),
                color: COLORS.secondary,
              },
            ],
          });
        });

        Object.keys(formatted).forEach((key) => {
          formatted[key].history.reverse();
        });
        setStudentsData(formatted);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchSheetsData();
  }, []);

  const student = useMemo(
    () => studentsData[currentId] || DEFAULT_STUDENT,
    [studentsData, currentId],
  );
  const currentTest = useMemo(
    () => student?.history[testIndex] || student?.history[0],
    [student, testIndex],
  );
  const comparisonData = useMemo(
    () => [...student.history].reverse(),
    [student],
  );

  const get20SlotsData = (key) => {
    // Return actual data, reversed (oldest first)
    const data = [...student.history]
      .reverse()
      .map((item) => {
        const score =
          key === "totalBall"
            ? item.totalBall
            : item.stats.find((s) => s.name === key)?.score || 0;
        return {
          date: item.date,
          val: score,
          isPlaceholder: false,
        };
      });

    // Add a default drop-off point at the end
    data.push({
      date: "",
      val: 0,
      isPlaceholder: true,
    });

    return data;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = searchId.trim();
    if (studentsData[cleanId]) {
      setCurrentId(cleanId);
      setTestIndex(0);
      notify(t.toast_success, "success");
    } else {
      notify(t.toast_error, "error");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f0f2f5] dark:bg-[#080808] z-[100]">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24"
        >
          <img src="/logo.svg" alt="Logo" className="w-full h-full" />
        </motion.div>
      </div>
    );

  return (
    <div className="bg-[#f0f2f5] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans overflow-x-hidden pt-17 md:pt-17 transition-all">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-0 left-1/2 z-[1000] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm backdrop-blur-md border ${
              toast.type === "success"
                ? "bg-green-500/90 border-green-400 text-white"
                : "bg-red-500/90 border-red-400 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="px-4 md:px-10 max-w-[1440px] mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-[#39B54A] p-2.5 rounded-2xl shadow-xl shadow-[#39B54A]/20">
            <Zap className="text-white" size={24} fill="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic leading-none">
              IstiqbolLuck <span className="text-[#39B54A]">DTM</span>
            </h1>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest mt-1 leading-relaxed">
              {t.header_sub.split("<br")[0]} <br className="hidden md:block" />{" "}
              {t.header_sub.split("/>")[1]}
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSearch}
          className="hidden md:relative md:flex w-72"
        >
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={t.id_placeholder}
            className="w-full bg-white dark:bg-zinc-900 border-2 border-[#39B54A]/20 focus:border-[#39B54A] rounded-xl py-3 px-5 text-xs font-bold outline-none shadow-sm transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#39B54A] hover:scale-110 transition-all"
          >
            <Search size={18} />
          </button>
        </form>
      </header>

      <div className="px-4 md:px-10 max-w-[1440px] mx-auto mb-6 md:hidden">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={t.id_placeholder}
            className="w-full bg-white dark:bg-zinc-900 border-2 border-[#39B54A]/30 focus:border-[#39B54A] shadow-xl rounded-2xl py-4 px-6 text-sm font-bold outline-none"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#39B54A]"
          >
            <Search size={22} />
          </button>
        </form>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch lg:h-[75vh] min-h-[500px]">
          <div className="lg:col-span-4 flex flex-col gap-1 order-1">
            <div className="bg-[#0f172a] text-white p-2 md:p-2 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-8 border-[#39B54A] flex-1 flex flex-col justify-center items-center text-center">
              <div className="relative z-10 w-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#39B54A] to-emerald-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl border-4 border-white/10 ring-4 ring-[#39B54A]/20">
                  <span className="text-2xl font-black">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 mb-4">
                  <span className="w-2 h-2 bg-[#39B54A] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {t.status_active}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black italic uppercase leading-tight mb-6">
                  {student.name}
                </h2>
                <div className="grid grid-cols-1 gap-3 text-left bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <InfoLine
                    icon={<Trophy size={14} className="text-[#39B54A]" />}
                    label={t.direction_label}
                    value={student.direction}
                  />
                  <InfoLine
                    icon={<School size={14} className="text-blue-400" />}
                    label={t.class_label}
                    value={student.class}
                  />
                  <InfoLine
                    icon={<Star size={14} className="text-yellow-400" />}
                    label={t.cert_label}
                    value={`${currentTest.cert} ta`}
                  />
                </div>
              </div>
              <LayoutDashboard
                className="absolute -bottom-10 -right-10 text-white/5"
                size={180}
              />
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-2 h-[30%]">
              <StatSquare
                icon={<TrendingUp size={16} />}
                label={t.rank_label}
                value={student.rank}
                color="text-blue-500"
              />
              <StatSquare
                icon={<CheckCircle2 size={16} />}
                label={t.grant_label}
                value={`${currentTest.grantChance}%`}
                color="text-[#39B54A]"
              />
              <StatSquare
                icon={<Zap size={16} />}
                label={t.percent_label}
                value={`${student.percentile}%`}
                color="text-orange-500"
              />
              <StatSquare
                icon={<Brain size={16} />}
                label={t.analysis_label}
                value="Ijobiy"
                color="text-purple-500"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4 order-2">
            <div className="bg-white dark:bg-zinc-900 p-3 md:p-4 rounded-[1.5rem] shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl w-full md:w-auto">
                <NavBtn
                  active={location.pathname === "/dtm"}
                  icon={<User size={13} />}
                  label={t.student_btn}
                  onClick={() => navigate("/dtm")}
                />
                <NavBtn
                  active={location.pathname === "/schooldtm"}
                  icon={<School size={13} />}
                  label={t.school_btn}
                  onClick={() => navigate("/schooldtm")}
                />
              </div>
              <div className="relative w-full md:w-56">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase flex items-center justify-between border-2 border-transparent hover:border-[#39B54A] transition-all"
                >
                  <span>
                    {currentTest.date}{" "}
                    {testIndex === 0 ? `(${t.latest_label})` : ""}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 5 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden py-1 mt-1"
                    >
                      <div className="max-h-48 overflow-y-auto hide-scrollbar">
                        {student.history.map((h, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setTestIndex(i);
                              setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase flex items-center justify-between transition-all ${testIndex === i ? "bg-[#39B54A]/10 text-[#39B54A]" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                          >
                            <span>{h.date}</span>{" "}
                            {i === 0 && (
                              <span className="text-[7px] border-[#82ce8c] border text-black px-1 rounded">
                                YANGI
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e1e2e] text-slate-900 dark:text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl dark:shadow-2xl border border-zinc-200 dark:border-white/5 flex-1 flex flex-col relative overflow-hidden group transition-colors duration-300">
               {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-200/50 dark:from-white/5 to-transparent rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter leading-none text-slate-800 dark:text-white/90">
                  {t.analysis_title}
                </h3>
                <div className="bg-[#39B54A] px-4 py-2 rounded-xl text-black shadow-md text-center">
                  <p className="text-[7px] font-black uppercase mb-0.5 opacity-60">
                    {t.total_label}
                  </p>
                  <p className="text-xl font-black leading-none">
                    {currentTest.totalBall}
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full min-h-[250px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentTest.stats}
                    margin={{ left: 0, top: 25, right: 10, bottom: 5 }}
                  >
                    <defs>
                      {currentTest.stats.map((entry, index) => (
                        <linearGradient key={index} id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.9}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.2}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="rgba(120,120,120,0.1)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 9, fontWeight: 800, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 20, right: 20 }}
                      interval={0}
                    />
                    <YAxis 
                      hide={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                      domain={[0, (dataMax) => (dataMax > 30 ? 189 : dataMax > 10 ? 30 : 10)]}
                      width={30}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid rgba(0,0,0,0.1)', 
                        borderRadius: '12px',
                        color: '#1e293b',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                      }}
                       cursor={{ fill: 'rgba(255,255,255,0.05)', radius: [10, 10, 0, 0] }} 
                    />
                    <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={45}>
                      {currentTest.stats.map((entry, index) => (
                        <Cell key={index} fill={`url(#grad-${index})`} />
                      ))}
                      <LabelList
                        dataKey="score"
                        position="top"
                        content={(props) => {
                          const { x, y, width, index, value } = props;
                          const max =
                            MAX_SCORES_MAP[currentTest.stats[index].name] || 10;
                          return (
                            <text
                              x={x + width / 2}
                              y={y - 12}
                              fill={currentTest.stats[index].color}
                              fontSize={12}
                              fontWeight={900}
                              textAnchor="middle"
                            >{`${value}/${max}`}</text>
                          );
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:hidden grid grid-cols-4 gap-2 mt-2">
              <StatSquare
                icon={<TrendingUp size={12} />}
                label={t.rank_short}
                value={student.rank}
                color="text-blue-500"
                compact
              />
              <StatSquare
                icon={<CheckCircle2 size={12} />}
                label={t.grant_short}
                value={`${currentTest.grantChance}%`}
                color="text-[#39B54A]"
                compact
              />
              <StatSquare
                icon={<Zap size={12} />}
                label={t.percent_short}
                value={`${student.percentile}%`}
                color="text-orange-500"
                compact
              />
              <StatSquare
                icon={<Brain size={12} />}
                label={t.analysis_short}
                value="Ok"
                color="text-purple-500"
                compact
              />
            </div>
          </div>
        </div>

        {comparisonData.length > 1 && (
          <div className="mt-20 space-y-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
                {t.dynamics_title}
              </h2>
              <div className="w-14 h-1 bg-[#39B54A] mx-auto mt-4 rounded-full" />
            </div>
            <div className="flex flex-col gap-10">
              <DynamicRow
                title={t.dyn_total}
                color="#3b82f6"
                data={get20SlotsData("totalBall")}
                keyKey="totalBall"
              />
              <DynamicRow
                title={t.dyn_block1}
                color="#2E3192"
                data={get20SlotsData("1-Blok")}
                keyKey="1-Blok"
              />
              <DynamicRow
                title={t.dyn_block2}
                color="#F97316"
                data={get20SlotsData("2-Blok")}
                keyKey="2-Blok"
              />
              <DynamicRow
                title={t.dyn_sub1}
                color="#39B54A"
                data={get20SlotsData("Ona tili")}
                keyKey="Ona tili"
              />
              <DynamicRow
                title={t.dyn_sub2}
                color="#ef4444"
                data={get20SlotsData("Matematika")}
                keyKey="Matematika"
              />
              <DynamicRow
                title={t.dyn_sub3}
                color="#a855f7"
                data={get20SlotsData("Tarix")}
                keyKey="Tarix"
              />
            </div>
          </div>
        )}
      </main>
      <footer className="py-20 text-center opacity-10 text-[9px] font-black uppercase tracking-[1em]">
        Istiqbolluck.uz v2.2
      </footer>
    </div>
  );
}

function DynamicRow({ title, color, data, keyKey }) {
  const { t } = useLanguage();
  const max = MAX_SCORES_MAP[keyKey] || 10;
  
  // Generate a unique ID for the gradient to avoid conflicts
  const gradientId = `colorGradient-${keyKey.replace(/\s+/g, '')}`;

  return (
    <div className="bg-white dark:bg-[#1e1e2e] text-slate-900 dark:text-white p-6 md:p-8 rounded-[2rem] shadow-xl dark:shadow-2xl border border-zinc-200 dark:border-white/5 w-full h-[350px] md:h-[400px] flex flex-col relative overflow-hidden group transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-200/50 dark:from-white/5 to-transparent rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10 px-2">
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-inner">
            <TrendingUp size={20} style={{ color: color }} />
            </div>
            <div>
                <h4 className="font-bold text-lg md:text-xl tracking-tight text-slate-800 dark:text-white/90 leading-none">
                {title}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider mt-1">
                    {data.filter(d => !d.isPlaceholder).length} ta test
                </p>
            </div>
        </div>
      </div>

      <div className="flex-1 w-full relative z-10 pl-2 overflow-x-auto hide-scrollbar">
        <div style={{ minWidth: data.length > 5 ? `${data.length * 60}px` : '100%', height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 25, right: 10, left: 0, bottom: 45 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120,120,120,0.1)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
              dy={10}
              angle={-90}
              textAnchor="end"
              interval={0}
            />
            <YAxis 
              hide={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              domain={[0, (dataMax) => (max > 100 ? 189 : max)]}
              ticks={
                max > 100 
                  ? [0, 50, 100, 150, 189] 
                  : max === 30 
                    ? [0, 10, 20, 30] 
                    : [0, 2, 4, 6, 8, 10]
              }
              width={35}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid rgba(0,0,0,0.1)', 
                borderRadius: '12px',
                color: '#1e293b',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
              }}
              itemStyle={{ color: color, fontWeight: 'bold' }}
              cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }}
             
            />
             {/* Dark mode tooltip style override via CSS/logic could be tricky with inline styles, 
                 so for now we stick to a clean white tooltip that looks good on both or primarily light. 
                 Ideally, we'd detect theme. But white usually works fine. */}
            <Area 
              type="monotone" 
              dataKey="val" 
              stroke={color} 
              strokeWidth={4}
              fillOpacity={1} 
              fill={`url(#${gradientId})`} 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#fff', stroke: color }}
            >
                <LabelList 
                  dataKey="val" 
                  position="top" 
                  offset={10}
                  content={(props) => {
                    const { x, y, value, index } = props;
                    if (data[index].isPlaceholder || value === 0) return null;
                    return (
                      <text 
                        x={x} 
                        y={y - 10} 
                        fill={color} 
                        fontSize={12} 
                        fontWeight="bold" 
                        textAnchor="middle"
                      >
                        {value}
                      </text>
                    );
                  }}
                />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function NavBtn({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-3 md:px-5 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${active ? "bg-[#39B54A] text-black shadow-md" : "text-slate-500 hover:text-slate-800"}`}
    >
      {icon} {label}
    </button>
  );
}

function StatSquare({ icon, label, value, color, compact }) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center transition-all ${compact ? "p-1 rounded-xl min-h-[65px]" : "p-4 rounded-[1.5rem] min-h-[100px] flex-1"}`}
    >
      <div
        className={`bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-1.5 border dark:border-zinc-700 ${compact ? "w-5 h-5" : "w-9 h-9"} ${color}`}
      >
        {icon}
      </div>
      <div>
        <p
          className={`font-black text-slate-400 uppercase tracking-tighter ${compact ? "text-[5px]" : "text-[6px] mb-0.5"}`}
        >
          {label}
        </p>
        <p
          className={`font-black leading-none ${compact ? "text-[8px]" : "text-base tracking-tighter"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoLine({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-white/70">
      <div className="bg-white/5 p-2 rounded-xl border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-[7px] uppercase font-black text-white/30 tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-[10px] md:text-[11px] font-bold text-white tracking-tight leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
