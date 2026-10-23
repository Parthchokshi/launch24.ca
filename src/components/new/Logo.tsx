import Link from "next/link";

/** Gold "24" square + LAUNCH24 wordmark. */
export function Logo() {
  return (
    <Link href="/" aria-label="Launch24 home" className="logo">
      <b aria-hidden>24</b>
      LAUNCH24
    </Link>
  );
}
