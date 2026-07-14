import { FAQ } from "@/components/FAQ";
import { GetStarted } from "@/components/GetStarted";
import { Guarantee } from "@/components/Guarantee";
import { Hero } from "@/components/Hero";
import { Included } from "@/components/Included";
import { Showcase } from "@/components/Showcase";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyDock } from "@/components/StickyDock";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <GetStarted
          id="start"
          idPrefix="top"
          title={
            <>
              Tell us what you need.
              <br />
              <span className="gold-text italic">Takes one minute.</span>
            </>
          }
          subtitle="Your phone number and a sentence — or a voice note. That's genuinely all we need to get moving."
        />
        <Showcase />
        <Included />
        <Guarantee />
        <FAQ />
        <GetStarted
          id="start-again"
          idPrefix="bottom"
          title={
            <>
              Ready when you are.
              <br />
              <span className="gold-text italic">Tomorrow, you're live.</span>
            </>
          }
          subtitle="Message us now and your business could have a polished website by this time tomorrow."
        />
      </main>
      <SiteFooter />
      <StickyDock />
    </>
  );
}
