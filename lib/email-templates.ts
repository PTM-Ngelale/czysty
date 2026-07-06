export type BookingMetaFields = {
  bookingType?: string
  service?: string
  space?: string
  address?: string
  landmark?: string
  date?: string
  arrivalWindow?: string
  frequency?: string
  extraTasks?: string
  notes?: string
  additionalStaff?: string
}

const FIELD_LABELS: [keyof BookingMetaFields, string][] = [
  ['bookingType', 'Booking type'],
  ['service', 'Service'],
  ['space', 'Space'],
  ['address', 'Address'],
  ['landmark', 'Landmark'],
  ['date', 'Date'],
  ['arrivalWindow', 'Arrival window'],
  ['frequency', 'Frequency'],
  ['extraTasks', 'Extra tasks'],
  ['notes', 'Notes'],
  ['additionalStaff', 'Additional staff'],
]

export function pickBookingMetaFields(source: Record<string, unknown>): BookingMetaFields {
  const meta: BookingMetaFields = {}
  for (const [key] of FIELD_LABELS) {
    const value = source?.[key]
    if (typeof value === 'string' && value.trim()) meta[key] = value
  }
  return meta
}

export function renderBookingDetailsHtml(meta: BookingMetaFields): string {
  const rows = FIELD_LABELS.filter(([key]) => meta[key])

  if (!rows.length) return ''

  return `
    <h3 style="color:#1A5C28;margin-top:24px">Booking Details</h3>
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([key, label]) =>
            `<tr><td style="padding:8px;border:1px solid #ddd"><strong>${label}</strong></td><td style="padding:8px;border:1px solid #ddd">${meta[key]}</td></tr>`,
        )
        .join('')}
    </table>
  `
}
