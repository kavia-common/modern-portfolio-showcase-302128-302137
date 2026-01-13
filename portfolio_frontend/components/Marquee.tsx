"use client";

import clsx from "clsx";
import { useMemo } from "react";

type Props = {
  items: string[];
  durationSeconds?: number;
  className?: string;
  reverse?: boolean;
};

// PUBLIC_INTERFACE
export default function Marquee({ items, durationSeconds = 28, className, reverse = false }: Props) {
  /** Infinite marquee scrolling list. Duplicates items for seamless loop. */
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className={clsx("marquee rounded-2xl border border-brand-border/70 bg-white/60 backdrop-blur", className)}
      style={{ ["--marquee-duration" as any]: `${durationSeconds}s` }}
    >
      <div
        className={clsx(
          "marquee-track marquee-animate px-6 py-5 text-sm font-medium text-brand-muted",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {doubled.map((t, idx) => (
          <span
            key={`${t}-${idx}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand-border/70 bg-white/70 px-4 py-2 transition hover:-translate-y-[1px] hover:text-brand-text"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-success" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
