import Link from "next/link";
import { Logo } from "@/components/new/Logo";
import { contact } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Logo />
        <p style={{ margin: "6px 0 0" }}>Websites for local businesses in the GTA and across Ontario.</p>
        <nav aria-label="Footer">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </nav>
        <p style={{ margin: "6px 0 0" }}>
          © {new Date().getFullYear()} {contact.brand}
        </p>
      </div>
    </footer>
  );
}
