import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

/** Shared horizontal rhythm. Every section and the top bar align to this. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
