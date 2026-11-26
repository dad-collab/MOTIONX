import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, type RootState } from "@react-three/fiber";
import { Group, ShaderMaterial, SphereGeometry } from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { ContourOrb } from "@/components/three/hero/ContourOrb";
import { OrbitRings } from "@/components/three/hero/OrbitRings";
import { Dust } from "@/components/three/hero/Dust";
import { PerformanceGuard } from "@/components/three/hero/PerformanceGuard";
import { coreFragmentShader, coreVertexShader } from "@/components/three/hero/shaders";
import { createOrbUniforms } from "@/components/three/hero/uniforms";
import type { HeroSceneState } from "@/components/three/hero/sceneState";
import type { QualityTier } from "@/lib/device";
import { trackPointer, getPointer } from "@/lib/pointerStore";

function SceneContents({ scene, quality }: { scene: HeroSceneState; quality: QualityTier }) {
  const orb = useRef<Group>(null);
  const { viewport, size } = useThree();
  const elapsed = useRef(0);
  const core = useMemo(() => {
    const uniforms = createOrbUniforms(scene);
    return new ShaderMaterial({ uniforms, vertexShader: coreVertexShader, fragmentShader: coreFragmentShader });
  }, [scene]);
  const coreGeometry = useMemo(() => new SphereGeometry(0.985, quality === "high" ? 128 : 80, quality === "high" ? 96 : 60), [quality]);
  useEffect(() => trackPointer(), []);
  useFrame((_state, delta) => {
    const group = orb.current;
    if (!group) return;
    const pointer = getPointer();
    const portrait = size.width < 768;
    const radius = Math.min(viewport.height * (portrait ? 0.25 : 0.32), viewport.width * (portrait ? 0.42 : 0.245));
    group.scale.setScalar(Math.max(0.55, radius));
    group.position.set(portrait ? 0 : -viewport.width * 0.16, portrait ? viewport.height * 0.15 : 0.02, 0);
    group.rotation.x += (pointer.sy * 0.16 - group.rotation.x) * 0.035;
    elapsed.current += Math.min(delta, 0.05);
    group.rotation.y += ((elapsed.current * 0.045 + pointer.sx * 0.13) - group.rotation.y) * 0.025;
    core.uniforms.uIntro.value = scene.intro;
    core.uniforms.uScroll.value = scene.scroll;
    core.uniforms.uTime.value += Math.min(delta, 0.05);
  });
  return (
    <>
      <PerformanceGuard />
      <group ref={orb}>
        <mesh geometry={coreGeometry} material={core} />
        <ContourOrb scene={scene} quality={quality} />
        <OrbitRings scene={scene} quality={quality} />
      </group>
      <Dust scene={scene} quality={quality} />
    </>
  );
}

export function HeroScene({ scene, quality, paused, onReady }: { scene: HeroSceneState; quality: QualityTier; paused: boolean; onReady: () => void }) {
  const readyCallback = useRef(onReady);
  readyCallback.current = onReady;
  const handleCreated = (_state: RootState) => {
    requestAnimationFrame(() => requestAnimationFrame(() => readyCallback.current()));
  };
  return (
    <SceneCanvas className="h-full w-full" paused={paused} dpr={quality === "high" ? [1, 1.65] : [1, 1.35]} flat onCreated={handleCreated}>
      <SceneContents scene={scene} quality={quality} />
    </SceneCanvas>
  );
}
