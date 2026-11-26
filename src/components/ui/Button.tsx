import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-signal text-void hover:bg-bone",
  ghost: "border border-line text-bone hover:border-signal hover:text-signal",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-xs",
  lg: "h-14 px-7 text-xs md:text-sm",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Class string for button-looking links and buttons. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-3 font-mono uppercase tracking-[0.18em] transition-colors duration-500 ease-out-expo",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
    "disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
