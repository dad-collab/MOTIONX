import type { QualityTier } from "@/lib/device";

export const QUALITY = {
  high: { slices: 84, segments: 288, core: [128, 96] as const, dust: 900, ringSegments: 192, dpr: [1, 1.65] as [number, number] },
  low: { slices: 54, segments: 176, core: [80, 60] as const, dust: 320, ringSegments: 128, dpr: [1, 1.35] as [number, number] },
} satisfies Record<QualityTier, { slices: number; segments: number; core: readonly [number, number]; dust: number; ringSegments: number; dpr: [number, number] }>;
