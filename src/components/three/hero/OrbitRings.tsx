import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, MeshBasicMaterial } from "three";
import { colors } from "@/design/tokens";
import { QUALITY } from "@/components/three/hero/quality";
import type { QualityTier } from "@/lib/device";
import type { HeroSceneState } from "@/components/three/hero/sceneState";

function makeOrbit(segments: number) {
  const points: number[] = [];
  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(Math.cos(angle) * 1.18, Math.sin(angle) * 1.18, 0);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
  return geometry;
}

export function OrbitRings({ scene, quality }: { scene: HeroSceneState; quality: QualityTier }) {
  const geometry = useMemo(() => makeOrbit(QUALITY[quality].ringSegments), [quality]);
  const line = useMemo(() => new LineBasicMaterial({ color: colors.signal, transparent: true, opacity: 0.24, depthWrite: false }), []);
  const satellite = useMemo(() => new MeshBasicMaterial({ color: colors.bone, transparent: true, depthWrite: false }), []);
  useFrame(() => {
    line.opacity = 0.24 * scene.intro * (1 - scene.scroll);
    satellite.opacity = scene.intro * (1 - scene.scroll);
  });
  return (
    <group rotation={[0.38, 0, 0]}>
      <group rotation={[0, 0, 0.56]}><line geometry={geometry} material={line} /><mesh position={[1.18, 0, 0]} material={satellite}><sphereGeometry args={[0.018, 12, 12]} /></mesh></group>
      <group rotation={[0, 0, -0.56]}><line geometry={geometry} material={line} /><mesh position={[-1.18, 0, 0]} material={satellite}><sphereGeometry args={[0.012, 10, 10]} /></mesh></group>
    </group>
  );
}
