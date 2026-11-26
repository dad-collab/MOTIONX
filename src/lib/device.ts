export type QualityTier = "low" | "high";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** three.js r163+ needs WebGL2, so that is the only context we probe for. */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Picks a 3D quality tier once, at load. Phones, tablets and low-power
 * machines get a lighter scene; changing tier mid-session would rebuild
 * geometry and cause a visible hitch, so it is deliberately not reactive.
 */
export function detectQuality(): QualityTier {
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 8;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return coarsePointer || narrow || cores <= 4 || memory <= 4 ? "low" : "high";
}

/**
 * Resolves once the three site fonts are ready, or after the timeout.
 * Never rejects: a blocked font request must not block the experience.
 */
export async function loadFonts(timeoutMs = 3000): Promise<void> {
  if (!("fonts" in document)) return;
  const request = Promise.all([
    document.fonts.load('700 1em "Syne"'),
    document.fonts.load('400 1em "Manrope"'),
    document.fonts.load('500 1em "JetBrains Mono"'),
  ]).then(
    () => undefined,
    () => undefined,
  );
  const timeout = new Promise<void>((resolve) => {
    window.setTimeout(resolve, timeoutMs);
  });
  await Promise.race([request, timeout]);
}
