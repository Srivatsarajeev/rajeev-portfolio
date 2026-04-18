export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-xl border-b border-gray-800 z-50">

      <h1 className="text-lg font-semibold tracking-wide">
        Rajeev
      </h1>

      <div className="space-x-6 text-gray-400">
        <a href="#about" className="hover:text-white transition">
          About
        </a>
        <a href="#projects" className="hover:text-white transition">
          Projects
        </a>
      </div>

    </nav>
  );
}