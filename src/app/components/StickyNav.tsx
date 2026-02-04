"use client";

import { useEffect, useState } from "react";
import AgoraLogo from "./illustrations/AgoraLogo";

const links = [
  { href: "#mission", label: "Mission" },
  { href: "#principles", label: "Principles" },
  { href: "#waitlist", label: "Join" },
];

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function onScroll() {
      // Show nav after scrolling past hero (roughly 80vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    // Observe sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="bg-stone/90 backdrop-blur-md border-b border-mist/50"
      >
        <div className="max-w-[960px] mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 text-charcoal hover:text-olive transition-colors"
            aria-label="Back to top"
          >
            <AgoraLogo size={20} className="text-olive" />
            <span className="font-display font-bold text-sm hidden sm:inline">
              AgoraMinds
            </span>
          </a>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-terracotta"
                    : "text-charcoal/50 hover:text-charcoal"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
