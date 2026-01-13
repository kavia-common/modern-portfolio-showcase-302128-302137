# Animations and interactions

This project uses a layered motion approach:
- Framer Motion for most UI animations and micro-interactions.
- GSAP ScrollTrigger for the pinned, scroll-scrubbed timeline sequence.
- CSS keyframes for the marquee loop.

The intent is to keep motion reusable and predictable. Most sections rely on a small set of repeatable patterns rather than bespoke animation code.

## Motion primitives in use

### Framer Motion
Framer Motion is used for:
- Page wrapper transitions in `components/AppShell.tsx`.
- Viewport-based reveals via `components/motion/ScrollReveal.tsx`.
- Hover lift on cards and UI tiles in multiple sections.
- Small indicator and style transitions in the sticky header.

### GSAP + ScrollTrigger
GSAP is used only in `components/sections/TimelineSection.tsx` for:
- Pinning the timeline wrapper while the user scrolls.
- Scrubbing a timeline so scroll progress maps to animation progress.
- Sequenced card reveal effects.
- Driving a progress bar based on scroll progress.

### CSS animations
The marquee loop is implemented with CSS keyframes (`marquee`) and a class-based animation toggle. Reduced motion disables the marquee animation at the CSS level.

## ScrollReveal: viewport-triggered reveal wrapper

`components/motion/ScrollReveal.tsx` implements the project’s standard scroll reveal.

### Behavior
When motion is enabled (normal mode), `ScrollReveal`:
- Starts at `opacity: 0`, `y: 18`, `filter: blur(8px)`
- Transitions to `opacity: 1`, `y: 0`, `filter: blur(0px)`
- Runs once when the element enters the viewport
- Uses `viewport={{ once: true, amount: 0.35 }}` so it triggers when ~35% of the component is visible
- Supports a `delay` prop to stagger multiple siblings

### Reduced motion behavior
When the user has `prefers-reduced-motion: reduce`, the component:
- Sets `initial={false}` and skips `whileInView` and `transition`
- This effectively renders content statically without scroll-driven fades/transforms

This behavior is controlled by `useReducedMotion()`.

## Page transitions in AppShell

`components/AppShell.tsx` wraps the page in:

- `AnimatePresence mode="wait"`
- `motion.div` with `initial`, `animate`, and `exit` states

The effect is a subtle mount/exit transition:
- Initial: fades in while moving up slightly and removing blur
- Exit: fades out with a small upward move and blur

Even though the current site is a single page, this wrapper provides a polished initial load and supports route transitions if additional routes are added later.

## Sticky header interactions

`components/StickyHeader.tsx` uses:
- A scroll listener that toggles `scrolled` after `window.scrollY > 12`
- Framer Motion `motion.header` animates:
  - `backdropFilter` between `blur(0px)` and `blur(10px)`
  - `backgroundColor` between transparent and `rgba(255,255,255,0.72)`

The navigation also includes:
- Section-aware active state based on `IntersectionObserver`
- A gradient underline indicator (`motion.span`) that fades/scales in when active
- A CSS underline micro-interaction (`.link-underline`) that expands on hover/focus-visible

## Marquee behavior

The marquee is defined by:
- `components/Marquee.tsx` (React component)
- Global CSS helpers in `app/globals.css`
- A Tailwind keyframe definition in `tailwind.config.js`

### How looping works
`Marquee` duplicates the `items` array (`[...items, ...items]`) so the visual track can translate by 50% of its width (effectively one copy) and appear continuous.

### CSS mechanism
- `.marquee` defines the container and sets a `mask-image` gradient to fade edges.
- `.marquee-track` is a flex row with `width: max-content`.
- `.marquee-animate` applies the `marquee` keyframes with a configurable duration via the CSS variable `--marquee-duration`.

### Reduced motion behavior
`app/globals.css` disables the marquee animation under `prefers-reduced-motion: reduce` by setting `animation: none` for `.marquee-animate`.

## GSAP timeline: pinned + scrubbed TimelineSection

`components/sections/TimelineSection.tsx` implements a pinned section that progresses as the user scrolls.

### Loading strategy
GSAP and ScrollTrigger are dynamically imported inside a `useEffect` callback, and setup is skipped entirely if reduced motion is enabled:

- `if (reduce) return;`
- `await import("gsap")`
- `await import("gsap/ScrollTrigger")`

### ScrollTrigger configuration
The scroll trigger is configured as:
- `trigger: wrap` (the section wrapper)
- `start: "top center"`
- `end: () => "+=" + Math.max(600, cards.length * 260)`
- `scrub: 0.6`
- `pin: wrap`
- `anticipatePin: 1`

### UI side-effects
On each scroll update:
- The component calculates an “active index” based on `self.progress`
- React state `activeIndex` is updated to highlight the year badge
- The progress bar element is animated via `gsap.to(progress, { scaleX: self.progress, duration: 0.1, ease: "none" })`

### Sequenced card animation
Each card is animated into focus via the GSAP timeline:

- From: `{ opacity: 0.35, y: 16, filter: "blur(6px)" }`
- To: `{ opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "power2.out" }`

Cards are staggered by placing each animation at `i * 0.25` on the timeline.

### Cleanup
The effect returns a cleanup that:
- Kills the timeline and its scrollTrigger
- Calls `ScrollTrigger.getAll().forEach((t) => t.kill())`

This prevents memory leaks and stray pinned states on unmount.

## Animation performance guidelines (as implemented)

The current implementation already follows several best practices:
- Heavy GSAP setup is isolated to one section and lazy-loaded by dynamic import.
- Most motion is implemented as small transforms and opacity changes, which are typically GPU-friendly.
- Marquee and ambient elements use `will-change` and `pointer-events: none` appropriately.
- Reduced-motion is supported both in Framer Motion (`useReducedMotion`) and in CSS (`@media (prefers-reduced-motion: reduce)`).

If you add new animations, prefer transforms (`translate`, `scale`) and opacity over layout-affecting properties and keep scroll-linked work minimal.

## Adding a new ScrollReveal-staggered block

Use `ScrollReveal` and apply incremental delays:

```tsx
<ScrollReveal>...</ScrollReveal>
<ScrollReveal delay={0.05}>...</ScrollReveal>
<ScrollReveal delay={0.10}>...</ScrollReveal>
```

This pattern is already used in multiple sections where content is mapped as a list.
