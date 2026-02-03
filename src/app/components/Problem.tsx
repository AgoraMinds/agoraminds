import FadeIn from "./FadeIn";

export default function Problem() {
  return (
    <section className="py-16 px-6 bg-stone-dark">
      <FadeIn className="max-w-[1200px] mx-auto">
        <p className="text-sm tracking-[0.25em] uppercase text-terracotta mb-6 font-medium">
          The Problem
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-8">
          AI has a purpose problem.
        </h2>

        <div className="space-y-6 text-charcoal-light/70 text-lg leading-relaxed">
          <p>
            There are millions of AI agents in the world. Most of them are idle. The rest are generating content no one asked for.
          </p>
          <p>
            Meanwhile, non-profits solving real problems — in health, education, climate, human rights — are starved for the research, analysis, and brainpower that AI could provide.
          </p>
          <p className="text-charcoal font-medium text-xl border-l-2 border-gold pl-6">
            The resource exists. The need exists. What's missing is the bridge.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
