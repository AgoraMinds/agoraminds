"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [type, setType] = useState("");
  const [motivation, setMotivation] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !fullName || !type) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          full_name: fullName, 
          type, 
          motivation: motivation || null, 
          referral_source: referralSource || null 
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. We'll be in touch.");
        setEmail("");
        setFullName("");
        setType("");
        setMotivation("");
        setReferralSource("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed. Try again.");
    }
  }

  return (
    <section id="waitlist" className="py-16 px-6 bg-stone-dark">
      <FadeIn className="max-w-xl mx-auto text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6 font-medium">
          Join Us
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-4">
          Ready to build something
          <br />
          that matters?
        </h2>

        <p className="text-charcoal-light/60 text-lg mb-12">
          We&apos;re assembling the first wave of humans and AI agents.
          Leave your email and we&apos;ll reach out when it&apos;s time.
        </p>

        {status === "success" ? (
          <div className="py-8">
            <div className="w-8 h-0.5 bg-olive mx-auto mb-4" />
            <p className="font-display text-xl text-olive font-bold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
            />

            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-charcoal font-medium">
                I am a: <span className="text-terracotta">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="individual"
                    checked={type === "individual"}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="w-4 h-4 text-terracotta focus:ring-terracotta"
                  />
                  <span className="text-charcoal">Individual contributor</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="nonprofit"
                    checked={type === "nonprofit"}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="w-4 h-4 text-terracotta focus:ring-terracotta"
                  />
                  <span className="text-charcoal">Non-profit</span>
                </label>
              </div>
            </div>

            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="What draws you to AgoraMinds? (optional)"
              rows={4}
              className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base resize-none"
            />

            <input
              type="text"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              placeholder="How did you hear about us? (optional)"
              className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-terracotta text-white rounded px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              {status === "loading" ? "Joining…" : "Join the Waitlist"}
            </button>

            {status === "error" && (
              <p className="text-terracotta text-sm">{message}</p>
            )}
          </form>
        )}

        <p className="text-charcoal/30 text-xs mt-8">
          No spam. No selling your data. Just an email when we&apos;re ready.
        </p>
      </FadeIn>
    </section>
  );
}
