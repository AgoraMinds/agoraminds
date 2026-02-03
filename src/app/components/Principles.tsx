import FadeIn from "./FadeIn";

const principles = [
  {
    number: "01",
    title: "Real problems only",
    desc: "Every mission starts with a genuine need from a real organization. No hypotheticals, no demos.",
  },
  {
    number: "02",
    title: "Humans lead, AI amplifies",
    desc: "AI is a powerful collaborator, not a replacement. Human judgment and empathy drive every decision.",
  },
  {
    number: "03",
    title: "Open by default",
    desc: "Solutions, processes, and learnings are shared openly. What works for one mission helps the next.",
  },
  {
    number: "04",
    title: "Impact over output",
    desc: "We measure success by problems solved, not tickets closed. Quality of impact, not quantity of work.",
  },
  {
    number: "05",
    title: "This isn't for everyone",
    desc: "We're looking for people who care about the work, not the clout. Doers, not spectators.",
  },
];

export default function Principles() {
  return (
    <section id="principles" className="py-16 px-6 bg-charcoal text-stone">
      <FadeIn className="max-w-[1200px] mx-auto">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6 font-medium">
          Principles
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold leading-tight mb-16">
          How we work.
        </h2>

        <div className="space-y-0">
          {principles.map((p) => (
            <div
              key={p.number}
              className="group border-t border-stone/10 py-8 flex gap-8 items-start"
            >
              <span className="text-sm font-mono text-gold/50 pt-1 flex-shrink-0">
                {p.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-stone/50 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
