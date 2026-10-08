import { NEW_DESIGN_MODE } from "@/lib/flags";

export type Design = "new" | "old";

type Query = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  return (v ?? "").trim().toLowerCase();
}

/** Decide which home-page design to render. */
export function resolveDesign(query: Query): Design {
  // Manual preview: ?design=new / ?design=old.
  const override = first(query.design);
  if (override === "new" || override === "old") return override;
  return NEW_DESIGN_MODE === "off" ? "old" : "new";
}
