import { FAQ } from "@/components/FAQ";
import { GetStarted } from "@/components/GetStarted";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Process />
        <FAQ />
        <GetStarted />
      </main>
      <SiteFooter />
    </>
  );
}
