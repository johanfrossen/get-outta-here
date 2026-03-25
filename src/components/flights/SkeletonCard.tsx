/** Loading placeholder card with dark shimmer animation. */
export function SkeletonCard() {
  return (
    <div className="bg-card-bg rounded-card p-[16px] skeleton-shimmer">
      <div className="flex flex-col gap-[48px]">
        <div>
          <div className="h-[24px] bg-border/20 rounded w-3/4 mb-[8px]" />
          <div className="h-[12px] bg-border/20 rounded w-full mb-[4px]" />
          <div className="h-[12px] bg-border/20 rounded w-2/3" />
        </div>

        {[0, 1].map((s) => (
          <div key={s}>
            <div className="h-[12px] bg-border/20 rounded w-1/3 mb-[16px]" />
            {[0, 1, 2].map((r) => (
              <div
                key={r}
                className="flex justify-between items-center h-[40px] border-t border-b border-border/20"
              >
                <div className="h-[12px] bg-border/15 rounded w-1/3" />
                <div className="h-[12px] bg-border/15 rounded w-1/4" />
              </div>
            ))}
          </div>
        ))}

        <div>
          <div className="h-[12px] bg-border/20 rounded w-1/4 mb-[16px]" />
          {[0, 1].map((r) => (
            <div
              key={r}
              className="flex justify-between items-center h-[40px] border-t border-b border-border/20"
            >
              <div className="h-[12px] bg-border/15 rounded w-1/3" />
              <div className="h-[12px] bg-border/15 rounded w-1/5" />
            </div>
          ))}
        </div>

        <div className="h-[48px] bg-border/20 rounded-card" />
      </div>
    </div>
  );
}
