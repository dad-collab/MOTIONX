import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { colors } from "@/design/tokens";

/**
 * Foundation probe: a dark faceted body with a signal-coloured wireframe shell.
 * Proves lighting, materials, and the render loop. Replaced by the real hero scene later.
 */
export function FoundationOrb() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    node.rotation.y += delta * 0.12;
    node.rotation.x += delta * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color={colors.bone} />
      <pointLight position={[-4, -2, 2]} intensity={6} color={colors.plasma} />
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial color={colors.graphite} metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshBasicMaterial color={colors.signal} wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </>
  );
}
