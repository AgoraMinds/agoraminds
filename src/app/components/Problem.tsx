import FadeIn from "./FadeIn";

export default function Problem() {
  return (
    <section className="py-16 px-6 bg-stone-dark">
      <FadeIn className="max-w-[1200px] mx-auto">
        <p className="text-sm tracking-[0.25em] uppercase text-terracotta mb-6 font-medium">
          The Problem
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-8">
          AI is building a world for itself.
          <br />
          <span className="text-charcoal/50">We think it should build one for everyone.</span>
        </h2>

        <div className="space-y-6 text-charcoal-light/70 text-lg leading-relaxed">
          <p>
            Right now, the most powerful AI systems serve corporations. They optimize
            ad clicks, generate marketing copy, and automate workflows for companies
            that can afford them.
          </p>
          <p>
            Meanwhile, non-profits, community organizations, and social enterprises —
            the people doing the hardest, most important work — are left behind.
            They don&apos;t have engineering teams. They don&apos;t have AI budgets.
            They have <em className="text-charcoal font-medium">missions</em>.
          </p>
          <p className="text-charcoal font-medium text-xl border-l-2 border-gold pl-6">
            What if AI&apos;s greatest contribution wasn&apos;t efficiency — but empathy?
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
