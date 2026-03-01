import { motion } from "framer-motion";

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center">
      <div className="w-[100%] max-w-7xl relative h-full">
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl opacity-70"
        />
        <motion.div
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1], rotate: [0, -10, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 -right-20 w-[30rem] h-[30rem] bg-pink-300/20 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl opacity-50"
        />
      </div>
    </div>
  );
}
