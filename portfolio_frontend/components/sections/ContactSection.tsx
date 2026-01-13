"use client";

import { useMemo, useState } from "react";
import ScrollReveal from "../motion/ScrollReveal";
import { motion, useReducedMotion } from "framer-motion";

type FormState = { name: string; email: string; message: string };

function safeEnv(name: string) {
  // Only reads NEXT_PUBLIC_* values, safe for client.
  return process.env[name] ?? "";
}

// PUBLIC_INTERFACE
export default function ContactSection() {
  /** Contact section with an animated, accessible form (no backend submission by default). */
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });

  const meta = useMemo(
    () => ({
      apiBase: safeEnv("NEXT_PUBLIC_API_BASE"),
      backendUrl: safeEnv("NEXT_PUBLIC_BACKEND_URL"),
      wsUrl: safeEnv("NEXT_PUBLIC_WS_URL")
    }),
    []
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Intentionally not posting anywhere: backend integration is unknown.
    // Keeps preview behavior stable while still providing a polished UX.
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-primary">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">Let’s build something.</h2>
          </div>
          <p className="max-w-xl text-sm text-brand-muted">
            A lightweight form with delightful micro-interactions. Hook it to your backend when ready.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <ScrollReveal className="lg:col-span-5">
          <div className="rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold text-brand-text">Endpoints (from env)</p>
            <p className="mt-2 text-sm text-brand-muted">
              These values are read from <code className="rounded bg-white/70 px-2 py-1 text-xs">NEXT_PUBLIC_*</code>.
            </p>

            <div className="mt-4 grid gap-3 text-xs">
              {[
                { k: "API Base", v: meta.apiBase },
                { k: "Backend URL", v: meta.backendUrl },
                { k: "WebSocket", v: meta.wsUrl }
              ].map((row) => (
                <div key={row.k} className="rounded-2xl border border-brand-border/70 bg-white/70 p-4">
                  <p className="font-semibold text-brand-text">{row.k}</p>
                  <p className="mt-1 break-all text-brand-muted">{row.v || "—"}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-brand-border/70 bg-gradient-to-r from-brand-primary/10 to-brand-success/10 p-4">
              <p className="text-sm font-semibold text-brand-text">Micro-interactions</p>
              <p className="mt-2 text-sm text-brand-muted">
                Focus rings, hover lift, and subtle transitions support clarity without overwhelming the layout.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-7" delay={0.08}>
          <motion.form
            onSubmit={onSubmit}
            className="rounded-3xl border border-brand-border/70 bg-white/60 p-6 shadow-soft backdrop-blur"
            initial={false}
            animate={status === "sent" ? { scale: 0.995 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold text-brand-text">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="rounded-xl border border-brand-border/80 bg-white/70 px-4 py-3 text-sm text-brand-text outline-none transition focus:border-brand-primary/60 focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold text-brand-text">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  className="rounded-xl border border-brand-border/80 bg-white/70 px-4 py-3 text-sm text-brand-text outline-none transition focus:border-brand-primary/60 focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <span className="text-xs font-semibold text-brand-text">Message</span>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                className="min-h-[140px] resize-y rounded-xl border border-brand-border/80 bg-white/70 px-4 py-3 text-sm text-brand-text outline-none transition focus:border-brand-primary/60 focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Tell me about your project..."
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-primary to-brand-success px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              >
                Send message
              </button>

              <motion.p
                aria-live="polite"
                className="text-sm text-brand-muted"
                initial={false}
                animate={{
                  opacity: status === "sent" ? 1 : 0,
                  y: status === "sent" ? 0 : 6
                }}
                transition={reduce ? { duration: 0 } : { duration: 0.25 }}
              >
                Message queued (demo). Hook up your API when ready.
              </motion.p>
            </div>
          </motion.form>
        </ScrollReveal>
      </div>
    </section>
  );
}
