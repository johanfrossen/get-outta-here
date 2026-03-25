/** Two-column row: white label left, salmon value right. Used in flight cards. */
interface DataRowProps {
  label: string;
  value: string;
  renderValue?: React.ReactNode;
}

export function DataRow({ label, value, renderValue }: DataRowProps) {
  return (
    <div className="flex items-center justify-between h-[40px] border-t border-b border-border/50 px-0">
      <span className="text-text-primary text-[12px] font-light italic">
        {label}
      </span>
      {renderValue ?? (
        <span className="text-accent text-[12px] font-light italic">
          {value}
        </span>
      )}
    </div>
  );
}
