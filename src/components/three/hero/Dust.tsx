import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";
import { createDustGeometry } from "@/components/three/hero/geometry";
import { dustFragmentShader, dustVertexShader } from "@/components/three/hero/shaders";
import { colors } from "@/design/tokens";
import type { HeroSceneState } from "@/components/three/hero/sceneState";
import type { QualityTier } from "@/lib/device";
import { QUALITY } from "@/components/three/hero/quality";

export function Dust({ scene, quality }: { scene: HeroSceneState; quality: QualityTier }) {
  const geometry = useMemo(() => createDustGeometry(QUALITY[quality].dust), [quality]);
  const material = useMemo(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uIntro: { value: 0 }, uScroll: { value: 0 }, uSignal: { value: new Color(colors.signal) } },
    vertexShader: dustVertexShader,
    fragmentShader: dustFragmentShader,
    transparent: true,
    depthWrite: false,
  }), []);
  useFrame((_, delta) => {
    material.uniforms.uTime.value += Math.min(delta, 0.05);
    material.uniforms.uIntro.value = scene.intro;
    material.uniforms.uScroll.value = scene.scroll;
  });
  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
