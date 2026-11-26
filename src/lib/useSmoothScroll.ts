import { useEffect } from "react";
import { createSmoothScroll } from "@/lib/scroll";

export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    return createSmoothScroll();
  }, [enabled]);
}
