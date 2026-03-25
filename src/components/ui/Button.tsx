/** Salmon pink CTA button with black text. */
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "w-full h-[48px] rounded-card text-[18px] font-light italic cursor-pointer transition-colors";
  const variants = {
    primary: "bg-accent text-cta-text hover:bg-accent/90",
    outline:
      "bg-transparent border border-accent text-accent hover:bg-accent/10",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
