import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState("");
  const [days, setDays] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [visits, setVisits] = useState(0);

  // TIME
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // DAYS ALIVE
  useEffect(() => {
    const birth = new Date("2003-05-14");
    const diff = Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24));
    setDays(diff);
  }, []);

  // VISITOR COUNT (local)
  useEffect(() => {
    let v = Number(localStorage.getItem("visits") || "0");
    v++;
    localStorage.setItem("visits", v.toString());
    setVisits(v);
  }, []);

  // ALL PHOTOS
  const allPhotos = [
    "/photos/PXL_20251116_100149096.jpg",
    "/photos/PXL_20251122_153412172.MP.jpg",
    "/photos/PXL_20251204_122646073.MP.jpg",
    "/photos/PXL_20251227_125457608.MP.jpg",
    "/photos/PXL_20260307_152815277.jpg",
    "/photos/PXL_20250321_131506498.jpg"
  ];

  // RANDOM 4
  const randomPhotos = [...allPhotos].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="container">

      {/* HERO */}
      <div className="hero">
        <img src="/profile.jpg" className="profile"/>

        <div>
          <h1>Rajeev Srivatsa</h1>
          <div className="subtitle">ML • DevOps • Cloud</div>
          <div className="subtitle">{time} • {days} days alive</div>

          {/* SOCIAL */}
          <div className="socials">
            <a href="https://github.com/Srivatsarajeev">🐙</a>
            <a href="https://linkedin.com">💼</a>
            <a href="mailto:rajeevsrivatsa7@gmail.com">📧</a>
            <a href="https://instagram.com">📸</a>
          </div>

          {/* SPOTIFY */}
          <div className="spotify">
            🎧 the night we met — lord huron
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="card">
        <b>About</b><br/>
        i build scalable and intelligent systems using machine learning, cloud infrastructure and devops.
      </div>

      {/* SKILLS */}
      <div className="card">
        <h3>Skills</h3>
        <div className="skills">
          <div className="skill">🐍 Python</div>
          <div className="skill">🐳 Docker</div>
          <div className="skill">☁️ AWS</div>
          <div className="skill">🧠 ML</div>
          <div className="skill">⚛️ React</div>
          <div className="skill">🟢 Node</div>
        </div>
      </div>

      {/* PHOTOS */}
      <div className="card">
        <h3>Photos</h3>

        <div className="photo-grid">
          {(showAll ? allPhotos : randomPhotos).map((p, i) => (
            <img key={i} src={p}/>
          ))}
        </div>

        <button className="view-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? "show less" : "view more"}
        </button>
      </div>

      {/* WRITING */}
      <div className="card">
        <h3>Writing</h3>
        sometimes i write. read if you want.
      </div>

      {/* EXPERIENCE */}
      <div className="card">
        <h3>Experience</h3>
        HUDL — Sports Data Analyst • India
      </div>

      {/* VISITS */}
      <div style={{marginTop: "20px", opacity: 0.6}}>
        {visits} visits
      </div>

    </div>
  );
}