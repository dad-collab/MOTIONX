import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { loadFonts } from "@/lib/device";
import { ScrollTrigger } from "@/lib/gsap";
import { HomePage } from "@/pages/HomePage";
import { Navbar } from "@/components/navigation/Navbar";
import { Preloader } from "@/components/intro/Preloader";
import { Cursor } from "@/components/cursor/Cursor";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const FoundationPage = lazy(async () => {
  const module = await import("@/pages/FoundationPage");
  return { default: module.FoundationPage };
});

type Phase = "loading" | "revealing" | "done";

function Experience() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "done" : "loading");
  const [fontsReady, setFontsReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  useSmoothScroll(!reduced);

  const markSceneReady = useCallback(() => setSceneReady(true), []);
  const reveal = useCallback(() => setPhase("revealing"), []);
  const finish = useCallback(() => setPhase("done"), []);

  useEffect(() => {
    let mounted = true;
    void loadFonts().then(() => {
      if (mounted) setFontsReady(true);
    });
    const safety = window.setTimeout(() => {
      if (mounted) { setFontsReady(true); setSceneReady(true); }
    }, 6000);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => { mounted = false; window.clearTimeout(safety); };
  }, []);

  useEffect(() => {
    if (reduced) setPhase("done");
  }, [reduced]);

  useEffect(() => {
    if (fontsReady) ScrollTrigger.refresh();
  }, [fontsReady]);
  useEffect(() => {
    if (phase === "done") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [phase]);

  const entered = phase !== "loading";
  return (
    <div className="min-h-screen bg-void text-bone">
      <a href="#main" className="sr-only fixed left-4 top-4 z-[70] bg-signal px-4 py-3 font-mono text-xs uppercase tracking-widest text-void focus:not-sr-only">Skip to content</a>
      <Navbar entered={entered} />
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <ErrorBoundary fallback={<div className="min-h-svh bg-void" />}>
          <HomePage entered={entered} onSceneReady={markSceneReady} />
        </ErrorBoundary>
      </main>
      {phase !== "done" && !reduced ? <Preloader ready={fontsReady && sceneReady} onReveal={reveal} onDone={finish} /> : null}
      <Cursor />
      <div aria-hidden="true" className="grain-overlay" />
    </div>
  );
}

export default function App() {
  const foundationView = import.meta.env.DEV && new URLSearchParams(window.location.search).get("view") === "foundation";
  if (foundationView) {
    return <Suspense fallback={<div className="min-h-screen bg-void" />}><FoundationPage /></Suspense>;
  }
  return <Experience />;
}
