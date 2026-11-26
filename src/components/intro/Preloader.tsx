import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";

interface PreloaderProps {
  ready: boolean;
  onReveal: () => void;
  onDone: () => void;
}

export function Preloader({ ready, onReveal, onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const readyRef = useRef(ready);
  const revealRef = useRef(onReveal);
  const doneRef = useRef(onDone);
  const started = useRef(false);
  readyRef.current = ready; revealRef.current = onReveal; doneRef.current = onDone;
  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);
  useGSAP(() => {
    const node = root.current;
    const counter = count.current;
    if (!node || !counter) return;
    const progress = { value: 0 };
    const updateCounter = () => {
      counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
    };
    const revealCurtain = () => {
      revealRef.current();
      gsap.to(node, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.15,
        ease: "expo.inOut",
        delay: 0.16,
        onComplete: doneRef.current,
      });
    };
    const finish = () => {
      if (started.current || !readyRef.current) return;
      started.current = true;
      gsap.to(progress, {
        value: 100,
        duration: 0.55,
        ease: "power2.out",
        onUpdate: updateCounter,
        onComplete: revealCurtain,
      });
    };
    let poll: ReturnType<typeof gsap.delayedCall> | null = null;
    const check = () => {
      if (readyRef.current) finish();
      else poll = gsap.delayedCall(0.12, check);
    };
    gsap.to(progress, {
      value: 78,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: updateCounter,
      onComplete: check,
    });
    return () => poll?.kill();
  }, { scope: root });
  return (
    <div ref={root} className="fixed inset-0 z-[45] flex flex-col justify-between bg-void px-6 py-7 text-bone md:px-10 md:py-10" aria-label="Loading MOTIONX experience" role="status">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
        <span data-pre className="overflow-hidden">MOTIONX / DIGITAL STUDIO</span>
        <span data-pre className="overflow-hidden">EST. 2025</span>
      </div>
      <div className="flex items-end justify-between border-t border-line pt-4">
        <p data-pre className="font-display text-4xl font-semibold tracking-[-0.06em] md:text-6xl">A world in motion.</p>
        <p className="font-mono text-xs tabular-nums text-signal"><span ref={count}>000</span><span className="text-mist"> / 100</span></p>
      </div>
    </div>
  );
}
