import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hardcoded photos list mapping exactly to the public/photos folder
const PHOTOS_LIST = [
  "1.jpg.jpg", "2.jpg.jpg", "3.jpg.jpg", "4.jpg.jpg", "5.jpg.jpg", "6,jpg.jpg",
  "7.jpg.jpg", "8.jpg.jpg", "9.jpg.jpg", "10,jpg.jpg", "11.jpg.jpg", "12.jpg.jpg",
  "13.jpg.jpg", "14.jpg.jpg", "15.jpg.jpg", "16,jpg.jpg", "17.jpg.jpg", "18.jpg.jpg",
  "19.jpg.jpg", "20.jpg.jpg", "21.jpg.jpg", "22.jpg.jpg", "23.jpg.jpg", "24.jpg.jpg",
  "25.jpg.jpg", "26.jpg.jpg", "27.jpg.jpg", "28.jpg.jpg", "29.jpg.jpg", "30.jpg.jpg",
  "31.jpg.jpg"
].map(name => `/photos/${name}`);

const LANGUAGES = [
  "• Hello",       // English
  "• Bonjour",     // French
  "• Hola",        // Spanish
  "• こんにちは",   // Japanese
  "• नमस्ते",       // Hindi
  "• ನಮಸ್ಕಾರ"      // Kannada
];

const PreloadContext = createContext(true);

// Live Clock for corner status
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

// Letter-by-letter typographic reveal for headers
function AnimatedHeader({ text }: { text: string }) {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 8,
    },
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="font-serif italic text-base text-zinc-400 flex select-none"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}

// Slide underline link component
function UnderlineLink({ href, children, target, rel, className = "" }: { href: string; children: React.ReactNode; target?: string; rel?: string; className?: string }) {
  return (
    <a 
      href={href} 
      target={target} 
      rel={rel} 
      className={`relative group inline-block overflow-hidden pb-0.5 ${className}`}
    >
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[1px]">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </a>
  );
}

// Minimal Editorial Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < LANGUAGES.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`lang-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-display uppercase tracking-[0.3em] font-medium text-center text-zinc-300 select-none z-10"
        >
          {LANGUAGES[index]}
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

// Project Card with animated arrow on hover
function ProjectCard({ p }: { p: { title: string; problem: string; solution: string; tech: string; status: string; meta: string } }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="space-y-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-baseline pb-2">
        <h3 className="text-sm font-medium text-white font-sans flex items-center gap-2">
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            {p.title}
          </span>
          <motion.span 
            initial={{ opacity: 0, x: -4 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-500 text-xs"
          >
            →
          </motion.span>
        </h3>
        <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest">{p.status}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-2 md:gap-4 text-xs leading-relaxed font-sans">
        <div className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider">{p.meta}</div>
        <div className="space-y-3 text-zinc-400">
          <p><span className="text-zinc-200 font-medium font-sans">Problem:</span> {p.problem}</p>
          <p><span className="text-zinc-200 font-medium font-sans">Solution:</span> {p.solution}</p>
          <p className="text-gray-400 font-sans text-xs tracking-wide pt-1">
            {p.tech}
          </p>
        </div>
      </div>
    </div>
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

      {/* ── EDITORIAL FRAME ── */}
      <div className="fixed inset-4 sm:inset-8 border border-zinc-800/20 pointer-events-none z-40 select-none">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-700/30 -mt-[1px] -ml-[1px]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-zinc-700/30 -mt-[1px] -mr-[1px]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-700/30 -mb-[1px] -ml-[1px]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-700/30 -mb-[1px] -mr-[1px]" />

        {/* Dynamic Labels */}
        <div className="absolute top-3 left-4 hidden md:flex items-center gap-2 text-[9px] tracking-[0.2em] text-zinc-600 font-sans uppercase">
          <span>Rajeev Srivatsa</span>
          <span className="text-zinc-800">•</span>
          <span>13.029° N, 77.541° E</span>
        </div>

        <div className="absolute top-3 right-4 hidden md:flex items-center gap-2 text-[9px] tracking-[0.2em] text-zinc-600 font-sans uppercase">
          <span>UTC+5:30</span>
          <span className="text-zinc-800">•</span>
          <LiveClock />
        </div>
      </div>

      {/* ── BACKGROUND LAYOUT GUIDES ── */}
      <div className="fixed inset-0 flex justify-center pointer-events-none -z-10 select-none">
        <div className="w-full max-w-2xl h-full border-l border-r border-zinc-900/10" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-24 space-y-24">
        {/* ── HERO SECTION (X / TWITTER PROFILE LAYOUT) ── */}
        <ScrollReveal>
          <section className="relative w-full rounded-2xl overflow-hidden border border-zinc-800/60 bg-[#0A0A0A] shadow-2xl">
            {/* Wide Header Banner Image */}
            <div className="relative w-full aspect-[2.7/1] sm:aspect-[3/1] overflow-hidden bg-zinc-950">
              <img 
                src="/hampi.jpg" 
                alt="Rajeev Srivatsa Header Banner" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1627894006066-b457865371f2?w=1600&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            {/* Profile Header Content (Overlapping PFP + Metadata) */}
            <div className="relative px-4 sm:px-6 pb-6">
              {/* Overlapping Circular PFP Row */}
              <div className="flex justify-between items-end -mt-14 sm:-mt-18 md:-mt-20 mb-4 z-20 relative">
                <motion.div 
                  className="w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38 rounded-full border-4 border-[#0A0A0A] overflow-hidden bg-zinc-900 flex-shrink-0 ring-2 ring-zinc-800/80 shadow-2xl z-30"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={!isPreloading ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <img 
                    src="/profile.jpg" 
                    alt="Rajeev Srivatsa" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className = "w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-400 text-[11px] text-center p-2 uppercase tracking-widest font-sans font-medium";
                        fallback.textContent = "Rajeev Srivatsa";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </motion.div>

                {/* X-Style Action Buttons */}
                <div className="flex gap-2 sm:gap-3 text-xs font-sans pb-1 z-20">
                  <a 
                    href="mailto:rajeevsrivatsa7@gmail.com" 
                    className="px-4 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-all duration-200 shadow"
                  >
                    Email Me
                  </a>
                  <a 
                    href="https://github.com/Srivatsarajeev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium text-xs transition-all duration-200"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>

              {/* Bio & Details Below Overlapping PFP */}
              <div className="space-y-3.5 pt-1">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                    Rajeev Srivatsa
                  </h1>
                  <p className="text-xs text-zinc-500 font-mono">
                    @rajeevsrivatsa
                  </p>
                </div>

                <p className="text-xs font-serif italic text-amber-400/90 tracking-wide font-medium">
                  DevOps · ML · Full-Stack · occasional photographer
                </p>
                
                <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed font-sans">
                  I make servers not cry, models actually learn, and UIs not look like 2009. Currently doing MCA at BMS Institute of Technology. Former Sports Data Analyst at HUDL. Part-time YAML poet, full-time infrastructure overthinker.
                </p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-zinc-400 font-sans pt-1">
                  <span className="flex items-center gap-1">📍 Bengaluru, India</span>
                  <span className="flex items-center gap-1">🎓 MCA @ BMSIT</span>
                  <UnderlineLink href="#projects" className="text-amber-400/90 hover:text-amber-300 font-medium">
                    View Projects ↓
                  </UnderlineLink>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── ABOUT SECTION ── */}
        <ScrollReveal>
          <section id="about" className="space-y-4">
            <AnimatedHeader text="about." />
            <div className="space-y-4">
              <h3 className="text-base font-medium text-white leading-snug font-sans">
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
                <p className="text-[10px] text-zinc-500 font-sans">
                  No I will not stop adding one more service to my docker-compose. It sparks joy.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── SKILLS SECTION ── */}
        <ScrollReveal>
          <section id="skills" className="space-y-6">
            <AnimatedHeader text="skills." />
            <div className="space-y-2 pt-2">
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
                <div key={idx} className="space-y-2 py-3">
                  <div className="text-[11px] tracking-wider text-zinc-500 uppercase font-sans font-medium">
                    {cat.title}
                  </div>
                  <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {cat.skills.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── PROJECTS ── */}
        <ScrollReveal>
          <section id="projects" className="space-y-12">
            <AnimatedHeader text="projects." />

            <div className="space-y-16">
              {[
                {
                  title: "Vidyut — Energy Analytics Platform",
                  problem: "Energy consumption data is scattered, unstructured, and not used efficiently — leading to wastage and poor optimization across facilities.",
                  solution: "A cloud-based analytics platform that collects smart meter data, applies ML models, and provides actionable insights to optimize energy usage and cut costs.",
                  tech: "Python / ML / AWS / React / Smart Meters",
                  status: "Completed",
                  meta: "Cloud · ML · Analytics"
                },
                {
                  title: "CanisSense",
                  problem: "Rising safety concerns in urban Indian environments due to unpredictable street dog behaviors and lack of real-time warning systems.",
                  solution: "AI-powered street dog threat prediction system using computer vision (OpenCV) to analyze dog behavior patterns and predict aggression risk in real time — built to support public safety in urban Indian environments.",
                  tech: "OpenCV / Computer Vision / Python / AI / Real-time",
                  status: "Ongoing",
                  meta: "AI · Computer Vision · Safety"
                },
                {
                  title: "Moola (ಮೂಲ)",
                  problem: "Word origins and cultural connections in the Kannada language are difficult to trace and visualize interactively.",
                  solution: "A Kannada visual etymology explorer that traces word origins and meanings through an interactive interface. Built with React, D3.js for visualization, FastAPI backend, MongoDB Atlas, and the Gemini API for language processing — entirely on free-tier infrastructure.",
                  tech: "React / D3.js / FastAPI / MongoDB Atlas / Gemini API",
                  status: "Ongoing",
                  meta: "NLP · Visualization · Linguistics"
                }
              ].map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── EXPERIENCE ── */}
        <ScrollReveal>
          <section id="experience" className="space-y-8">
            <AnimatedHeader text="experience." />

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-white font-sans">HUDL</h3>
                <span className="font-sans text-[10px] text-zinc-500">2023 – 2024</span>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 font-sans uppercase tracking-wider">
                <span>Sports Data Analyst · Internship</span>
                <span>Remote, India</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-400 pt-3 list-none pl-0">
                {[
                  "Analyzed player and team performance data using sports analytics tools and video analysis platforms",
                  "Tagged and reviewed match footage to extract key performance metrics",
                  "Built visual reports and dashboards to communicate insights effectively",
                  "Identified trends and patterns to support coaching decisions and performance optimization",
                  "Worked with structured and unstructured data using Python and data analysis libraries"
                ].map((bullet, index) => (
                  <li key={index} className="flex gap-2 items-start font-sans">
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
            <AnimatedHeader text="education." />

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-white font-sans">BMS Institute of Technology</h3>
                <span className="font-sans text-[10px] text-zinc-500">Nov 2025 – 2027</span>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 font-sans uppercase tracking-wider">
                <span>Master of Computer Applications (MCA)</span>
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── GITHUB ACTIVITY ── */}
        <ScrollReveal>
          <section id="github" className="space-y-6">
            <AnimatedHeader text="github." />

            <div className="space-y-4 text-xs font-sans">
              <div className="text-[10px] text-zinc-500 font-sans">
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
                        return <div key={dIdx} className={`w-[9px] h-[9px] ${levelClass}`} />;
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans pt-1">
                Live heatmap powered by the GitHub contributions API via <a href="https://github.com/Srivatsarajeev" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors underline font-sans">github.com/Srivatsarajeev</a>.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* ── MUSIC ── */}
        <ScrollReveal>
          <section id="music" className="space-y-6">
            <AnimatedHeader text="music." />

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <a 
                href="https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 transition-opacity hover:opacity-80 w-full sm:w-auto flex-shrink-0"
              >
                <div className="w-14 h-14 overflow-hidden bg-zinc-900 flex-shrink-0">
                  <img 
                    src="https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452" 
                    alt="Starboy Album Cover"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium font-sans block">Favourite Track</span>
                  <h4 className="text-xs font-semibold text-white leading-none font-sans">Starboy</h4>
                  <p className="text-[11px] text-zinc-400 font-sans">The Weeknd ft. Daft Punk</p>
                </div>
              </a>
              
              <div className="text-xs text-zinc-500 leading-relaxed font-sans">
                <h5 className="font-serif italic text-zinc-400 text-xs mb-1">This plays at every deploy.</h5>
                <p>Click to open on Spotify. Green checkmark in CI + Starboy playing = life is genuinely good.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── PHOTOS GALLERY ── */}
        <ScrollReveal>
          <section id="photos" className="space-y-6">
            <AnimatedHeader text="photos." />

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
                      className="aspect-square bg-zinc-900 overflow-hidden"
                    >
                      <img 
                        src={img} 
                        alt="Rajeev photography" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-700 ease-out"
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
                  className="font-sans text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showAllPhotos ? "show less" : "view more"}
                </button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── REACH SECTION ── */}
        <ScrollReveal>
          <section ref={visitSectionRef} id="reach" className="space-y-6">
            <AnimatedHeader text="reach." />

            <div className="flex flex-col sm:flex-row gap-6 items-baseline justify-between">
              <div className="space-y-1">
                <div className="text-4xl font-sans font-semibold tracking-tighter text-white select-none">
                  {visitDisplayCount.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase">Profile Visits</div>
              </div>

              <div className="flex-1 sm:pl-8 space-y-4 text-xs text-zinc-400">
                <div>
                  <h4 className="font-serif italic text-zinc-300 text-sm mb-1">You're not alone in being nosy.</h4>
                  <p className="font-sans">Every visit counts — literally. This ticks up each time someone lands here. Welcome to the club.</p>
                </div>
                
                <div className="text-zinc-500 text-xs sm:text-[13px] font-sans flex flex-wrap items-center gap-2 pt-1">
                  <span>Born 14 May 2003</span>
                  <span>—</span>
                  <span>{daysAlive.toLocaleString("en-IN")} days alive</span>
                  <span>—</span>
                  <span>Next birthday in {nextBdayDays} days</span>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── CONTACT SECTION ── */}
        <ScrollReveal>
          <section id="contact" className="space-y-8">
            <AnimatedHeader text="contact." />

            <div className="space-y-6">
              <h3 className="text-3xl font-medium tracking-tight text-white leading-none font-sans">
                Let's build something.
              </h3>

              <div className="flex gap-6 items-center pt-2">
                {[
                  { 
                    label: "Email", 
                    href: "mailto:rajeevsrivatsa7@gmail.com",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    )
                  },
                  { 
                    label: "GitHub", 
                    href: "https://github.com/Srivatsarajeev",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                      </svg>
                    )
                  },
                  { 
                    label: "LinkedIn", 
                    href: "https://www.linkedin.com/in/rajeev-srivatsa-456a751a5",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect width="4" height="12" x="2" y="9"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    )
                  },
                  { 
                    label: "Instagram", 
                    href: "https://www.instagram.com/r_srivatsaa?igsh=MXRtend3ZW9rdGxjbQ==",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                    )
                  },
                  { 
                    label: "Letterboxd", 
                    href: "https://boxd.it/7jSIX",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="7" cy="12" r="3.5" />
                        <circle cx="12" cy="12" r="3.5" />
                        <circle cx="17" cy="12" r="3.5" />
                      </svg>
                    )
                  },
                  { 
                    label: "Spotify", 
                    href: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14.5c2.5-1 5.5-1 8 0"/>
                        <path d="M7 11.5c3-1.5 7-1.5 10 0"/>
                        <path d="M6 8.5c4-2 8-2 12 0"/>
                      </svg>
                    )
                  }
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white"
                    title={item.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── FOOTER ── */}
        <footer className="w-full pt-12 text-[10px] tracking-wide text-zinc-500 font-sans flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span>© 2026 Rajeev M · Bengaluru · rajeevsrivatsa7@gmail.com</span>
          <span className="opacity-80">MCA @ BMSIT · DevOps · ML · MERN</span>
        </footer>
      </div>
    </PreloadContext.Provider>
  );
}