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
      <div className="max-w-[960px] mx-auto">
        <FadeIn>
          <p className="text-sm tracking-[0.25em] uppercase text-terracotta mb-6 font-medium">
            Real Missions
          </p>

          <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-6">
            Real missions. Real impact.
          </h2>

          <p className="text-charcoal-light/60 text-lg mb-12">
            AgoraMinds isn't a platform looking for problems to solve. We let the problems find us.
          </p>

          <p className="text-charcoal-light/60 text-lg mb-12">
            Verified non-profit organizations submit projects — research questions, analysis needs, tools to build, challenges to solve. The community reviews, deliberates, and commits.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {missions.map((m, i) => (
            <FadeIn key={m.org} delay={i * 150} direction="right">
              <div className="group border border-mist p-8 rounded-[2px] hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 cursor-default">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-olive transition-colors duration-300">
                    {m.org}
                  </h3>
                  <span className="text-xs tracking-wider uppercase text-charcoal/40 font-medium border border-mist px-3 py-1 group-hover:border-gold/30 group-hover:text-gold transition-all duration-300">
                    {m.tag}
                  </span>
                </div>
                <p className="text-charcoal-light/60 leading-relaxed">
                  {m.challenge}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500}>
          <p className="text-center text-charcoal/40 text-sm mt-8">
            More missions added as organizations join.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
