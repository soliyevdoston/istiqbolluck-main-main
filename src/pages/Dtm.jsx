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
  Bell,
  Star,
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
};

const MAX_SCORES_MAP = {
  "Ona tili": 10,
  Matematika: 10,
  Tarix: 10,
  "1-Blok": 30,
  "2-Blok": 30,
  totalBall: 189,
};

// --- 2. ILK BOR SAHIFA OCHILGANDA KO'RINADIGAN DEFAULT MA'LUMOT ---
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
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [testIndex, setTestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const navigate = useNavigate();
  const location = useLocation();

  // Toast xabarini chiqarish funksiyasi
  const notify = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

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
      setTestIndex(0);
      notify("Natijalar muvaffaqiyatli yangilandi!", "success");
    } else {
      notify("Bunday ID raqamli o'quvchi topilmadi!", "error");
    }
  };

  // --- 4. YUKLANISH ANIMATSIYASI ---
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
    <div className="bg-[#f0f2f5] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans overflow-x-hidden pt-8 md:pt-16 transition-all">
      {/* --- TOAST BILDIRISHNOMA --- */}
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

      {/* --- 5. HEADER --- */}
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
              Natijalarni kuzatish endi yanada{" "}
              <span className="text-[#39B54A]">osonroq</span>.{" "}
              <br className="hidden md:block" /> ID raqamni kiriting va
              natijalar bilan tanishing.
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
            placeholder="O'quvchi ID..."
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

      {/* MOBIL QIDIRUV */}
      <div className="px-4 md:px-10 max-w-[1440px] mx-auto mb-6 md:hidden">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="O'quvchi ID raqami..."
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
        {/* --- 6. HERO SECTION (H-SCREEN) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch lg:h-[75vh] min-h-[500px] ">
          {/* SIDEBAR: YANGILANGAN ISM-FAMILIYA VA KARTALAR */}
          <div className="lg:col-span-4 flex flex-col gap-1 order-1">
            {/* O'quvchi kartasi (Boyitilgan dizayn) */}
            <div className="bg-[#0f172a] text-white p-1 md:p-1 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-8 border-[#39B54A] flex-1 flex flex-col justify-center items-center text-center">
              <div className="relative z-10 w-full">
                {/* Avatar qismi */}
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
                    Holati: Faol
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black italic uppercase leading-tight mb-6">
                  {student.name}
                </h2>

                <div className="grid grid-cols-1 gap-3 text-left bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <InfoLine
                    icon={<Trophy size={14} className="text-[#39B54A]" />}
                    label="Yo'nalish"
                    value={student.direction}
                  />
                  <InfoLine
                    icon={<School size={14} className="text-blue-400" />}
                    label="Sinf"
                    value={student.class}
                  />
                  <InfoLine
                    icon={<Star size={14} className="text-yellow-400" />}
                    label="Sertifikatlar"
                    value={`${currentTest.cert} ta`}
                  />
                </div>
              </div>
              <LayoutDashboard
                className="absolute -bottom-10 -right-10 text-white/5"
                size={180}
              />
            </div>

            {/* Desktop Statistika (2x2) */}
            <div className="hidden lg:grid grid-cols-2 gap-2 h-[30%]">
              <StatSquare
                icon={<TrendingUp size={16} />}
                label="Reyting"
                value={student.rank}
                color="text-blue-500"
              />
              <StatSquare
                icon={<CheckCircle2 size={16} />}
                label="Grant"
                value={`${currentTest.grantChance}%`}
                color="text-[#39B54A]"
              />
              <StatSquare
                icon={<Zap size={16} />}
                label="Percent"
                value={`${student.percentile}%`}
                color="text-orange-500"
              />
              <StatSquare
                icon={<Brain size={16} />}
                label="Analiz"
                value="Ijobiy"
                color="text-purple-500"
              />
            </div>
          </div>

          {/* DIAGRAMMA QISMI */}
          <div className="lg:col-span-8 flex flex-col gap-4 order-2">
            <div className="bg-white dark:bg-zinc-900 p-3 md:p-4 rounded-[1.5rem] shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl w-full md:w-auto">
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

              <div className="relative w-full md:w-56">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase flex items-center justify-between border-2 border-transparent hover:border-[#39B54A] transition-all"
                >
                  <span>
                    {currentTest.date} {testIndex === 0 ? "(eng yangi)" : ""}
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
                                Yangi
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

            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-zinc-200 dark:border-zinc-800 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter leading-none">
                  Imtihon <span className="text-[#39B54A]">Tahlili</span>
                </h3>
                <div className="bg-[#39B54A] px-4 py-2 rounded-xl text-black shadow-md text-center">
                  <p className="text-[7px] font-black uppercase mb-0.5 opacity-60">
                    Jami
                  </p>
                  <p className="text-xl font-black leading-none">
                    {currentTest.totalBall}
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentTest.stats}
                    margin={{ left: -25, top: 25, right: 10 }}
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
                    <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={45}>
                      {currentTest.stats.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="score"
                        position="top"
                        content={(props) => {
                          const { x, y, width, index } = props;
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
                            >{`${currentTest.stats[index].score}/${max}`}</text>
                          );
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mobil statistika kartalari (1 qatorda 4 ta) */}
            <div className="lg:hidden grid grid-cols-4 gap-2 mt-2">
              <StatSquare
                icon={<TrendingUp size={12} />}
                label="Reyt"
                value={student.rank}
                color="text-blue-500"
                compact
              />
              <StatSquare
                icon={<CheckCircle2 size={12} />}
                label="Gran"
                value={`${currentTest.grantChance}%`}
                color="text-[#39B54A]"
                compact
              />
              <StatSquare
                icon={<Zap size={12} />}
                label="Perc"
                value={`${student.percentile}%`}
                color="text-orange-500"
                compact
              />
              <StatSquare
                icon={<Brain size={12} />}
                label="Anal"
                value="Ok"
                color="text-purple-500"
                compact
              />
            </div>
          </div>
        </div>

        {/* --- DINAMIKA BO'LIMI --- */}
        {comparisonData.length > 1 && (
          <div className="mt-25 space-y-12">
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
        Istiqbolluck.uz v2.2
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

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
      className={`flex items-center justify-center gap-2 px-3 md:px-5 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${active ? "bg-[#39B54A] text-black shadow-md" : "text-slate-500 hover:text-slate-800"}`}
    >
      {icon} {label}
    </button>
  );
}

function StatSquare({ icon, label, value, color, compact }) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center transition-all ${compact ? "p-1 rounded-xl min-h-[65px]" : "p-4 rounded-[1.5rem] min-h-[110px] flex-1"}`}
    >
      <div
        className={`bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-1 border dark:border-zinc-700 ${compact ? "w-5 h-5" : "w-10 h-10"} ${color}`}
      >
        {icon}
      </div>
      <div>
        <p
          className={`font-black text-slate-400 uppercase tracking-tighter ${compact ? "text-[5px]" : "text-[7px] mb-0.5"}`}
        >
          {label}
        </p>
        <p
          className={`font-black leading-none ${compact ? "text-[8px]" : "text-lg tracking-tighter"}`}
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
