import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { scrollToSection } from "@/lib/scroll";

interface SmoothLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

export function SmoothLink({ to, onClick, ...props }: SmoothLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    scrollToSection(to);
  };
  return <a href={to === "top" ? "#top" : `#${to}`} onClick={handleClick} {...props} />;
}
