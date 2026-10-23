"use client";

import { useEffect, useRef } from "react";

/**
 * "One chat. One live site." An example WhatsApp chat that turns into a sample
 * website. Both are made up and labelled as such (never present them as a real client).
 * Plays once when scrolled into view; without JS everything is simply visible.
 */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);

  function play() {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("armed", "play");
    void el.offsetWidth; // restart the CSS animations
    el.classList.add("play");
  }

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="example" aria-labelledby="example-heading" className="sec wrap">
      <div className="shead">
        <div>
          <p className="tag">How a project goes</p>
          <h2 id="example-heading">
            One chat.
            <br />
            One live site.
          </h2>
        </div>
        <p>
          Send a message, a few photos, or a voice note. A day later you&apos;re looking at
          your own website on your phone.
        </p>
      </div>

      <div className="story" ref={ref}>
        <div className="chat" role="group" aria-label="Example WhatsApp chat">
          <div className="chead">
            <span className="av" aria-hidden>
              24
            </span>
            <div>
              <b>Launch24</b>
              <small>WhatsApp · example chat</small>
            </div>
          </div>
          <div className="msgs">
            <p className="m me">
              Hi, I run a bakery in Brampton. Can you make us a website?
              <span className="tm">7:42 pm</span>
            </p>
            <p className="m them">
              Yes! Tell us about the bakery. A voice note is fine.
              <span className="tm">7:44 pm</span>
            </p>
            <p className="m me att" aria-label="Three photos">
              <i />
              <i />
              <i />
            </p>
            <p className="m me">
              Here&apos;s our menu and some photos. We&apos;re open 7 to 7.
              <span className="tm">7:51 pm</span>
            </p>
            <p className="m them">
              Perfect. We&apos;ll send your preview link within 24 hours.
              <span className="tm">7:53 pm</span>
            </p>
          </div>
        </div>

        <div className="arrow" aria-hidden>
          →
        </div>

        <div className="device" role="img" aria-label="Sample website for a bakery, built from that chat">
          <div className="url">brampton-bakehouse.ca</div>
          <div className="site" aria-hidden>
            <div className="snav">
              BRAMPTON BAKEHOUSE <span>Menu · Hours · Call</span>
            </div>
            <div className="shero">
              <b>Fresh bread, baked every morning.</b>
              <p>Cakes, breads and sweets in Brampton.</p>
              <div className="sbtns">
                <span>Call to order</span>
                <span>See menu</span>
              </div>
            </div>
            <div className="sh4">Today&apos;s menu</div>
            <div className="menu">
              <div><i />Sourdough<small>$8</small></div>
              <div><i />Croissants<small>$3.50</small></div>
              <div><i />Eggless cake<small>$28</small></div>
              <div><i />Cookies<small>$12 / dozen</small></div>
            </div>
            <div className="hours">
              <b>Open daily</b>
              <span>7 am – 7 pm</span>
            </div>
          </div>
          <div className="livebadge" aria-hidden>
            <i />
            Preview ready
          </div>
        </div>
      </div>

      <div className="storyfoot">
        <span>Example chat and sample website, made up to show how it works. Not a real customer.</span>
        <button type="button" className="replay" onClick={play}>
          ↻ Play again
        </button>
      </div>
    </section>
  );
}
