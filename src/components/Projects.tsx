import { motion } from "framer-motion";

const projects = [
  {
    title: "Netrarakshak",
    desc: "AI-powered eye health monitoring system using computer vision.",
  },
  {
    title: "Project Trinetra",
    desc: "Cybersecurity AI system for anomaly detection and threat analysis.",
  },
  {
    title: "Jeeva Rakshaka",
    desc: "AI-based soldier safety and tracking system.",
  },
  {
    title: "CanisSense",
    desc: "AI system to predict street dog attack risks.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <h2 className="text-3xl md:text-4xl text-center font-semibold mb-12">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 rounded-2xl hover:scale-[1.03] hover:border-gray-600 transition duration-300"
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-purple-500 blur-2xl transition"></div>

            <h3 className="text-xl font-bold mb-3 relative z-10">
              {p.title}
            </h3>

            <p className="text-gray-400 relative z-10">
              {p.desc}
            </p>

            <div className="mt-4 flex gap-4 text-sm relative z-10">
              <a
                href="#"
                className="px-3 py-1 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition"
              >
                Live
              </a>

              <a
                href="#"
                className="px-3 py-1 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}