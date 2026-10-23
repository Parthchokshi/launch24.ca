"use client";

import { useEffect } from "react";
import { contact } from "@/lib/contact";
import { track } from "@/lib/tracking";

function wa(text: string) {
  return `https://wa.me/${contact.phoneE164}?text=${encodeURIComponent(text)}`;
}

/**
 * Slim bar over every preview: says plainly it's a Launch24 preview, and gives
 * the owner the two next steps. Both open WhatsApp to Launch24 naming their business.
 */
export function PreviewBanner({
  slug,
  businessName,
  sample,
}: {
  slug: string;
  businessName: string;
  sample?: boolean;
}) {
  useEffect(() => {
    track("preview_view", { preview: slug });
  }, [slug]);

  return (
    <div className="pv-banner" role="region" aria-label="About this preview">
      <p>
        <b>{sample ? "Sample preview" : `Preview made for ${businessName}`}</b> by Launch24. Not live yet.
      </p>
      <div className="pv-banner-actions">
        <a
          href={wa(`Hi Parth! I saw the website preview for ${businessName}. I'd like to change: `)}
          target="_blank"
          rel="noopener noreferrer"
          className="pv-bbtn"
          onClick={() => track("preview_changes_click", { preview: slug })}
        >
          Make changes
        </a>
        <a
          href={wa(`Hi Parth! I'd like to go ahead with the website for ${businessName}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="pv-bbtn pv-bbtn-gold"
          onClick={() => track("preview_claim_click", { preview: slug })}
        >
          Make it mine
        </a>
      </div>
    </div>
  );
}
