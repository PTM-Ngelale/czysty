export type PrimaryService = {
  id: string;
  name: string;
  multiplier: number;
};

export type StandaloneAddon = {
  id: string;
  name: string;
  description: string;
  extraTaskId: string; // maps to the EXTRA_TASKS entry
};

export type ExtraTask = {
  id: string;
  name: string;
  unitLabel: string;
  unitDescription: string;
  unitPrice: number;
  allowsFrequency: boolean;
};

export type SpaceOption = {
  value: string;
  label: string;
  basePrice: number;
  durationHrs: number;
};

// ─── Services ────────────────────────────────────────────────────────────────

export const PRIMARY_SERVICES: PrimaryService[] = [
  { id: 'wash-fold',  name: 'Wash & Fold',        multiplier: 1.0 },
  { id: 'wash-iron',  name: 'Wash & Iron',         multiplier: 1.4 },
  { id: 'dry-clean',  name: 'Dry Cleaning',        multiplier: 1.8 },
  { id: 'bulky',      name: 'Duvet / Bulky Items', multiplier: 2.0 },
];

// Shown as checkboxes on the service step; can be booked without a primary service
export const STANDALONE_ADDONS: StandaloneAddon[] = [
  {
    id: 'iron-only',
    name: 'Ironing Only',
    description: 'Drop off pre-washed items for pressing — no full wash needed',
    extraTaskId: 'ironing',
  },
];

// ─── Space / order size ───────────────────────────────────────────────────────

export const SPACE_OPTIONS: SpaceOption[] = [
  { value: '1-bag',      label: '1 Bag (up to 7 kg)',   basePrice: 2500,  durationHrs: 1   },
  { value: '2-bags',     label: '2 Bags (up to 14 kg)', basePrice: 4500,  durationHrs: 1.5 },
  { value: '3-bags',     label: '3 Bags (up to 21 kg)', basePrice: 6500,  durationHrs: 2   },
  { value: '4-bags',     label: '4 Bags (up to 28 kg)', basePrice: 8500,  durationHrs: 2.5 },
  { value: '5plus-bags', label: '5+ Bags (bulk)',        basePrice: 10500, durationHrs: 3   },
];

export const STAIN_OPTIONS = [
  { value: 'no',  label: 'No — standard wash' },
  { value: 'yes', label: 'Yes — please pre-treat (+₦500 per order)' },
];

// ─── Extra tasks (full list — shown in step 6) ───────────────────────────────

export const EXTRA_TASKS: ExtraTask[] = [
  {
    id: 'ironing',
    name: 'Ironing',
    unitLabel: 'load',
    unitDescription: '1 load = up to 15 regular-sized items',
    unitPrice: 1200,
    allowsFrequency: true,
  },
  {
    id: 'stain-treatment',
    name: 'Stain Treatment',
    unitLabel: 'item',
    unitDescription: 'Professional pre-treatment per stained item',
    unitPrice: 500,
    allowsFrequency: false,
  },
  {
    id: 'express',
    name: 'Express / Same-day',
    unitLabel: 'order',
    unitDescription: 'Priority processing — returned same day by 6 pm',
    unitPrice: 1500,
    allowsFrequency: false,
  },
  {
    id: 'fold-pack',
    name: 'Fold & Pack',
    unitLabel: 'bag',
    unitDescription: 'Items folded and packed into individual sealed bags',
    unitPrice: 500,
    allowsFrequency: false,
  },
  {
    id: 'starch',
    name: 'Starch',
    unitLabel: 'load',
    unitDescription: '1 load = up to 15 items',
    unitPrice: 300,
    allowsFrequency: false,
  },
  {
    id: 'softener',
    name: 'Softener / Fragrance',
    unitLabel: 'load',
    unitDescription: 'Premium fabric softener — your choice of scent',
    unitPrice: 300,
    allowsFrequency: false,
  },
];

// ─── Schedule options ─────────────────────────────────────────────────────────

export const ARRIVAL_WINDOWS = [
  '7am – 9am',
  '9am – 12pm',
  '12pm – 2pm',
  '2pm – 4pm',
];

export const FREQUENCIES = [
  { id: 'once_off',       label: 'Once-off' },
  { id: 'weekly',         label: 'Once a week' },
  { id: 'twice_weekly',   label: 'Twice a week' },
  { id: 'three_weekly',   label: '3× a week' },
  { id: 'four_weekly',    label: '4× a week' },
  { id: 'daily',          label: 'Daily' },
];

// ─── Transport zones ──────────────────────────────────────────────────────────

export const TRANSPORT_ZONES: Record<string, number> = {
  'Ajah (Ajah bus stop – Abraham Adesanya)':      1000,
  'Agege / Egbeda / Ikotun / Abule Egba':         1000,
  'Iganmu, Ijaora, Orile & environs':             1000,
  'Ipaja (Iyana-Ipaja – Ayobo)':                  1500,
  'Sangotedo (LBS – Sangotedo)':                  1800,
  'Ago Palace Way (Apple junction, Amuwo…)':      2000,
  'Festac (Maza Maza through Satellite Town)':    2000,
  'Magboro (Opic to Magboro bus stop)':           2000,
  'Ikorodu':                                      2300,
  'Iju':                                          2300,
  'Apapa – Tican':                                2300,
};

// ─── Pricing helpers ──────────────────────────────────────────────────────────

export function calcBasePrice(serviceId: string | null, spaceValue: string): number {
  const space = SPACE_OPTIONS.find(s => s.value === spaceValue);
  if (!space) return 0;
  const service = PRIMARY_SERVICES.find(s => s.id === serviceId);
  const multiplier = service?.multiplier ?? 1.0;
  return Math.round(space.basePrice * multiplier);
}

export function calcExtraTaskPrice(taskId: string, quantity: number): number {
  const task = EXTRA_TASKS.find(t => t.id === taskId);
  return task ? task.unitPrice * quantity : 0;
}

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function getSpaceDuration(spaceValue: string): number {
  return SPACE_OPTIONS.find(s => s.value === spaceValue)?.durationHrs ?? 0;
}
