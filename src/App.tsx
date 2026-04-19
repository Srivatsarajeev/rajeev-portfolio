import "./App.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

/* FIXED IMAGE LOADER (VERCEL SAFE) */
const images = import.meta.glob("/photos/*.{jpg,jpeg,png,JPG,PNG}", {
  eager: true,
  as: "url",
});
const imageList = Object.values(images);

/* DAYS ALIVE */
const birth = new Date("2003-05-14");
const daysAlive = Math.floor(
  (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24)
);

export default function App() {
  const [visits, setVisits] = useState(0);
  const [showAll, setShowAll] = useState(false);

  /* VISITOR COUNT */
  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/rajeev-final-portfolio/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.value));
  }, []);

  /* RANDOM 4 IMAGES */
  const randomPhotos = [...imageList]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="container">

      {/* HERO */}
      <div className="hero">
        <img src="/profile.jpg" alt="profile" />

        <div>
          <h1 className="name">hey, i’m Rajeev Srivatsa</h1>

          <p className="subtitle">
            slightly confused, mostly curious.<br />
            i build stuff with ml, cloud, and devops.
          </p>

          <p className="meta">{daysAlive} days alive</p>

          {/* ICONS */}
          <div className="icons">
            <a href="https://github.com/Srivatsarajeev" target="_blank"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank"><FaLinkedin /></a>
            <a href="mailto:rajeevsrivatsa7@gmail.com"><FaEnvelope /></a>
            <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
          </div>

          {/* RESUME */}
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
          <span>Python</span>
          <span>MERN</span>
          <span>ML</span>
          <span>AWS</span>
          <span>Docker</span>
          <span>Kubernetes</span>
          <span>CI/CD</span>
        </div>
      </div>

      {/* PHOTOS */}
      <div className="card">
        <h2>Photos</h2>
        <p>captured chaos. zero planning. pure luck.</p>

        <div className="grid">
          {(showAll ? imageList : randomPhotos).map((img, i) => (
            <img key={i} src={img} />
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

      {/* FOOTER */}
      <p className="visits">{visits} visits</p>
      <p className="footer">made with intent — rajeev srivatsa</p>
    </div>
  );
}