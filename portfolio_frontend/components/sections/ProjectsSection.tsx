"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "../motion/ScrollReveal";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  href?: string;
};

const projects: Project[] = [
  {
    title: "Interactive case study",
    desc: "A story-driven product page with scroll-linked narrative beats and progressive disclosure.",
    tags: ["Next.js", "Framer Motion", "A11y"]
  },
  {
    title: "Design system starter",
    desc: "Tokens, components, and documentation with a focus on consistency and maintainability.",
    tags: ["UI kit", "Tailwind", "Docs"]
  },
  {
    title: "Motion playground",
    desc: "Explorations of timelines, pinned scenes, and micro-interactions with clean fallbacks.",
    tags: ["GSAP", "ScrollTrigger", "Performance"]
  }
];

// PUBLIC_INTERFACE
export default function ProjectsSection() {
  /** Projects grid section with animated cards. */
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-primary">Projects</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">Selected work.</h2>
          </div>
          <p className="max-w-xl text-sm text-brand-muted">
            A mix of polished products and explorations—each with a clear purpose and intentional motion.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <ScrollReveal key={p.title} delay={0.05 * idx}>
            <motion.article
              className="group h-full rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-sm backdrop-blur transition"
              whileHover={reduce ? undefined : { y: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-brand-text">{p.title}</h3>
                <span className="rounded-full bg-gradient-to-r from-brand-primary/15 to-brand-success/15 px-3 py-1 text-xs font-semibold text-brand-text">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{p.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-brand-border/70 bg-white/70 px-3 py-1 text-xs font-medium text-brand-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-brand-muted">Hover for lift</span>
                <span className="text-sm font-semibold text-brand-text transition-transform group-hover:translate-x-0.5">
                  Details →
                </span>
              </div>

              <div className="pointer-events-none mt-5 h-px w-full bg-gradient-to-r from-brand-primary/0 via-brand-primary/35 to-brand-success/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
