/**
 * "How did you hear about us?" options (optional field on the NEW form).
 * `value` is what we store; `label` is what people see and what the lead email shows.
 * "lawn_sign" here is self-reported, so it complements the utm_source tag.
 */
export const heardFromOptions = [
  { value: "lawn_sign", label: "Lawn sign" },
  { value: "google", label: "Google" },
  { value: "friend", label: "Friend or family" },
  { value: "social", label: "Facebook or Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "other", label: "Other" },
] as const;

export function heardFromLabel(value: string) {
  return heardFromOptions.find((o) => o.value === value)?.label ?? "";
}
