import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  X,
  Filter,
  Clock,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const currentCategory = activeCategory || t.blog_all;

  const categories = useMemo(() => {
    return [t.blog_all, ...new Set(t.blogPosts.map((post) => post.category))];
  }, [t.blog_all, t.blogPosts]);

  const filteredPosts =
    currentCategory === t.blog_all
      ? t.blogPosts
      : t.blogPosts.filter((post) => post.category === currentCategory);

  return (
    <div className="pt-20 pb-24 bg-[#fbfcff] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      
      {/* 1. HERO */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39B54A]/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                  <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                    {t.blog_subtitle}
                  </h4>
                  <h1 className="text-4xl md:text-7xl font-black dark:text-white uppercase tracking-tighter leading-[0.9] italic">
                    {t.blog_title1} <span className="text-[#39B54A]">&</span> <br/>
                    {t.blog_title2}
                  </h1>
              </div>
              <div className="max-w-md mx-auto md:mx-0 text-left">
                  <div className="w-12 h-[3px] bg-[#39B54A] opacity-30 mb-4"></div>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-base leading-relaxed">
                    {t.blog_desc}
                  </p>
              </div>
           </div>
        </div>
      </section>

      {/* 2. FILTERS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 text-[#39B54A] shadow-sm">
            <Filter size={18} />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                currentCategory === cat
                  ? "bg-[#39B54A] text-white shadow-lg shadow-green-500/20"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-100 dark:border-zinc-800 hover:border-[#39B54A]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. BLOG GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/blog/${post.id}`} className="group block h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[16/10] mb-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={post.title}
                    />
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-sm flex items-center gap-2">
                            <Calendar size={10} className="text-[#39B54A]" />
                            <span className="text-[9px] font-black uppercase tracking-wider dark:text-white">{post.date}</span>
                        </div>
                    </div>

                    {/* Arrow Overlay */}
                     <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-full scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                           <ArrowUpRight size={20} className="text-black" />
                        </div>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow px-2">
                    <div className="flex items-center justify-between mb-3 text-[9px] font-black uppercase text-zinc-400 tracking-wider">
                        <span>{post.category}</span>
                        <span className="flex items-center gap-1"><Clock size={10}/> {t.blog_read_time}</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-black dark:text-white leading-tight mb-3 uppercase italic group-hover:text-[#39B54A] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                      {post.desc}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#39B54A] tracking-widest mt-auto group-hover:translate-x-2 transition-transform">
                        {t.blog_read_more} <ArrowRight size={12}/>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. CERTIFICATES SECTION */}
      <section className="bg-white dark:bg-[#080808] py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  {t.cert_subtitle}
              </h4>
               <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter leading-none">
                  {t.cert_title1} <span className="text-[#39B54A]">{t.cert_title2}</span>
               </h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {t.certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedCert(cert)}
                    className="group cursor-pointer relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-lg"
                  >
                      <img src={cert.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cert" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <p className="text-[#39B54A] text-[9px] font-black uppercase tracking-widest mb-1">{cert.teacher}</p>
                          <p className="text-white text-xs font-bold uppercase leading-tight line-clamp-2">{cert.title}</p>
                      </div>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedCert(null)}
          >
             <motion.div
               initial={{ scale: 0.95 }} 
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               onClick={(e) => e.stopPropagation()}
               className="bg-white dark:bg-[#101010] w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative shadow-2xl"
             >
                <div className="w-full md:w-1/2 bg-zinc-100 dark:bg-black flex items-center justify-center p-8 md:p-12">
                   <img src={selectedCert.img} className="max-w-full max-h-[60vh] md:max-h-full object-contain shadow-2xl rounded-xl" alt="Certificate" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
                    <button
                        onClick={() => setSelectedCert(null)}
                        className="absolute top-6 right-6 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-[#39B54A] hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                    
                    <span className="text-[#39B54A] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{t.cert_detail_label}</span>
                    <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase leading-none italic mb-8">{selectedCert.title}</h2>
                    
                    <div className="pl-4 border-l-2 border-[#39B54A] mb-8">
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm italic mb-2">{t.cert_confirm_text}</p>
                        <p className="text-lg font-black dark:text-white uppercase not-italic">{selectedCert.teacher}</p>
                    </div>

                    <button
                        onClick={() => setSelectedCert(null)}
                        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#39B54A] dark:hover:bg-[#39B54A] hover:text-white transition-colors"
                    >
                        {t.close}
                    </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
