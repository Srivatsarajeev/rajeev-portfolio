import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-24 text-center px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        About Me
      </h2>

      <p className="max-w-2xl mx-auto text-gray-400">
        I am an MCA student focused on building real-world AI systems that solve critical problems.
        My work combines Machine Learning, Computer Vision, and DevOps to create scalable applications.
      </p>
    </motion.section>
  );
}