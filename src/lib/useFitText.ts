import { useEffect, type RefObject } from "react";

export function useFitText(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fit = () => {
      const available = root.clientWidth;
      if (available <= 0) return;
      let ratio = 1;
      root.querySelectorAll<HTMLElement>("[data-fit-line]").forEach((line) => {
        const child = line.firstElementChild as HTMLElement | null;
        if (!child) return;
        const indent = Number.parseFloat(getComputedStyle(line).paddingLeft) || 0;
        const natural = child.scrollWidth + indent;
        if (natural > available) ratio = Math.min(ratio, available / natural);
      });
      root.style.setProperty("--hero-fit", String(Math.max(0.55, ratio)));
    };
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    root.querySelectorAll<HTMLElement>("[data-fit-line]").forEach((line) => observer.observe(line));
    document.fonts?.ready.then(fit).catch(() => undefined);
    window.addEventListener("resize", fit, { passive: true });
    fit();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [ref]);
}
