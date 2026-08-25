export type IconKey =
  | "route"
  | "doc"
  | "spark"
  | "map"
  | "users"
  | "coins"
  | "checklist"
  | "stamp"
  | "eye"
  | "beacon"
  | "plug"
  | "chart";

export const BOARD_WORDS = [
  "SANTORINI",
  "KYOTO",
  "PATAGONIA",
  "AMALFI",
  "REYKJAVIK",
  "MARRAKECH",
  "LISBON",
];

export const AI_LINES = [
  "Drafting Day 4 — Naxos old-town walk…",
  "Comparing 3 ferry windows for Day 3…",
  "Found a group-rate taverna for 6…",
  "Re-checking port time vs. excursion return…",
  "Syncing checklist changes with Eleni…",
];

export const TICKER_PORTS = [
  "SANTORINI",
  "KYOTO",
  "COZUMEL",
  "JUNEAU",
  "CIVITAVECCHIA",
  "BARCELONA",
  "REYKJAVIK",
  "MARRAKECH",
  "DUBROVNIK",
  "VALPARAISO",
  "CAPE TOWN",
  "HALONG BAY",
  "AMALFI",
  "PATAGONIA",
];

export const HERO_STATS = [
  { value: "140+", label: "ports & cities covered" },
  { value: "2,300+", label: "curated excursions" },
  { value: "38k", label: "trip plans drafted" },
];

export type Feature = { icon: IconKey; title: string; body: string };

export const CONSUMER_FEATURES: Feature[] = [
  {
    icon: "route",
    title: "Trip intake & itinerary capture",
    body: "Flights, cruise details, hotels, cars, notes and budget context — one travel workspace where AI helps organize it all.",
  },
  {
    icon: "doc",
    title: "Free-form & document import",
    body: "Paste messy notes or drop in email, Word and PDF files. The platform structures the trip so you don't have to retype a thing.",
  },
  {
    icon: "map",
    title: "Shore excursion marketplace",
    body: "Discover and book curated excursions that align with port schedules, group size and how adventurous everyone is feeling.",
  },
  {
    icon: "users",
    title: "Collaborative planning",
    body: "Share the itinerary with family and friends, assign editing roles and keep everyone on the same plan — not six group chats.",
  },
  {
    icon: "coins",
    title: "AI & budget assistance",
    body: "Planning recommendations, live schedule updates and budget visibility so decisions get easier as departure gets closer.",
  },
  {
    icon: "checklist",
    title: "Trip checklist management",
    body: "Passports, visas, bookings, day-of reminders. Track readiness so the group knows exactly what's still left before takeoff.",
  },
];

export const CONSUMER_AUDIENCE = [
  "Cruise passengers",
  "Vacation travelers",
  "Families & friend groups",
  "Celebration & reunion trips",
];

export const CORPORATE_FEATURES: Feature[] = [
  {
    icon: "spark",
    title: "AI-assisted coordination",
    body: "Draft itineraries, compare options and prep traveler briefs in minutes — with a human coordinator always in the loop.",
  },
  {
    icon: "stamp",
    title: "Approvals & policy engine",
    body: "Route bookings through configurable approval chains. Policy flags surface before money moves, not after.",
  },
  {
    icon: "eye",
    title: "Spend visibility",
    body: "Live budget dashboards per trip, team or program. See committed vs. projected spend without exporting a spreadsheet.",
  },
  {
    icon: "beacon",
    title: "Traveler duty of care",
    body: "Know who is where when plans change. Schedule disruptions trigger alerts and rebooking suggestions automatically.",
  },
  {
    icon: "plug",
    title: "Integrations that fit",
    body: "Connect booking sources, calendars and finance systems so travel data flows into the tools you already run.",
  },
  {
    icon: "chart",
    title: "Reporting at scale",
    body: "Program-level reporting for operators and corporate travel managers — utilization, savings and policy adherence.",
  },
];

export const CORPORATE_AUDIENCE = [
  "Travel coordinators",
  "Tour operators",
  "Corporate programs",
  "Agency teams",
];

export const FLOW_STEPS = [
  {
    n: "01",
    title: "Capture anything",
    body: "Paste free-form plans, forward a confirmation email, or drop in Word and PDF documents. Explorer Agents pulls the trip out of the noise.",
    chips: [".pdf", ".docx", ".eml", "free text"],
  },
  {
    n: "02",
    title: "AI structures the plan",
    body: "Flights, port calls, hotels and timing become a clean day-by-day itinerary — with gaps flagged and realistic buffers built in.",
    chips: ["day-by-day plan", "port alignment", "gap detection"],
  },
  {
    n: "03",
    title: "Collaborate & decide",
    body: "Invite the group, vote on excursions, set editing roles and watch the shared budget update as choices get made.",
    chips: ["activity voting", "shared roles", "live budget"],
  },
  {
    n: "04",
    title: "Travel with a live plan",
    body: "Checklists track readiness before departure; live schedule updates and reminders keep the trip on rails while you're there.",
    chips: ["checklists", "live updates", "reminders"],
  },
];

export type Excursion = {
  port: string;
  title: string;
  hours: string;
  price: number;
  rating: string;
  tag: string;
  img: string;
};

export const EXCURSIONS: Excursion[] = [
  {
    port: "Santorini",
    title: "Caldera sunset catamaran",
    hours: "4h",
    price: 89,
    rating: "4.9",
    tag: "Sailing",
    img: "https://image.qwenlm.ai/generated-images/aa788de9-7eec-4f8f-9e83-fe32708e690d/_result.png",
  },
  {
    port: "Civitavecchia · Rome",
    title: "Pasta making in Trastevere",
    hours: "3h",
    price: 74,
    rating: "4.8",
    tag: "Food",
    img: "https://image.qwenlm.ai/generated-images/cc467864-7e9a-4080-86ec-87b8b4250967/_result.png",
  },
  {
    port: "Cozumel",
    title: "Reef snorkel & cenote swim",
    hours: "5h",
    price: 68,
    rating: "4.7",
    tag: "Adventure",
    img: "https://image.qwenlm.ai/generated-images/5227c390-eab2-4207-9730-e9bb927dd06d/_result.png",
  },
  {
    port: "Juneau",
    title: "Mendenhall glacier trek",
    hours: "6h",
    price: 129,
    rating: "4.9",
    tag: "Adventure",
    img: "https://image.qwenlm.ai/generated-images/141b995b-31a3-4236-8816-6f3143ee5465/_result.png",
  },
  {
    port: "Barcelona",
    title: "Gothic Quarter e-bike loop",
    hours: "3h",
    price: 59,
    rating: "4.6",
    tag: "Culture",
    img: "https://image.qwenlm.ai/generated-images/d148b711-d179-4bd3-8f2b-c45849de054c/_result.png",
  },
  {
    port: "Osaka · Kyoto",
    title: "Tea ceremony & Arashiyama",
    hours: "7h",
    price: 112,
    rating: "5.0",
    tag: "Culture",
    img: "https://image.qwenlm.ai/generated-images/4b575f6e-4035-46f8-951b-4fcb4b362896/_result.png",
  },
];

export const HERO_IMG_OIA =
  "https://image.qwenlm.ai/generated-images/dc942bc5-2bf8-4569-9233-74db1ff3cd7e/_result.png";
export const HERO_IMG_FERRY =
  "https://image.qwenlm.ai/generated-images/874d45ab-d97f-437d-8a55-04f3c6afb3d4/_result.png";

export const PLANS = [
  {
    name: "Free Tier",
    price: "$0",
    unit: "forever",
    blurb: "Dip in — plan a couple of trips and feel the workflow.",
    features: [
      "2 trip plans, up to 3 travelers",
      "Basic itinerary builder",
      "Free-form trip entry & import support",
      "Trip checklist tracking",
    ],
    cta: "Start planning",
    href: "#plans",
    featured: false,
  },
  {
    name: "Pro Trip Planner",
    price: "$8–$15",
    unit: "per trip",
    blurb: "For active family and friend collaboration on real trips.",
    features: [
      "Up to 10 travelers",
      "AI-backed document & note parsing",
      "Live trip updates & editable sharing roles",
      "Checklist management & budget visibility",
    ],
    cta: "Create account",
    href: "#plans",
    featured: true,
  },
  {
    name: "Group Planner",
    price: "$25–$50",
    unit: "per trip",
    blurb: "Built for reunions, celebrations and larger coordination.",
    features: [
      "20+ participants",
      "Activity voting & invitations",
      "Shared checklist & trip-readiness tracking",
      "Group budget rollup",
    ],
    cta: "Talk to us",
    href: "#closing",
    featured: false,
  },
];

export const FAQS = [
  {
    q: "How is my personal data handled by the AI?",
    a: "Traveler details are sanitized and obfuscated before AI processing. Names, emails, phone numbers, passport details and payment data never enter AI requests — the planning layer only sees privacy-safe travel context like itinerary structure, timing and destination.",
  },
  {
    q: "Can I really import bookings from email, Word or PDF?",
    a: "Yes. Paste free-form text, forward a confirmation email, or upload .docx and .pdf files. The platform parses the documents, maps the fields into your trip workspace and flags anything it couldn't place for a quick human check.",
  },
  {
    q: "How does group voting work?",
    a: "On Pro and Group plans, any member can propose excursions or activities. The group votes from inside the shared itinerary, results update live, and winning options slot straight into the day plan with port timing checked automatically.",
  },
  {
    q: "What happens when flight or port times change?",
    a: "Live schedule updates ripple through the plan. Affected days get re-suggested timing, excursions that no longer fit are flagged with alternatives, and everyone in the group sees the change the moment it lands.",
  },
  {
    q: "Is there a free way to try it?",
    a: "The Free Tier includes 2 trip plans for up to 3 travelers with the core itinerary builder, import support and checklist tracking. Upgrade per trip only when you need more travelers, AI parsing and collaboration tools.",
  },
  {
    q: "Do you support corporate and managed-travel programs?",
    a: "Yes — the business platform adds AI assistance, approvals, policy controls, spend visibility and reporting for coordinators, operators and corporate programs. Request a demo from the corporate tab or the contact section below.",
  },
];

export const RAW_CHIPS = ["Full name", "Email", "Phone", "Passport №", "Card / PCI"];
export const SAFE_CHIPS = [
  "Itinerary structure",
  "Timing & ports",
  "Destination context",
  "Booking metadata",
  "Group size",
];
