/**
 * Branded phone lockup: 437·365·247·5 — "365" in accent green, "247" on pastel yellow.
 */
export function PhoneBrand({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      437·
      <span className="font-bold text-[color:var(--accent)]">365</span>
      ·
      <span className="rounded-[6px] bg-[color:var(--panel-yellow)] px-1 font-bold text-[color:var(--ink)]">
        247
      </span>
      5
    </span>
  );
}
