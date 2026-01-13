# Setup and developer workflow

This document describes how to run, configure, and iterate on the `portfolio_frontend` Next.js container.

## Prerequisites

You will need:
- Node.js compatible with Next.js 14 (project uses Next.js `^14.2.5`)
- npm (or another package manager, but scripts are documented with npm semantics)

## Install dependencies

From the frontend container directory:

```sh
cd modern-portfolio-showcase-302128-302137/portfolio_frontend
npm install
```

## Local development

### Development server
The project defines a `dev` script that uses `NEXT_PUBLIC_PORT`:

```json
"dev": "next dev -p $NEXT_PUBLIC_PORT"
```

Start the dev server:

```sh
cd modern-portfolio-showcase-302128-302137/portfolio_frontend
NEXT_PUBLIC_PORT=3000 npm run dev
```

If `NEXT_PUBLIC_PORT` is already set in your environment (or provided by the platform), you can run:

```sh
npm run dev
```

### Production build
Build the project:

```sh
npm run build
```

### Production server
Start the server (also uses `NEXT_PUBLIC_PORT`):

```sh
NEXT_PUBLIC_PORT=3000 npm run start
```

### Linting
Run Next.js lint:

```sh
npm run lint
```

## Preview in this environment

This codebase is structured as a container workspace under `modern-portfolio-showcase-302128-302137/portfolio_frontend`. In a typical CI or container preview environment, you will:

1. Install dependencies in `portfolio_frontend/`.
2. Run `npm run build`.
3. Run `npm run start` with `NEXT_PUBLIC_PORT` set to the expected exposed port.

The application provides a health check endpoint at `/healthz` (see `app/healthz/route.ts`) that returns `{ ok: true }`.

## Environment variables

The frontend container defines and/or expects a set of `NEXT_PUBLIC_*` variables. Because these are `NEXT_PUBLIC_`, they are safe to read in client components and will be embedded into the client bundle by Next.js at build time.

### Variables read by code/config

#### `NEXT_PUBLIC_ENABLE_SOURCE_MAPS`
Used in `next.config.js`:

- When set to `"true"`, Next.js enables `productionBrowserSourceMaps`, which is useful for debugging production issues at the cost of larger client artifacts.

#### `NEXT_PUBLIC_API_BASE`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_WS_URL`
Read in `components/sections/ContactSection.tsx` via `process.env[name]` (indirect accessor) and displayed as “Endpoints (from env)”. They do not currently control runtime behavior beyond display.

This is intentionally “demo safe”: the contact form does not submit anywhere by default.

### Variables defined for the container (documented)

The container environment includes the following variables (not all are currently referenced directly by code, but they are available for future integrations):

- `NEXT_PUBLIC_API_BASE`
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_FRONTEND_URL`
- `NEXT_PUBLIC_WS_URL`
- `NEXT_PUBLIC_NODE_ENV`
- `NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED`
- `NEXT_PUBLIC_ENABLE_SOURCE_MAPS`
- `NEXT_PUBLIC_PORT`
- `NEXT_PUBLIC_TRUST_PROXY`
- `NEXT_PUBLIC_LOG_LEVEL`
- `NEXT_PUBLIC_HEALTHCHECK_PATH`
- `NEXT_PUBLIC_FEATURE_FLAGS`
- `NEXT_PUBLIC_EXPERIMENTS_ENABLED`

### Suggested usage notes
If you wire up real integrations later:
- Prefer `NEXT_PUBLIC_API_BASE` for client-side fetch base URLs.
- Keep secrets out of `NEXT_PUBLIC_*` variables. Use server-only environment variables (without `NEXT_PUBLIC_`) for secrets and only access them from server components or route handlers.

## Adding and updating content

The current site content is largely implemented as local arrays and inline copy inside section components. To update the portfolio content:

### Projects
Edit `components/sections/ProjectsSection.tsx` and update the `projects` array:

- `title`
- `desc`
- `tags`

An optional `href` field exists in the type, but the current UI does not render it as a real link; you can extend the card to use it.

### Blog
Edit `components/sections/BlogSection.tsx` and update the `posts` array:

- `title`
- `date`
- `summary`
- `tag`

### Timeline
Edit `components/sections/TimelineSection.tsx` and update the `items` array:

- `year`
- `title`
- `desc`

The GSAP `end` distance scales with number of cards, so adding more items will extend the scroll range automatically (`cards.length * 260` with a minimum of 600).

### About and hero copy
Edit:
- `components/sections/HeroSection.tsx`
- `components/sections/AboutSection.tsx`

Most copy is inline and can be safely changed without affecting the structural layout.

## Accessibility and motion preferences

This project includes several accessibility considerations that you should preserve when iterating:

- `prefers-reduced-motion` is respected by `ScrollReveal` and the marquee CSS.
- A skip link is present in `AppShell`.
- Focus-visible ring styles are applied to primary interactive elements.
- The sticky header includes `aria-label="Primary"` on the `<nav>` element and uses proper button semantics for scroll actions.

When adding new motion, ensure reduced-motion fallbacks remain functional and avoid motion tied to scroll without an opt-out.

## Testing guidance (high-level)

This repository currently does not define a testing framework, but the architecture is testable. Suggested testing layers:

1. Component rendering tests for key sections and utilities:
   - `ScrollReveal` (reduced-motion vs normal)
   - `StickyHeader` (active item logic can be tested by mocking IntersectionObserver)
2. Interaction tests:
   - Smooth scroll navigation button handlers call `scrollIntoView`
   - Contact form submits and transitions to “sent” state
3. Visual/regression checks:
   - Marquee and timeline rendering on common breakpoints
   - Focus ring visibility and skip link behavior

Suggested tooling (if added later):
- Unit/integration: Vitest + React Testing Library
- E2E: Playwright
- Linting: keep using `next lint`

## Future improvements

A few pragmatic improvements that fit this codebase:
- Add real routing for `/projects` or per-project detail pages to take fuller advantage of App Router and `AnimatePresence` transitions.
- Wire the contact form to an API route handler (e.g., `app/api/contact/route.ts`) using `NEXT_PUBLIC_API_BASE` as the destination if needed.
- Add a content source layer (MDX, JSON, or CMS) for projects/blog posts.
- Add automated tests and CI steps for lint + build + basic e2e smoke.
- Consider consolidating theme tokens so CSS variables and Tailwind tokens are derived from a single source of truth.

## Troubleshooting

### Dev server fails due to missing `NEXT_PUBLIC_PORT`
Because scripts use `$NEXT_PUBLIC_PORT`, you must ensure it is set in your environment. Use:

```sh
NEXT_PUBLIC_PORT=3000 npm run dev
```

### Timeline animation not pinning
If `prefers-reduced-motion` is enabled, GSAP setup is skipped and the timeline will be static. Check your OS/browser motion preference settings.
