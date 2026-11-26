import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;
let lockCount = 0;
let previousOverflow = "";

function applyLock(): void {
  if (typeof document === "undefined") return;
  if (lockCount > 0) {
    document.documentElement.style.overflow = "hidden";
    instance?.stop();
  } else {
    document.documentElement.style.overflow = previousOverflow;
    instance?.start();
  }
}

export function lockScroll(): void {
  if (lockCount === 0 && typeof document !== "undefined") {
    previousOverflow = document.documentElement.style.overflow;
  }
  lockCount += 1;
  applyLock();
}

export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  applyLock();
}

export function createSmoothScroll(): () => void {
  if (instance) return () => undefined;
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
  instance = lenis;
  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);
  const tick = (time: number) => lenis.raf(time * 1000);
  const priorLagSmoothing = true;
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add(tick);
  applyLock();

  return () => {
    if (instance !== lenis) return;
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(priorLagSmoothing ? 500 : 0, 33);
    lenis.off("scroll", onScroll);
    lenis.destroy();
    instance = null;
    if (lockCount > 0) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = previousOverflow;
  };
}

const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;

export function scrollToSection(id: string): void {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (!target) return;
  if (!instance) {
    if (typeof target === "number") window.scrollTo({ top: 0, behavior: "smooth" });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const distance = typeof target === "number"
    ? window.scrollY
    : Math.abs(target.getBoundingClientRect().top);
  const duration = Math.max(1.1, Math.min(2.4, 1.1 + distance / 1400));
  instance.scrollTo(target, {
    duration,
    easing: easeInOutQuart,
    onComplete: () => {
      if (typeof target !== "number") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    },
  });
}
