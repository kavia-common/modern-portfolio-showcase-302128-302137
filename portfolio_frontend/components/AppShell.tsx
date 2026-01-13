"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StickyHeader from "./StickyHeader";

// PUBLIC_INTERFACE
export default function AppShell({ children }: { children: React.ReactNode }) {
  /** Provides sticky header, ambient background effects, and page transitions. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const ambientOrbs = useMemo(
    () => [
      { top: "10%", left: "10%", size: 240, color: "rgba(59,130,246,0.16)" },
      { top: "22%", left: "70%", size: 220, color: "rgba(6,182,212,0.14)" },
      { top: "66%", left: "18%", size: 280, color: "rgba(59,130,246,0.10)" }
    ],
    []
  );

  return (
    <div className="relative">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-brand-text focus:shadow-soft"
      >
        Skip to top
      </a>

      <StickyHeader />

      {/* Ambient, non-interactive background layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {ambientOrbs.map((o, idx) => (
          <div
            key={idx}
            className="absolute rounded-full blur-3xl"
            style={{
              top: o.top,
              left: o.left,
              width: o.size,
              height: o.size,
              background: o.color
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mounted ? "mounted" : "ssr"}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
