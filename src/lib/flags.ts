/**
 * Site-wide switches. Edit here, redeploy.
 */

/**
 * Which home-page design visitors see (same URL, same canonical):
 *  - "lawn_sign_only": NEW design for ?utm_source=lawn_sign (and visitors who
 *                      were shown it before, for 30 days); everyone else gets
 *                      the CURRENT design.
 *  - "everyone":       NEW design for all visitors.
 *  - "off":            CURRENT design for all visitors.
 * ?design=new / ?design=old always override this, for previewing.
 */
export type NewDesignMode = "lawn_sign_only" | "everyone" | "off";
export const NEW_DESIGN_MODE: NewDesignMode = "lawn_sign_only";

/** Show the "Our work" section (testimonials / sample sites) on the NEW design. */
export const SHOW_PORTFOLIO = false;
