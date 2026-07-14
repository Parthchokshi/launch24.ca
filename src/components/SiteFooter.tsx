import { PhoneBrand } from "@/components/PhoneBrand";
import { contact, links } from "@/lib/contact";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line-soft)] px-5 py-9 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[12.5px] text-[color:var(--muted-2)]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[color:var(--ink)] text-[11px] font-extrabold text-white">
              24
            </span>
            <span className="text-sm font-bold text-[color:var(--ink)]">
              {contact.brand}
            </span>
            <a
              href={links.tel}
              className="ml-2 text-sm font-semibold text-[color:var(--ink)] hover:underline"
            >
              <PhoneBrand />
            </a>
          </div>
          <div>
            © {new Date().getFullYear()} {contact.brand} · Our
            24-hours-or-it&apos;s-free guarantee applies to every build.
          </div>
          <div className="flex gap-[18px]">
            <Link href="/terms" className="hover:text-[color:var(--ink)]">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[color:var(--ink)]">
              Privacy
            </Link>
            <a href="#contact" className="hover:text-[color:var(--ink)]">
              Contact
            </a>
          </div>
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed text-[color:var(--muted-2)]">
          Guarantee applies to the starter package after deposit and intake
          are complete. Details in{" "}
          <Link href="/terms" className="underline underline-offset-2">
            Terms
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
