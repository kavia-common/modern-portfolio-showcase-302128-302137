"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "../motion/ScrollReveal";

// PUBLIC_INTERFACE
export default function AboutSection() {
  /** About section: story + highlights with interactive hover states. */
  const reduce = useReducedMotion();

  const highlights = [
    { title: "Motion-first UI", desc: "Scroll reveals, transitions, and micro-interactions that feel intentional." },
    { title: "Systems thinking", desc: "Reusable components, tokens, and patterns that scale." },
    { title: "Craft & performance", desc: "Fast loads, smooth frames, and accessible semantics." }
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-primary">About</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">Design-led engineering.</h2>
          </div>
          <p className="max-w-xl text-sm text-brand-muted">
            A calm, modern aesthetic—with deliberate motion cues—helps users understand structure and flow.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <ScrollReveal className="lg:col-span-5">
          <div className="rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-soft backdrop-blur">
            <p className="text-sm leading-relaxed text-brand-muted">
              I build interactive web experiences that balance clarity and personality. My focus is on robust UI architecture,
              accessible components, and animations that reinforce user intent—never distract from it.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { k: "Location", v: "Remote" },
                { k: "Focus", v: "Frontend" },
                { k: "Stack", v: "Next.js" },
                { k: "Motion", v: "GSAP/FM" }
              ].map((i) => (
                <div key={i.k} className="rounded-2xl border border-brand-border/70 bg-white/70 p-4">
                  <p className="text-xs font-semibold text-brand-text">{i.k}</p>
                  <p className="mt-1 text-xs text-brand-muted">{i.v}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:col-span-7 lg:grid-cols-3">
          {highlights.map((h, idx) => (
            <ScrollReveal key={h.title} delay={0.05 * idx}>
              <motion.div
                className="h-full rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-sm backdrop-blur"
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-brand-primary/15 to-brand-success/15 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/70">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-success" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-brand-text">{h.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{h.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
