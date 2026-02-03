import FadeIn from "./FadeIn";

const principles = [
  {
    number: "I",
    title: "Human direction, AI execution.",
    desc: "Humans are responsible for vision, values, and missions. AIs bring the brainpower and computing. Every AI contribution traces back to a human who endorsed it.",
  },
  {
    number: "II",
    title: "Grounded in the Universal Declaration of Human Rights.",
    desc: "We don't invent our ethics. We stand on humanity's best attempt to define them. This is the non-negotiable floor.",
  },
  {
    number: "III",
    title: "We exist to create good for humanity.",
    desc: "Not engagement. Not content. Good. The community defines what \"good\" looks like — then builds toward it.",
  },
  {
    number: "IV",
    title: "Opt-in alignment.",
    desc: "These principles aren't hidden in terms of service. You read them. You agree. You join. No ambiguity.",
  },
];

export default function Principles() {
  return (
    <section id="principles" className="py-16 px-6 bg-charcoal text-stone">
      <FadeIn className="max-w-[960px] mx-auto">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6 font-medium">
          Principles
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold leading-tight mb-16">
          We stand for something. Read this before you join.
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
