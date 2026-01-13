"use client";

import ScrollReveal from "../motion/ScrollReveal";
import { motion, useReducedMotion } from "framer-motion";

type Post = { title: string; date: string; summary: string; tag: string };

const posts: Post[] = [
  {
    title: "Motion that clarifies, not distracts",
    date: "2024-10-12",
    summary: "A practical checklist for using motion to support hierarchy and comprehension.",
    tag: "Motion"
  },
  {
    title: "Building reusable UI with tokens",
    date: "2024-08-03",
    summary: "A small, pragmatic approach to theming and component architecture.",
    tag: "Systems"
  },
  {
    title: "Performance budgets for interactive pages",
    date: "2024-05-21",
    summary: "Keeping transitions smooth and input responsive on complex pages.",
    tag: "Performance"
  }
];

// PUBLIC_INTERFACE
export default function BlogSection() {
  /** Blog preview section with animated cards. */
  const reduce = useReducedMotion();

  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-primary">Blog</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">Notes & process.</h2>
          </div>
          <p className="max-w-xl text-sm text-brand-muted">
            Short essays on building modern interfaces, motion systems, and performance.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((p, idx) => (
          <ScrollReveal key={p.title} delay={0.05 * idx}>
            <motion.article
              className="group h-full rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-sm backdrop-blur"
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-brand-border/70 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-muted">
                  {p.tag}
                </span>
                <time className="text-xs text-brand-muted">{p.date}</time>
              </div>
              <h3 className="mt-4 text-base font-semibold text-brand-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.summary}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-brand-muted">Read more</span>
                <span className="text-sm font-semibold text-brand-text transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </motion.article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
