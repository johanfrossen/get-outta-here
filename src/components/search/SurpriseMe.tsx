"use client";

const SURPRISE_ORIGINS = [
  { name: "Stockholm (ARN)", code: "ARN", skyId: "ARN", entityId: "95673495" },
  { name: "Copenhagen (CPH)", code: "CPH", skyId: "CPH", entityId: "95565050" },
  { name: "Oslo (OSL)", code: "OSL", skyId: "OSL", entityId: "95565073" },
  { name: "London (LHR)", code: "LHR", skyId: "LHR", entityId: "95565050" },
  { name: "Berlin (BER)", code: "BER", skyId: "BER", entityId: "95565051" },
];

interface SurpriseMeProps {
  onSurprise: (from: string, fromCode: string, fromSkyId: string, fromEntityId: string) => void;
  disabled: boolean;
}

export function SurpriseMe({ onSurprise, disabled }: SurpriseMeProps) {
  function handleClick() {
    const origin =
      SURPRISE_ORIGINS[Math.floor(Math.random() * SURPRISE_ORIGINS.length)];
    onSurprise(origin.name, origin.code, origin.skyId, origin.entityId);
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="px-[16px] py-[6px] bg-transparent border border-accent rounded-card text-accent text-[12px] font-light italic cursor-pointer hover:bg-accent/10 disabled:opacity-50 transition-colors"
    >
      Surprise me
    </button>
  );
}
