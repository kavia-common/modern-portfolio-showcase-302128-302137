"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ScrollReveal from "../motion/ScrollReveal";
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";

type TimelineItem = { year: string; title: string; desc: string };

const items: TimelineItem[] = [
  { year: "2021", title: "Foundation", desc: "Shipped multi-page UI with strong accessibility and component reuse." },
  { year: "2022", title: "Systems & scale", desc: "Built a design system baseline and performance budgets for key flows." },
  { year: "2023", title: "Motion language", desc: "Introduced scroll-linked storytelling and micro-interactions across features." },
  { year: "2024", title: "Polish & craft", desc: "Refined interactions, ensured 60fps motion, and improved information architecture." }
];

// PUBLIC_INTERFACE
export default function TimelineSection() {
  /** Timeline section with pinned scrolling progression using GSAP ScrollTrigger. */
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const markers = useMemo(() => items.map((_, i) => `timeline-marker-${i}`), []);

  useEffect(() => {
    if (reduce) return;

    let ctxCleanup: (() => void) | undefined;

    const setup = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const wrap = wrapRef.current;
      if (!wrap) return;

      const content = wrap.querySelector("[data-timeline-content]") as HTMLElement | null;
      const progress = wrap.querySelector("[data-timeline-progress]") as HTMLElement | null;
      const cards = Array.from(wrap.querySelectorAll("[data-timeline-card]")) as HTMLElement[];

      if (!content || !progress || !cards.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top center",
          end: () => `+=${Math.max(600, cards.length * 260)}`,
          scrub: 0.6,
          pin: wrap,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            setActiveIndex(idx);
            gsap.to(progress, { scaleX: self.progress, duration: 0.1, ease: "none" });
          }
        }
      });

      // Cards animation: fade/raise in sequence while scrolling.
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0.35, y: 16, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "power2.out" },
          i * 0.25
        );
      });

      ctxCleanup = () => {
        tl.scrollTrigger?.kill(true);
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    setup();

    return () => {
      if (ctxCleanup) ctxCleanup();
    };
  }, [reduce]);

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-primary">Timeline</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">Progressive craft.</h2>
          </div>
          <p className="max-w-xl text-sm text-brand-muted">
            A pinned section that progresses as you scroll—highlighting milestones with a smooth, scrubbed animation.
          </p>
        </div>
      </ScrollReveal>

      <div ref={wrapRef} className="relative mt-10">
        <div className="rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:w-[38%]">
              <p className="text-sm font-semibold text-brand-text">Milestones</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                Scroll through the cards. The progress bar and active marker respond in real time.
              </p>

              <div className="mt-5 rounded-2xl border border-brand-border/70 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-muted">Progress</span>
                  <span className="text-xs font-semibold text-brand-text">{activeIndex + 1} / {items.length}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-border/70">
                  <div
                    data-timeline-progress
                    className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-primary to-brand-success"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((it, i) => (
                    <span
                      key={markers[i]}
                      className={clsx(
                        "rounded-full border px-3 py-1 text-xs font-semibold transition",
                        i === activeIndex
                          ? "border-transparent bg-gradient-to-r from-brand-primary to-brand-success text-white"
                          : "border-brand-border/70 bg-white/70 text-brand-muted"
                      )}
                    >
                      {it.year}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs text-brand-muted">
                  {reduce ? "Reduced motion enabled: using static timeline." : "Pinned + scrubbed motion via GSAP ScrollTrigger."}
                </p>
              </div>
            </div>

            <div data-timeline-content className="grid flex-1 gap-4 lg:pl-8">
              {items.map((it) => (
                <div
                  key={it.year}
                  data-timeline-card
                  className="rounded-3xl border border-brand-border/70 bg-white/70 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold text-brand-primary">{it.year}</p>
                    <span className="h-1 w-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-success opacity-60" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-brand-text">{it.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fallback note for very short pages (still okay) */}
        <p className="mt-4 text-xs text-brand-muted">
          Tip: this section is designed to feel “pinned” on longer scroll contexts.
        </p>
      </div>
    </section>
  );
}
