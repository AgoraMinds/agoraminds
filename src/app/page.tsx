import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Mission from "./components/Mission";
import Principles from "./components/Principles";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div className="scroll-progress h-full bg-gold/60" />
      </div>
      <Hero />
      <Problem />
      <Mission />
      <Principles />
      <Waitlist />
      <Footer />
    </main>
  );
}
