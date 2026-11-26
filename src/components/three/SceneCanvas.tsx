import { Canvas, type RootState } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  label?: string;
  paused?: boolean;
  dpr?: number | [number, number];
  flat?: boolean;
  onCreated?: (state: RootState) => void;
}

export function SceneCanvas({ children, className, label, paused = false, dpr = [1, 1.75], flat = false, onCreated }: SceneCanvasProps) {
  const reduced = useReducedMotion();
  return (
    <div role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} className={cn("relative h-full w-full", className)}>
      <Canvas
        dpr={dpr}
        frameloop={paused ? "never" : reduced ? "demand" : "always"}
        camera={{ position: [0, 0, 6], fov: 35 }}
        gl={{ antialias: !flat, alpha: true, powerPreference: "high-performance", ...(flat ? { stencil: false } : {}) }}
        onCreated={onCreated}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
