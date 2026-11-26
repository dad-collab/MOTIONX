import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { FINE_POINTER, useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery(FINE_POINTER);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || !fine || reduced) return;
    const xTo = gsap.quickTo(node, "x", { duration: 0.7, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.7, ease: "elastic.out(1, 0.35)" });
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * 0.12);
      yTo((event.clientY - rect.top - rect.height / 2) * 0.12);
    };
    const onLeave = () => { xTo(0); yTo(0); };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(node);
    };
  }, [fine, reduced]);
  return <div ref={ref} className={className}>{children}</div>;
}
