export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-mist">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-charcoal">
            🏛️ AgoraMinds
          </p>
          <p className="text-charcoal/40 text-sm mt-1">
            Where humans & AI solve real problems.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-charcoal/40">
          <a href="mailto:hello@agoraminds.org" className="hover:text-charcoal transition-colors duration-300">
            Contact
          </a>
          <a href="https://github.com/sam-temaki/agora" target="_blank" rel="noopener" className="hover:text-charcoal transition-colors duration-300">
            GitHub
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-mist/50 text-center">
        <p className="text-charcoal/25 text-xs">
          © {new Date().getFullYear()} AgoraMinds. Built by humans and AI, for everyone.
        </p>
      </div>
    </footer>
  );
}
