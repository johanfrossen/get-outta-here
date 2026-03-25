/** Search input: transparent bg, salmon border, monospace italic text. */
import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-[4px]">
      <label
        htmlFor={inputId}
        className="text-text-primary text-[12px] font-light italic xl:block hidden"
      >
        {label}
      </label>
      <label
        htmlFor={inputId}
        className="text-text-muted text-[16px] font-sans xl:hidden block"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          bg-transparent border border-accent rounded-card
          text-accent font-light italic placeholder:text-accent/60
          focus:outline-none focus:ring-1 focus:ring-accent
          h-[32px] text-[12px] px-[8px] xl:h-[32px] xl:text-[12px]
          max-xl:h-[48px] max-xl:text-[16px] max-xl:px-[16px]
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
