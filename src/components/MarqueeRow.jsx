import { Star } from "lucide-react";

export default function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="py-4 md:py-10 overflow-hidden flex whitespace-nowrap bg-white dark:bg-[#050505] border-y border-zinc-100 dark:border-zinc-900 select-none w-full">
      <div
        className={`flex gap-6 md:gap-20 items-center ${
          reverse ? "animate-scroll-reverse" : "animate-scroll"
        }`}
      >
        {/* Ma'lumotlarni 4 marta takrorlaymiz */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 md:gap-20 group shrink-0"
          >
            {/* Responsiv Text: 300px da text-2xl, desktopda text-8xl */}
            <div
              className="text-2xl sm:text-4xl md:text-8xl font-black uppercase italic tracking-tighter 
              text-zinc-900 dark:text-white/20 dark:text-[#39B54A] transition-colors duration-500 cursor-default shrink-0"
            >
              {item}
            </div>

            {/* Responsiv Ikonka: size kichrayadi */}
            <Star
              className="text-[#39B54A] fill-[#39B54A] shrink-0"
              size={18} // Mobile default
              style={{
                width: "clamp(18px, 4vw, 32px)",
                height: "clamp(18px, 4vw, 32px)",
              }}
            />
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 40s linear infinite;
        }
        /* Mobil qurilmalarda barmoq bilan bosib turganda ham sekinlashishi uchun */
        .animate-scroll:hover, .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
        /* 300px ekranlar uchun maxsus moslashuv */
        @media (max-width: 350px) {
          .animate-scroll, .animate-scroll-reverse {
            animation-duration: 25s; /* Kichik ekranda tezroq tuyulmasligi uchun */
          }
        }
      `,
        }}
      />
    </div>
  );
}
