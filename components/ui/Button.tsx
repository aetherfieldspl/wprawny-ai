import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-paper hover:bg-brand-dark shadow-card disabled:opacity-40 disabled:cursor-not-allowed",
  secondary:
    "bg-card text-ink border border-line hover:border-brand hover:text-brand disabled:opacity-40",
  ghost: "text-ink-soft hover:text-ink",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", className = "", children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
