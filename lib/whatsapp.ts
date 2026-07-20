// WhatsApp Cloud API notifications for paid bookings.
// Mirrors the Resend email flow in email-templates.ts. Business-initiated
// WhatsApp messages must use pre-approved templates, so everything here is
// template-based rather than free-form text.

const GRAPH_API_VERSION = process.env.WHATSAPP_API_VERSION ?? 'v22.0'

// Normalize a phone number to WhatsApp's expected format: digits only, with
// country code. Nigerian local numbers (0803...) become 234803..., and a
// leading + or 00 international prefix is stripped.
export function normalizePhone(raw: string | undefined): string {
  let digits = (raw ?? '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = `234${digits.slice(1)}`
  return digits
}

// Comma-separated E.164 numbers in env, e.g. "+2348072133343,+2348012345678"
export const WHATSAPP_STAFF_NUMBERS = (process.env.WHATSAPP_STAFF_NUMBERS ?? '')
  .split(',')
  .map((n) => normalizePhone(n))
  .filter(Boolean)

type TemplateParams = {
  to: string
  templateName: string
  languageCode?: string
  bodyParams?: string[]
}

// Low-level: send one template message. Never throws — returns a result object
// so callers can log without risking the surrounding request.
export async function sendWhatsAppTemplate({
  to,
  templateName,
  languageCode = 'en_US',
  bodyParams = [],
}: TemplateParams): Promise<{ ok: boolean; error?: unknown; data?: unknown }> {
  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !phoneNumberId) {
    console.error('WhatsApp not configured (WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID missing).')
    return { ok: false, error: 'not_configured' }
  }

  // While on the free test number, redirect every send to a single verified
  // number so real bookings don't attempt to message unverified recipients.
  const override = process.env.WHATSAPP_TEST_OVERRIDE_TO
  const recipient = override ? normalizePhone(override) : normalizePhone(to)
  if (!recipient) return { ok: false, error: 'no_recipient' }

  const components = bodyParams.length
    ? [{ type: 'body', parameters: bodyParams.map((text) => ({ type: 'text', text })) }]
    : []

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipient,
          type: 'template',
          template: {
            name: templateName,
            language: { code: languageCode },
            ...(components.length ? { components } : {}),
          },
        }),
      },
    )
    const data = await res.json()
    if (!res.ok) {
      console.error('WhatsApp send failed:', JSON.stringify(data))
      return { ok: false, error: data }
    }
    return { ok: true, data }
  } catch (err) {
    console.error('WhatsApp send error:', err)
    return { ok: false, error: err }
  }
}

export type BookingWhatsAppInput = {
  customerPhone?: string
  customerName?: string
  amount?: number
  txRef?: string
  bookingType?: string
  service?: string
  date?: string
  arrivalWindow?: string
  address?: string
  landmark?: string
}

// High-level: notify the customer and all staff about a paid booking. Fires
// every send in parallel and never throws, so a WhatsApp failure can't break
// the email/verification path that calls it.
export async function sendBookingWhatsApp(input: BookingWhatsAppInput): Promise<void> {
  // Defaults to Meta's built-in 'hello_world' template (no variables) so the
  // send path can be tested before the real Utility templates are approved.
  // Swap these env vars to the approved template names to go live.
  const customerTemplate = process.env.WHATSAPP_CUSTOMER_TEMPLATE ?? 'hello_world'
  const staffTemplate = process.env.WHATSAPP_STAFF_TEMPLATE ?? 'hello_world'

  const sends: Promise<unknown>[] = []

  // Laundry bookings skip the scheduling step, so date/arrivalWindow can be
  // absent — fall back to a neutral placeholder rather than leaving a blank
  // WhatsApp variable.
  const jobLabel = [input.bookingType, input.service].filter(Boolean).join(' — ') || 'Booking'
  const scheduled = input.date
    ? `${input.date}${input.arrivalWindow ? ` (${input.arrivalWindow})` : ''}`
    : 'To be confirmed'
  const addressLine = [input.address, input.landmark].filter(Boolean).join(', ') || 'Not provided'

  if (input.customerPhone) {
    sends.push(
      sendWhatsAppTemplate({
        to: input.customerPhone,
        templateName: customerTemplate,
        bodyParams:
          customerTemplate === 'hello_world'
            ? []
            : [input.customerName ?? 'there', formatAmount(input.amount), jobLabel, scheduled, addressLine],
      }),
    )
  }

  for (const staff of WHATSAPP_STAFF_NUMBERS) {
    sends.push(
      sendWhatsAppTemplate({
        to: staff,
        templateName: staffTemplate,
        bodyParams:
          staffTemplate === 'hello_world'
            ? []
            : [
                input.customerName ?? '',
                formatAmount(input.amount),
                jobLabel,
                scheduled,
                addressLine,
                input.customerPhone ?? '',
                input.txRef ?? '',
              ],
      }),
    )
  }

  await Promise.allSettled(sends)
}

function formatAmount(amount?: number): string {
  if (typeof amount !== 'number') return ''
  return `₦${amount.toLocaleString('en-NG')}`
}
