import { contact } from "@/lib/contact";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line-soft)] px-5 pb-32 pt-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">
            Launch<span className="gold-text">24</span>
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            {contact.domain} · {contact.email}
          </p>
        </div>
        <div className="flex gap-6 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
          <Link href="/terms" className="transition-colors hover:text-[color:var(--gold)]">
            Terms
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-[color:var(--gold)]">
            Privacy
          </Link>
          <a href="#start" className="transition-colors hover:text-[color:var(--gold)]">
            Contact
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs leading-relaxed text-[color:var(--muted)]/60">
        Guarantee applies to the starter package after deposit and intake are
        complete. Details in{" "}
        <Link href="/terms" className="underline underline-offset-2">
          Terms
        </Link>
        . © {new Date().getFullYear()} Launch24.
      </p>
    </footer>
  );
}
