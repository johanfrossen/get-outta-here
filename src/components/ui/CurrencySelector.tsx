"use client";

const CURRENCIES = ["SEK", "EUR", "GBP", "USD"] as const;

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="flex gap-[4px] items-center">
      {CURRENCIES.map((cur) => (
        <button
          key={cur}
          onClick={() => onChange(cur)}
          className={`px-[8px] py-[4px] rounded-card text-[10px] font-light italic cursor-pointer transition-colors ${
            value === cur
              ? "bg-accent text-cta-text"
              : "bg-transparent border border-accent/40 text-accent hover:border-accent"
          }`}
        >
          {cur}
        </button>
      ))}
    </div>
  );
}
