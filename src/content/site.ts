export const SITE = {
  name: "MOTIONX",
  email: "hello@motionx.example",
};

export const CHAPTERS = [
  {
    id: "work",
    number: "01",
    label: "Selected work",
    title: "Work that moves",
    statement: "A focused selection of motion-led identities, spatial stories and real-time experiments.",
  },
  {
    id: "studio",
    number: "02",
    label: "The studio",
    title: "Small by design",
    statement: "We bring direction, design and technology into one close, curious team.",
  },
  {
    id: "services",
    number: "03",
    label: "Services",
    title: "From first frame to final signal",
    statement: "Art direction, motion systems, 3D worlds and interactive experiences—made to work together.",
  },
  {
    id: "contact",
    number: "04",
    label: "Contact",
    title: "Make something matter",
    statement: "Have a world to build or a story to move? We would like to hear about it.",
    action: { label: "Start a conversation", href: `mailto:${SITE.email}` },
  },
] as const;

export const NAV_ITEMS = CHAPTERS.map(({ id, label }) => ({ id, label }));

export const HERO = {
  eyebrow: "Motion & real-time 3D studio",
  lines: [
    { text: "Motion", indent: 0, depth: 0.2 },
    { text: "is the", indent: 1.05, depth: 0.55 },
    { text: "message", indent: 0.12, depth: 1.1 },
  ],
  description:
    "We direct cinematic motion, immersive 3D and interactive worlds for brands that refuse to stand still.",
  primary: { label: "Start a project", to: "contact" },
  secondary: { label: "View work", to: "work" },
  capabilities: "Motion · 3D · Interactive",
} as const;
