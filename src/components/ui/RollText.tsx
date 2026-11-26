import type { ReactNode } from "react";

export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden align-middle">
      <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full">{children}</span>
      <span aria-hidden="true" className="absolute translate-y-full text-signal transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">{children}</span>
    </span>
  );
}
