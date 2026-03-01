import { motion } from "framer-motion";
import { LinkIcon, Scissors, Download } from "lucide-react";

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="relative z-10 max-w-screen-xl mx-auto px-6 pb-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={item} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 group">
          <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-100 transition-colors">
            <LinkIcon className="w-9 h-9 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="font-bold text-2xl tracking-tight text-slate-900 mb-3">1. Tempel Link</h3>
          <p className="text-slate-500 font-medium leading-relaxed">Masukkan URL video YouTube panjang Anda ke mesin kami yang super cepat. Kami akan memprosesnya secara instan.</p>
        </motion.div>

        <motion.div variants={item} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-300 group">
          <div className="bg-pink-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-pink-100 transition-colors">
            <Scissors className="w-9 h-9 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="font-bold text-2xl tracking-tight text-slate-900 mb-3">2. Pilih Frame</h3>
          <p className="text-slate-500 font-medium leading-relaxed">Gunakan editor intuitif kami untuk menemukan momen yang tepat hingga milidetik. Seret pegangan untuk menangkap momen sempurna.</p>
        </motion.div>

        <motion.div variants={item} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 group">
          <div className="bg-emerald-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-100 transition-colors">
            <Download className="w-9 h-9 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="font-bold text-2xl tracking-tight text-slate-900 mb-3">3. Ekspor & Bagikan</h3>
          <p className="text-slate-500 font-medium leading-relaxed">Unduh klip Anda dalam kualitas asli atau buat tautan langsung yang dioptimalkan untuk media sosial.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
