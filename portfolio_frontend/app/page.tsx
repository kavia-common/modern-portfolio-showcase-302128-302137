import HeroSection from "../components/sections/HeroSection";
import MarqueeSection from "../components/sections/MarqueeSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";
import BlogSection from "../components/sections/BlogSection";
import ContactSection from "../components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <TimelineSection />
      <BlogSection />
      <ContactSection />
      <footer className="border-t border-brand-border/80 bg-white/50 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-brand-muted">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Modern Portfolio. Built with Next.js.</p>
            <p className="opacity-80">Accents: #3b82f6 · #06b6d4</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
