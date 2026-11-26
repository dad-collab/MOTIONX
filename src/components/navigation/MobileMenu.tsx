import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, NAV_ITEMS } from "@/content/site";
import { bezier } from "@/design/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SmoothLink } from "@/components/ui/SmoothLink";
import { ArrowUpRight } from "@/components/ui/Icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const node = panel.current;
    const first = node?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>("a[href],button:not([disabled])"));
      const firstItem = items[0]; const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); lastItem?.focus(); }
      else if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); firstItem?.focus(); }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panel}
          data-lenis-prevent
          className="fixed inset-0 z-[39] flex flex-col justify-between bg-void px-6 pb-8 pt-28 text-bone md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduced ? 0 : 0.62, ease: bezier.inOutQuint }}
          aria-label="Mobile navigation"
        >
          <nav aria-label="Main navigation" className="flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <div key={item.id} className="overflow-hidden border-b border-line">
                <motion.div initial={{ yPercent: 110 }} animate={{ yPercent: 0 }} exit={{ yPercent: 110 }} transition={{ delay: reduced ? 0 : 0.08 + index * 0.07, duration: reduced ? 0 : 0.6, ease: bezier.outExpo }}>
                  <SmoothLink to={item.id} onClick={onClose} className="group flex items-center justify-between py-4 font-display text-[clamp(2.4rem,13vw,4.7rem)] leading-none tracking-[-0.06em] focus-visible:outline-signal">
                    <span>{item.label}</span><span className="font-mono text-xs tracking-normal text-signal">{String(index + 1).padStart(2, "0")}</span>
                  </SmoothLink>
                </motion.div>
              </div>
            ))}
          </nav>
          <a href={`mailto:${SITE.email}`} className="group flex items-center justify-between border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.16em] text-fog">
            <span>{SITE.email}</span><ArrowUpRight className="h-5 w-5 text-signal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
