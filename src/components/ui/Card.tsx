/** Dark card container: #222 bg, 16px padding, 8px radius. */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-card-bg rounded-card p-[16px] ${className}`}
    >
      {children}
    </div>
  );
}
