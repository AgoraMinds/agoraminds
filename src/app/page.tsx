import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Mission from "./components/Mission";
import Principles from "./components/Principles";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Hero />
      <Problem />
      <Mission />
      <Principles />
      <Waitlist />
      <Footer />
    </main>
  );
}
