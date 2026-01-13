# Style guide (light theme)

This project implements a modern, minimal, light-themed visual system with crisp accents and subtle gradients. The theme is implemented through a mix of Tailwind theme extensions and a small number of global CSS rules.

## Theme goals

The styling aims to:
- Keep the overall surface bright and clean.
- Use accent color sparingly for emphasis and hierarchy.
- Use gradients as subtle highlights rather than heavy decoration.
- Maintain strong readability and consistent spacing across breakpoints.

## Brand colors and tokens

### Primary accents (required)
- Primary: `#3b82f6` (blue)
- Success/accent: `#06b6d4` (cyan)

These values appear in:
- Tailwind tokens in `tailwind.config.js` under `colors.brand.*`
- CSS variables in `app/globals.css` under `:root`

### Supporting tokens (as implemented)
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`
- Muted text: `#64748b`
- Border: `#e5e7eb`

These are represented in Tailwind as:
- `brand-bg`
- `brand-surface`
- `brand-text`
- `brand-muted`
- `brand-border`

And also as CSS variables:
- `--bg`
- `--surface`
- `--text`
- `--muted`
- `--border`

## Gradients and visual accents

### Primary gradient pattern
Across the UI, accents typically use the gradient:

- `from-brand-primary to-brand-success`

This gradient is used for:
- Primary buttons (“Let’s talk”, “View projects”, “Send message”)
- Small indicator dots
- Progress bars (timeline)
- Minor ambient highlights

### Background gradients
The page background is defined in `app/globals.css` and combines:
- Two radial gradients with low alpha based on the two accent colors
- A solid background color (`var(--bg)`)

This creates a subtle “ambient” feel in the light theme without reducing readability.

## Shadows and depth

The design uses restrained shadows:
- Tailwind defines `shadow-soft` as `0 10px 30px rgba(17, 24, 39, 0.08)` in `tailwind.config.js`.

Cards often combine:
- A soft shadow
- A thin border (`border-brand-border/70`)
- A light translucent surface (`bg-white/60` or `bg-white/70`)
- `backdrop-blur` for a glassy, modern effect

## Typography guidelines (as implemented)

The project uses default Next.js/React typography and Tailwind utilities:
- Headlines use `font-semibold` and `tracking-tight` for crispness.
- Muted body copy uses `text-brand-muted` and controlled line-height (`leading-relaxed`).
- Small UI labels often use `text-xs` with `font-semibold`.

Prefer semantic HTML for structure:
- `h1` in the hero section
- `h2` for section titles
- `article` for blog and project cards where appropriate

## Layout and spacing

Layout is built around a centered max width:
- Many sections use `mx-auto max-w-6xl px-6` with generous `py-*` spacing.

Responsive grids are implemented using Tailwind breakpoints:
- `sm`, `md`, and `lg` adjustments for columns and alignment.
- Header navigation hides on small screens (`hidden ... sm:flex`).

## Micro-interactions

### Link underline
`app/globals.css` defines `.link-underline`, a subtle animated underline effect:
- A gradient underline grows from 0% to 100% width on hover/focus-visible.
- Use it on inline link-like text where you want understated interactivity.

### Hover lift
Cards and some tiles use Framer Motion hover lift (e.g., translate Y by a few pixels). When adding new cards, keep hover lift small and consistent to maintain a calm feel.

### Focus rings
Interactive elements commonly apply focus-visible ring styles such as:
- `focus-visible:ring-2 focus-visible:ring-brand-primary/40`

Preserve this pattern when adding new buttons/links to maintain keyboard accessibility.

## Marquee styling

The marquee look is a combination of:
- Container glass effect: border + translucent white + backdrop blur
- Gradient edge mask: `mask-image` on `.marquee`
- Loop animation: `.marquee-animate` (disabled for reduced motion)

The keyframes are defined in Tailwind (`tailwind.config.js`) and referenced through class names.

## Do and don’t

Do keep changes aligned with existing tokens and composition. Avoid introducing new hard-coded colors unless you are expanding the design system intentionally. Do not introduce motion-only affordances for critical actions; always keep the UI understandable without animation.

## File references

The theme is primarily defined in:
- `portfolio_frontend/app/globals.css`
- `portfolio_frontend/tailwind.config.js`
