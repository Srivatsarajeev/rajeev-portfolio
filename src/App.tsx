import "./App.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

/* AUTO LOAD PHOTOS */
const images = import.meta.glob("/public/photos/*.{jpg,jpeg,png}", {
  eager: true,
  as: "url",
});
const imageList = Object.values(images);

export default function App() {
  const [showAll, setShowAll] = useState(false);
  const [visits, setVisits] = useState(0);

  /* RANDOM 4 IMAGES */
  const randomPhotos = [...imageList]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  /* REAL VISIT COUNT */
  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/rajeev-portfolio-v2/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.value));
  }, []);

  return (
    <div className="container">
      {/* HERO */}
      <div className="hero">
        <img src="/profile.jpg" alt="profile" />

        <div>
          <motion.div
            className="name"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            hey, i’m Rajeev Srivatsa
          </motion.div>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            slightly confused, mostly curious. <br />
            i build stuff with ml, cloud, and devops — and figure things out along the way.
          </motion.p>

          {/* SOCIAL ICONS */}
          <div className="icons">
            <a href="https://github.com" target="_blank">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin />
            </a>
            <a href="mailto:youremail@gmail.com">
              <FaEnvelope />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram />
            </a>
          </div>

          {/* RESUME BUTTON */}
          <a href="/resume.pdf" target="_blank" className="resume">
            view resume
          </a>
        </div>
      </div>

      {/* ABOUT */}
      <div className="card">
        <h2>About</h2>
        <p>
          building things out of curiosity. sometimes useful, sometimes random.
          but always learning.
        </p>
      </div>

      {/* SKILLS */}
      <div className="card">
        <h2>Skills</h2>
        <div className="skills">
          <div className="skill">Python</div>
          <div className="skill">MERN</div>
          <div className="skill">Machine Learning</div>
          <div className="skill">AWS</div>
          <div className="skill">Docker</div>
          <div className="skill">Kubernetes</div>
          <div className="skill">CI/CD</div>
          <div className="skill">Linux</div>
          <div className="skill">Git</div>
          <div className="skill">APIs</div>
        </div>
      </div>

      {/* PHOTOS */}
      <div className="card">
        <h2>Photos</h2>
        <p>captured chaos. zero planning. pure luck.</p>

        <div className="grid">
          {(showAll ? imageList : randomPhotos).map((img, i) => (
            <motion.img
              key={i}
              src={img}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "show less" : "view more"}
        </button>
      </div>

      {/* WRITING */}
      <div className="card">
        <h2>Writing</h2>
        <p>sometimes i write, read if you want.</p>
      </div>

      {/* EXPERIENCE */}
      <div className="card">
        <h2>Experience</h2>
        <p>HUDL — Sports Data Analyst • India</p>
      </div>

      {/* EDUCATION */}
      <div className="card">
        <h2>Education</h2>
        <p>Master of Computer Application — BMS Institute of Technology</p>
      </div>

      {/* VISITS */}
      <p className="visits">{visits} visits</p>

      {/* FOOTER */}
      <p className="footer">
        made with intent — rajeev srivatsa
      </p>
    </div>
  );
}