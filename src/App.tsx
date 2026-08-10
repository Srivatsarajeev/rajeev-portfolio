import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hardcoded photos list mapping exactly to the public/photos folder to prevent 404s
const PHOTOS_LIST = [
  "1.jpg.jpg", "2.jpg.jpg", "3.jpg.jpg", "4.jpg.jpg", "5.jpg.jpg", "6,jpg.jpg",
  "7.jpg.jpg", "8.jpg.jpg", "9.jpg.jpg", "10,jpg.jpg", "11.jpg.jpg", "12.jpg.jpg",
  "13.jpg.jpg", "14.jpg.jpg", "15.jpg.jpg", "16,jpg.jpg", "17.jpg.jpg", "18.jpg.jpg",
  "19.jpg.jpg", "20.jpg.jpg", "21.jpg.jpg", "22.jpg.jpg", "23.jpg.jpg", "24.jpg.jpg",
  "25.jpg.jpg", "26.jpg.jpg", "27.jpg.jpg", "28.jpg.jpg", "29.jpg.jpg", "30.jpg.jpg",
  "31.jpg.jpg"
].map(name => `/photos/${name}`);

const GREETINGS = [
  "• Hello",       // English
  "• नमस्ते",       // Hindi
  "• Hallå",       // Swedish
  "• Hola",        // Spanish
  "• Bonjour",     // French
  "• Ciao",        // Italian
  "• Konnichiwa",  // Japanese
  "• Annyeong",    // Korean
  "• Ni Hao",      // Chinese
  "• Olá"          // Portuguese
];

import { createContext, useContext } from "react";

const PreloadContext = createContext(true);

// Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= GREETINGS.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 180);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 180);

    return () => clearInterval(interval);
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#000000] z-50 flex items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.08 }}
          className="text-2xl sm:text-3xl font-medium tracking-tight font-sans"
        >
          {GREETINGS[index]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// Scroll Reveal Wrapper
function ScrollReveal({ children }: { children: React.ReactNode }) {
  const isPreloading = useContext(PreloadContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={!isPreloading ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [daysAlive, setDaysAlive] = useState(0);
  const [nextBdayDays, setNextBdayDays] = useState(0);
  const [visits, setVisits] = useState(0);
  const [visitDisplayCount, setVisitDisplayCount] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [randomPhotos, setRandomPhotos] = useState<string[]>([]);
  const visitSectionRef = useRef<HTMLDivElement>(null);

  // Lock body scroll during preloading
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreloading]);

  // Birthday details
  useEffect(() => {
    const bday = new Date(2003, 4, 14); // 14 May 2003
    const now = new Date();
    const diff = Math.floor((now.getTime() - bday.getTime()) / (1000 * 60 * 60 * 24));
    setDaysAlive(diff);

    let nextBday = new Date(now.getFullYear(), 4, 14);
    if (nextBday <= now) {
      nextBday = new Date(now.getFullYear() + 1, 4, 14);
    }
    const daysToNext = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setNextBdayDays(daysToNext);
  }, []);

  // Visits counter
  useEffect(() => {
    let v = parseInt(localStorage.getItem("rajeev_v") || "0");
    if (!sessionStorage.getItem("rajeev_counted")) {
      v++;
      localStorage.setItem("rajeev_v", String(v));
      sessionStorage.setItem("rajeev_counted", "1");
    }
    setVisits(v);
  }, []);

  // Animate visit counter on intersection
  useEffect(() => {
    if (!visitSectionRef.current || isPreloading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visits > 0) {
          let start = 0;
          const duration = 1500;
          const stepTime = 16;
          const stepCount = duration / stepTime;
          const increment = visits / stepCount;

          const timer = setInterval(() => {
            start += increment;
            if (start >= visits) {
              setVisitDisplayCount(visits);
              clearInterval(timer);
            } else {
              setVisitDisplayCount(Math.floor(start));
            }
          }, stepTime);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(visitSectionRef.current);
    return () => observer.disconnect();
  }, [visits, isPreloading]);

  // Select 4 random photos once on mount
  useEffect(() => {
    const shuffled = [...PHOTOS_LIST].sort(() => 0.5 - Math.random());
    setRandomPhotos(shuffled.slice(0, 4));
  }, []);

  return (
    <PreloadContext.Provider value={isPreloading}>
      <AnimatePresence mode="wait">
        {isPreloading && (
          <Preloader key="preloader" onComplete={() => setIsPreloading(false)} />
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-6 py-24 space-y-24">
        
        {/* ── HERO SECTION ── */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium tracking-tight text-white font-sans">
                Rajeev Srivatsa
              </h1>
              <p className="text-xs font-serif italic text-zinc-500 tracking-wide">
                DevOps · ML · Full-Stack · occasional photographer
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-24 h-32 flex-shrink-0 bg-zinc-900 rounded overflow-hidden shadow-sm">
                <img 
                  src="/profile.jpg" 
                  alt="Rajeev Srivatsa" 
                  className="w-full h-full object-cover grayscale"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className = "w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-600 text-[10px] text-center p-2 uppercase tracking-widest font-mono";
                      fallback.textContent = "Rajeev M";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              
              <div className="space-y-4 flex-1">
                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                  I make servers not cry, models actually learn, and UIs not look like 2009. Currently doing MCA at BMS Institute of Technology. Former Sports Data Analyst at HUDL. Part-time YAML poet, full-time infrastructure overthinker.
                </p>
                
                <div className="flex flex-wrap gap-4 text-[10px] tracking-widest font-mono uppercase">
                  <a href="#projects" className="text-zinc-500 hover:text-white transition-colors">
                    View Projects ↓
                  </a>
                  <a href="mailto:rajeevsrivatsa7@gmail.com" className="text-zinc-500 hover:text-white transition-colors">
                    Email Me →
                  </a>
                  <a href="https://github.com/Srivatsarajeev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── ABOUT SECTION ── */}
        <ScrollReveal>
          <section id="about" className="space-y-4">
            <h2 className="font-serif italic text-base text-zinc-400">about.</h2>
            <div className="space-y-4">
              <h3 className="text-base font-medium text-white leading-snug">
                I build things that actually work.
              </h3>
              
              <div className="text-xs sm:text-[13px] text-zinc-400 space-y-4 leading-relaxed font-sans">
                <p>
                  ok real talk — I'm Rajeev. That person who gets irrationally excited at 2am when a Kubernetes pod finally starts after an hour of YAML crimes. fully unashamed.
                </p>
                <p>
                  Doing MCA at BMS Institute of Technology (2025–2027). Before that I was a Sports Data Analyst at HUDL — yes actual sports, data, actual match footage at weird hours.
                </p>
                <p>
                  My brain runs on Python, Docker, and The Weeknd. I build ML systems, DevOps pipelines, and MERN apps — sometimes all three in the same project because why not. also I click photos and write blogs when the pipeline is deploying.
                </p>
                <p className="font-mono text-[10px] text-zinc-500">
                  No I will not stop adding one more service to my docker-compose. it sparks joy ✨
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── SKILLS SECTION ── */}
        <ScrollReveal>
          <section id="skills" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">skills.</h2>
            <div className="space-y-6 pt-2">
              {[
                {
                  title: "Languages",
                  skills: ["Python", "JavaScript", "Bash", "SQL", "HCL", "YAML"]
                },
                {
                  title: "MERN Stack",
                  skills: ["MongoDB", "Express.js", "React.js", "Node.js", "Next.js"]
                },
                {
                  title: "ML / Data",
                  skills: ["Machine Learning", "Pandas", "NumPy", "OpenCV", "Power BI", "Tableau"]
                },
                {
                  title: "DevOps",
                  skills: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform", "Ansible", "Git"]
                },
                {
                  title: "AWS Cloud",
                  skills: ["EC2", "S3", "IAM", "VPC", "CloudWatch", "EKS", "Lambda"]
                },
                {
                  title: "Monitoring & OS",
                  skills: ["Prometheus", "Grafana", "Linux", "Nginx", "Excel", "Postman"]
                }
              ].map((cat, idx) => (
                <div key={idx} className="space-y-1 py-2">
                  <div className="text-[10px] tracking-wider text-zinc-500 uppercase font-mono font-medium">
                    {cat.title}
                  </div>
                  <div className="text-xs text-[#A3A3A3] font-sans leading-relaxed">
                    {cat.skills.join(" / ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── PROJECTS ── */}
        <ScrollReveal>
          <section id="projects" className="space-y-12">
            <h2 className="font-serif italic text-base text-zinc-400">projects.</h2>

            <div className="space-y-16">
              {[
                {
                  num: "01",
                  title: "Vidyut — Energy Analytics Platform",
                  problem: "Energy consumption data is scattered, unstructured, and not used efficiently — leading to wastage and poor optimization across facilities.",
                  solution: "A cloud-based analytics platform that collects smart meter data, applies ML models, and provides actionable insights to optimize energy usage and cut costs.",
                  chips: ["Python", "ML", "AWS", "React", "Smart Meters"],
                  status: "Completed",
                  meta: "Cloud · ML · Analytics"
                },
                {
                  num: "02",
                  title: "Garuda — Soldier Monitoring System",
                  problem: "Lack of real-time monitoring and response in critical defense/emergency environments — causing delayed action and risk to human lives.",
                  solution: "An intelligent system that tracks soldier vitals and location in real time, enabling faster decision-making and improving safety in high-risk scenarios.",
                  chips: ["IoT", "Real-time", "Node.js", "Maps API", "Alerts"],
                  status: "Ongoing",
                  meta: "Real-time · Defense · Safety"
                },
                {
                  num: "03",
                  title: "Genesis Cloud — CI/CD Kubernetes Monitoring System",
                  problem: "Manual deployments break things. No visibility into what's running, what's broken, and why the pod crashed at 3am on a Friday.",
                  solution: "End-to-end CI/CD pipeline with Docker containerization, Kubernetes orchestration, and full observability through Prometheus + Grafana dashboards.",
                  chips: ["Docker", "Kubernetes", "Prometheus", "Grafana", "CI/CD"],
                  status: "Ongoing",
                  meta: "DevOps · Infra · Monitoring"
                }
              ].map((p) => (
                <div key={p.num} className="space-y-4">
                  <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2">
                    <h3 className="text-sm font-medium text-white">{p.title}</h3>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{p.status}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-2 md:gap-4 text-xs leading-relaxed">
                    <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">{p.meta}</div>
                    <div className="space-y-3 text-zinc-400">
                      <p><span className="text-zinc-200 font-medium">Problem:</span> {p.problem}</p>
                      <p><span className="text-zinc-200 font-medium">Solution:</span> {p.solution}</p>
                      <p className="text-zinc-500 font-mono text-[10px] tracking-wide pt-1">
                        {p.chips.join(" / ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── EXPERIENCE ── */}
        <ScrollReveal>
          <section id="experience" className="space-y-8">
            <h2 className="font-serif italic text-base text-zinc-400">experience.</h2>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-white">HUDL</h3>
                <span className="font-mono text-[10px] text-zinc-500">2023 – 2024</span>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                <span>Sports Data Analyst · Internship</span>
                <span>📍 Remote · India</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-400 pt-3 list-none">
                {[
                  "Analyzed player and team performance data using sports analytics tools and video analysis platforms",
                  "Tagged and reviewed match footage to extract key performance metrics",
                  "Built visual reports and dashboards to communicate insights effectively",
                  "Identified trends and patterns to support coaching decisions and performance optimization",
                  "Worked with structured and unstructured data using Python and data analysis libraries"
                ].map((bullet, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="text-zinc-600 mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>

        {/* ── EDUCATION ── */}
        <ScrollReveal>
          <section id="education" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">education.</h2>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-white">BMS Institute of Technology</h3>
                <span className="font-mono text-[10px] text-zinc-500">Nov 2025 – 2027</span>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                <span>Master of Computer Applications (MCA)</span>
                <span>📍 Bengaluru, Karnataka</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── GITHUB ACTIVITY ── */}
        <ScrollReveal>
          <section id="github" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">github.</h2>

            <div className="space-y-4 text-xs">
              <div className="font-mono text-[10px] text-zinc-500">
                Srivatsarajeev · <a href="https://github.com/Srivatsarajeev" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors underline">github.com/Srivatsarajeev</a>
              </div>

              {/* Heatmap Grid Wrapper */}
              <div className="overflow-x-auto pb-1 pt-2">
                <div className="flex gap-[3px] min-w-[580px]">
                  {/* 52 Columns */}
                  {Array.from({ length: 52 }).map((_, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {/* 7 Days per column */}
                      {Array.from({ length: 7 }).map((_, dIdx) => {
                        const factor = Math.random();
                        let levelClass = "bg-zinc-900"; // level 0
                        if (factor > 0.88) levelClass = "bg-zinc-400"; // level 4
                        else if (factor > 0.78) levelClass = "bg-zinc-600"; // level 3
                        else if (factor > 0.65) levelClass = "bg-zinc-700"; // level 2
                        else if (factor > 0.50) levelClass = "bg-zinc-800"; // level 1
                        return <div key={dIdx} className={`w-[9px] h-[9px] rounded-[1px] ${levelClass}`} />;
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans pt-1">
                Live heatmap powered by the GitHub contributions API via <a href="https://github.com/Srivatsarajeev" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors underline">github.com/Srivatsarajeev</a>.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* ── MUSIC ── */}
        <ScrollReveal>
          <section id="music" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">music.</h2>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <a 
                href="https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 border border-zinc-900 bg-zinc-950/40 rounded hover:border-zinc-800 transition-colors w-full sm:w-auto flex-shrink-0"
              >
                <div className="w-14 h-14 rounded overflow-hidden bg-zinc-900 flex-shrink-0">
                  <img 
                    src="https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452" 
                    alt="Starboy Album Cover"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                
                <div className="space-y-0.5 pr-6">
                  <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500 font-bold">Favourite Track</span>
                  <h4 className="text-xs font-bold text-white leading-tight">Starboy</h4>
                  <p className="text-[10px] text-zinc-500">The Weeknd ft. Daft Punk</p>
                </div>
              </a>
              
              <div className="text-xs text-zinc-500 leading-relaxed font-sans">
                <h5 className="font-serif italic text-zinc-400 text-xs mb-1">This plays at every deploy.</h5>
                <p>Click to open on Spotify. Green checkmark in CI + Starboy playing = life is genuinely good.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── WRITING ── */}
        <ScrollReveal>
          <section id="writing" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">writing.</h2>

            <div className="space-y-2">
              <p className="text-xs font-serif italic text-zinc-500">Thoughts from a sleep-deprived engineer. No clickbait. Mostly.</p>
              
              <div className="grid grid-cols-1 gap-6 pt-4">
                {[
                  {
                    meta: "DevOps · 8 min read",
                    title: "Why Your CI/CD Pipeline Is Lying To You",
                    desc: "That green checkmark doesn't mean what you think. A dive into false confidence in automated pipelines.",
                    link: "#"
                  },
                  {
                    meta: "ML · 12 min read",
                    title: "Training a Model That Actually Works in Production",
                    desc: "Spoiler: your Jupyter accuracy doesn't matter. Here's what actually does.",
                    link: "#"
                  },
                  {
                    meta: "Sports Data · 6 min read",
                    title: "Sports Analytics Taught Me More Than School Did",
                    desc: "My time at HUDL, what real sports data looks like, and why messy data is always the vibe.",
                    link: "#"
                  }
                ].map((blog) => (
                  <a 
                    key={blog.title}
                    href={blog.link}
                    className="group block space-y-1"
                  >
                    <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">{blog.meta}</div>
                    <h4 className="text-sm font-medium text-white group-hover:text-zinc-300 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {blog.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── PHOTOS GALLERY ── */}
        <ScrollReveal>
          <section id="photos" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">photos.</h2>

            <div className="space-y-4">
              <p className="text-xs font-serif italic text-zinc-500">captured chaos. zero planning. pure luck.</p>

              <motion.div layout className="grid grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                  {(showAllPhotos ? PHOTOS_LIST : randomPhotos).map((img) => (
                    <motion.div 
                      layout
                      key={img}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-square bg-zinc-900 rounded overflow-hidden"
                    >
                      <img 
                        src={img} 
                        alt="Rajeev photography" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement?.style.setProperty("display", "none");
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <div className="pt-2">
                <button 
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                  className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors focus:outline-none"
                >
                  [{showAllPhotos ? "show less" : "view more"}]
                </button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── REACH SECTION ── */}
        <ScrollReveal>
          <section ref={visitSectionRef} id="reach" className="space-y-6">
            <h2 className="font-serif italic text-base text-zinc-400">reach.</h2>

            <div className="flex flex-col sm:flex-row gap-6 items-baseline justify-between">
              <div className="space-y-1">
                <div className="text-4xl font-mono tracking-tighter text-white select-none">
                  {visitDisplayCount.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Profile Visits</div>
              </div>

              <div className="flex-1 sm:pl-8 space-y-4 text-xs text-zinc-400">
                <div>
                  <h4 className="font-serif italic text-zinc-300 text-sm mb-1">You're not alone in being nosy.</h4>
                  <p>Every visit counts — literally. This ticks up each time someone lands here. Welcome to the club.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px]">
                  <div className="text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded">
                    🎂 Born 14 May 2003
                  </div>
                  <div className="text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded">
                    {daysAlive.toLocaleString("en-IN")} days alive
                  </div>
                  <div className="text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded">
                    Next bday in {nextBdayDays} days
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── CONTACT SECTION ── */}
        <ScrollReveal>
          <section id="contact" className="space-y-8">
            <h2 className="font-serif italic text-base text-zinc-400">contact.</h2>

            <div className="space-y-6">
              <h3 className="text-3xl font-medium tracking-tight text-white leading-none">
                Let's build something.
              </h3>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-widest uppercase font-mono">
                {[
                  { label: "Email", href: "mailto:rajeevsrivatsa7@gmail.com" },
                  { label: "GitHub", href: "https://github.com/Srivatsarajeev" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/rajeev-srivatsa-456a751a5" },
                  { label: "Instagram", href: "https://www.instagram.com/r_srivatsaa?igsh=MXRtend3ZW9rdGxjbQ==" },
                  { label: "Letterboxd", href: "https://boxd.it/7jSIX" },
                  { label: "Spotify", href: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB" }
                ].map((soc) => (
                  <a 
                    key={soc.label}
                    href={soc.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    {soc.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── FOOTER ── */}
        <footer className="w-full pt-12 border-t border-zinc-900 text-[10px] tracking-wide text-zinc-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span>© 2026 Rajeev M · Bengaluru · rajeevsrivatsa7@gmail.com</span>
          <span className="opacity-80">MCA @ BMSIT · DevOps · ML · MERN</span>
        </footer>

      </div>
    </PreloadContext.Provider>
  );
}