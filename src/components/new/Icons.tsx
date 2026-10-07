const common = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PhoneIcon = () => (
  <svg {...common}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const ChatIcon = () => (
  <svg {...common}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg {...common}>
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
    <path d="M9 8.5c.4 3 2.5 5.1 5.5 5.5l1-1.6-2-1-1 .8c-.8-.4-1.7-1.3-2-2l.8-1-1-2L9 8.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const MicIcon = () => (
  <svg {...common}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
