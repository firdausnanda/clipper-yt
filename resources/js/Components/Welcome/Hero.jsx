import { motion } from "framer-motion";
import { Scissors, Link as LinkIcon, Sparkles, CheckCircle2 } from "lucide-react";
import BackgroundShapes from "./BackgroundShapes";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Hero() {
  return (
    <section className="relative text-center pt-24 pb-32 max-w-screen-xl mx-auto px-6 overflow-hidden">
      <BackgroundShapes />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 border border-indigo-200 bg-white/50 backdrop-blur-md rounded-full text-sm font-semibold text-indigo-700 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Cara Baru Berbagi Momen Terbaik
          </span>
        </motion.div>

        <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] mb-8 text-slate-900">
          Potong & Bagikan YouTube <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Tanpa Repot.</span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-slate-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Tempel link YouTube apa pun untuk mengekstrak cuplikan video berkualitas tinggi dalam hitungan detik. Dirancang khusus untuk kreator dan gamer.
        </motion.p>

        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto w-full">
          <div className="relative group flex flex-col md:flex-row gap-3 p-3 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-white focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 -z-10"></div>
            <div className="flex items-center flex-1 px-6 bg-slate-50/50 rounded-full border border-slate-100">
              <LinkIcon className="w-6 h-6 text-slate-400 mr-2" />
              <input
                className="w-full border-none focus:outline-none focus:ring-0 py-5 text-lg md:text-xl bg-transparent text-slate-800 placeholder:text-slate-400"
                placeholder="Tempel URL video YouTube Anda..."
                type="text"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-10 py-5 text-lg md:text-xl font-bold rounded-[1.8rem] hover:from-indigo-500 hover:to-indigo-400 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 transition-all w-full md:w-auto mt-2 md:mt-0">
              <Scissors className="w-5 h-5 fill-white" />
              Start Clipping
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold text-slate-500">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Mendukung 4K & HDR</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Tanpa Watermark</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 100% Gratis Selamanya</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
