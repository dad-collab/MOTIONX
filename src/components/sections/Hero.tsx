import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery, FINE_POINTER } from "@/lib/useMediaQuery";
import { useFitText } from "@/lib/useFitText";
import { detectQuality, isWebGLAvailable, type QualityTier } from "@/lib/device";
import { HERO } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmoothLink } from "@/components/ui/SmoothLink";
import { buttonStyles } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitChars } from "@/components/motion/SplitChars";
import { HeroScene } from "@/components/three/hero/HeroScene";
import { HeroFallback } from "@/components/three/hero/HeroFallback";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import type { HeroSceneState } from "@/components/three/hero/sceneState";

export function Hero({ entered, onSceneReady }: { entered: boolean; onSceneReady: () => void }) {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const introTimeline = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const scene = useRef<HeroSceneState>({ intro: 0, scroll: 0 });
  const reduced = useReducedMotion();
  const fine = useMediaQuery(FINE_POINTER);
  const [webgl] = useState(isWebGLAvailable);
  const [quality] = useState<QualityTier>(detectQuality);
  const [sceneActive, setSceneActive] = useState(true);
  useFitText(heading);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-intro-char]");
    const introItems = el.querySelectorAll<HTMLElement>("[data-intro]");
    const timeline = gsap.timeline({ paused: true });
    introTimeline.current = timeline;
    if (reduced) {
      scene.current.intro = 1;
      gsap.set(introItems, { autoAlpha: 1, clearProps: "transform" });
      gsap.set(chars, { yPercent: 0, autoAlpha: 1, clearProps: "transform" });
    } else {
      timeline
        .fromTo(chars, { yPercent: 125, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.05, stagger: 0.026, ease: "expo.out" }, 0.1)
        .fromTo(introItems, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09, ease: "power3.out" }, 0.42)
        .fromTo("[data-intro-rule]", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1.1, ease: "expo.out" }, 0.55)
        .to(scene.current, { intro: 1, duration: 2.7, ease: "expo.out" }, 0);
    }

    const exit = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8, onToggle: (self: { isActive: boolean }) => setSceneActive(self.isActive) },
    });
    if (reduced) {
      gsap.set("[data-exit]", { clearProps: "all" });
      scene.current.scroll = 0;
    } else {
      exit
        .to("[data-exit='headline']", { yPercent: -18, autoAlpha: 0.18, ease: "none" }, 0)
        .to("[data-exit='copy']", { y: -24, autoAlpha: 0.16, ease: "none" }, 0)
        .to("[data-exit='cue']", { autoAlpha: 0, ease: "none" }, 0)
        .to("[data-exit='canvas']", { yPercent: -7, scale: 0.92, autoAlpha: 0.5, ease: "none" }, 0)
        .to(scene.current, { scroll: 1, ease: "none" }, 0);
    }
    return () => { introTimeline.current = null; };
  }, { scope: root, dependencies: [reduced], revertOnUpdate: true });

  useEffect(() => {
    if (!entered) return;
    if (reduced) {
      scene.current.intro = 1;
      onSceneReady();
    } else {
      introTimeline.current?.play(0);
    }
  }, [entered, reduced, onSceneReady]);

  useEffect(() => {
    if (!fine || reduced || !heading.current) return;
    const lines = Array.from(heading.current.querySelectorAll<HTMLElement>("[data-depth]"));
    const setters = lines.map((line) => ({
      x: gsap.quickSetter(line, "x", "px") as (value: number) => void,
      y: gsap.quickSetter(line, "y", "px") as (value: number) => void,
      depth: Number(line.dataset.depth ?? 0),
    }));
    let x = 0; let y = 0;
    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * 2;
      y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => setters.forEach((item) => { item.x(x * item.depth * 8); item.y(y * item.depth * 5); });
    window.addEventListener("pointermove", onMove, { passive: true });
    gsap.ticker.add(tick);
    return () => { window.removeEventListener("pointermove", onMove); gsap.ticker.remove(tick); setters.forEach((item) => { item.x(0); item.y(0); }); };
  }, [fine, reduced]);

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-svh overflow-hidden border-b border-line bg-void" aria-labelledby="hero-title">
      <div data-exit="canvas" className="pointer-events-none absolute inset-0 z-0 origin-center">
        {webgl ? (
          <ErrorBoundary fallback={<HeroFallback onMount={onSceneReady} />}><HeroScene scene={scene.current} quality={quality} paused={!sceneActive} onReady={onSceneReady} /></ErrorBoundary>
        ) : <HeroFallback onMount={onSceneReady} />}
      </div>
      <Container className="relative z-10 flex min-h-svh flex-col justify-between pb-7 pt-32 md:pb-10 md:pt-36">
        <div className="max-w-full">
          <div data-intro className="mb-6 md:mb-8"><Eyebrow index="00">{HERO.eyebrow}</Eyebrow></div>
          <h1 ref={heading} id="hero-title" data-exit="headline" className="text-hero max-w-full font-display font-bold uppercase text-bone">
            <span className="sr-only">Motion is the message</span>
            <span aria-hidden="true" className="block">
              {HERO.lines.map((line) => (
                <span key={line.text} data-fit-line className="block whitespace-nowrap" style={{ paddingLeft: `calc(${line.indent}em * var(--indent-scale, 1))` }}>
                  <span data-depth={line.depth} className="inline-block"><SplitChars text={line.text} /></span>
                </span>
              ))}
            </span>
          </h1>
        </div>
        <div className="grid items-end gap-8 pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:pt-0">
          <div className="max-w-xl">
            <div data-intro-rule className="mb-5 h-px w-full origin-left bg-line" />
            <div data-exit="copy">
              <p data-intro className="max-w-lg text-body-lg text-fog">{HERO.description}</p>
              <div data-intro className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
              <Magnetic>
                <SmoothLink to={HERO.primary.to} className={`${buttonStyles({ variant: "primary", size: "lg" })} group`}>
                  <span>{HERO.primary.label}</span><ArrowUpRight className="h-4 w-4" />
                </SmoothLink>
              </Magnetic>
              <SmoothLink to={HERO.secondary.to} className={`${buttonStyles({ variant: "ghost", size: "lg" })} group`}>
                <span>{HERO.secondary.label}</span><span aria-hidden="true" className="text-signal">↘</span>
              </SmoothLink>
              </div>
            </div>
          </div>
          <div className="hidden items-end gap-10 md:flex">
            <p data-intro className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{HERO.capabilities}</p>
            <SmoothLink data-exit="cue" to="work" className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mist hover:text-bone focus-visible:outline-signal">
              <span className="animate-scroll-cue h-10 w-px bg-signal" /> Scroll to explore
            </SmoothLink>
          </div>
          <p data-intro className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist md:hidden">{HERO.capabilities}</p>
        </div>
      </Container>
    </section>
  );
}
