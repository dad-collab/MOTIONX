/**
 * MOTIONX design tokens (TypeScript mirror).
 *
 * Source of truth for styling is the @theme block in src/styles/index.css.
 * These values are for JavaScript-side use only (three.js materials, GSAP
 * timelines, framer-motion curves). Keep the colour values in sync with the CSS.
 */

export const colors = {
  void: "#04050a",
  ink: "#0a0c12",
  graphite: "#11141c",
  steel: "#1a1f2b",
  line: "#232a38",
  mist: "#7d8799",
  fog: "#b4bccb",
  bone: "#eef1f6",
  signal: "#c8ff3e",
  signalDim: "#8db32a",
  plasma: "#5b6cff",
  alert: "#ff5c5c",
} as const;

export type ColorToken = keyof typeof colors;

export const fontFamilies = {
  display: "Syne",
  sans: "Manrope",
  mono: "JetBrains Mono",
} as const;

/** GSAP timing, in seconds. */
export const motionTokens = {
  duration: {
    fast: 0.6,
    base: 1.2,
    slow: 1.8,
    cinematic: 2.6,
  },
  ease: {
    out: "expo.out",
    inOut: "power4.inOut",
    soft: "power2.out",
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
    loose: 0.14,
  },
} as const;

/** Cubic-bezier used by framer-motion (matches --ease-out-expo in CSS). */
export const bezier = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Matches --ease-in-out-quint in CSS. Used for large panel transitions. */
  inOutQuint: [0.83, 0, 0.17, 1] as [number, number, number, number],
} as const;

export const layout = {
  maxWidth: 1600,
  gutter: { mobile: 24, desktop: 64 },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
