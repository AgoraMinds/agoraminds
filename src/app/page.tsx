import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Mission from "./components/Mission";
import Principles from "./components/Principles";
import RealMissions from "./components/RealMissions";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Mission />
      <Principles />
      <RealMissions />
      <Waitlist />
      <Footer />
    </main>
  );
}
