import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  index?: string;
  children: ReactNode;
  className?: string;
}

/** Small mono label with an optional index number, used above section titles. */
export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label uppercase text-mist",
        className,
      )}
    >
      {index ? (
        <span className="tabular-nums text-signal">{index}</span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
