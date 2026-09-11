import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const photos = Array.from({ length: 31 }, (_, index) => {
  const number = index + 1;
  const filename = [6, 10, 16].includes(number) ? `${number},jpg.jpg` : `${number}.jpg.jpg`;
  return `/photos/${filename}`;
});

const skills = [
  ["Languages", "Python, JavaScript, Bash, SQL, HCL, YAML"],
  ["MERN Stack", "MongoDB, Express.js, React.js, Node.js, Next.js"],
  ["ML / Data", "Machine Learning, Pandas, NumPy, OpenCV, Power BI, Tableau"],
  ["DevOps", "Docker, Kubernetes, Jenkins, CI/CD, Terraform, Ansible, Git"],
  ["AWS Cloud", "EC2, S3, IAM, VPC, CloudWatch, EKS, Lambda"],
  ["Monitoring & OS", "Prometheus, Grafana, Linux, Nginx, Excel, Postman"],
];

const projects = [
  { title: "Vidyut", type: "Cloud · ML · Analytics", status: "Completed", description: "A cloud-based energy analytics platform that turns smart-meter data into actionable insights for reducing waste and operating costs.", tech: "Python / ML / AWS / React" },
  { title: "CanisSense", type: "AI · Computer Vision · Safety", status: "Ongoing", description: "A real-time computer-vision system that studies street-dog behaviour and predicts aggression risk in urban environments.", tech: "OpenCV / Python / AI / Real-time" },
  { title: "Moola (ಮೂಲ)", type: "NLP · Visualization · Linguistics", status: "Ongoing", description: "An interactive Kannada visual-etymology explorer built to connect word origins, meanings, and cultural context.", tech: "React / D3.js / FastAPI / MongoDB / Gemini" },
];

function Reveal({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-8 flex items-center gap-3"><span className="h-px w-10 bg-amber-300" /><h2 className="font-serif text-sm italic tracking-wide text-zinc-400">{children}</h2></div>;
}

function App() {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [visits, setVisits] = useState(0);
  const previewPhotos = useMemo(() => [photos[1], photos[8], photos[17], photos[25]], []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = Number(localStorage.getItem("rajeev_v") || 0);
      const counted = sessionStorage.getItem("rajeev_counted");
      if (!counted) {
        localStorage.setItem("rajeev_v", String(stored + 1));
        sessionStorage.setItem("rajeev_counted", "true");
        setVisits(stored + 1);
      } else setVisits(stored);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-6 sm:px-8 sm:py-10">
      <nav className="sticky top-3 z-30 mb-16 flex items-center justify-between rounded-full border border-white/10 bg-black/70 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-zinc-400 backdrop-blur-xl">
        <a href="#" className="font-semibold text-white">RS<span className="text-amber-300">.</span></a>
        <div className="flex gap-4 sm:gap-6"><a className="interactive-link" href="#about">About</a><a className="interactive-link" href="#projects">Work</a><a className="interactive-link" href="#contact">Contact</a></div>
      </nav>

      <Reveal><section className="glass-panel relative overflow-hidden rounded-3xl">
        <div className="h-44 overflow-hidden sm:h-64"><img src="/hampi.jpg" alt="Hampi chariot banner" className="h-full w-full object-cover opacity-75 transition duration-700 hover:scale-105" /></div>
        <div className="relative px-5 pb-8 sm:px-8"><div className="-mt-14 flex items-end justify-between gap-3 sm:-mt-16">
          <img src="/profile.jpg" alt="Rajeev Srivatsa" className="h-28 w-28 rounded-full border-4 border-[#090909] object-cover shadow-2xl sm:h-32 sm:w-32" />
          <div className="flex flex-wrap justify-end gap-2"><a className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-amber-200" href="mailto:rajeevsrivatsa7@gmail.com">Email me</a><a className="rounded-full border border-white/20 px-4 py-2 text-xs text-white transition hover:border-amber-300 hover:text-amber-300" href="https://github.com/Srivatsarajeev" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </div><div className="mt-6"><p className="text-xs text-zinc-500">@rajeevsrivatsa</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">I build systems<br /><span className="text-amber-300">that stay alive.</span></h1><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">DevOps · Machine Learning · Full-Stack · occasional photographer. I make servers not cry, models actually learn, and UIs not look like 2009.</p><a href="#projects" className="mt-7 inline-block rounded-full border border-amber-300/50 px-5 py-3 text-xs text-amber-200 transition hover:bg-amber-300 hover:text-black">Explore my work ↓</a></div></div>
      </section></Reveal>

      <div className="space-y-28 py-28">
        <Reveal><section id="about" className="section-shell"><SectionTitle>about.</SectionTitle><h2 className="max-w-2xl text-2xl font-medium leading-tight text-white sm:text-4xl">Practical engineering with a little bit of chaos.</h2><p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-400">I am Rajeev, an MCA student at BMS Institute of Technology and a former Sports Data Analyst at HUDL. I build ML systems, DevOps pipelines, and MERN applications. My favourite debugging tools are Python, Docker, and unreasonable persistence.</p></section></Reveal>

        <Reveal><section id="skills" className="section-shell"><SectionTitle>skills.</SectionTitle><div className="grid gap-3 sm:grid-cols-2">{skills.map(([title, list]) => <div key={title} className="glass-panel rounded-2xl p-5 transition hover:-translate-y-1 hover:border-amber-300/40"><p className="text-[10px] uppercase tracking-[0.2em] text-amber-300">{title}</p><p className="mt-4 text-sm leading-7 text-zinc-400">{list}</p></div>)}</div></section></Reveal>

        <Reveal><section id="projects" className="section-shell"><SectionTitle>selected work.</SectionTitle><div className="space-y-5">{projects.map((project, index) => <motion.article key={project.title} whileHover={{ y: -5 }} className="glass-panel group rounded-3xl p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="text-xs text-amber-300">0{index + 1}</span><h3 className="mt-3 text-2xl font-medium text-white sm:text-3xl">{project.title}</h3></div><span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-500">{project.status}</span></div><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">{project.description}</p><p className="mt-6 text-xs tracking-wide text-zinc-500">{project.tech}</p><p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-600">{project.type}</p></motion.article>)}</div></section></Reveal>

        <Reveal><section id="experience" className="section-shell"><SectionTitle>experience.</SectionTitle><div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-5 sm:flex-row"><div><h3 className="text-2xl text-white">HUDL</h3><p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">Sports Data Analyst · Internship</p></div><p className="text-xs text-zinc-500">2023 – 2024</p></div><ul className="mt-6 space-y-3 text-sm leading-7 text-zinc-400"><li>• Analysed player and team performance data.</li><li>• Tagged match footage and extracted performance metrics.</li><li>• Built reports and dashboards for coaching decisions.</li><li>• Identified trends using Python and data analysis tools.</li></ul></section></Reveal>

        <Reveal><section id="education" className="section-shell"><SectionTitle>education.</SectionTitle><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><h3 className="text-2xl text-white">BMS Institute of Technology</h3><p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">Master of Computer Applications</p></div><p className="text-xs text-zinc-500">2025 – 2027</p></div></section></Reveal>

        <Reveal><section id="github" className="section-shell"><SectionTitle>github.</SectionTitle><div className="glass-panel overflow-x-auto rounded-2xl p-5"><a className="text-xs text-zinc-400 underline" href="https://github.com/Srivatsarajeev" target="_blank" rel="noreferrer">github.com/Srivatsarajeev ↗</a><div className="mt-5 flex min-w-[580px] gap-1">{Array.from({ length: 52 }, (_, week) => <div key={week} className="flex flex-col gap-1">{Array.from({ length: 7 }, (_, day) => { const value = (week * 13 + day * 7) % 5; return <span key={day} className={`h-2.5 w-2.5 ${["bg-zinc-900", "bg-zinc-800", "bg-zinc-700", "bg-zinc-500", "bg-amber-300"][value]}`} />; })}</div>)}</div></div></section></Reveal>

        <Reveal><section id="music" className="section-shell"><SectionTitle>music.</SectionTitle><a href="https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB" target="_blank" rel="noreferrer" className="glass-panel flex max-w-md items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1"><img className="h-16 w-16 rounded-xl object-cover grayscale transition group-hover:grayscale-0" src="https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452" alt="Starboy album cover" /><div><p className="text-[10px] uppercase tracking-widest text-amber-300">Favourite track</p><h3 className="mt-2 text-white">Starboy</h3><p className="mt-1 text-xs text-zinc-500">The Weeknd ft. Daft Punk</p></div></a></section></Reveal>

        <Reveal><section id="photos" className="section-shell"><SectionTitle>photos.</SectionTitle><p className="mb-6 font-serif text-sm italic text-zinc-500">captured chaos. zero planning. pure luck.</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><AnimatePresence>{(showAllPhotos ? photos : previewPhotos).map((photo) => <motion.img key={photo} src={photo} alt="Rajeev photography" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="aspect-square w-full rounded-xl object-cover grayscale transition duration-700 hover:scale-[1.03] hover:grayscale-0" />)}</AnimatePresence></div><button onClick={() => setShowAllPhotos((value) => !value)} className="mt-6 text-xs uppercase tracking-widest text-amber-300 hover:text-white">{showAllPhotos ? "Show less" : "View all photos"}</button></section></Reveal>

        <Reveal><section id="reach" className="section-shell"><SectionTitle>reach.</SectionTitle><div className="glass-panel rounded-3xl p-7 sm:p-10"><p className="text-6xl font-semibold tracking-tighter text-white">{visits.toLocaleString("en-IN")}</p><p className="mt-3 text-xs uppercase tracking-widest text-zinc-500">Profile visits</p><p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400">You are not alone in being nosy. Thanks for stopping by.</p></div></section></Reveal>

        <Reveal><section id="contact" className="section-shell"><SectionTitle>contact.</SectionTitle><h2 className="text-4xl font-medium tracking-tight text-white sm:text-6xl">Let's build something.</h2><div className="mt-8 flex flex-wrap gap-3"><a className="rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold text-black transition hover:bg-white" href="mailto:rajeevsrivatsa7@gmail.com">Email Rajeev</a><a className="rounded-full border border-white/20 px-5 py-3 text-xs text-white transition hover:border-amber-300 hover:text-amber-300" href="https://www.linkedin.com/in/rajeev-srivatsa-456a751a5" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></section></Reveal>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-[10px] uppercase tracking-widest text-zinc-600 sm:flex sm:justify-between"><span>© {new Date().getFullYear()} Rajeev Srivatsa</span><span>Bengaluru · DevOps · ML · MERN</span></footer>
    </main>
  );
}

export default App;