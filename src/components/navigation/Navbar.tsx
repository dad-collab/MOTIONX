import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { SmoothLink } from "@/components/ui/SmoothLink";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { ScrollTrigger } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Navbar({ entered }: { entered: boolean }) {
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const desktop = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const closeMenu = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => menuButton.current?.focus());
  }, []);

  useEffect(() => {
    if (desktop && open) setOpen(false);
  }, [desktop, open]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  useEffect(() => {
    const triggers = NAV_ITEMS.map((item) => {
      const section = document.getElementById(item.id);
      if (!section) return null;
      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(item.id),
        onEnterBack: () => setActive(item.id),
      });
    }).filter(Boolean);
    let lastY = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      if (open) { setHidden(false); lastY = nextY; return; }
      if (document.activeElement?.closest("header")) { setHidden(false); lastY = nextY; return; }
      if (nextY < 48) setHidden(false);
      else if (Math.abs(nextY - lastY) > 8) setHidden(nextY > lastY);
      lastY = nextY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      triggers.forEach((trigger) => trigger?.kill());
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-6 pt-4 md:px-10 md:pt-6 lg:px-16" aria-label="Site header">
        <motion.div
          className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between gap-4"
          initial={{ y: -24, opacity: 0 }}
          animate={entered ? { y: hidden ? -112 : 0, opacity: hidden ? 0 : 1 } : { y: -24, opacity: 0 }}
          transition={{ duration: reduced ? 0 : hidden ? 0.35 : 0.75, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : entered && !hidden ? 0.25 : 0 }}
        >
          <Logo onNavigate={closeMenu} />
          <nav aria-label="Main navigation" className="hidden items-center rounded-full border border-line bg-void/85 p-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <SmoothLink key={item.id} to={item.id} aria-current={active === item.id ? "location" : undefined} className={`relative isolate rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${active === item.id ? "text-void" : "text-fog hover:text-bone"}`}>
                {active === item.id ? <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-signal" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
                <span className="relative z-10">{item.label}</span>
              </SmoothLink>
            ))}
          </nav>
          <button
            ref={menuButton}
            type="button"
            className="flex min-h-11 items-center gap-3 border border-line px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone transition-colors hover:border-signal hover:text-signal focus-visible:outline-signal md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Menu"}</span><span aria-hidden="true" className="text-signal">{open ? "×" : "+"}</span>
          </button>
        </motion.div>
      </header>
      <div id="mobile-menu"><MobileMenu open={open} onClose={closeMenu} /></div>
    </>
  );
}
