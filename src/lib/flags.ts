/**
 * Site-wide switches. Edit here, redeploy.
 */

/**
 * Which home-page design visitors see (same URL, same canonical):
 *  - "everyone": the NEW yellow/black design for all visitors. (DEFAULT)
 *  - "off":      the OLD (original lavender) design for all visitors.
 *
 * The old design is parked, not deleted (src/components/old/).
 * ?design=new / ?design=old still force a version for previewing.
 *
 */
export type NewDesignMode = "everyone" | "off";
export const NEW_DESIGN_MODE: NewDesignMode = "everyone";

/** Show the "Our work" section (testimonials / sample sites) on the NEW design. */
export const SHOW_PORTFOLIO = false;
