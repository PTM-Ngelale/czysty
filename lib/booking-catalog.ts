export type HomeOption = {
  value: string;
  label: string;
  basePrice: number;
  durationHrs: number;
};

export type CleaningExtra = {
  id: string;
  name: string;
  unitPrice: number;
};

// Backward-compat types
export type PrimaryService = { id: string; name: string; multiplier: number };
export type StandaloneAddon = {
  id: string;
  name: string;
  description: string;
  extraTaskId: string;
};
export type ExtraTask = {
  id: string;
  name: string;
  unitLabel: string;
  unitDescription: string;
  unitPrice: number;
  allowsFrequency: boolean;
};
export type SpaceOption = HomeOption;

// ─── Home type options ────────────────────────────────────────────────────────

export const HOME_OPTIONS: HomeOption[] = [
  {
    value: "student",
    label: "Student Accommodation (campus)",
    basePrice: 4999,
    durationHrs: 3,
  },
  {
    value: "self-contained",
    label: "Self Contained",
    basePrice: 5999,
    durationHrs: 4,
  },
  {
    value: "1-bed",
    label: "1 Bedroom Apartment",
    basePrice: 6999,
    durationHrs: 5,
  },
];

// Laundry package is accessed via the "Do your Laundry" entry on the intro page only
export const LAUNDRY_PACKAGE_PRICE = 10000;

// Alias for backward compat
export const SPACE_OPTIONS = HOME_OPTIONS;

// ─── Cleaning extras ──────────────────────────────────────────────────────────

export const CLEANING_EXTRAS: CleaningExtra[] = [
  { id: "window-net", name: "Window Net Washing", unitPrice: 1500 },
  { id: "wardrobe", name: "Wardrobe Rearranging", unitPrice: 1500 },
  { id: "fridge", name: "Fridge Deep Clean", unitPrice: 1500 },
  { id: "ironing", name: "Ironing", unitPrice: 1500 },
];

// EXTRA_TASKS alias used by layout / summary for backward compat
export const EXTRA_TASKS: ExtraTask[] = CLEANING_EXTRAS.map((e) => ({
  id: e.id,
  name: e.name,
  unitLabel: "service",
  unitDescription: "",
  unitPrice: e.unitPrice,
  allowsFrequency: false,
}));

// Backward-compat stubs (no longer actively used)
export const PRIMARY_SERVICES: PrimaryService[] = [
  { id: "home", name: "Home Cleaning", multiplier: 1.0 },
];
export const STANDALONE_ADDONS: StandaloneAddon[] = [];

// ─── Laundry plans (monthly subscription — Nov 2026 flyer) ──────────────────

export const LAUNDRY_OPTIONS = [
  {
    id: "wash",
    name: "Wash Only",
    planName: "Basic Plan",
    tagline: "Wash & Fold",
    price: 10000,
    itemsPerMonth: 40,
    maxPerBatch: 25,
    features: [
      "40 items per month",
      "Max 25 items per batch",
      "Self drop off / pick up",
    ],
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    planName: "Corporate Plan",
    tagline: "Wash, Dry & Iron",
    price: 20000,
    itemsPerMonth: 30,
    maxPerBatch: 15,
    features: [
      "30 items per month",
      "Max 15 items per batch",
      "Only first pick up is free",
      "Self drop off / pick up",
    ],
  },
] as const;
export type LaundryOptionId = (typeof LAUNDRY_OPTIONS)[number]["id"];

export const DUVET_EXTRA_PRICE = 3500;

export const LAUNDRY_TERMS = [
  "Registrations must be made before drop off.",
  "Each batch takes between 6–7 days to be prepared.",
  `Duvets come at an extra cost of ₦3,500 per unit.`,
  "Delivery by the company goes out on Wednesdays and Saturdays only.",
  "Only your first pick up is free.",
  "No clothing insurance against damage — Czysty is not liable for any wear, tear, shrinkage or damage during the laundry process.",
];

// Cleaning is no longer booked online — quotes are handled on WhatsApp.
export const CZYSTY_WHATSAPP = "2348072133343";
export const CLEANING_QUOTE_WHATSAPP_URL = `https://wa.me/${CZYSTY_WHATSAPP}?text=${encodeURIComponent(
  "Hi Czysty! I'd like a quote for cleaning. Here are the details of my space:",
)}`;

// ─── Pricing constants ────────────────────────────────────────────────────────

export const SUPPLIES_FEE = 2500;
export const IRONING_PRICE_PER_ITEM = 150;

// ─── Port Harcourt locations (all free) ──────────────────────────────────────

export const PH_LOCATIONS = [
  "GRA Phase 1",
  "GRA Phase 2",
  "GRA Phase 3",
  "Old GRA",
  "Trans Amadi",
  "Rumuola",
  "Peter Odili Road",
  "Aggrey Road",
  "Mile 1 Diobu",
  "Mile 3",
  "Mile 4",
  "Woji",
  "Elelenwo",
  "Eliozu",
  "Rumuigbo",
  "Ada George",
  "Rumuokwurushi",
  "Choba",
  "Rumuepirikom",
  "Borikiri",
  "D-Line",
  "NTA Road",
  "Stadium Road",
  "Rumueme",
  "Rumuibekwe",
];

// Kept for backward compat — all PH locations are free
export const TRANSPORT_ZONES: Record<string, number> = {};

// ─── Schedule options ─────────────────────────────────────────────────────────

export const ARRIVAL_WINDOWS = [
  "7am – 9am",
  "9am – 12pm",
  "12pm – 2pm",
  "2pm – 4pm",
];

export const FREQUENCIES = [
  { id: "once_off", label: "Once-off" },
  { id: "weekly", label: "Once a week" },
  { id: "twice_weekly", label: "Twice a week" },
  { id: "three_weekly", label: "3× a week" },
  { id: "four_weekly", label: "4× a week" },
  { id: "daily", label: "Daily" },
];

// ─── Pricing helpers ──────────────────────────────────────────────────────────

export function calcBasePrice(
  _serviceId: string | null,
  spaceValue: string,
): number {
  return HOME_OPTIONS.find((o) => o.value === spaceValue)?.basePrice ?? 0;
}

export function calcExtraTaskPrice(taskId: string, quantity: number): number {
  const extra = CLEANING_EXTRAS.find((e) => e.id === taskId);
  return extra ? extra.unitPrice * quantity : 0;
}

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function getSpaceDuration(spaceValue: string): number {
  return HOME_OPTIONS.find((o) => o.value === spaceValue)?.durationHrs ?? 0;
}
