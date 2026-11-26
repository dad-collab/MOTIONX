import { useEffect } from "react";

export function HeroFallback({ onMount }: { onMount: () => void }) {
  useEffect(() => { onMount(); }, [onMount]);
  return (
    <svg aria-hidden="true" viewBox="0 0 640 640" className="h-full w-full opacity-70">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <ellipse cx="320" cy="320" rx="210" ry="206" className="text-signal/50" />
        <ellipse cx="320" cy="320" rx="188" ry="206" className="text-bone/20" />
        <ellipse cx="320" cy="320" rx="150" ry="206" className="text-signal/35" />
        <ellipse cx="320" cy="320" rx="206" ry="80" transform="rotate(-22 320 320)" className="text-signal/40" />
        <ellipse cx="320" cy="320" rx="206" ry="80" transform="rotate(22 320 320)" className="text-bone/20" />
      </g>
      <circle cx="320" cy="320" r="4" fill="currentColor" className="text-signal" />
    </svg>
  );
}
