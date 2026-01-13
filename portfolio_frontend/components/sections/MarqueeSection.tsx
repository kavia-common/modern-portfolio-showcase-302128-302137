"use client";

import ScrollReveal from "../motion/ScrollReveal";
import Marquee from "../Marquee";

const rowA = ["UI engineering", "Design systems", "Motion design", "Next.js", "TypeScript", "Accessibility", "Performance"];
const rowB = ["GSAP", "Framer Motion", "ScrollTrigger", "Micro-interactions", "Storytelling", "Responsive layouts", "SEO"];

// PUBLIC_INTERFACE
export default function MarqueeSection() {
  /** A marquee highlight section between hero and about. */
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <ScrollReveal>
        <div className="grid gap-4">
          <Marquee items={rowA} durationSeconds={26} />
          <Marquee items={rowB} durationSeconds={30} reverse />
        </div>
      </ScrollReveal>
    </section>
  );
}
