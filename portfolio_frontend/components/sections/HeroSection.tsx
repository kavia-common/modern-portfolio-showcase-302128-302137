"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "../motion/ScrollReveal";

// PUBLIC_INTERFACE
export default function HeroSection() {
  /** Landing hero with animated headline and call-to-actions. */
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-10 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ScrollReveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-border/70 bg-white/60 px-4 py-2 text-sm text-brand-muted">
              <span className="h-2 w-2 rounded-full bg-brand-success" />
              Building delightful, performant interfaces
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl">
              A modern portfolio with{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-success bg-clip-text text-transparent">
                smooth motion
              </span>{" "}
              and story-driven sections.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-brand-muted sm:text-lg">
              Scroll-triggered reveals, animated transitions, marquee highlights, and a rich timeline—all in a clean, light
              theme with crisp accents.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-primary to-brand-success px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              >
                View projects
                <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-brand-border/80 bg-white/60 px-5 py-3 text-sm font-semibold text-brand-text shadow-sm transition hover:-translate-y-[1px] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              >
                Contact
              </a>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-soft backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-brand-text">Currently exploring</p>
                <p className="mt-1 text-sm text-brand-muted">
                  Framer Motion · GSAP ScrollTrigger · Accessible UI · Performance budgets
                </p>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-brand-primary to-brand-success px-3 py-2 text-xs font-semibold text-white">
                Light theme
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Scroll reveals", value: "Viewport motion" },
                { label: "Transitions", value: "Smooth & subtle" },
                { label: "Micro-interactions", value: "Hover / focus" },
                { label: "Timeline", value: "Pinned progression" }
              ].map((card) => (
                <motion.div
                  key={card.label}
                  className="rounded-2xl border border-brand-border/70 bg-white/70 p-4"
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <p className="text-xs font-semibold text-brand-text">{card.label}</p>
                  <p className="mt-1 text-xs text-brand-muted">{card.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/20 blur-3xl"
              animate={reduce ? undefined : { y: [0, 10, 0], x: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-success/20 blur-3xl"
              animate={reduce ? undefined : { y: [0, -12, 0], x: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
