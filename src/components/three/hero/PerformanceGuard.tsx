import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export function PerformanceGuard() {
  const setDpr = useThree((state) => state.setDpr);
  const slowFrames = useRef(0);
  const lowered = useRef(false);
  useFrame((_, delta) => {
    if (delta > 0.045) slowFrames.current += 1;
    else slowFrames.current = Math.max(0, slowFrames.current - 1);
    if (!lowered.current && slowFrames.current > 18) {
      lowered.current = true;
      setDpr(1);
    }
  });
  return null;
}
