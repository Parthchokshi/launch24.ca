import Link from "next/link";

/** Black "24" square + LAUNCH24 wordmark, like the lawn sign. */
export function Logo({ onInk = false }: { onInk?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Launch24 home"
      className="inline-flex min-h-12 items-center gap-2.5"
    >
      <span
        aria-hidden
        className={`display flex h-10 w-10 items-center justify-center text-[1.35rem] ${
          onInk ? "bg-yellow text-ink" : "bg-ink text-yellow"
        }`}
      >
        24
      </span>
      <span
        className={`display text-[1.6rem] tracking-wide ${onInk ? "text-white" : "text-ink"}`}
      >
        Launch24
      </span>
    </Link>
  );
}
