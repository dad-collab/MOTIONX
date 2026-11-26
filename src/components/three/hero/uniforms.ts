import { Vector3 } from "three";
import { colors } from "@/design/tokens";
import { hexToRgb } from "@/lib/color";
import type { HeroSceneState } from "@/components/three/hero/sceneState";

const vector = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  return new Vector3(r, g, b);
};

export function createOrbUniforms(scene: HeroSceneState) {
  return {
    uTime: { value: 0 },
    uIntro: { value: scene.intro },
    uScroll: { value: scene.scroll },
    uPointer: { value: new Vector3(0, 0, 0) },
    uLens: { value: 0 },
    uSignal: { value: vector(colors.signal) },
    uBone: { value: vector(colors.bone) },
    uVoid: { value: vector(colors.void) },
  };
}
