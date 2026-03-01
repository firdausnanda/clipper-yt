import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/30"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -right-[10%] w-[100%] max-w-2xl aspect-square bg-indigo-500/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[50%] -left-[10%] w-[100%] max-w-2xl aspect-square bg-pink-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <Zap className="w-12 h-12 text-indigo-400 mb-6" />
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Siap meningkatkan alur kerja konten Anda?</h3>
          <p className="text-slate-300 text-lg md:text-xl mb-12 font-medium">Bergabung dengan lebih dari 100.000 kreator yang mengubah konten panjang mereka menjadi klip viral setiap harinya.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <button className="bg-white text-slate-900 px-10 py-4 font-bold rounded-full hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 w-full sm:w-auto">
              Mulai Gratis
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 font-bold rounded-full hover:bg-white/20 hover:border-white/40 active:scale-95 transition-all w-full sm:w-auto">
              Jelajahi Fitur
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
