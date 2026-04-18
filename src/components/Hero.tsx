import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-20 top-20 left-20"></div>

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
        >
          <Typewriter
            words={["Rajeev M", "AI Engineer", "DevOps Enthusiast"]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-gray-400 text-lg"
        >
          Building intelligent systems that protect, predict, and save lives.
        </motion.p>
      </div>
    </section>
  );
}