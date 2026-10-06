import Link from "next/link";
import { Logo } from "@/components/Logo";
import { contact } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Logo onInk />
        <p className="mt-2 text-base text-muted-on-ink">
          Websites for local businesses in the GTA and across Ontario.
        </p>
        <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-x-6">
          <Link href="/terms" className="inline-flex min-h-12 items-center font-bold underline decoration-2 underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy" className="inline-flex min-h-12 items-center font-bold underline decoration-2 underline-offset-4">
            Privacy
          </Link>
          <a href={`mailto:${contact.email}`} className="inline-flex min-h-12 items-center font-bold underline decoration-2 underline-offset-4">
            {contact.email}
          </a>
        </nav>
        <p className="mt-2 text-sm text-muted-on-ink">
          © {new Date().getFullYear()} {contact.brand}
        </p>
      </div>
    </footer>
  );
}
