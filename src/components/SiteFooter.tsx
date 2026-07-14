import { contact } from "@/lib/contact";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] px-5 pb-32 pt-12 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight">
            LAUNCH<span className="text-[color:var(--signal)]">24</span>
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            {contact.domain} · {contact.email}
          </p>
        </div>
        <div className="flex gap-6 text-sm text-[color:var(--muted)]">
          <Link href="/terms" className="hover:text-[color:var(--foam)]">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[color:var(--foam)]">
            Privacy
          </Link>
          <a href="#reach" className="hover:text-[color:var(--foam)]">
            Contact
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-xs leading-relaxed text-[color:var(--muted)]/70">
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
