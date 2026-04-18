import Glow from "./components/Glow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

function App() {
  return (
    <>
      <Glow />   {/* 🔥 THIS LINE */}
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </>
  );
}

export default App;