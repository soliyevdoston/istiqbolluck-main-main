import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  School,
  Award,
  Hash,
  Calendar,
  History,
  Download,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
  Loader2,
  Trophy,
  XCircle,
  CheckCircle,
  X,
  User,
  School as SchoolIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  main: "#39B54A",
  secondary: "#2E3192",
  track: "rgba(0, 0, 0, 0.04)",
  block1: "#2E3192",
  block2: "#F97316",
  sub1: "#3b82f6",
  sub2: "#ef4444",
  sub3: "#a855f7",
};

const DEFAULT_STUDENT = {
  name: "Dostonbek Solijonov",
  class: "Bitirgan",
  direction: "Aniq fanlar",
  rank: "1",
  percentile: 100,
  history: [
    {
      date: "00.00.0000",
      cert: 100,
      totalBall: 189,
      grantChance: 100,
      stats: [
        { name: "Ona tili", score: 10, max: 10, color: "#39B54A" },
        { name: "Matematika", score: 10, max: 10, color: "#39B54A" },
        { name: "Tarix", score: 10, max: 10, color: "#39B54A" },
        { name: "1-Blok", score: 30, max: 30, color: "#2E3192" },
        { name: "2-Blok", score: 30, max: 30, color: "#2E3192" },
      ],
    },
  ],
};

export default function DtmPremium() {
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [testIndex, setTestIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({});
  const reportRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [toast, setToast] = useState({ show: false, msg: "", type: "error" });
  const notify = (msg, type = "error") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
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
                max: 10,
                color: COLORS.main,
              },
              {
                name: "Matematika",
                score: roundNum(c[12]?.v),
                max: 10,
                color: COLORS.main,
              },
              {
                name: "Tarix",
                score: roundNum(c[13]?.v),
                max: 10,
                color: COLORS.main,
              },
              {
                name: "1-Blok",
                score: roundNum(c[14]?.v),
                max: 30,
                color: COLORS.secondary,
              },
              {
                name: "2-Blok",
                score: roundNum(c[15]?.v),
                max: 30,
                color: COLORS.secondary,
              },
            ],
          });
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

  const comparisonData = useMemo(() => {
    return [...student.history].reverse().map((item) => ({
      date: item.date,
      totalBall: item.totalBall,
      "1-Blok": item.stats.find((s) => s.name === "1-Blok")?.score || 0,
      "2-Blok": item.stats.find((s) => s.name === "2-Blok")?.score || 0,
      "Ona tili": item.stats.find((s) => s.name === "Ona tili")?.score || 0,
      Matematika: item.stats.find((s) => s.name === "Matematika")?.score || 0,
      Tarix: item.stats.find((s) => s.name === "Tarix")?.score || 0,
    }));
  }, [student]);

  const getDynamicWidth = () => {
    const totalEntries = comparisonData.length;
    return totalEntries <= 4 ? "100%" : `${totalEntries * 110}px`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentsData[searchId.trim()]) {
      setCurrentId(searchId.trim());
      setTestIndex(0);
      notify("Natijalar yuklandi!", "success");
    } else {
      notify("ID topilmadi! Qayta tekshiring.", "error");
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current || !currentId) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f0f2f5",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        (canvas.height * pdfWidth) / canvas.width,
      );
      pdf.save(`Result_${student.name}.pdf`);
      notify("PDF muvaffaqiyatli saqlandi!", "success");
    } catch (e) {
      notify("Xatolik yuz berdi!", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading)
    return (
      <div className="fixed z-[100] inset-0 flex items-center justify-center bg-[#f0f2f5] dark:bg-[#080808]">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20"
        >
          <img src="/logo.svg" alt="Logo" className="w-full h-full" />
        </motion.div>
      </div>
    );

  return (
    <div className="bg-[#f0f2f5] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white transition-all overflow-x-hidden relative">
      {/* --- TOAST COMPONENT --- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
              toast.type === "success"
                ? "bg-green-500/90 border-green-400 text-white"
                : "bg-red-500/90 border-red-400 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={22} />
            ) : (
              <XCircle size={22} />
            )}
            <span className="font-bold text-sm tracking-tight">
              {toast.msg}
            </span>
            <button
              onClick={() => setToast((p) => ({ ...p, show: false }))}
              className="ml-auto opacity-70 hover:opacity-100"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="min-h-screen flex flex-col pt-20 px-4 sm:px-10 pb-10">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center gap-4">
          {/* 1. NAVIGATION TOGGLE (Joyi o'zgardi) */}
          <div className="flex justify-center" data-html2canvas-ignore="true">
            <div className="inline-flex  bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white dark:border-zinc-800 shadow-lg">
              <button
                onClick={() => navigate("/dtm")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-1 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all ${location.pathname === "/dtm" ? "bg-[#39B54A] text-black shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
              >
                <User size={16} /> O'quvchi DTM ko'rsatkichi
              </button>
              <button
                onClick={() => navigate("/schooldtm")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all ${location.pathname === "/schooldtm" ? "bg-[#39B54A] text-black shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
              >
                <SchoolIcon size={16} /> Maktab DTM ko'rsatkichi
              </button>
            </div>
          </div>

          {/* 2. LOGO, TEXT VA SEARCH */}
          <div
            className="flex flex-col lg:flex-row justify-between items-center gap-6"
            data-html2canvas-ignore="true"
          >
            <div className="flex items-center gap-3">
              <Zap className="text-[#39B54A] w-7 h-7" fill="#39B54A" />
              <h1 className="text-1xl font-black uppercase italic tracking-tighter">
                DTM <span className="text-[#39B54A]">CORE</span>
              </h1>
            </div>

            <div
              className="w-full flex flex-col items-center mb-2 text-center"
              data-html2canvas-ignore="true"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white dark:border-white/5 shadow-sm"
              >
                <h2 className="text-sm sm:text-lg font-black italic uppercase tracking-tight text-slate-800 dark:text-white">
                  Ota-onalar va o'quvchilar uchun natijalarni ko'rish{" "}
                  <span>yanada oson!</span>
                </h2>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-zinc-400 mt-1">
                  Kerakli joyga ID raqam kiriting va natijalardan qulay usulda
                  foydalaning !
                </p>
              </motion.div>
            </div>

            <form
              onSubmit={handleSearch}
              className="relative w-full lg:w-[450px]"
            >
              <input
                type="text"
                placeholder="ID raqamni kiriting..."
                className="w-full py-4 sm:py-5 px-8 rounded-full bg-white dark:bg-zinc-900 shadow-2xl outline-none font-bold border-2 border-transparent focus:border-[#39B54A] transition-all"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#39B54A] p-3 rounded-full text-black hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <Search size={22} />
              </button>
            </form>
          </div>

          {/* 3. DASHBOARD CARDS */}
          <div
            ref={reportRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full"
          >
            <div className="order-1 lg:order-3 lg:col-span-3 flex flex-col gap-4">
              <div className="bg-[#0f172a] dark:bg-zinc-900 text-white p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden border border-[#39B54A]/20">
                <div className="relative z-10">
                  <p className="text-[#39B54A] font-mono font-black text-[10px] mb-2 uppercase tracking-widest">
                    ID: {currentId || "----"}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase italic leading-tight mb-6 break-words">
                    {student.name}
                  </h2>
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <InfoRow
                      icon={<Trophy size={18} className="text-[#39B54A]" />}
                      text={student.direction}
                    />
                    <InfoRow
                      icon={<School size={18} className="text-slate-400" />}
                      text={student.class}
                    />
                    <InfoRow
                      icon={<Award size={18} className="text-slate-400" />}
                      text={`${currentTest.cert} ta yutuq`}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={downloadPDF}
                disabled={!currentId || isDownloading}
                className="w-full py-4 bg-[#39B54A] hover:bg-[#2e9e3e] text-black rounded-[2rem] font-black text-xs sm:text-sm active:scale-95 shadow-xl transition-all disabled:opacity-30"
              >
                {isDownloading ? (
                  <Loader2 className="animate-spin mx-auto" size={20} />
                ) : (
                  "NATIJANI PDF YUKLASH"
                )}
              </button>
            </div>

            <div className="order-2 lg:order-2 lg:col-span-6">
              <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border dark:border-zinc-800 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8 sm:mb-10 text-right">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-[#39B54A]" />
                    <h3 className="text-lg font-black uppercase italic">
                      {currentTest.date}
                    </h3>
                  </div>
                  <div className="bg-[#39B54A]/10 px-4 py-2 rounded-xl text-center">
                    <p className="text-[8px] font-black uppercase text-slate-500">
                      Jami Ball
                    </p>
                    <p className="text-3xl font-black text-[#39B54A]">
                      {currentTest.totalBall}
                    </p>
                  </div>
                </div>
                <div className="flex-1 min-h-[280px] sm:min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentTest.stats}>
                      <CartesianGrid vertical={false} opacity={0.05} />
                      <XAxis
                        dataKey="name"
                        tick={{
                          fill: "#64748b",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide domain={[0, 32]} />
                      <Bar dataKey="score" radius={[12, 12, 0, 0]} barSize={45}>
                        {currentTest.stats.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="order-3 lg:order-1 lg:col-span-3 grid grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-4">
              <StatCard
                icon={<TrendingUp size={22} className="text-blue-500" />}
                label="Reyting"
                value={student.rank}
                color="blue"
              />
              <StatCard
                icon={<CheckCircle2 size={22} className="text-[#39B54A]" />}
                label="Grant"
                value={`${currentTest.grantChance}%`}
                color="green"
              />
              <StatCard
                icon={<Zap size={22} className="text-yellow-500" />}
                label="Percentile"
                value={`${student.percentile}%`}
                color="yellow"
              />
              <StatCard
                icon={<Brain size={22} className="text-purple-500" />}
                label="Analiz"
                value="Ijobiy"
                color="purple"
              />
            </div>
          </div>

          {student.history.length > 1 && (
            <div
              className="w-full overflow-x-auto hide-scrollbar"
              data-html2canvas-ignore="true"
            >
              <div className="flex items-center gap-3 min-w-max py-2">
                <History size={18} className="text-slate-400 mr-2" />
                {student.history.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTestIndex(i)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-black text-[10px] sm:text-xs border-2 transition-all ${testIndex === i ? "bg-[#39B54A] border-[#39B54A] text-black shadow-lg" : "bg-white dark:bg-zinc-800 text-slate-400 border-transparent"}`}
                  >
                    {t.date}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <hr />

      {/* 4. DYNAMIKA SECTION */}
      {comparisonData.length > 1 && (
        <div className="max-w-7xl mx-auto w-full px-6 py-24 flex flex-col gap-24 border-t dark:border-zinc-800">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter">
              Imtihonlar <span className="text-[#39B54A]">dinamikasi</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              Barcha natijalarning qiyosiy tahlili
            </p>
          </div>
          <hr />
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-[#39B54A] rounded-full" />
              <h3 className="text-xl font-black uppercase italic">
                To'plangan jami ballar
              </h3>
            </div>
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div style={{ width: getDynamicWidth(), minWidth: "100%" }}>
                <div className="h-[400px] sm:h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        opacity={0.05}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fontWeight: 800, fill: "#888" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          borderRadius: "20px",
                          border: "none",
                          backgroundColor: "#000",
                          color: "#fff",
                        }}
                      />
                      <Bar
                        dataKey="totalBall"
                        fill={COLORS.sub1}
                        radius={[15, 15, 0, 0]}
                        barSize={50}
                        label={{
                          position: "top",
                          fill: COLORS.main,
                          fontWeight: 900,
                          fontSize: 14,
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-[#2E3192] rounded-full" />
              <h3 className="text-xl font-black uppercase italic">
                Mutaxassislik fanlari (1-2 Bloklar)
              </h3>
            </div>
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div style={{ width: getDynamicWidth(), minWidth: "100%" }}>
                <div className="h-[400px] sm:h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} barGap={10}>
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        opacity={0.05}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fontWeight: 800, fill: "#888" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Legend
                        verticalAlign="top"
                        iconType="circle"
                        wrapperStyle={{
                          paddingBottom: "40px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          fontSize: "10px",
                        }}
                      />
                      <Bar
                        dataKey="1-Blok"
                        fill={COLORS.block1}
                        radius={[10, 10, 0, 0]}
                        barSize={35}
                        label={{
                          position: "top",
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      />
                      <Bar
                        dataKey="2-Blok"
                        fill={COLORS.block2}
                        radius={[10, 10, 0, 0]}
                        barSize={35}
                        label={{
                          position: "top",
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-[#F97316] rounded-full" />
              <h3 className="text-xl font-black uppercase italic">
                Majburiy fanlar tahlili
              </h3>
            </div>
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div style={{ width: getDynamicWidth(), minWidth: "100%" }}>
                <div className="h-[400px] sm:h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} barGap={5}>
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        opacity={0.05}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fontWeight: 800, fill: "#888" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Legend
                        verticalAlign="top"
                        iconType="circle"
                        wrapperStyle={{
                          paddingBottom: "40px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          fontSize: "10px",
                        }}
                      />
                      <Bar
                        dataKey="Ona tili"
                        fill={COLORS.sub1}
                        radius={[8, 8, 0, 0]}
                        barSize={20}
                      />
                      <Bar
                        dataKey="Matematika"
                        fill={COLORS.sub2}
                        radius={[8, 8, 0, 0]}
                        barSize={20}
                      />
                      <Bar
                        dataKey="Tarix"
                        fill={COLORS.sub3}
                        radius={[8, 8, 0, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 text-center opacity-10 text-[10px] font-black uppercase tracking-[1em] select-none">
        Istiqbolluck.uz v0.2
      </footer>
      <style
        dangerouslySetInnerHTML={{
          __html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,
        }}
      />
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const themes = {
    blue: "border-blue-500/10 bg-blue-500/5",
    yellow: "border-yellow-500/10 bg-yellow-500/5",
    purple: "border-purple-500/10 bg-purple-500/5",
    green: "border-[#39B54A]/10 bg-[#39B54A]/5",
  };
  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border ${themes[color]} flex items-center gap-3 sm:gap-5 bg-white dark:bg-zinc-900 shadow-xl transition-transform hover:scale-[1.02]`}
    >
      <div className="p-2 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl sm:rounded-2xl shadow-md border dark:border-zinc-700">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-lg sm:text-2xl font-black dark:text-white leading-none mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-4 text-white/80">
      <div className="p-2 bg-white/5 rounded-xl border border-white/5">
        {icon}
      </div>
      <span className="font-bold text-xs sm:text-sm tracking-tight">
        {text}
      </span>
    </div>
  );
}
