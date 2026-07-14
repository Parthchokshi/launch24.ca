import { FAQ } from "@/components/FAQ";
import { Guarantee } from "@/components/Guarantee";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Included } from "@/components/Included";
import { ReachOut } from "@/components/ReachOut";
import { RecentWork } from "@/components/RecentWork";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyDock } from "@/components/StickyDock";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <HowItWorks />
        <Included />
        <RecentWork />
        <Guarantee />
        <FAQ />
        <ReachOut />
      </main>
      <SiteFooter />
      <StickyDock />
    </>
  );
}
