/** Dark card container with hover glow effect. */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-card-bg rounded-card p-[16px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,149,149,0.15)] hover:scale-[1.01] motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none ${className}`}
    >
      {children}
    </div>
  );
}
