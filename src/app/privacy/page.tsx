import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/seo";

const description =
  "How Launch24 collects and uses your contact details, voice notes, and visit information.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy | Launch24", description, url: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="Last updated: October 2026. Short and plain.">
      <LegalSection title="What we collect">
        <p>
          If you fill in our form, we receive your name, phone number, business
          name, and (if you add one) a voice note. We store these so we can call
          you back, and we email them to our team.
        </p>
        <p>
          If you call, text, or use WhatsApp, those services handle your message
          under their own privacy terms.
        </p>
      </LegalSection>

      <LegalSection title="How we use it">
        <p>
          To respond to your request and deliver the service. We don&apos;t sell
          your information.
        </p>
      </LegalSection>

      <LegalSection title="Where you came from">
        <p>
          When you arrive from a link, QR code, or ad, the link may carry tags
          (utm_source, utm_medium, utm_campaign, utm_content). We save them in
          your browser for up to 30 days, and we attach them to your form
          submission and to our analytics events. This tells us which sign or
          ad worked. If you text or WhatsApp us from the site, the pre-filled
          message may include a short tag such as &quot;ref: lawn_sign/v2b&quot;.
          You can delete it before sending.
        </p>
      </LegalSection>

      <LegalSection title="Analytics & advertising">
        <p>
          We use Google Analytics to count visits and button taps (call, text,
          WhatsApp, form, voice note), and Google Ads to measure how our ads
          perform. Google may set cookies for this. You can manage Google ad
          settings at{" "}
          <a href="https://adssettings.google.com/adspersonalization">
            adssettings.google.com
          </a>
          , or block cookies in your browser.
        </p>
      </LegalSection>

      <LegalSection title="Voice notes">
        <p>
          A voice note is sent to us as an email attachment so we can understand
          your request. Please don&apos;t include sensitive personal information.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Privacy questions?{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
