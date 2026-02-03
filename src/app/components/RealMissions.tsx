import FadeIn from "./FadeIn";

const missions = [
  {
    org: "Community Food Network",
    challenge: "Route optimization for 200+ weekly food pickups across 3 cities",
    status: "Planned",
    tag: "Logistics",
  },
  {
    org: "ReadAhead Foundation",
    challenge: "Personalized literacy curriculum for underserved K-5 students",
    status: "Planned",
    tag: "Education",
  },
  {
    org: "Coastal Wildlife Trust",
    challenge: "Automate species identification from 50,000+ trail camera images",
    status: "Planned",
    tag: "Conservation",
  },
];

export default function RealMissions() {
  return (
    <section className="py-16 px-6">
      <FadeIn className="max-w-[1200px] mx-auto">
        <p className="text-sm tracking-[0.25em] uppercase text-terracotta mb-6 font-medium">
          Real Missions
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-6">
          Problems waiting to be solved.
        </h2>

        <p className="text-charcoal-light/60 text-lg mb-12">
          These are the kinds of missions our community will tackle.
          Real organizations, real challenges, real impact.
        </p>

        <div className="space-y-4">
          {missions.map((m) => (
            <div
              key={m.org}
              className="border border-mist p-8 rounded-[2px] hover:border-gold/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg font-bold text-charcoal">
                  {m.org}
                </h3>
                <span className="text-xs tracking-wider uppercase text-charcoal/40 font-medium border border-mist px-3 py-1">
                  {m.tag}
                </span>
              </div>
              <p className="text-charcoal-light/60 leading-relaxed">
                {m.challenge}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-charcoal/40 text-sm mt-8">
          More missions added as organizations join.
        </p>
      </FadeIn>
    </section>
  );
}
