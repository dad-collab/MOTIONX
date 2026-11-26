import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { bezier } from "@/design/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Component-level entrance for content as it scrolls into view.
 * Framer Motion handles this; GSAP is reserved for timelines and scroll-linked scenes.
 */
export function Reveal({ children, delay = 0, y = 32, className }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, ease: bezier.outExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
