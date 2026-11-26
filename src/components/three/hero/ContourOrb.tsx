import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import { createContourGeometry } from "@/components/three/hero/geometry";
import { orbFragmentShader, orbVertexShader } from "@/components/three/hero/shaders";
import { createOrbUniforms } from "@/components/three/hero/uniforms";
import type { QualityTier } from "@/lib/device";
import type { HeroSceneState } from "@/components/three/hero/sceneState";
import { getPointer } from "@/lib/pointerStore";
import { QUALITY } from "@/components/three/hero/quality";

export function ContourOrb({ scene, quality }: { scene: HeroSceneState; quality: QualityTier }) {
  const uniforms = useMemo(() => createOrbUniforms(scene), [scene]);
  const geometry = useMemo(() => createContourGeometry(QUALITY[quality].slices, QUALITY[quality].segments), [quality]);
  const material = useMemo(() => new ShaderMaterial({
    uniforms,
    vertexShader: orbVertexShader,
    fragmentShader: orbFragmentShader,
    transparent: true,
    depthWrite: false,
  }), [uniforms]);
  useFrame((_, delta) => {
    const pointer = getPointer();
    uniforms.uTime.value += Math.min(delta, 0.05);
    uniforms.uIntro.value = scene.intro;
    uniforms.uScroll.value = scene.scroll;
    uniforms.uPointer.value.set(pointer.sx * 0.9, pointer.sy * 0.9, 0);
    uniforms.uLens.value += ((pointer.active ? 1 : pointer.lens) - uniforms.uLens.value) * 0.08;
  });
  return <lineSegments geometry={geometry} material={material} frustumCulled={false} />;
}
