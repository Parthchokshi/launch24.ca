import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/new/LegalPage";
import { contact } from "@/lib/contact";
import { formatCad, pricing } from "@/lib/pricing";
import { siteConfig } from "@/lib/seo";

const description =
  "Launch24 terms: the 24-hour guarantee, when the clock starts, what's included, and what doesn't count.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms | Launch24", description, url: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="Last updated: October 2026. Plain language, not a substitute for a formal contract."
    >
      <LegalSection title="The offer">
        <p>
          Launch24 delivers the first version of an agreed Launch Package
          within 24 hours of the clock starting. If we miss that window, it&apos;s
          free: we refund your deposit and you pay nothing.
        </p>
      </LegalSection>

      <LegalSection title="When the 24-hour clock starts">
        <p>The clock starts when all three are in:</p>
        <ul>
          <li>Your deposit</li>
          <li>Your intake (business name, what you do, contact details)</li>
          <li>Your content, or you tell us to write it</li>
        </ul>
        <p>The scope must also be agreed. It&apos;s the Launch Package, not a custom rebuild.</p>
      </LegalSection>

      <LegalSection title="What doesn't count toward the 24 hours">
        <ul>
          <li>Time we wait on you: slow replies, missing content, or answers to our questions</li>
          <li>Domain, DNS, or hosting connection delays</li>
          <li>Revision rounds after first delivery</li>
          <li>Delays at third-party platforms</li>
          <li>Scope changes after the scope is agreed (extra pages, e-commerce, booking, custom features)</li>
        </ul>
      </LegalSection>

      <LegalSection title="Pricing">
        <p>
          The Launch Package is {formatCad(pricing.launchPackage)} {pricing.currency},
          one time. You get a free proposal first and see the exact price before
          paying anything. A deposit is only due when we start. Bigger or custom
          work is quoted separately.
        </p>
      </LegalSection>

      <LegalSection title="What's included">
        <p>
          Responsive design, a contact form, basic SEO, homepage copy, and one
          revision round. Not included unless quoted: extra pages, e-commerce,
          online booking, custom photography, ads, and ongoing maintenance.
        </p>
      </LegalSection>

      <LegalSection title="You own the site">
        <p>
          The website is yours. Your domain and hosting stay on your own accounts.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions? <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
