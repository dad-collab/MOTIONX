# MOTIONX — Motion & Real-Time 3D Studio

An editorial studio-site foundation built with React, Vite, TypeScript, Tailwind CSS v4, GSAP, Three.js / React Three Fiber and Framer Motion. Phase 02 adds a cinematic home experience while keeping the Phase 01 foundation showcase intact.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To see the preserved Phase 01 component showcase during development, open `/?view=foundation`.

## What to explore

- Watch the preloader reveal the hero and large split headline.
- Move a mouse or trackpad over the orb to see the contour field react; move across the headline for restrained parallax.
- Use the floating Work / Studio / Services / Contact navigation or the hero calls to action to scroll between sections.
- Scroll down to see the hero scene recede and each chapter title animate into view.
- At widths below 768px, use the Menu button; the 3D scene uses fewer particles and lighter geometry.
- Enable reduced motion in the operating system to remove scroll smoothing and most motion effects.

## Where to edit

- Main copy and navigation labels: `src/content/site.ts`.
- The contact email currently uses `hello@motionx.example` as a placeholder; replace it before publishing.
- Hero layout and animation: `src/components/sections/Hero.tsx`.
- Chapter copy and layout: `src/content/site.ts` and `src/components/sections/Chapter.tsx`.
- Palette, type and motion tokens: `src/styles/index.css` and `src/design/tokens.ts`.
- The preserved Phase 01 showcase remains in `src/pages/FoundationPage.tsx`.

## Performance and accessibility

The scene selects a lighter quality tier on narrow, touch-first or lower-resource devices, caps pixel ratio and reduces it further if frames remain slow. If WebGL is unavailable or fails, a static contour illustration is shown. Scroll animation respects `prefers-reduced-motion`; navigation supports keyboard focus, a mobile focus trap and Escape-to-close. The hero headline has a screen-reader text equivalent and uses a fit-to-width safeguard while actual Syne glyph widths vary by browser.

The Work, Studio, Services and Contact sections are intentionally minimal anchor destinations for this phase; replace their introductory copy with project content as it becomes available.

## GitHub Pages deployment

The repository workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist` to GitHub Pages. The Vite base path is set to `/MOTIONX/`, matching `https://dad-collab.github.io/MOTIONX/`. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. Push to `main` or `master`, or start the workflow manually.

The project snapshot did not include `package-lock.json`. The workflow creates one in the runner only if it is missing, then installs dependencies with `npm ci` before running the production build. For fully repeatable dependency versions across deploys, commit a generated `package-lock.json` to the repository.
