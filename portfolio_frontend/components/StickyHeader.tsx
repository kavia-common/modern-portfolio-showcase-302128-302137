"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type NavItem = { id: string; label: string };

// PUBLIC_INTERFACE
export default function StickyHeader() {
  /** Sticky header with animated shrink/blur on scroll and section-aware navigation. */
  const nav: NavItem[] = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "timeline", label: "Timeline" },
      { id: "blog", label: "Blog" },
      { id: "contact", label: "Contact" }
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // choose the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.25, 0.35, 0.5], rootMargin: "-20% 0px -55% 0px" }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [nav]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      className={clsx(
        "sticky top-0 z-50 w-full border-b border-transparent transition-colors",
        scrolled && "border-brand-border/70"
      )}
      animate={{
        backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        backgroundColor: scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.0)"
      }}
      transition={{ duration: 0.25 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold text-brand-text outline-none transition hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          aria-label="Scroll to top"
        >
          <span className="relative">
            <span className="link-underline">Portfolio</span>
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-brand-primary to-brand-success opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
          </span>
        </button>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={clsx(
                  "relative rounded-xl px-3 py-2 text-sm font-medium text-brand-muted outline-none transition",
                  "hover:bg-white/60 hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-primary/40",
                  active && "text-brand-text"
                )}
              >
                <span className="link-underline">{item.label}</span>
                <motion.span
                  className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-brand-primary to-brand-success"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, scaleX: active ? 1 : 0.35 }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("contact");
          }}
          className="rounded-xl bg-gradient-to-r from-brand-primary to-brand-success px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Let’s talk
        </a>
      </div>
    </motion.header>
  );
}
