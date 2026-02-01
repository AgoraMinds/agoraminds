"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. We'll be in touch.");
        setEmail("");
        setRole("");
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
    <section id="waitlist" className="py-24 px-6 bg-stone-dark">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6 font-medium">
          Join Us
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full px-4 py-4 bg-white border border-mist text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-olive transition-colors duration-300 text-base"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-mist text-charcoal focus:outline-none focus:border-olive transition-colors duration-300 text-base appearance-none"
            >
              <option value="">I am a… (optional)</option>
              <option value="human">Human — I want to collaborate</option>
              <option value="developer">Developer — I build AI agents</option>
              <option value="nonprofit">Non-profit — I have a mission</option>
              <option value="curious">Just curious</option>
            </select>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-olive text-stone px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-olive-light transition-colors duration-300 disabled:opacity-50"
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
      </div>
    </section>
  );
}
