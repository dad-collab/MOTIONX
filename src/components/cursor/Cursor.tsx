import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FINE_POINTER, useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Cursor() {
  const fine = useMediaQuery(FINE_POINTER);
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!fine || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    document.documentElement.classList.add("has-cursor");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      dotX(event.clientX); dotY(event.clientY); ringX(event.clientX); ringY(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest("a,button,[data-cursor]")) gsap.to(ring, { scale: 1.65, duration: 0.3 });
    };
    const onOut = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest("a,button,[data-cursor]")) gsap.to(ring, { scale: 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      gsap.killTweensOf([dot, ring]);
    };
  }, [fine, reduced]);
  if (!fine || reduced) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <span ref={ringRef} className="cursor-ring fixed left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/60" />
      <span ref={dotRef} className="cursor-dot fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
    </div>
  );
}
