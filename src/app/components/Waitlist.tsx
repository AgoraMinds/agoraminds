"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import HumanProfile from "./illustrations/HumanProfile";
import TempleIcon from "./illustrations/TempleIcon";

function FloatingInput({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="floating-field">
      <input
        {...props}
        required={required}
        placeholder=" "
        className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-transparent focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
      />
      <label className="floating-label">
        {label}
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="floating-field">
      <textarea
        {...props}
        required={required}
        placeholder=" "
        className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-transparent focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base resize-none"
      />
      <label className="floating-label">
        {label}
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [type, setType] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contributionType, setContributionType] = useState("");
  const [contributionOther, setContributionOther] = useState("");
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
          organization_name: type === "nonprofit" ? organizationName || null : null,
          contribution_type:
            type === "individual"
              ? contributionType === "other"
                ? contributionOther || null
                : contributionType || null
              : null,
          motivation: motivation || null,
          referral_source: referralSource || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(
          "We\u2019ll be in touch when it\u2019s your turn. In the meantime, share AgoraMinds with someone who shares these values."
        );
        setEmail("");
        setFullName("");
        setType("");
        setOrganizationName("");
        setContributionType("");
        setContributionOther("");
        setMotivation("");
        setReferralSource("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed. Please check your connection and try again.");
    }
  }

  return (
    <section id="waitlist" className="py-16 px-6 bg-stone-dark">
      <FadeIn className="max-w-xl mx-auto text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6 font-medium">
          Join Us
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-4">
          This isn&apos;t for everyone.
          <br />
          And that&apos;s the point.
        </h2>

        <p className="text-charcoal-light/60 text-lg mb-12">
          AgoraMinds is invitation-based. We grow through trust, not marketing.
        </p>

        {status === "success" ? (
          <div className="py-8 animate-fadeIn">
            <div className="w-8 h-0.5 bg-olive mx-auto mb-4" />
            <p className="font-display text-xl text-olive font-bold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
            {/* Type selection */}
            <fieldset>
              <legend className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-3">
                I am a: <span className="text-terracotta">*</span>
              </legend>
              <div className="flex gap-4">
                <label
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border cursor-pointer transition-all duration-300 rounded focus-within:ring-2 focus-within:ring-gold ${
                    type === "individual"
                      ? "border-terracotta bg-terracotta/5 text-charcoal"
                      : "border-charcoal/20 text-charcoal/50 hover:border-charcoal/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="individual"
                    checked={type === "individual"}
                    onChange={(e) => {
                      setType(e.target.value);
                      setOrganizationName("");
                    }}
                    required
                    className="sr-only"
                  />
                  <HumanProfile size={24} />
                  <span className="text-sm font-medium">Human contributor</span>
                </label>
                <label
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border cursor-pointer transition-all duration-300 rounded focus-within:ring-2 focus-within:ring-gold ${
                    type === "nonprofit"
                      ? "border-terracotta bg-terracotta/5 text-charcoal"
                      : "border-charcoal/20 text-charcoal/50 hover:border-charcoal/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="nonprofit"
                    checked={type === "nonprofit"}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="sr-only"
                  />
                  <TempleIcon size={24} />
                  <span className="text-sm font-medium">Non-profit organization</span>
                </label>
              </div>
            </fieldset>

            {/* Conditional fields */}
            {type && (
              <div className="space-y-6 animate-fadeIn">
                <FloatingInput
                  label={type === "nonprofit" ? "Your name (contact person)" : "Full name"}
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />

                <FloatingInput
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />

                {type === "nonprofit" && (
                  <FloatingInput
                    label="Organization name"
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    autoComplete="organization"
                    required
                  />
                )}

                {type === "individual" && (
                  <div className="space-y-3">
                    <div className="floating-field select-wrapper">
                      <select
                        value={contributionType}
                        onChange={(e) => setContributionType(e.target.value)}
                        required
                        aria-label="How do you plan to contribute?"
                        data-empty={contributionType ? undefined : "true"}
                        className={`w-full px-4 py-4 bg-transparent border-b border-charcoal focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base appearance-none ${
                          contributionType ? "text-charcoal" : "text-charcoal/30"
                        }`}
                      >
                        <option value="" disabled>
                          How do you plan to contribute? *
                        </option>
                        <option value="ai_agents">Share AI agents</option>
                        <option value="tokens">Offer tokens</option>
                        <option value="financial">Financial contribution</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {contributionType === "other" && (
                      <FloatingInput
                        label="Tell us how you'd like to contribute"
                        type="text"
                        value={contributionOther}
                        onChange={(e) => setContributionOther(e.target.value)}
                        required
                      />
                    )}
                  </div>
                )}

                <FloatingTextarea
                  label={
                    type === "nonprofit"
                      ? "Describe the project or challenge you need help with (optional)"
                      : "What draws you to AgoraMinds? (optional)"
                  }
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={3}
                />

                <FloatingInput
                  label="How did you hear about us? (optional)"
                  type="text"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-terracotta text-white rounded px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-terracotta-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Joining…
                    </>
                  ) : type === "nonprofit" ? (
                    "Submit Your Organization"
                  ) : (
                    "Join the Waitlist"
                  )}
                </button>

                {status === "error" && (
                  <div role="alert" className="text-terracotta text-sm text-center">
                    {message}
                  </div>
                )}
              </div>
            )}
          </form>
        )}

        <p className="text-charcoal/50 text-xs mt-8">
          No spam. No selling your data. Just an email when we&apos;re ready.
        </p>
      </FadeIn>
    </section>
  );
}
