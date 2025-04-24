import React from "react";

interface ResultsGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage: React.ReactNode;
  query?: string;
  columns?: string;
  ariaLabel?: string;
}

export function ResultsGrid<T>({
  items,
  renderItem,
  emptyMessage,
  query,
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  ariaLabel,
}: ResultsGridProps<T>) {
  return (
    <div
      className={`w-full mt-6`}
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
    >
      {items.length > 0 ? (
        <div className={`grid gap-4 ${columns} animate-fade-in`}>
          {items.map(renderItem)}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8 animate-fade-in">
          {emptyMessage}
          {query && (
            <span className="text-sm text-muted-foreground mt-2">
              No results found for &quot;{query.trim()}&quot;.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
