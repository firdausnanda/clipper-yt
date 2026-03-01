import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import { Video } from "lucide-react";

export default function Navbar({ auth }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-50 sticky top-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm"
    >
      <div className="flex items-center justify-between py-4 max-w-screen-xl mx-auto px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-lg shadow-indigo-500/30"
          >
            <Video className="text-white w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            ClipTube<span className="text-indigo-500">.</span>
          </h1>
        </Link>
        <div>
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="group relative inline-flex items-center justify-center bg-slate-900 text-white px-6 py-2.5 rounded-full shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 transition-all active:scale-95 font-semibold text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              <span className="relative">Dashboard Aplikasi</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href={route('login')}
                className="text-slate-600 font-semibold hover:text-indigo-600 hover:bg-slate-100/80 px-4 py-2.5 rounded-full transition-all text-sm active:scale-95"
              >
                Masuk
              </Link>
              <Link
                href={route('register')}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-2.5 rounded-full shadow-md shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all active:scale-95 font-bold text-sm overflow-hidden ring-1 ring-inset ring-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                <span className="relative">Daftar Gratis</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
