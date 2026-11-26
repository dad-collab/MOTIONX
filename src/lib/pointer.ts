import { useEffect, useState } from "react";

interface PointerState {
  x: number;
  y: number;
}

/** Tracks the pointer position as normalised values in the range -1 to 1. */
export function usePointer(enabled: boolean): PointerState {
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  return pointer;
}
