/** Friendly message shown before a search is performed. */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-[72px]">
      <p className="text-accent text-[18px] font-light italic text-center">
        Where are you getting outta here to?
      </p>
      <p className="text-text-muted text-[12px] font-light italic text-center mt-[8px]">
        Search for flights to discover your next Mediterranean escape.
      </p>
    </div>
  );
}
