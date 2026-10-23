/* eslint-disable @next/next/no-img-element -- preview photos are plain files in public/previews */
import type { CSSProperties } from "react";
import { nicheCopy } from "@/previews/niches";
import type { Preview } from "@/previews/types";

const digits = (s: string) => s.replace(/\D/g, "");

/** The prospect's own one-page site, styled in their colour. Same template for every niche. */
export function PreviewSite({ preview }: { preview: Preview }) {
  const { business: b, services, photos = [], reviews = [], theme } = preview;
  const copy = nicheCopy[preview.niche];
  const tel = b.phone ? `tel:+1${digits(b.phone).slice(-10)}` : undefined;
  const wa = b.whatsapp ? `https://wa.me/1${digits(b.whatsapp).slice(-10)}` : undefined;
  const ig = b.instagram ? `https://instagram.com/${b.instagram.replace(/^@/, "")}` : undefined;
  const primary = wa ?? tel ?? ig ?? (b.email ? `mailto:${b.email}` : "#contact");
  const style = { "--pv-accent": theme.accent, "--pv-accent-ink": theme.accentInk } as CSSProperties;

  return (
    <div className="pv" style={style}>
      <header className="pv-top">
        <div className="pv-wrap pv-row">
          <span className="pv-name">{b.name}</span>
          <a className="pv-btn pv-btn-sm" href={primary}>
            {copy.primaryCta}
          </a>
        </div>
      </header>

      <section className="pv-hero">
        <div className="pv-wrap">
          <p className="pv-kicker">{b.city}</p>
          <h1>{b.tagline}</h1>
          <div className="pv-ctas">
            <a className="pv-btn" href={primary}>
              {copy.primaryCta}
            </a>
            {tel && (
              <a className="pv-btn pv-btn-line" href={tel}>
                Call {b.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="pv-wrap pv-photos" aria-label="Photos">
          {photos.slice(0, 6).map((ph) => (
            <img key={ph.src} src={ph.src} alt={ph.alt} loading="lazy" />
          ))}
        </section>
      )}

      <section className="pv-sec pv-wrap">
        <h2>{copy.servicesTitle}</h2>
        <ul className="pv-services">
          {services.map((s) => (
            <li key={s.name}>
              <div>
                <b>{s.name}</b>
                {s.desc && <p>{s.desc}</p>}
              </div>
              {s.price && <span className="pv-price">{s.price}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="pv-sec pv-alt">
        <div className="pv-wrap pv-about">
          <h2>About {b.name}</h2>
          <p>{b.about}</p>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="pv-sec pv-wrap">
          <h2>What customers say</h2>
          <ul className="pv-reviews">
            {reviews.slice(0, 3).map((r) => (
              <li key={r.author + r.text.slice(0, 20)}>
                {r.rating && <span className="pv-stars" aria-label={`${r.rating} out of 5`}>{"★".repeat(r.rating)}</span>}
                <blockquote>“{r.text}”</blockquote>
                <p>{r.author} · Google review</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(b.areas?.length || b.hours?.length) && (
        <section className="pv-sec pv-wrap pv-info">
          {b.areas && b.areas.length > 0 && (
            <div>
              <h3>Areas we serve</h3>
              <p>{b.areas.join(" · ")}</p>
            </div>
          )}
          {b.hours && b.hours.length > 0 && (
            <div>
              <h3>Hours</h3>
              <ul>
                {b.hours.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section id="contact" className="pv-sec pv-contact">
        <div className="pv-wrap">
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactLead}</p>
          <div className="pv-ctas">
            {wa && (
              <a className="pv-btn" href={wa}>
                WhatsApp
              </a>
            )}
            {tel && (
              <a className="pv-btn pv-btn-line" href={tel}>
                Call {b.phone}
              </a>
            )}
            {ig && (
              <a className="pv-btn pv-btn-line" href={ig}>
                Instagram
              </a>
            )}
            {b.email && (
              <a className="pv-btn pv-btn-line" href={`mailto:${b.email}`}>
                Email
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="pv-foot pv-wrap">
        © {b.name} · Website by Launch24
      </footer>
    </div>
  );
}
