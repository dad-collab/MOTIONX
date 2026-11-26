import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-24 md:py-40", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
