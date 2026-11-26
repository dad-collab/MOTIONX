import { SmoothLink } from "@/components/ui/SmoothLink";

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <SmoothLink
      to="top"
      aria-label="MOTIONX — back to top"
      onClick={onNavigate}
      className="group inline-flex min-h-11 items-center gap-3 text-bone focus-visible:outline-signal"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7 text-signal">
        <path d="M4 25V7l8 9 4-5 4 5 8-9v18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" />
      </svg>
      <span className="font-display text-sm font-bold tracking-[0.16em]">MOTIONX</span>
    </SmoothLink>
  );
}
