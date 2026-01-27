import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. RANG VA MAKSIMAL BALLAR KONSTANTALARI ---
const COLORS = {
  main: "#39B54A",
  secondary: "#2E3192",
  block1: "#2E3192",
  block2: "#F97316",
  sub1: "#3b82f6",
  sub2: "#ef4444",
  sub3: "#a855f7",
  emptySlot: "rgba(148, 163, 184, 0.15)",
};

const MAX_SCORES_MAP = {
  "Ona tili": 10,
  Matematika: 10,
  Tarix: 10,
  "1-Blok": 30,
  "2-Blok": 30,
  totalBall: 189,
};

// --- 2. DEFAULT MA'LUMOT (SAHIFA OCHILGANDA) ---
const DEFAULT_STUDENT = {
  name: "Dostonbek Solijonov",
  class: "Bitirgan",
  direction: "Aniq fanlar",
  rank: "1",
  percentile: 100,
  history: [
    {
      date: "27.01.2026",
      cert: 100,
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
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [testIndex, setTestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState({ show: false, msg: "", type: "error" });
  const [isOpen, setIsOpen] = useState(false); // Sanalar menyusi ochiq/yopiqligi
  // --- 3. MA'LUMOTLARNI YUKLASH VA TARTIBLASH ---
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

        // Tarixni teskari tartiblash (Eng yangisi birinchi)
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
    const history = [...student.history].reverse();
    const result = [];
    for (let i = 0; i < 20; i++) {
      if (history[i]) {
        const score =
          key === "totalBall"
            ? history[i].totalBall
            : history[i].stats.find((s) => s.name === key)?.score || 0;
        result.push({
          date: history[i].date,
          val: score,
          isPlaceholder: false,
        });
      } else {
        result.push({ date: ``, val: 0, isPlaceholder: true });
      }
    }
    return result;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = searchId.trim();
    if (studentsData[cleanId]) {
      setCurrentId(cleanId);
      setTestIndex(0); // Qidirganda avtomatik eng yangi natija
      setToast({ show: true, msg: "Natija yuklandi!", type: "success" });
    } else {
      setToast({ show: true, msg: "ID topilmadi!", type: "error" });
    }
    setTimeout(() => setToast({ show: false, msg: "", type: "error" }), 3000);
  };

  // --- 4. YUKLANISH HOLATI (LOGO ANIMATSIYASI) ---
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
    <div className="bg-[#f0f2f5] dark:bg-[#080808] min-h-screen text-slate-900 dark:text-white font-sans overflow-x-hidden pt-20">
      {/* --- 5. HEADER (MOBIL VA DESKTOP) --- */}
      <header className="px-4 md:px-10 max-w-[1440px] mx-auto flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#39B54A] p-2 rounded-xl shadow-lg">
            <Zap className="text-white" size={24} fill="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black uppercase tracking-tighter italic leading-none">
              IstiqbolLuck <span className="text-[#39B54A]">DTM</span>
            </h1>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest mt-1 leading-relaxed">
              Ota-onalar va o'quvchilar uchun natijalarni kuzatish endi yanada{" "}
              osonroq.
              <br className="hidden md:block" />
              ID raqamni kiriting va ko'rsatkichlar bilan tanishing.
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
            placeholder="ID raqam..."
            className="w-full bg-white dark:bg-zinc-900 border-2 border-[#39B54A]/20 focus:border-[#39B54A] rounded-xl py-2 px-4 text-xs font-bold outline-none shadow-sm transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#39B54A]"
          >
            <Search size={18} />
          </button>
        </form>
      </header>

      {/* --- 6. MOBIL QIDIRUV --- */}
      <div className="px-4 md:px-10 max-w-[1440px] mx-auto mb-6 md:hidden">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ID kiritib izlang..."
            className="w-full bg-white dark:bg-zinc-900 border-2 border-[#39B54A]/30 focus:border-[#39B54A] shadow-xl rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#39B54A]"
          >
            <Search size={22} />
          </button>
        </form>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-10 pb-12 flex flex-col gap-6">
        {/* --- 7. ASOSIY DASHBOARD (SIDEBAR + DIAGRAMMA) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SIDEBAR: ISMAT-FAMILIYA VA PROFIL */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-1">
            <div className="bg-[#0f172a] text-white p-7 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-8 border-[#39B54A]">
              <div className="relative z-10">
                <span className="text-[10px] font-black bg-[#39B54A] text-black px-2.5 py-1 rounded uppercase tracking-tighter">
                  ID: {currentId || "----"}
                </span>
                <h2 className="text-2xl font-black italic uppercase leading-tight mt-5 mb-8">
                  {student.name}
                </h2>
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <InfoLine
                    icon={<Trophy size={16} />}
                    label="Yo'nalish"
                    value={student.direction}
                  />
                  <InfoLine
                    icon={<School size={16} />}
                    label="Sinf"
                    value={student.class}
                  />
                  <InfoLine
                    icon={<Award size={16} />}
                    label="Yutuqlar"
                    value={`${currentTest.cert} ta`}
                  />
                </div>
              </div>
              <LayoutDashboard
                className="absolute -bottom-6 -right-6 text-white/5"
                size={120}
              />
            </div>

            {/* DESKTOP UCHUN STATISTIKA KARTALARI */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <StatSquare
                icon={<TrendingUp size={18} />}
                label="Reyting"
                value={student.rank}
                color="text-blue-500"
              />
              <StatSquare
                icon={<CheckCircle2 size={18} />}
                label="Grant"
                value={`${currentTest.grantChance}%`}
                color="text-[#39B54A]"
              />
              <StatSquare
                icon={<Zap size={18} />}
                label="Percent"
                value={`${student.percentile}%`}
                color="text-orange-500"
              />
              <StatSquare
                icon={<Brain size={18} />}
                label="Analiz"
                value="Ijobiy"
                color="text-purple-500"
              />
            </div>
          </div>

          {/* DIAGRAMMA VA BOSHQARUV PANEL */}
          <div className="lg:col-span-8 flex flex-col gap-6 order-2">
            {/* SANA TANLASH VA NAVIGATSIYA */}
            <div className="bg-white dark:bg-zinc-900 p-3 md:p-4 rounded-[1.5rem] shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto hide-scrollbar">
                <NavBtn
                  active={location.pathname === "/dtm"}
                  icon={<User size={13} />}
                  label="O'quvchi"
                  onClick={() => navigate("/dtm")}
                />
                <NavBtn
                  active={location.pathname === "/schooldtm"}
                  icon={<School size={13} />}
                  label="Maktab"
                  onClick={() => navigate("/schooldtm")}
                />
              </div>
              {/* --- SANA TANLASH (CUSTOM ANIMATED DROPDOWN) --- */}
              <div className="relative w-full md:w-60">
                {/* Tanlash tugmasi */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase flex items-center justify-between border-1  border-[#82ce8c] transition-all duration-300 shadow-sm"
                >
                  <span>
                    {student.history[testIndex]?.date}{" "}
                    {testIndex === 0 ? "(eng oxirgi)" : ""}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-slate-400" size={14} />
                  </motion.div>
                </button>

                {/* Slide bo'lib ochiladigan menyu */}
                <AnimatePresence>
                  {isOpen && (
                    <>
                      {/* Menyudan tashqarini bossa yopilishi uchun fon qatlami */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden py-2"
                      >
                        <div className="max-h-60 overflow-y-auto hide-scrollbar">
                          {student.history.map((h, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setTestIndex(i);
                                setIsOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase transition-all flex items-center justify-between
                  ${
                    testIndex === i
                      ? "bg-[#39B54A]/10 text-[#39B54A]"
                      : "text-slate-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                            >
                              <span>{h.date}</span>
                              {i === 0 && (
                                <span className="text-[8px] border-[#82ce8c] text-black px-1.5 py-0.5 rounded ml-2">
                                  Yangi
                                </span>
                              )}
                              {testIndex === i && <CheckCircle size={12} />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ASOSIY DIAGRAMMA CARD */}
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-zinc-200 dark:border-zinc-800 flex-1">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter leading-none">
                  Imtihon <span className="text-[#39B54A]">Tahlili</span>
                </h3>
                <div className="bg-[#39B54A] px-4 py-2 rounded-xl text-black shadow-md text-center">
                  <p className="text-[7px] font-black uppercase mb-0.5 opacity-60">
                    JAMI BALL
                  </p>
                  <p className="text-xl md:text-2xl font-black leading-none">
                    {currentTest.totalBall}
                  </p>
                </div>
              </div>
              <div className="h-[300px] md:h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentTest.stats}
                    margin={{ left: -20, top: 30, right: 10 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      opacity={0.05}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 9, fontWeight: 800, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis hide domain={[0, 32]} />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={45}>
                      {currentTest.stats.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="score"
                        position="top"
                        content={(props) => {
                          const { x, y, width, value, index } = props;
                          const max =
                            MAX_SCORES_MAP[currentTest.stats[index].name] || 10;
                          return (
                            <text
                              x={x + width / 2}
                              y={y - 12}
                              fill="#64748b"
                              fontSize={10}
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

            {/* MOBILDA STATISTIKA KARTALARI (1 QATORDA 4 TA) */}
            <div className="lg:hidden grid grid-cols-4 gap-2 order-3">
              <StatSquare
                icon={<TrendingUp size={14} />}
                label="Reyt"
                value={student.rank}
                color="text-blue-500"
                compact
              />
              <StatSquare
                icon={<CheckCircle2 size={14} />}
                label="Gran"
                value={`${currentTest.grantChance}%`}
                color="text-[#39B54A]"
                compact
              />
              <StatSquare
                icon={<Zap size={14} />}
                label="Perc"
                value={`${student.percentile}%`}
                color="text-orange-500"
                compact
              />
              <StatSquare
                icon={<Brain size={14} />}
                label="Anal"
                value="Ok"
                color="text-purple-500"
                compact
              />
            </div>
          </div>
        </div>

        {/* --- 8. DINAMIKA BO'LIMI (VAQT DAVOMIDAGI O'ZGARISHLAR) --- */}
        {comparisonData.length > 1 && (
          <div className="mt-16 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                Natijalar <span className="text-[#39B54A]">dinamikasi</span>
              </h2>
              <div className="w-16 h-1 bg-[#39B54A] mx-auto mt-4 rounded-full" />
            </div>
            <div className="flex flex-col gap-10">
              <DynamicRow
                title="Umumiy ballar dinamikasi"
                color="#3b82f6"
                data={get20SlotsData("totalBall")}
                keyKey="totalBall"
              />
              <DynamicRow
                title="Mutaxassislik: 1-Blok fan tahlili"
                color="#2E3192"
                data={get20SlotsData("1-Blok")}
                keyKey="1-Blok"
              />
              <DynamicRow
                title="Mutaxassislik: 2-Blok fan tahlili"
                color="#F97316"
                data={get20SlotsData("2-Blok")}
                keyKey="2-Blok"
              />
              <DynamicRow
                title="Majburiy fan: Ona tili"
                color="#39B54A"
                data={get20SlotsData("Ona tili")}
                keyKey="Ona tili"
              />
              <DynamicRow
                title="Majburiy fan: Matematika"
                color="#ef4444"
                data={get20SlotsData("Matematika")}
                keyKey="Matematika"
              />
              <DynamicRow
                title="Majburiy fan: Tarix"
                color="#a855f7"
                data={get20SlotsData("Tarix")}
                keyKey="Tarix"
              />
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 text-center opacity-10 text-[9px] font-black uppercase tracking-[1em]">
        Istiqbolluck.uz v2.0
      </footer>
    </div>
  );
}

// --- 9. YORDAMCHI KOMPONENTLAR (REUSABLE COMPONENTS) ---

function DynamicRow({ title, color, data, keyKey }) {
  const max = MAX_SCORES_MAP[keyKey] || 10;
  return (
    <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[3rem] shadow-xl border border-zinc-200 dark:border-zinc-800 w-full h-[480px] flex flex-col">
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div
          className="w-3 h-8 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h4 className="font-black uppercase italic text-sm md:text-base tracking-tight">
          {title}
        </h4>
      </div>
      <div className="flex-1 overflow-x-auto hide-scrollbar">
        <div
          style={{
            minWidth: `${Math.max(100, data.length * 55)}px`,
            height: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ left: 10, top: 40, right: 20, bottom: 20 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.03}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fontWeight: 800, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis hide domain={[0, max]} />
              <Bar
                dataKey="val"
                radius={[6, 6, 0, 0]}
                barSize={34}
                background={{
                  fill: "currentColor",
                  className: "text-zinc-200 dark:text-zinc-800",
                  radius: [6, 6, 0, 0],
                }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.isPlaceholder ? "transparent" : color}
                  />
                ))}
                <LabelList
                  dataKey="val"
                  position="top"
                  content={(props) => {
                    const { x, y, width, value, index } = props;
                    if (data[index].isPlaceholder || value === 0) return null;
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 12}
                        fill={color}
                        fontSize={10}
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
    </div>
  );
}

function NavBtn({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-lg text-[9px] font-black uppercase transition-all ${active ? "bg-[#39B54A] text-black shadow-md" : "text-slate-500 hover:text-slate-800"}`}
    >
      {icon} {label}
    </button>
  );
}

function StatSquare({ icon, label, value, color, compact }) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center transition-all ${compact ? "p-1 rounded-xl min-h-[70px]" : "p-6 rounded-[2rem] min-h-[120px]"}`}
    >
      <div
        className={`bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-1 border dark:border-zinc-700 ${compact ? "w-6 h-6" : "w-11 h-11"} ${color}`}
      >
        {icon}
      </div>
      <div>
        <p
          className={`font-black text-slate-400 uppercase tracking-tighter ${compact ? "text-[5px]" : "text-[8px] mb-1"}`}
        >
          {label}
        </p>
        <p
          className={`font-black leading-none ${compact ? "text-[8px]" : "text-xl"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoLine({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 text-white/70">
      <div className="bg-white/10 p-2.5 rounded-xl border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-[8px] uppercase font-black text-white/30 tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-[11px] font-bold text-white tracking-tight leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
