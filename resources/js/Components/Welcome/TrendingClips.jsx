import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Play } from "lucide-react";

export default function TrendingClips() {
  const clips = [
    {
      id: 1,
      title: "Insane Clutch 1v5",
      author: "ValorantDaily",
      duration: "0:45",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      views: "1.2M",
      category: "Gaming"
    },
    {
      id: 2,
      title: "M2 Chip Review Setup",
      author: "TechHaven",
      duration: "1:20",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      views: "854K",
      category: "Tech"
    },
    {
      id: 3,
      title: "Mindfulness Routine",
      author: "ZenHabits",
      duration: "0:30",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
      views: "420K",
      category: "Lifestyle"
    },
    {
      id: 4,
      title: "Cinematic FPV Drone",
      author: "SkyHigh",
      duration: "2:15",
      image: "https://images.unsplash.com/photo-1524143987108-de7663e26cb3?q=80&w=2070&auto=format&fit=crop",
      views: "2.1M",
      category: "Cinematography"
    }
  ];

  return (
    <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-40">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">Temukan</span>
          </div>
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">Trending</h3>
        </div>
        <button className="group flex items-center gap-2 text-sm font-bold bg-white border border-slate-200 px-6 py-3 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-all">
          Jelajahi Semua Klip
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {clips.map((clip, index) => (
          <motion.div
            key={clip.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-200 cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                src={clip.image}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                  {clip.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-slate-900/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Play className="w-3 h-3 fill-current" />
                  {clip.duration}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="bg-white/20 backdrop-blur-xl p-5 rounded-full border border-white/30 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out shadow-2xl"
                >
                  <Play className="text-white fill-white w-8 h-8 ml-1" />
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="font-bold text-xl text-white mb-2 leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">{clip.title}</h4>
                <div className="flex items-center justify-between text-slate-300 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500"></div>
                    {clip.author}
                  </span>
                  <span>{clip.views} tayangan</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
