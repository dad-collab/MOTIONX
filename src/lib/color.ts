/**
 * Converts "#rrggbb" to 0..1 sRGB components.
 * Custom shaders write these straight to the screen, so the brand colours
 * appear exactly as they do in CSS (no colour-space conversion involved).
 */
export function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}
