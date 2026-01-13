# Modern Portfolio Website (Next.js) — Documentation

This repository contains a modern, light-themed portfolio website implemented with Next.js (App Router) and a motion-first UI approach. The site is organized into distinct storytelling sections and uses both Framer Motion and GSAP ScrollTrigger to deliver smooth scroll-triggered animations, interactive transitions, marquee highlights, and micro-interactions.

## Overview and goals

The goal of this project is to provide a visually engaging portfolio template that feels calm and modern while still being highly interactive. The site is designed to communicate structure through motion: sections reveal as they enter the viewport, navigation reflects the reader’s position, and certain areas (such as the timeline) use scroll-linked progression to tell a story.

The implementation prioritizes:
- A clean light theme with subtle gradients and restrained shadows.
- Motion that reinforces hierarchy and intent rather than distracting.
- Reusable animation utilities and patterns.
- Accessibility and reduced-motion fallbacks.

## Features

This portfolio includes the following features, implemented in the frontend container:

### Sections and layout
The homepage is a single-page layout composed of a sequence of sections:
- Hero section (landing headline and CTAs)
- Marquee section (two marquee rows)
- About section
- Projects section
- Timeline section
- Blog section
- Contact section
- Footer with accents and dynamic year

These sections are composed in `app/page.tsx`.

### Smooth scroll and navigation behaviors
The site supports smooth scrolling (via CSS `scroll-behavior`) and a sticky header with section-aware navigation. The header tracks which section is most visible using an `IntersectionObserver` and highlights the active nav item.

### Scroll-triggered animations
A reusable `ScrollReveal` wrapper animates content into view when it enters the viewport, with reduced-motion support.

### Interactive page transitions
An application shell (`AppShell`) wraps the entire site and provides a subtle mount/exit transition using Framer Motion’s `AnimatePresence` and a `motion.div` wrapper.

### Marquee sections
The marquee is implemented as an infinite horizontal scrolling list with a gradient mask and a duplicated item list for seamless looping.

### Micro-interactions
The UI includes hover lift on cards, animated underline interactions for links, focus rings, and small translation/shadow changes for tactile feedback.

### Complex timeline animations (GSAP ScrollTrigger)
The timeline section uses GSAP’s `ScrollTrigger` to pin the section and scrub through a timeline as the user scrolls. Cards reveal sequentially and a progress bar scales based on scroll progress. Reduced motion disables the GSAP setup.

### Responsive design
Layout and grids are responsive using Tailwind’s responsive utility classes. The header collapses to fewer visible controls on small screens, and sections adapt their columns at `md`, `lg`, and `sm` breakpoints.

### Visually engaging light theme
The overall theme is a bright, clean light surface with accent gradients:
- Primary accent: `#3b82f6`
- Secondary success/accent: `#06b6d4`

The background includes radial gradient “ambient orbs” and a subtle selection highlight.

## Documentation map

- `docs/ARCHITECTURE.md` describes how the Next.js App Router app is organized, including components and motion utilities.
- `docs/ANIMATIONS.md` documents motion patterns, the `ScrollReveal` utility, page transitions, marquee behavior, and the GSAP pinned timeline.
- `docs/SETUP.md` covers local development, scripts, environment variables, and preview workflow.
- `docs/STYLE_GUIDE.md` documents the light theme, tokens, and styling patterns used in Tailwind and global CSS.

## Quick reference: key entry points

The core site wiring happens here:
- `portfolio_frontend/app/layout.tsx` sets metadata, global CSS, and wraps the app in `AppShell`.
- `portfolio_frontend/app/page.tsx` composes all sections in order.
- `portfolio_frontend/components/AppShell.tsx` provides the sticky header, ambient background, and page transition wrapper.

## Changelog (latest implementation)

### Added
The latest implementation includes:
- A complete single-page portfolio composed of `Hero`, `Marquee`, `About`, `Projects`, `Timeline`, `Blog`, and `Contact` sections.
- A sticky, section-aware header with smooth scroll navigation.
- A shared `ScrollReveal` utility for viewport-triggered reveals with reduced-motion handling.
- An infinite marquee component with gradient masking and hover micro-interactions.
- A GSAP ScrollTrigger pinned timeline with scrubbed progress and card sequencing.
- A light theme with brand tokens and subtle ambient gradient background effects.

### Configuration
- Tailwind theme tokens and marquee keyframes are defined in `tailwind.config.js`.
- `next.config.js` supports enabling production browser source maps via `NEXT_PUBLIC_ENABLE_SOURCE_MAPS`.

----
If you are looking to modify behavior or add content, start with `docs/SETUP.md` and `docs/ARCHITECTURE.md`.
